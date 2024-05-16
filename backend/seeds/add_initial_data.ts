import { faker } from '@faker-js/faker'
import { Knex } from 'knex'
import { Curriculum } from 'src/subjects/types'
import { TutorPricing } from 'src/tutors/types'
import * as subjectRepo from '../src/subjects/repo'
import * as tutorRepo from '../src/tutors/repo'
import * as tutorSubjectRepo from '../src/tutors_subjects/repo'

export async function seed(knex: Knex): Promise<void> {
  const totalTutors = 50
  const totalSubjects = 10

  console.log(`creating ${totalSubjects} subjects`)
  const subjectNames = [
    'Chemistry',
    'Physics',
    'Maths',
    'English',
    'Drawing',
    'Trigonometry',
    'Calculus',
    'Biology',
    'Science',
    'Music',
    'History',
    'Economics',
    'Finance'
  ]
  const subjects: string[] = []
  for (const name of subjectNames) {
    const subject = await subjectRepo.save(
      {
        name,
        curriculum: faker.helpers.arrayElement<Curriculum>([
          'VCE',
          'WACE',
          'HSC',
          'QCE',
          'IB'
        ]),
        description: faker.lorem.sentence()
      },
      knex
    )
    if (subject) {
      subjects.push(subject.id)
    }
  }

  console.log(`creating ${totalTutors} tutors`)
  const tutors: string[] = []
  for (let i = 0; i < totalTutors; i++) {
    const tutor = await tutorRepo.save(
      {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        atar: faker.number.int({ min: 0, max: 100 }),
        available: faker.helpers.arrayElement([true, false]),
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
      },
      knex
    )
    if (tutor) {
      tutors.push(tutor.id)
    }
  }

  console.log('linking subjects and tutors randomly')
  for (const tutor of tutors) {
    const subjectsToLink = faker.helpers.arrayElements(subjects, {
      min: 2,
      max: 4
    })
    const toInsert = subjectsToLink.map((sub) => ({ tutor_id: tutor, subject_id: sub }))
    await tutorSubjectRepo.save(toInsert)
  }
}
