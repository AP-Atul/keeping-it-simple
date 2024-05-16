import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Dialog,
  Flex,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as tutorService from "../services/tutors";
import { Profile } from "../types";
import { FourOFour } from "../views/404/404";
import { Loader } from "../views/loader/loader";

export const TutorProfile = () => {
  const params = useParams<{ tutorId: string }>();
  const [profile, setProfile] = useState<Profile>();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfile = async (id: string) => {
      const result = await tutorService.profile(id);
      if (result) setProfile(result);
      else setError(true);
    };

    if (params.tutorId) {
      fetchProfile(params.tutorId);
    }
  }, [params.tutorId]);

  if (error) {
    return <FourOFour />;
  }

  if (!profile) {
    return <Loader />;
  }

  return (
    <Container p={"2"} size={"3"}>
      {/* profile image */}
      <Flex direction="row" gap="3">
        <Avatar
          size="9"
          mt="5"
          src={profile.profile_picture}
          radius="full"
          fallback="T"
        />
        <Box style={{ alignContent: "center" }}>
          <Text as="div" size="8" weight="bold">
            {profile.first_name + " " + profile.last_name}
          </Text>
          <Flex gap="2" mt="2">
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
          <ContactForm tutorId={profile.id} />
        </Box>
      </Flex>

      {/* info section */}
      <Flex
        mt="7"
        direction={{ lg: "row", initial: "column" }}
        gap="3"
        justify="center"
      >
        <Flex direction="column" gap="2" minWidth="30%">
          <Card>
            <Flex direction="column" gap="1" p="1">
              <Text weight="bold" size="5">
                My Personal Info
              </Text>
              <Text weight="regular" size="3">
                School: {profile.school}
              </Text>
              <Text weight="regular" size="3">
                Postal Code: {profile.postcode}
              </Text>
            </Flex>
          </Card>
          <Card>
            <Flex direction="column" gap="1" p="1">
              <Text weight="bold" size="5">
                My Subjects
              </Text>
              {profile.subjects.map((subject) => {
                return (
                  <Text
                    key={subject.id}
                  >{`${subject.curriculum} - ${subject.name}`}</Text>
                );
              })}
            </Flex>
          </Card>
        </Flex>
        <Card>
          <Flex direction="column" gap="1" p="1">
            <Text weight="bold" size="5">
              About me
            </Text>
            <Text>{profile.bio}</Text>
          </Flex>
        </Card>
      </Flex>
    </Container>
  );
};

export const ContactForm = ({ tutorId }: { tutorId: string }) => {
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const handleSend = async () => {
    await tutorService.request(tutorId, { name, message });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button mt="4" size="3" radius="medium" color="pink">
          Contact Me
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Contact Form</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Send a message
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Name
            </Text>
            <TextField.Root
              required
              placeholder="john snow"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Message
            </Text>
            <TextArea
              required
              resize="vertical"
              placeholder="say hi..."
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button color="pink" type="submit" onClick={handleSend}>
              Send
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
