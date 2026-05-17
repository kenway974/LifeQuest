-- =============================================================
-- Optional tasks + stars
--
-- - tasks.is_optional : bonus tasks that bring extra XP/points but are NOT
--   required to mark the parent objective as "Accompli". Doing them all
--   (mandatory + optional, zero misses) makes the objective "Maîtrisé".
--
-- - profiles.stars : counter incremented when a quest is finished perfectly
--   (every task — mandatory and optional — fully completed, no missed
--   occurrences).
-- =============================================================

alter table public.tasks
  add column if not exists is_optional boolean not null default false;

alter table public.profiles
  add column if not exists stars integer not null default 0
    check (stars >= 0);
