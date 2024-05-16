import slugify from 'slugify'
import db, { tables } from '../db/db'
import { SaveTutor, SearchTutor, Tutor, TutorSortOrder } from './types'

const tutorOrderSequence = (order: TutorSortOrder): [string, 'asc' | 'desc'] => {
  switch (order) {
    case TutorSortOrder.created_asc:
      return ['created_at', 'asc']
    case TutorSortOrder.created_desc:
      return ['created_at', 'desc']
    case TutorSortOrder.atar_asc:
      return ['atar', 'asc']
    case TutorSortOrder.atar_desc:
      return ['atar', 'desc']
  }
}

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

export const search = async (options: SearchTutor) => {
  // joining tutors <> subjects <> tutors_subjects
  const query = db
    .select(`${tables.tutors}.*`, db.raw(`jsonb_agg(${tables.subjects}.*) as subjects`))
    .from(tables.tutors)
    .leftJoin(
      tables.tutorsSubjects,
      `${tables.tutors}.id`,
      `${tables.tutorsSubjects}.tutor_id`
    )
    .leftJoin(
      tables.subjects,
      `${tables.tutorsSubjects}.subject_id`,
      `${tables.subjects}.id`
    )
    .orderBy(...tutorOrderSequence(options.sort))
    .groupBy([`${tables.tutors}.id`])

  // optional where clauses
  if (options.query) {
    query
      .whereILike('first_name', `%${options.query}%`)
      .orWhereILike('last_name', `%${options.query}%`)
  }
  if (options.price) {
    query.andWhere('price', '=', options.price)
  }
  if (options.school) {
    query.andWhereILike('school', `%${options.school}%`)
  }
  if (options.postcode) {
    query.andWhere('postcode', '=', options.postcode)
  }
  if (options.curriculum) {
    query.andWhere('curriculum', '=', options.curriculum)
  }
  if (options.subject) {
    query.andWhereILike('subject', `%${options.subject}%`)
  }

  // get the result
  return await query
}
