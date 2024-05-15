export type Curriculum = 'VCE' | 'WACE' | 'HSC' | 'QCE' | 'IB'

// db entity
export interface Subject {
  id: string
  created_at: string
  updated_at: string
  name: string
  description: string
  curriculum: Curriculum
}

export interface SaveSubject {
  name: string
  description: string
  curriculum: Curriculum
}
