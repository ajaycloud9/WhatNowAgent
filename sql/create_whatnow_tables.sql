create table if not exists public.projects (
  id serial primary key,
  name text unique not null,
  description text,
  sprint text,
  days_left int,
  status text,
  created_at timestamp with time zone default now()
);

create table if not exists public.ideas (
  id serial primary key,
  project_id int references public.projects(id) on delete cascade,
  idea_id int,
  idea text,
  status text,
  tags text[],
  emotion text,
  difficulty text,
  last_update date,
  unique (project_id, idea_id)
);
