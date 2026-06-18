-- ============================================================
-- 0010_free_custom_quests.sql
-- Custom quests are now FREE for every player.
--
-- This removes all payment / paid-feature plumbing:
--   1. Relax the "create custom quests" RLS policy so it no longer
--      requires the has_custom_quests entitlement flag.
--   2. Drop the purchases table (Stripe one-time purchases).
--   3. Drop the profiles.has_custom_quests column.
--
-- Order matters: the policy referencing has_custom_quests must be
-- recreated before the column can be dropped.
-- ============================================================

-- 1. Allow any authenticated user to create their own custom quests
drop policy if exists "Users can create custom quests" on public.quests;

create policy "Users can create custom quests" on public.quests
  for insert with check (
    type = 'custom'
    and created_by = auth.uid()
  );

-- 2. Remove the Stripe purchases table
drop table if exists public.purchases;

-- 3. Remove the entitlement flag — no longer used
alter table public.profiles drop column if exists has_custom_quests;
