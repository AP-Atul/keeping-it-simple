import slugify from 'slugify'
import db, { tables } from '../db/db'
import { SaveTutor, Tutor } from './types'

export const save = async (tutor: SaveTutor, knex = db): Promise<Tutor | undefined> => {
  // can be made optional; but good for now
  const picture = `https://placehold.co/600x400?text=${
    tutor.first_name[0].toUpperCase() + tutor.last_name[0].toUpperCase()
  }`
  // can make this unique, with postgres function and sequence; overkill for now
  const slug = slugify([tutor.first_name, tutor.last_name].join(' '), {
    replacement: '-',
    lower: true,
    strict: true
  })
  return await knex<Tutor>(tables.tutors)
    .insert({ ...tutor, slug, profile_picture: picture })
    .returning('*')
    .then((rows) => rows[0])
}
