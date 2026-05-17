-- =============================================================
-- Daily objective completion log
--
-- One row per (user, objective, day) when the user finishes every task that
-- was DUE that day (mandatory + optional). Used as an idempotency lock for
-- the "journée parfaite" XP bonus so it can only be awarded once per day.
-- =============================================================

create table if not exists public.objective_daily_completions (
  user_id        uuid not null references public.profiles(id) on delete cascade,
  objective_id   uuid not null references public.objectives(id) on delete cascade,
  user_quest_id  uuid not null references public.user_quests(id) on delete cascade,
  completed_date date not null default current_date,
  xp_awarded     integer not null default 0,
  primary key (user_id, objective_id, completed_date)
);

create index if not exists odc_user_date_idx
  on public.objective_daily_completions(user_id, completed_date desc);

alter table public.objective_daily_completions enable row level security;

create policy "Users see own daily completions" on public.objective_daily_completions
  for all using (user_id = auth.uid());
