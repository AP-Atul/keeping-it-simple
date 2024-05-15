import db, { tables } from '../db/db'
import { SaveSubject, Subject } from './types'

export const save = async (
  subject: SaveSubject,
  knex = db
): Promise<Subject | undefined> => {
  return await knex<Subject>(tables.subjects)
    .insert(subject)
    .returning('*')
    .then((rows) => rows[0])
}
