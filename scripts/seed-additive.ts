/**
 * LifeQuest — Additive seed script (NON-DESTRUCTIVE).
 *
 * Reads the same catalog data as `seed.ts` and inserts ONLY what's missing.
 * Existing quests / objectives / tasks / trophies are left untouched (their
 * IDs stay stable, so user progression is preserved).
 *
 * Run with: npm run db:seed:add
 *
 * Matching strategy:
 *   - Catalog quests: matched by title where created_by IS NULL
 *   - Objectives:     matched by (quest_id, title)
 *   - Tasks:          matched by (objective_id, title)
 *   - Trophies:       matched by code (UPSERT — refreshes label/desc/xp)
 *
 * NOTE: if you RENAME a quest / objective / task in catalog-data, the script
 * will see it as a new entry and create a duplicate. To rename, edit DB
 * manually or use the destructive seed.
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

interface Counts {
  questsAdded: number;
  questsExisting: number;
  objectivesAdded: number;
  objectivesExisting: number;
  tasksAdded: number;
  tasksExisting: number;
  trophiesUpserted: number;
}

async function seedAdditive() {
  console.log('🌱 Additive seed — only inserts missing data, preserves progression.\n');
  const counts: Counts = {
    questsAdded: 0,
    questsExisting: 0,
    objectivesAdded: 0,
    objectivesExisting: 0,
    tasksAdded: 0,
    tasksExisting: 0,
    trophiesUpserted: 0,
  };

  for (const q of [...MAIN_QUESTS, ...SECONDARY_QUESTS]) {
    // 1. Find or create the quest (catalog scope only: created_by IS NULL)
    let { data: existingQuest } = await supabase
      .from('quests')
      .select('id')
      .eq('title', q.title)
      .is('created_by', null)
      .maybeSingle();

    let questId: string;
    if (existingQuest) {
      questId = existingQuest.id;
      counts.questsExisting++;
    } else {
      const { data: inserted, error } = await supabase
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
      if (error || !inserted) {
        console.error(`  ✗ Failed to insert quest "${q.title}":`, error);
        continue;
      }
      questId = inserted.id;
      counts.questsAdded++;
      console.log(`  ➕ Nouvelle quête : ${q.type === 'main' ? '⚔️ ' : '🧭'} ${q.title}`);
    }

    // 2. Pre-fetch existing objectives for this quest (by title)
    const { data: existingObjectives } = await supabase
      .from('objectives')
      .select('id, title')
      .eq('quest_id', questId);
    const objByTitle = new Map(
      (existingObjectives ?? []).map((o) => [o.title, o.id] as const),
    );

    for (let i = 0; i < q.objectives.length; i++) {
      const obj = q.objectives[i];
      let objId = objByTitle.get(obj.title);

      if (objId) {
        counts.objectivesExisting++;
      } else {
        const { data: insertedObj, error } = await supabase
          .from('objectives')
          .insert({
            quest_id: questId,
            title: obj.title,
            description: obj.description,
            xp_reward: obj.xp_reward,
            order_index: i,
          })
          .select('id')
          .single();
        if (error || !insertedObj) {
          console.error(`    ✗ Failed to insert objective "${obj.title}":`, error);
          continue;
        }
        objId = insertedObj.id;
        counts.objectivesAdded++;
        console.log(`    ➕ Nouvel objectif sur "${q.title}" : ${obj.title}`);
      }

      // 3. Pre-fetch existing tasks for this objective (by title)
      const { data: existingTasks } = await supabase
        .from('tasks')
        .select('id, title')
        .eq('objective_id', objId);
      const taskTitles = new Set((existingTasks ?? []).map((t) => t.title));

      for (let j = 0; j < obj.tasks.length; j++) {
        const t = obj.tasks[j];
        if (taskTitles.has(t.title)) {
          counts.tasksExisting++;
          continue;
        }
        const { error } = await supabase.from('tasks').insert({
          objective_id: objId,
          title: t.title,
          xp_reward: t.xp_reward,
          frequency_days: t.frequency_days ?? 1,
          is_optional: t.is_optional ?? false,
          order_index: (existingTasks?.length ?? 0) + j,
        });
        if (error) {
          console.error(`      ✗ Task "${t.title}" failed:`, error);
        } else {
          counts.tasksAdded++;
          console.log(`      ➕ Nouvelle tâche sur "${obj.title}" : ${t.title}${t.is_optional ? ' (bonus)' : ''}`);
        }
      }
    }
  }

  // 4. Trophies — upsert on code (refreshes title/desc/xp; existing user_trophies preserved)
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
    else counts.trophiesUpserted++;
  }

  console.log('\n✅ Additive seed terminé');
  console.log(`   Quêtes      : ${counts.questsAdded} ajoutée${counts.questsAdded > 1 ? 's' : ''} · ${counts.questsExisting} existante${counts.questsExisting > 1 ? 's' : ''}`);
  console.log(`   Objectifs   : ${counts.objectivesAdded} ajouté${counts.objectivesAdded > 1 ? 's' : ''} · ${counts.objectivesExisting} existant${counts.objectivesExisting > 1 ? 's' : ''}`);
  console.log(`   Tâches      : ${counts.tasksAdded} ajoutée${counts.tasksAdded > 1 ? 's' : ''} · ${counts.tasksExisting} existante${counts.tasksExisting > 1 ? 's' : ''}`);
  console.log(`   Trophées    : ${counts.trophiesUpserted} upsertés (titre/desc/xp rafraîchis)`);
}

seedAdditive().catch((err) => {
  console.error('Additive seed failed:', err);
  process.exit(1);
});
