export type TutorPricing = 'gold' | 'premium' | 'executive'

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
