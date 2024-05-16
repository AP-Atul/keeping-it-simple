import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Container, Grid, TextField } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { search } from "../services";
import { Tutor } from "../types";
import { TutorCard } from "../views/tutor_card/tutor_card";

export const Home = () => {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  useEffect(() => {
    fetchTutors();
  });
  const fetchTutors = async () => {
    const result = await search();
    if (result) {
      setTutors(result);
    }
  };
  const tutorClicked = (tutorId: string) => {
    console.log("tutor clicked ", tutorId);
  };
  return (
    <Container p={"2"} size={"3"}>
      <TextField.Root placeholder="Search tutors...">
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
      <Grid
        mt={"2"}
        columns={{ initial: "1", md: "2", sm: "1", lg: "3" }}
        gap="3"
        width="auto"
      >
        {tutors.length > 0 &&
          tutors.map((tutor) => {
            return (
              <TutorCard key={tutor.id} {...tutor} onClick={tutorClicked} />
            );
          })}
      </Grid>
    </Container>
  );
};
