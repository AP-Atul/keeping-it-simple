import { Avatar, Badge, Box, Card, Flex, Text } from "@radix-ui/themes";
import { TutorCardProps } from "./types";

export const TutorCard = (props: TutorCardProps) => {
  return (
    <Box width="auto" p={"1"}>
      <Card
        style={{ cursor: "pointer" }}
        onClick={() => {
          props.onClick(props.id);
        }}
      >
        <Box>
          <Flex gap="3" align="center">
            <Avatar
              size="3"
              src={props.profile_picture}
              radius="full"
              fallback="T"
            />
            <Box>
              <Text as="div" size="2" weight="bold">
                {props.first_name + " " + props.last_name}
              </Text>
              <Text as="div" size="2" color="gray">
                {props.school}
              </Text>
            </Box>
          </Flex>
          <Flex pt={"1"} gap="2">
            <Badge color="red" size="1" radius="full">
              {"ATAR " + props.atar}
            </Badge>
            <Badge color="yellow" size="1" radius="full">
              {props.price}
            </Badge>
            <Badge
              color={props.available ? "green" : "red"}
              size="1"
              radius="full"
            >
              {props.available ? "available" : "booked"}
            </Badge>
          </Flex>
          <Text size="1" weight="light">
            {props.bio}
          </Text>
        </Box>
      </Card>
    </Box>
  );
};
