-- =============================================================
-- Adaptive theming on user_settings
-- - background_blur_px : how strongly the background is blurred (0..64)
-- - adaptive_theme_enabled : opt-in to recolor the UI from the image
-- - accent_color : extracted dominant color (#RRGGBB), filled by client
-- =============================================================

alter table public.user_settings
  add column if not exists background_blur_px integer not null default 16
    check (background_blur_px between 0 and 64),
  add column if not exists adaptive_theme_enabled boolean not null default false,
  add column if not exists accent_color text
    check (accent_color is null or accent_color ~ '^#[0-9a-fA-F]{6}$');
