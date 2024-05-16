import { Button, Container, Flex, Spinner } from "@radix-ui/themes";

export const Loader = () => {
  return (
    <Container p={"2"} size="1">
      <Flex justify="center">
        <Button disabled>
          <Spinner loading></Spinner>
          Loading
        </Button>
      </Flex>
    </Container>
  );
};
