-- Ejecuta este archivo en Supabase > SQL Editor.
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  description text,
  video_url text not null,
  cover_url text,
  featured boolean not null default false,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

-- La web pública solo puede ver proyectos publicados.
create policy "Public can read published projects"
on public.projects for select
using (published = true);

-- Usuarios autenticados pueden gestionar proyectos desde el panel.
create policy "Authenticated users can insert projects"
on public.projects for insert to authenticated
with check (true);

create policy "Authenticated users can update projects"
on public.projects for update to authenticated
using (true) with check (true);

create policy "Authenticated users can delete projects"
on public.projects for delete to authenticated
using (true);

-- Bucket público para videos y portadas del portafolio.
insert into storage.buckets (id, name, public, file_size_limit)
values ('portfolio', 'portfolio', true, 524288000)
on conflict (id) do nothing;

create policy "Public can view portfolio files"
on storage.objects for select
using (bucket_id = 'portfolio');

create policy "Authenticated users can upload portfolio files"
on storage.objects for insert to authenticated
with check (bucket_id = 'portfolio');

create policy "Authenticated users can update portfolio files"
on storage.objects for update to authenticated
using (bucket_id = 'portfolio') with check (bucket_id = 'portfolio');

create policy "Authenticated users can delete portfolio files"
on storage.objects for delete to authenticated
using (bucket_id = 'portfolio');
