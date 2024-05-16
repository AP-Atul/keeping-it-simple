import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Container, Grid, TextField } from "@radix-ui/themes";

export const Home = () => {
  return (
    <Container p={"1"} mt={"2"} size={"2"}>
      <TextField.Root placeholder="Search tutors...">
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
      <Grid
        mt={"2"}
        columns="3"
        gap="3"
        rows="repeat(2, 64px)"
        width="auto"
      ></Grid>
    </Container>
  );
};
