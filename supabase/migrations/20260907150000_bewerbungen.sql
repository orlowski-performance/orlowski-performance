-- Bewerbungen aus dem Fragebogen.
--
-- Ersetzt das externe Google-Formular der bisherigen Seite: Die Analyse hatte
-- den Bruch benannt, dass der Bewerbungsweg auf eine fremde Adresse fuehrt.
-- Rechte wie bei leads - schreiben darf jeder Besucher, lesen nur die Rolle
-- staff.

create table if not exists public.applications (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),

  name          text not null check (char_length(name) between 1 and 120),
  email         text not null check (char_length(email) between 3 and 254),
  phone         text check (char_length(phone) <= 40),

  -- Ausgangslage
  goal          text not null check (char_length(goal) between 1 and 2000),
  situation     text check (char_length(situation) <= 2000),
  constraints   text check (char_length(constraints) <= 2000),
  availability  text check (char_length(availability) <= 200),

  -- Rahmen
  package       text check (package in ('3-monate', '6-monate', 'unentschieden')),
  start_window  text check (start_window in ('sofort', 'innerhalb-1-monat', 'spaeter')),
  message       text check (char_length(message) <= 4000),

  source        text not null default 'website',
  handled_at    timestamptz
);

comment on table public.applications is 'Bewerbungen aus dem Fragebogen auf orlowski-performance.com';

create index if not exists applications_created_at_idx on public.applications (created_at desc);
create index if not exists applications_open_idx on public.applications (created_at desc)
  where handled_at is null;

alter table public.applications enable row level security;

drop policy if exists "applications_insert_anon" on public.applications;
create policy "applications_insert_anon"
  on public.applications for insert to anon, authenticated
  with check (true);

drop policy if exists "applications_select_staff" on public.applications;
create policy "applications_select_staff"
  on public.applications for select to authenticated
  using (public.is_staff());

drop policy if exists "applications_update_staff" on public.applications;
create policy "applications_update_staff"
  on public.applications for update to authenticated
  using (public.is_staff())
  with check (public.is_staff());
