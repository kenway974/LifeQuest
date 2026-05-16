-- =============================================================
-- Character stats (RPG-style attribute sheet)
--
-- On profiles:
--   - stats_initialized : whether the user has filled the baseline questionnaire
--   - baseline_stats    : the self-assessment frozen at initialization (0-100 per stat)
--
-- On objectives:
--   - stat_impacts : map of stat_key → points awarded when the objective is fully
--     completed. Each missed occurrence on a child task decrements ceil(value/4).
--     Custom objectives default to {} until the user tags them in the editor.
-- =============================================================

alter table public.profiles
  add column if not exists stats_initialized boolean not null default false,
  add column if not exists baseline_stats jsonb not null default '{}'::jsonb;

alter table public.objectives
  add column if not exists stat_impacts jsonb not null default '{}'::jsonb;
