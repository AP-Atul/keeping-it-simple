import { Tutor } from "../../types";

export interface TutorCardProps extends Tutor {
  onClick: (tutorId: string) => void;
}
