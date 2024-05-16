import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Spinner,
  Text,
} from "@radix-ui/themes";
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

  if (!profile) {
    return (
      <>
        <Container p={"2"} size="1">
          <Flex justify="center">
            <Button disabled>
              <Spinner loading></Spinner>
              Loading
            </Button>
          </Flex>
        </Container>
      </>
    );
  }

  return (
    <Container p={"2"} size={"3"}>
      <>
        <Box width="auto" p={"1"}>
          <Flex direction="column" gap="3" align="center" justify="center">
            <Avatar
              size="9"
              mt="5"
              src={profile.profile_picture}
              radius="full"
              fallback="T"
            />
            <Box style={{ textAlign: "center" }} mt="3">
              <Text as="div" size="8" weight="bold">
                {profile.first_name + " " + profile.last_name}
              </Text>
              <Flex gap="2" mt="2" justify="center">
                <Badge color="red" size="3" radius="full">
                  {"ATAR " + profile.atar}
                </Badge>
                <Badge color="yellow" size="3" radius="full">
                  {profile.price}
                </Badge>
                <Badge
                  color={profile.available ? "green" : "red"}
                  size="3"
                  radius="full"
                >
                  {profile.available ? "available" : "booked"}
                </Badge>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </>
      <Flex></Flex>
    </Container>
  );
};
