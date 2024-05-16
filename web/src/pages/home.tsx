import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  curriculums,
  prices,
  schools,
  sortOptions,
  subjects,
} from "../constants";
import { search } from "../services";
import { Curriculum, Tutor, TutorPricing, TutorSortOrder } from "../types";
import { Filter } from "../views/filter/filter";
import { Sort } from "../views/sort/sort";
import { TutorCard } from "../views/tutor_card/tutor_card";

export const Home = () => {
  const navigate = useNavigate();
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [query, setQuery] = useState<string>();
  const [price, setPrice] = useState<TutorPricing>();
  const [curriculum, setCurriculum] = useState<Curriculum>();
  const [subject, setSubject] = useState<string>();
  const [school, setSchool] = useState<string>();
  const [sort, setSort] = useState<TutorSortOrder>(TutorSortOrder.atar_desc);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchTutors = async () => {
      const result = await search({
        page,
        sort,
        query,
        price,
        curriculum,
        subject,
        school,
      });
      if (result) {
        setTutors(result);
      }
    };
    fetchTutors();
  }, [query, price, curriculum, subject, school, sort, page]);

  const tutorClicked = (tutorId: string) => {
    navigate(`/tutors/${tutorId}`, { preventScrollReset: false });
  };

  return (
    <Container p={"2"} size={"3"}>
      <Flex p={"3"}>
        <Text
          style={{
            width: "100%",
            textAlign: "center",
          }}
          weight={"bold"}
          size={"7"}
        >
          Keeping It Simple
        </Text>
      </Flex>
      <TextField.Root
        placeholder="Search tutors by name..."
        value={query}
        onChangeCapture={(e) => setQuery(e.currentTarget.value)}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
      <Flex my={"2"} gap={"3"} wrap={"wrap"}>
        {/* prices filter */}
        <Filter
          title="Price"
          options={prices}
          value={price}
          onValueChange={(value) => setPrice(value as TutorPricing)}
        />

        {/* curriculum filter */}
        <Filter
          title="Curriculum"
          options={curriculums}
          value={curriculum}
          onValueChange={(value) => setCurriculum(value as Curriculum)}
        />

        {/* subjects filter */}
        <Filter
          title="Subject"
          options={subjects}
          value={subject}
          onValueChange={(value) => setSubject(value as string)}
        />

        {/* schools filter */}
        <Filter
          title="School"
          options={schools}
          value={school}
          onValueChange={(value) => setSchool(value as string)}
        />

        {/* sort options */}
        <Sort
          title="Sort by"
          options={sortOptions}
          value={sort}
          onValueChange={(value) => setSort(value as TutorSortOrder)}
        />

        <Button
          size={"1"}
          ml={"auto"}
          onClick={() => {
            setCurriculum(undefined);
            setSchool(undefined);
            setSubject(undefined);
            setPrice(undefined);
            setQuery(undefined);
            setSort(TutorSortOrder.atar_desc);
          }}
        >
          Clear Filters
        </Button>
      </Flex>
      <Grid
        mt={"9"}
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

      <Flex justify={"center"} gap="3">
        <Box my={"5"}>
          <Button
            color="gray"
            variant="outline"
            disabled={page < 2}
            onClick={() => {
              setPage(page - 1);
              scrollTo({ top: 0 });
            }}
          >
            Prev Page
          </Button>
        </Box>
        <Box my={"5"}>
          <Button
            color="gray"
            variant="outline"
            disabled={tutors.length === 0}
            onClick={() => {
              setPage(page + 1);
              scrollTo({ top: 0 });
            }}
          >
            Next Page
          </Button>
        </Box>
      </Flex>
    </Container>
  );
};
