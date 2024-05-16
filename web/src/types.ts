export type TutorPricing = "gold" | "premium" | "executive";
export type Curriculum = "VCE" | "WACE" | "HSC" | "QCE" | "IB";

export enum TutorSortOrder {
  created_asc = "created_asc",
  created_desc = "created_desc",
  atar_asc = "atar_asc",
  atar_desc = "atar_desc",
}

export interface Tutor {
  id: string;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  slug: string;
  price: TutorPricing;
  school: string;
  atar: number;
  bio: string;
  profile_picture: string;
  available: boolean;
  postcode: string;
  metadata: object;
}

export interface SearchTutor {
  query?: string;
  price?: TutorPricing;
  school?: string;
  postcode?: string;
  curriculum?: Curriculum;
  subject?: string;
  sort: TutorSortOrder;
  page: number;
}

export interface Subject {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  curriculum: Curriculum;
}

export interface Profile extends Tutor {
  subjects: Subject[];
}
