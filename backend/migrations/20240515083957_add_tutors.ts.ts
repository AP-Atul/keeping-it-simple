import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  const query = `
    create type tutor_prices as enum ('gold', 'premium', 'executive');

    create table public.tutors (
        created_at timestamptz default now(),
        updated_at timestamptz default now(),
        id uuid primary key default gen_random_uuid(),
        
        first_name text,
        last_name text,
        slug text,
        price tutor_prices default 'gold',
        school text,
        atar bigint not null check ( atar between 0 and 100 ),
        bio text,
        profile_picture text,
        available boolean default false,
        postcode text,
        metadata jsonb
    );

    create trigger tutors_updated
    before insert or update on public.tutors
    for each row execute procedure update_updated_at();
  `
  return knex.schema.raw(query)
}

export async function down(knex: Knex): Promise<void> {
  const query = `
    drop table if exists public.tutors cascade;
    drop type tutor_prices;
  `
  return knex.schema.raw(query)
}
