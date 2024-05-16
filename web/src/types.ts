export type TutorPricing = "gold" | "premium" | "executive";

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
