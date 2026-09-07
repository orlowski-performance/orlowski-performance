-- Anmeldebereich: Rollen und daran gebundene Leserechte.
--
-- Ausgangslage: Die erste Migration erlaubte jedem angemeldeten Nutzer, alle
-- Kontaktanfragen zu lesen. Solange es nur ein Konto gibt, faellt das nicht auf.
-- Sobald aber Kundinnen einen eigenen Zugang bekommen, waere jede fremde
-- Anfrage fuer sie sichtbar. Deshalb wird das Leserecht jetzt an eine Rolle
-- gebunden, bevor der erste Zugang vergeben wird.

create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  created_at  timestamptz not null default now(),
  full_name   text,
  role        text not null default 'client' check (role in ('staff', 'client'))
);

comment on table public.profiles is 'Zusatzangaben je Konto. Die Rolle entscheidet ueber Leserechte.';

alter table public.profiles enable row level security;

-- Jeder sieht ausschliesslich das eigene Profil.
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select to authenticated
  using (id = (select auth.uid()));

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()) and role = (select role from public.profiles where id = (select auth.uid())));

-- Neue Konten bekommen automatisch ein Profil. Ohne das haette ein frisch
-- angelegter Zugang gar keine Rolle und liefe ins Leere.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Rollenpruefung als SECURITY DEFINER: Wuerde die Policy direkt auf profiles
-- lesen, pruefte Postgres dabei erneut die Policies von profiles - eine
-- Rekursion, die den Zugriff blockiert.
create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'staff'
  );
$$;

revoke execute on function public.is_staff() from public;
grant execute on function public.is_staff() to authenticated;

-- Kontaktanfragen: lesen und abhaken nur noch fuer die Rolle staff.
drop policy if exists "leads_select_authenticated" on public.leads;

drop policy if exists "leads_select_staff" on public.leads;
create policy "leads_select_staff"
  on public.leads for select to authenticated
  using (public.is_staff());

drop policy if exists "leads_update_staff" on public.leads;
create policy "leads_update_staff"
  on public.leads for update to authenticated
  using (public.is_staff())
  with check (public.is_staff());
