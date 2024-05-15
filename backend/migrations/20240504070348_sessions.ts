import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  const query = `
    create schema if not exists auth;
    
    create table auth.users (
        created_at timestamptz default now(),
        updated_at timestamptz default now(),
        id uuid primary key default gen_random_uuid(),
        
        roles text default 'anon students',
        first_name text,
        last_name text,
        email text unique,
        phone_number text,
        password text,
        email_verified boolean default false,
        active boolean default true, 
        metadata jsonb
    );

    create table auth.sessions (
      id uuid primary key default gen_random_uuid(),
      created_at timestamptz default now(),
      last_used_at timestamptz default now(),
      user_id uuid references auth.users(id) on delete set null
    );

    create table auth.refresh_tokens (
      id uuid primary key default gen_random_uuid(),
      created_at timestamptz default now(),
      session_id uuid references auth.sessions(id) on delete set null,
      user_id uuid references auth.users(id) on delete set null,
      revoked boolean default false,
      expiry timestamptz default now()
    );
    
    create or replace
    function public.update_updated_at()
    returns trigger as
    $$      
    begin
      new.updated_at = now();
    return new;
    end;
    $$
    language 'plpgsql';
    
    create trigger users_updated
    before insert or update on auth.users
    for each row execute procedure update_updated_at();
  `
  return knex.schema.raw(query)
}

export async function down(knex: Knex): Promise<void> {
  const query = `
    drop table if exists auth.refresh_tokens;
    drop table if exists auth.sessions;
    drop table if exists auth.users cascade;
    drop schema if exists auth cascade;
  `
  return knex.schema.raw(query)
}
