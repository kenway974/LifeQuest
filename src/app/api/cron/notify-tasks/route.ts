/**
 * Cron endpoint — fires task reminders.
 *
 * Vercel Hobby plan = 1 daily cron max. We run once a day (default 8h UTC).
 * For each user with notifications enabled, builds the list of tasks due TODAY
 * (scheduled occurrence today, not yet done) and sends a single aggregated
 * web-push.
 *
 * Personal `notification_hour` from user_settings is IGNORED in the Hobby
 * model — there's only one run per day. To honour per-user hours, either:
 *  - upgrade Vercel to Pro and switch the cron back to "0 * * * *", then
 *    re-enable the .eq('notification_hour', currentHourUtc) filter below;
 *  - or use an external scheduler (cron-job.org) hitting this endpoint hourly.
 *
 * Security: bearer-token gated via env.CRON_SECRET.
 */
import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import webpush from 'web-push';
import type { Database } from '@/types/database';
import { tasksDueToday, type TaskFrequency } from '@/lib/quests';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function getEnv(name: string): string | null {
  const v = process.env[name];
  return v && v.length > 0 ? v : null;
}

export async function GET(req: NextRequest) {
  const expected = getEnv('CRON_SECRET');
  if (expected) {
    const auth = req.headers.get('authorization');
    if (auth !== `Bearer ${expected}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  const supabaseUrl = getEnv('NEXT_PUBLIC_SUPABASE_URL');
  const serviceKey = getEnv('SUPABASE_SERVICE_ROLE_KEY');
  const vapidPublic = getEnv('NEXT_PUBLIC_VAPID_PUBLIC_KEY');
  const vapidPrivate = getEnv('VAPID_PRIVATE_KEY');
  const vapidSubject = getEnv('VAPID_SUBJECT') ?? 'mailto:noreply@lifequest.app';

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: 'Supabase env missing' }, { status: 500 });
  }
  if (!vapidPublic || !vapidPrivate) {
    return NextResponse.json({ error: 'VAPID keys missing' }, { status: 500 });
  }

  webpush.setVapidDetails(vapidSubject, vapidPublic, vapidPrivate);

  const supabase = createClient<Database>(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });

  const now = new Date();
  const currentHourUtc = now.getUTCHours();

  // Daily fan-out (Hobby plan). To restore per-user-hour filtering, re-add:
  //   .eq('notification_hour', currentHourUtc)
  const { data: users, error: usersErr } = await supabase
    .from('user_settings')
    .select('user_id, notification_hour')
    .eq('notifications_enabled', true);

  if (usersErr) {
    return NextResponse.json({ error: usersErr.message }, { status: 500 });
  }
  if (!users || users.length === 0) {
    return NextResponse.json({ ok: true, sent: 0, reason: 'no opted-in users' });
  }

  let sent = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const u of users) {
    try {
      const dueTasks = await collectDueTasks(supabase, u.user_id, now);
      if (dueTasks.length === 0) {
        skipped++;
        continue;
      }

      const { data: subs } = await supabase
        .from('push_subscriptions')
        .select('endpoint, p256dh_key, auth_key')
        .eq('user_id', u.user_id);

      if (!subs || subs.length === 0) {
        skipped++;
        continue;
      }

      const payload = JSON.stringify({
        title: dueTasks.length === 1
          ? '1 quête t\'attend aujourd\'hui'
          : `${dueTasks.length} tâches à valider aujourd\'hui`,
        body: dueTasks.slice(0, 3).map((t) => `• ${t}`).join('\n')
          + (dueTasks.length > 3 ? `\n+ ${dueTasks.length - 3} autres…` : ''),
        url: '/game',
      });

      for (const sub of subs) {
        try {
          await webpush.sendNotification(
            {
              endpoint: sub.endpoint,
              keys: { p256dh: sub.p256dh_key, auth: sub.auth_key },
            },
            payload,
          );
          sent++;
        } catch (err: unknown) {
          const status = (err as { statusCode?: number })?.statusCode;
          // 404 / 410 = subscription expired or invalid → cleanup
          if (status === 404 || status === 410) {
            await supabase.from('push_subscriptions').delete().eq('endpoint', sub.endpoint);
          } else {
            errors.push(`user ${u.user_id}: ${(err as Error).message}`);
          }
        }
      }
    } catch (err) {
      errors.push(`user ${u.user_id}: ${(err as Error).message}`);
    }
  }

  return NextResponse.json({
    ok: true,
    runHourUtc: currentHourUtc,
    candidates: users.length,
    sent,
    skipped,
    errors: errors.slice(0, 10),
  });
}

/**
 * For one user, gather the titles of all tasks that have a scheduled occurrence
 * today (across all their active user_quests) and aren't already done today.
 */
async function collectDueTasks(
  supabase: ReturnType<typeof createClient<Database>>,
  userId: string,
  now: Date,
): Promise<string[]> {
  const { data: userQuests } = await supabase
    .from('user_quests')
    .select(`
      id, started_at,
      quest:quests!inner (
        id, duration_days,
        objectives (
          id,
          tasks (id, title, frequency_days, xp_reward)
        )
      )
    `)
    .eq('user_id', userId)
    .eq('status', 'active');

  if (!userQuests || userQuests.length === 0) return [];

  const titles: string[] = [];

  for (const uq of userQuests) {
    const tasks = (uq.quest.objectives ?? []).flatMap(
      (o) => (o.tasks ?? []) as Array<TaskFrequency & { title: string }>,
    );
    if (tasks.length === 0) continue;

    // Fetch all completions for this user_quest in one query
    const { data: comps } = await supabase
      .from('user_tasks')
      .select('task_id, completed_date')
      .eq('user_id', userId)
      .eq('user_quest_id', uq.id);

    const completionsByTask = new Map<string, string[]>();
    for (const c of comps ?? []) {
      const arr = completionsByTask.get(c.task_id) ?? [];
      arr.push(c.completed_date);
      completionsByTask.set(c.task_id, arr);
    }

    const startedAt = new Date(uq.started_at);
    const dueIds = tasksDueToday(
      tasks.map((t) => ({
        task: { id: t.id, frequency_days: t.frequency_days, xp_reward: t.xp_reward },
        completionDates: completionsByTask.get(t.id) ?? [],
      })),
      startedAt,
      uq.quest.duration_days,
      now,
    );

    for (const id of dueIds) {
      const t = tasks.find((x) => x.id === id);
      if (t) titles.push(t.title);
    }
  }

  return titles;
}
