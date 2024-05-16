import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as tutorService from "../services/tutors";
import { Profile } from "../types";

export const TutorProfile = () => {
  const params = useParams<{ tutorId: string }>();
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    const fetchProfile = async (id: string) => {
      const result = await tutorService.profile(id);
      if (result) setProfile(result);
    };

    if (params.tutorId) {
      fetchProfile(params.tutorId);
    }
  }, [params.tutorId]);

  return <div>{JSON.stringify(profile)}</div>;
};
