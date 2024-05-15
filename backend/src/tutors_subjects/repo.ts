import db, { tables } from '../db/db'
import { TutorSubject } from './types'

export const save = async (entity: TutorSubject[]): Promise<TutorSubject[]> => {
  return await db<TutorSubject>(tables.tutorsSubjects).insert(entity).returning('*')
}
