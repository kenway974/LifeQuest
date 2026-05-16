-- =============================================================
-- Task frequency
-- - frequency_days : 1 = quotidien, 2 = tous les 2 jours, 7 = hebdo, etc.
-- The legacy `is_recurring` boolean is kept for backward compat but
-- no longer used by app logic (frequency_days >= 1 implies recurring).
-- =============================================================

alter table public.tasks
  add column if not exists frequency_days integer not null default 1
    check (frequency_days between 1 and 365);

-- Migrate any existing one-shot tasks (is_recurring = false) to a
-- frequency that covers the whole quest duration (so they appear once).
-- We use 365 as a sentinel "once" frequency.
update public.tasks
   set frequency_days = 365
 where is_recurring = false and frequency_days = 1;
