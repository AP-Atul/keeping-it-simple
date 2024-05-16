import { useParams } from "react-router-dom";

export const TutorProfile = () => {
  const params = useParams<{ tutorId: string }>();
  return <div>{params.tutorId}</div>;
};
