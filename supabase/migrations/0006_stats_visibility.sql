-- =============================================================
-- Public character stats opt-in
--
-- - stats_public : whether the user lets other players view their character sheet
-- - cached_stats : snapshot of the user's computed stats, refreshed when they
--   open /game/character. Used because user_quests/user_tasks are RLS-locked
--   to their owner — visitors can't recompute on the fly.
-- - cached_stats_at : when the cache was refreshed (shown to visitors as "à jour il y a Xj")
-- =============================================================

alter table public.profiles
  add column if not exists stats_public boolean not null default false,
  add column if not exists cached_stats jsonb not null default '{}'::jsonb,
  add column if not exists cached_stats_at timestamptz;
