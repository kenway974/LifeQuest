-- =============================================================
-- Streak freezes (Duolingo-style "jokers")
--
-- The user can miss up to N days without breaking their streak, as long as
-- they have freezes available. Each gap of 1 missed day consumes 1 freeze.
--
-- Refill: 1 freeze every 14 days, capped at 2. Computed lazily — we just
-- track when the last refill happened and how many freezes are currently
-- "spent" on the active streak.
-- =============================================================

alter table public.profiles
  add column if not exists streak_freezes_available integer not null default 2
    check (streak_freezes_available between 0 and 2),
  add column if not exists streak_freezes_refilled_at timestamptz not null default now();
