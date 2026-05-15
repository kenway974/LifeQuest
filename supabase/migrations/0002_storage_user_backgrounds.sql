-- =============================================================
-- Storage bucket `user-backgrounds`
-- Each user can upload / replace / delete files in their own
-- subfolder (named after their auth user id). Reads are public
-- so the rendered <img>/<video> tags can fetch without auth.
-- =============================================================

-- Create the bucket (idempotent — safe to re-run).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'user-backgrounds',
  'user-backgrounds',
  true,
  10485760, -- 10 MB
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Public read.
drop policy if exists "user-backgrounds: public read" on storage.objects;
create policy "user-backgrounds: public read"
on storage.objects for select
using (bucket_id = 'user-backgrounds');

-- Authenticated users can write only into a folder named after their auth uid.
drop policy if exists "user-backgrounds: owner insert" on storage.objects;
create policy "user-backgrounds: owner insert"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'user-backgrounds'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "user-backgrounds: owner update" on storage.objects;
create policy "user-backgrounds: owner update"
on storage.objects for update
to authenticated
using (
  bucket_id = 'user-backgrounds'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "user-backgrounds: owner delete" on storage.objects;
create policy "user-backgrounds: owner delete"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'user-backgrounds'
  and (storage.foldername(name))[1] = auth.uid()::text
);
