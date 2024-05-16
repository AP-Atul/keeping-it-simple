import { Curriculum } from '../subjects/types'

export type TutorAPIResponses = 'tutor-not-found'

export type TutorPricing = 'gold' | 'premium' | 'executive'

export enum TutorSortOrder {
  created_asc = 'created_asc',
  created_desc = 'created_desc',
  atar_asc = 'atar_asc',
  atar_desc = 'atar_desc'
}

// db entity
export interface Tutor {
  id: string
  created_at: string
  updated_at: string
  first_name: string
  last_name: string
  slug: string
  price: TutorPricing
  school: string
  atar: number
  bio: string
  profile_picture: string
  available: boolean
  postcode: string
  metadata: object
}

export interface SaveTutor {
  first_name: string
  last_name: string
  school: string
  atar: number
  bio: string
  price: TutorPricing
  profile_picture?: string
  available: boolean
  postcode: string
  metadata?: object
}

export interface SearchTutor {
  query?: string
  price?: TutorPricing
  school?: string
  postcode?: string
  curriculum?: Curriculum
  subject?: string
  sort: TutorSortOrder
  page: number
}
