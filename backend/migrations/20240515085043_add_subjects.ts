import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  const query = `
    create type available_curriculums as enum ('VCE', 'WACE', 'HSC', 'QCE' , 'IB');

    create table public.subjects (
        created_at timestamptz default now(),
        updated_at timestamptz default now(),
        id uuid primary key default gen_random_uuid(),
        
        name text,
        description text,
        curriculum available_curriculums not null
    );

    create trigger subjects_updated
    before insert or update on public.subjects
    for each row execute procedure update_updated_at();
  `
  return knex.schema.raw(query)
}

export async function down(knex: Knex): Promise<void> {
  const query = `
    drop table if exists public.subjects cascade;
    drop type available_curriculums;
  `
  return knex.schema.raw(query)
}
