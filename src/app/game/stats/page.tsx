import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { xpToNextLevel } from '@/lib/utils';
import { ArrowLeft, Zap, Trophy, TrendingUp, CheckCircle, Flame, Target } from 'lucide-react';

export const metadata = { title: 'Statistiques' };

/**
 * User stats dashboard.
 * Shows: level, total XP, quest counts, completion rate, streak, total tasks.
 */
export default async function StatsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('level, xp')
    .eq('id', user!.id)
    .single();

  const { count: activeQuests } = await supabase
    .from('user_quests')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user!.id)
    .eq('status', 'active');

  const { count: completedQuests } = await supabase
    .from('user_quests')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user!.id)
    .eq('status', 'completed');

  const { count: totalQuests } = await supabase
    .from('user_quests')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user!.id);

  const { count: totalTasks } = await supabase
    .from('user_tasks')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user!.id);

  const { count: totalTrophies } = await supabase
    .from('user_trophies')
    .select('trophy_id', { count: 'exact', head: true })
    .eq('user_id', user!.id);

  // Compute streak (consecutive days with at least 1 completed task)
  const { data: recentDays } = await supabase
    .from('user_tasks')
    .select('completed_date')
    .eq('user_id', user!.id)
    .order('completed_date', { ascending: false })
    .limit(60);

  const streak = computeStreak(recentDays?.map((d) => d.completed_date) ?? []);

  const xpProgress = profile ? xpToNextLevel(profile.xp) : { current: 0, needed: 100, pct: 0 };
  const completionRate =
    totalQuests && totalQuests > 0 ? Math.round(((completedQuests ?? 0) / totalQuests) * 100) : 0;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Link
        href="/game"
        className="mb-6 inline-flex items-center gap-2 text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]"
      >
        <ArrowLeft className="h-4 w-4" /> Menu principal
      </Link>

      <h1 className="mb-8 font-display text-3xl font-black md:text-4xl">
        Statistiques
      </h1>

      {/* Hero level card */}
      <div className="card-neon mb-6 p-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-[color:var(--color-text-muted)]">
              Niveau actuel
            </p>
            <p className="font-display text-6xl font-black text-glow-violet">
              {profile?.level ?? 1}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest text-[color:var(--color-text-muted)]">
              XP total
            </p>
            <p className="font-display text-3xl font-black text-glow-cyan">{profile?.xp ?? 0}</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-1.5 flex justify-between text-sm">
            <span className="text-[color:var(--color-text-secondary)]">
              Progression vers niveau {(profile?.level ?? 1) + 1}
            </span>
            <span className="font-display font-bold text-glow-cyan">
              {xpProgress.current} / {xpProgress.needed} XP
            </span>
          </div>
          <div
            className="h-3 overflow-hidden rounded-full bg-[color:var(--color-bg-elevated)]"
            role="progressbar"
            aria-valuenow={xpProgress.pct}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full bg-gradient-to-r from-[color:var(--color-neon-violet)] to-[color:var(--color-neon-cyan)] transition-all"
              style={{ width: `${xpProgress.pct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stat grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard icon={<Flame />} label="Série de jours actifs" value={streak} suffix={streak > 1 ? 'jours' : 'jour'} accent="orange" />
        <StatCard icon={<CheckCircle />} label="Tâches validées" value={totalTasks ?? 0} accent="cyan" />
        <StatCard icon={<Trophy />} label="Trophées" value={totalTrophies ?? 0} accent="violet" />
        <StatCard icon={<Target />} label="Quêtes actives" value={activeQuests ?? 0} accent="violet" />
        <StatCard icon={<TrendingUp />} label="Quêtes terminées" value={completedQuests ?? 0} accent="cyan" />
        <StatCard icon={<Zap />} label="Taux de complétion" value={`${completionRate}%`} accent="orange" />
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  suffix,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  suffix?: string;
  accent: 'violet' | 'cyan' | 'orange';
}) {
  const accentClass = {
    violet: 'text-glow-violet',
    cyan: 'text-glow-cyan',
    orange: 'text-[#f97316]',
  }[accent];
  return (
    <article className="card-neon p-5">
      <div className={`mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[color:var(--color-bg-elevated)] ${accentClass}`}>
        {icon}
      </div>
      <p className="text-xs uppercase tracking-widest text-[color:var(--color-text-muted)]">{label}</p>
      <p className="mt-1 font-display text-3xl font-black">
        {value}
        {suffix && <span className="ml-1 text-sm text-[color:var(--color-text-secondary)]">{suffix}</span>}
      </p>
    </article>
  );
}

/**
 * Compute the user's current daily streak from a list of completed dates.
 * Streak = consecutive days ending today (or yesterday if today not yet active).
 */
function computeStreak(dates: string[]): number {
  if (dates.length === 0) return 0;
  const unique = Array.from(new Set(dates)).sort().reverse();
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);

  if (unique[0] !== today && unique[0] !== yesterday) return 0;

  let streak = 1;
  for (let i = 1; i < unique.length; i++) {
    const prev = new Date(unique[i - 1]);
    const curr = new Date(unique[i]);
    const diff = Math.round((prev.getTime() - curr.getTime()) / 86_400_000);
    if (diff === 1) streak++;
    else break;
  }
  return streak;
}
