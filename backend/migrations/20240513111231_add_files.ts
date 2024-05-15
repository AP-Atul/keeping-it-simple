import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  const query = `
    create schema if not exists storage;
    create table storage.files (
      created_at timestamptz default now(),
      id uuid primary key default gen_random_uuid(),
      name text,
      bucket text,
      metadata jsonb
    );
  `
  return knex.schema.raw(query)
}

export async function down(knex: Knex): Promise<void> {
  const query = `
    drop table if exists storage.files;
    drop schema if exists storage cascade;
  `
  return knex.schema.raw(query)
}
