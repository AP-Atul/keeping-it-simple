import { faker } from '@faker-js/faker'
import * as hapi from '@hapi/hapi'
import { mergeLeft } from 'ramda'
import knex from '../src/db/db'
import { init } from '../src/server'
import * as tutorRepo from '../src/tutors/repo'
import { SaveTutor, Tutor, TutorPricing } from '../src/tutors/types'

export type TestServerEnvironment = {
  server: hapi.Server
  resetDB: () => Promise<void>
}

type MakeKeysOptional<T> = {
  [K in keyof T]?: T[K]
}

let testEnv: TestServerEnvironment | undefined = undefined

const resetDB = async () => {
  const query = `
    delete from auth.refresh_tokens where true;
    delete from auth.sessions where true;
    delete from auth.users where true;
    delete from public.tutors where true;
  `
  return knex.schema.raw(query)
}

export const getTestEnv = async (): Promise<TestServerEnvironment> => {
  if (testEnv != undefined) return testEnv
  const server = await init()
  await knex.migrate.rollback()
  await knex.migrate.latest()
  testEnv = {
    server,
    resetDB: resetDB
  }
  return testEnv
}

export const createSampleTutor = async (
  entity?: MakeKeysOptional<Tutor>
): Promise<Tutor> => {
  const sample: SaveTutor = {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    atar: faker.number.int({ min: 0, max: 100 }),
    available: true,
    bio: faker.lorem.sentence(),
    postcode: faker.location.zipCode(),
    price: faker.helpers.arrayElement<TutorPricing>(['executive', 'gold', 'premium']),
    school: faker.helpers.arrayElement<string>([
      'Primary School',
      'Cambridge',
      'Melbourne Uni',
      'Harvard',
      'Pune Uni',
      'NASA Internation',
      'Indian Institue'
    ])
  }
  if (entity) {
    const updated = mergeLeft(entity, sample)
    console.log('updated', updated)
    return (await tutorRepo.save(updated)) as Tutor
  }
  return (await tutorRepo.save(sample)) as Tutor
}
