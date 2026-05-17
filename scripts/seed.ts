/**
 * LifeQuest — Database seed script (DESTRUCTIVE).
 *
 * Wipes all catalog quests (created_by IS NULL) — including their objectives
 * and tasks via cascade — then re-inserts everything from scratch. ALL user
 * progression on catalog quests is lost. Custom user quests are preserved
 * because their `created_by` is not null.
 *
 * Run with: npm run db:seed
 *
 * For non-destructive updates (adding new content without losing progression),
 * use `npm run db:seed:add` instead.
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY in your .env.local (bypasses RLS).
 */
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import type { Database } from '../src/types/database';
import { MAIN_QUESTS, SECONDARY_QUESTS, TROPHIES } from './catalog-data';

config({ path: '.env.local' });

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } },
);

async function seed() {
  console.log('🌱 Starting seed…');

  // Wipe existing catalog quests (custom quests stay — they have created_by set)
  console.log('🧹 Cleaning catalog quests (main + secondary, created_by IS NULL)…');
  const { error: wipeErr } = await supabase
    .from('quests')
    .delete()
    .is('created_by', null);
  if (wipeErr) {
    console.error('Wipe failed:', wipeErr);
    console.error('  → Re-running may create duplicates. Fix the wipe or run manually.');
  } else {
    console.log('  ✓ Catalog wiped (objectives + tasks cascade-deleted via FK)');
  }

  let questCount = 0;
  let objCount = 0;
  let taskCount = 0;

  for (const q of [...MAIN_QUESTS, ...SECONDARY_QUESTS]) {
    const { data: quest, error: qErr } = await supabase
      .from('quests')
      .insert({
        title: q.title,
        description: q.description,
        type: q.type,
        difficulty: q.difficulty,
        duration_days: q.duration_days,
        xp_reward: q.xp_reward,
        is_published: true,
      })
      .select('id')
      .single();

    if (qErr || !quest) {
      console.error(`Failed to insert quest "${q.title}":`, qErr);
      continue;
    }
    questCount++;

    for (let i = 0; i < q.objectives.length; i++) {
      const obj = q.objectives[i];
      const { data: objRow, error: oErr } = await supabase
        .from('objectives')
        .insert({
          quest_id: quest.id,
          title: obj.title,
          description: obj.description,
          xp_reward: obj.xp_reward,
          order_index: i,
        })
        .select('id')
        .single();

      if (oErr || !objRow) {
        console.error(`  ✗ Objective "${obj.title}" failed:`, oErr);
        continue;
      }
      objCount++;

      for (let j = 0; j < obj.tasks.length; j++) {
        const t = obj.tasks[j];
        const { error: tErr } = await supabase.from('tasks').insert({
          objective_id: objRow.id,
          title: t.title,
          xp_reward: t.xp_reward,
          frequency_days: t.frequency_days ?? 1,
          is_optional: t.is_optional ?? false,
          order_index: j,
        });
        if (tErr) console.error(`    ✗ Task "${t.title}" failed:`, tErr);
        else taskCount++;
      }
    }
    console.log(`  ✓ ${q.type === 'main' ? '⚔️ ' : '🧭'} ${q.title} (${q.objectives.length} obj, ${q.objectives.reduce((s, o) => s + o.tasks.length, 0)} tâches)`);
  }

  // Trophies (idempotent via upsert)
  let trophyCount = 0;
  for (const t of TROPHIES) {
    const { error } = await supabase.from('trophies').upsert(
      {
        code: t.code,
        title: t.title,
        description: t.description,
        rarity: t.rarity,
        xp_reward: t.xp_reward,
        icon: 'trophy',
      },
      { onConflict: 'code' },
    );
    if (error) console.error(`Trophy "${t.code}" failed:`, error);
    else trophyCount++;
  }
  console.log(`  🏆 ${trophyCount}/${TROPHIES.length} trophies upserted`);

  console.log(`\n✅ Seed complete : ${questCount} quêtes, ${objCount} objectifs, ${taskCount} tâches, ${trophyCount} trophées.`);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
