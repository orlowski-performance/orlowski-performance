-- Kontaktanfragen von der Website.
--
-- Schreiben darf jeder (das Formular laeuft mit dem anon key), lesen niemand
-- ohne Anmeldung. Deshalb: eine INSERT-Policy fuer anon, keine SELECT-Policy.
-- Der Service-Role-Key umgeht RLS ohnehin und bleibt dem Backoffice vorbehalten.

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(name) between 1 and 120),
  email       text not null check (char_length(email) between 3 and 254),
  message     text not null check (char_length(message) between 1 and 4000),
  source      text not null default 'website',
  handled_at  timestamptz
);

comment on table public.leads is 'Kontaktanfragen aus dem Formular auf orlowski-performance.com';

create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- Offene Anfragen zuerst - das ist die Abfrage, die im Alltag zaehlt.
create index if not exists leads_open_idx on public.leads (created_at desc)
  where handled_at is null;

alter table public.leads enable row level security;

drop policy if exists "leads_insert_anon" on public.leads;
create policy "leads_insert_anon"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "leads_select_authenticated" on public.leads;
create policy "leads_select_authenticated"
  on public.leads
  for select
  to authenticated
  using (true);
