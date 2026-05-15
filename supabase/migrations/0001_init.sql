-- ============================================================
-- LifeQuest — Supabase Schema
-- Run this in the Supabase SQL editor, or via `supabase db push`
-- ============================================================
--
-- Architecture:
-- - profiles      : extended user data linked to auth.users
-- - quests        : quest templates (main, secondary, custom)
-- - objectives    : sub-goals within a quest
-- - tasks         : concrete actions within an objective
-- - user_quests   : a user's active/completed instance of a quest
-- - user_tasks    : a user's daily task completions (for XP, stats)
-- - trophies      : trophy definitions
-- - user_trophies : trophies a user has unlocked
-- - push_subscriptions : web push endpoints per user
-- - user_settings : preferences (notifications, custom background)
-- - purchases     : Stripe one-time purchases (e.g. custom quests unlock)
--
-- All tables use Row Level Security so each user only sees their own data.
-- ============================================================

-- ----------------------------
-- 1. PROFILES
-- ----------------------------
-- Extends auth.users with display data + gamification stats.
create table public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  pseudo       text unique not null check (char_length(pseudo) between 3 and 24),
  avatar_url   text,
  level        integer not null default 1,
  xp           integer not null default 0,
  has_custom_quests boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index profiles_pseudo_idx on public.profiles using gin (pseudo gin_trgm_ops);

-- Enable trigram extension for pseudo search
create extension if not exists pg_trgm;

-- ----------------------------
-- 2. QUESTS (templates)
-- ----------------------------
-- These are quest TEMPLATES. A user picks one and it becomes a user_quest.
create type quest_type as enum ('main', 'secondary', 'custom');
create type difficulty as enum ('easy', 'medium', 'hard', 'expert', 'legendary');

create table public.quests (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  description  text not null,
  type         quest_type not null,
  difficulty   difficulty not null default 'medium',
  duration_days integer not null default 30 check (duration_days between 1 and 365),
  xp_reward    integer not null default 100,
  icon         text,
  -- For custom quests: the user that created it; null for catalog quests.
  created_by   uuid references public.profiles(id) on delete cascade,
  is_published boolean not null default true,
  created_at   timestamptz not null default now()
);

create index quests_type_idx on public.quests(type);
create index quests_created_by_idx on public.quests(created_by);

-- ----------------------------
-- 3. OBJECTIVES (sub-goals)
-- ----------------------------
create table public.objectives (
  id           uuid primary key default gen_random_uuid(),
  quest_id     uuid not null references public.quests(id) on delete cascade,
  title        text not null,
  description  text,
  order_index  integer not null default 0,
  xp_reward    integer not null default 50,
  created_at   timestamptz not null default now()
);

create index objectives_quest_idx on public.objectives(quest_id, order_index);

-- ----------------------------
-- 4. TASKS (concrete daily actions)
-- ----------------------------
create table public.tasks (
  id           uuid primary key default gen_random_uuid(),
  objective_id uuid not null references public.objectives(id) on delete cascade,
  title        text not null,
  description  text,
  xp_reward    integer not null default 10,
  is_recurring boolean not null default true,
  order_index  integer not null default 0,
  created_at   timestamptz not null default now()
);

create index tasks_objective_idx on public.tasks(objective_id, order_index);

-- ----------------------------
-- 5. USER_QUESTS (user's quest instance)
-- ----------------------------
create type quest_status as enum ('active', 'completed', 'abandoned');

create table public.user_quests (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references public.profiles(id) on delete cascade,
  quest_id     uuid not null references public.quests(id) on delete cascade,
  status       quest_status not null default 'active',
  started_at   timestamptz not null default now(),
  completed_at timestamptz,
  progress_pct integer not null default 0 check (progress_pct between 0 and 100)
);

create index user_quests_user_idx on public.user_quests(user_id, status);

-- A user can only have one active instance of a given quest at a time.
create unique index user_quests_active_unique
  on public.user_quests(user_id, quest_id)
  where status = 'active';

-- ----------------------------
-- 6. USER_TASKS (daily task completion log)
-- ----------------------------
create table public.user_tasks (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references public.profiles(id) on delete cascade,
  task_id       uuid not null references public.tasks(id) on delete cascade,
  user_quest_id uuid not null references public.user_quests(id) on delete cascade,
  completed_at  timestamptz not null default now(),
  -- One completion per task per day (for recurring tasks)
  completed_date date not null default current_date
);

create index user_tasks_user_date_idx on public.user_tasks(user_id, completed_date desc);
create unique index user_tasks_daily_unique on public.user_tasks(user_id, task_id, completed_date);

-- ----------------------------
-- 7. TROPHIES
-- ----------------------------
create table public.trophies (
  id           uuid primary key default gen_random_uuid(),
  code         text unique not null,            -- stable code for unlock logic
  title        text not null,
  description  text not null,
  icon         text not null default 'trophy',
  rarity       difficulty not null default 'medium',
  xp_reward    integer not null default 50,
  created_at   timestamptz not null default now()
);

-- ----------------------------
-- 8. USER_TROPHIES (unlocks)
-- ----------------------------
create table public.user_trophies (
  user_id     uuid not null references public.profiles(id) on delete cascade,
  trophy_id   uuid not null references public.trophies(id) on delete cascade,
  unlocked_at timestamptz not null default now(),
  primary key (user_id, trophy_id)
);

create index user_trophies_user_idx on public.user_trophies(user_id);

-- ----------------------------
-- 9. PUSH SUBSCRIPTIONS
-- ----------------------------
create table public.push_subscriptions (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references public.profiles(id) on delete cascade,
  endpoint   text not null unique,
  p256dh_key text not null,
  auth_key   text not null,
  created_at timestamptz not null default now()
);

create index push_subscriptions_user_idx on public.push_subscriptions(user_id);

-- ----------------------------
-- 10. USER SETTINGS
-- ----------------------------
create table public.user_settings (
  user_id              uuid primary key references public.profiles(id) on delete cascade,
  notifications_enabled boolean not null default true,
  notification_hour    integer not null default 9 check (notification_hour between 0 and 23),
  background_url       text,
  background_type      text check (background_type in ('image', 'gif', 'video')),
  theme                text not null default 'cyber-neon',
  updated_at           timestamptz not null default now()
);

-- ----------------------------
-- 11. PURCHASES (Stripe)
-- ----------------------------
create table public.purchases (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references public.profiles(id) on delete cascade,
  product             text not null,  -- e.g. 'custom_quests_unlock'
  stripe_session_id   text unique not null,
  stripe_payment_intent text,
  amount_cents        integer not null,
  currency            text not null default 'eur',
  status              text not null,
  created_at          timestamptz not null default now()
);

create index purchases_user_idx on public.purchases(user_id);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- Each user can only see and modify their own data.
-- Public read for: quest catalog, objectives, tasks (templates), trophies
-- ============================================================

alter table public.profiles enable row level security;
alter table public.quests enable row level security;
alter table public.objectives enable row level security;
alter table public.tasks enable row level security;
alter table public.user_quests enable row level security;
alter table public.user_tasks enable row level security;
alter table public.trophies enable row level security;
alter table public.user_trophies enable row level security;
alter table public.push_subscriptions enable row level security;
alter table public.user_settings enable row level security;
alter table public.purchases enable row level security;

-- PROFILES: public read (for pseudo search), only self can update
create policy "Profiles are publicly readable" on public.profiles
  for select using (true);

create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- QUESTS: all published catalog quests readable + own custom quests
create policy "Catalog quests are readable" on public.quests
  for select using (is_published = true or created_by = auth.uid());

create policy "Users can create custom quests" on public.quests
  for insert with check (
    type = 'custom'
    and created_by = auth.uid()
    and exists (select 1 from public.profiles where id = auth.uid() and has_custom_quests = true)
  );

create policy "Users can update own custom quests" on public.quests
  for update using (created_by = auth.uid());

create policy "Users can delete own custom quests" on public.quests
  for delete using (created_by = auth.uid());

-- OBJECTIVES & TASKS: readable if parent quest is readable, writable if user owns the custom quest
create policy "Objectives readable via parent quest" on public.objectives
  for select using (
    exists (
      select 1 from public.quests q
      where q.id = quest_id
      and (q.is_published = true or q.created_by = auth.uid())
    )
  );

create policy "Users manage objectives of own quests" on public.objectives
  for all using (
    exists (select 1 from public.quests q where q.id = quest_id and q.created_by = auth.uid())
  );

create policy "Tasks readable via parent objective" on public.tasks
  for select using (
    exists (
      select 1 from public.objectives o
      join public.quests q on q.id = o.quest_id
      where o.id = objective_id
      and (q.is_published = true or q.created_by = auth.uid())
    )
  );

create policy "Users manage tasks of own quests" on public.tasks
  for all using (
    exists (
      select 1 from public.objectives o
      join public.quests q on q.id = o.quest_id
      where o.id = objective_id and q.created_by = auth.uid()
    )
  );

-- USER_QUESTS: only own
create policy "Users see own quest instances" on public.user_quests
  for all using (user_id = auth.uid());

-- USER_TASKS: only own
create policy "Users see own task completions" on public.user_tasks
  for all using (user_id = auth.uid());

-- TROPHIES: public read (catalog)
create policy "Trophies are publicly readable" on public.trophies
  for select using (true);

-- USER_TROPHIES: own + public read for profile stats
create policy "User trophies are publicly readable" on public.user_trophies
  for select using (true);

create policy "Users manage own trophies" on public.user_trophies
  for insert with check (user_id = auth.uid());

-- PUSH SUBSCRIPTIONS: only own
create policy "Users manage own push subs" on public.push_subscriptions
  for all using (user_id = auth.uid());

-- USER SETTINGS: only own
create policy "Users manage own settings" on public.user_settings
  for all using (user_id = auth.uid());

-- PURCHASES: only own (insert is done server-side with service role)
create policy "Users see own purchases" on public.purchases
  for select using (user_id = auth.uid());

-- ============================================================
-- TRIGGERS
-- Auto-create profile + settings when a user signs up via auth.users
-- ============================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  fallback_pseudo text;
begin
  -- Generate a unique fallback pseudo if none provided
  fallback_pseudo := coalesce(
    new.raw_user_meta_data->>'pseudo',
    'Player' || substr(replace(new.id::text, '-', ''), 1, 8)
  );

  insert into public.profiles (id, pseudo)
  values (new.id, fallback_pseudo)
  on conflict (id) do nothing;

  insert into public.user_settings (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- HELPER FUNCTION: compute level from XP
-- Formula: each level requires `level * 100` XP (cumulative)
-- ============================================================
create or replace function public.compute_level(xp_amount integer)
returns integer
language sql
immutable
as $$
  select greatest(1, floor((-1 + sqrt(1 + 8 * xp_amount / 100.0)) / 2)::integer + 1);
$$;
