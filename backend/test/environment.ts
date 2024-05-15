import * as hapi from '@hapi/hapi'
import knex from '../src/db/db'
import { MockStorageService } from '../src/integrations/storage/mock_storage_service'
import { init } from '../src/server'

export type TestServerEnvironment = {
  server: hapi.Server
  resetDB: () => Promise<void>
}

let testEnv: TestServerEnvironment | undefined = undefined

const resetDB = async () => {
  const query = `
    delete from auth.refresh_tokens where true;
    delete from auth.sessions where true;
    delete from auth.users where true;
  `
  return knex.schema.raw(query)
}

export const getTestEnv = async (): Promise<TestServerEnvironment> => {
  if (testEnv != undefined) return testEnv
  const storage = new MockStorageService()
  const server = await init(storage)
  await knex.migrate.rollback()
  await knex.migrate.latest()
  testEnv = {
    server,
    resetDB: resetDB
  }
  return testEnv
}
