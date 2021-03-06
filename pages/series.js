import {
  FormControl,
  Button,
  Container,
  Grid,
  Box,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import RadioGroupComponent from "../components/RadioButtonComponent";
import { BOOKS_WITH_TAGS } from "../constants/BOOKS_WITH_TAGS";
import HorizontalBookTile from "../components/book-tile/HorizontalBookTile";
import CheckboxesTags from "../components/CheckboxesTags";

const status = ["Any", "Ongoing", "Completed", "Hiatus"];
const sortBy = ["Name", "Popular", "New", "Rating"];

export default function Series() {
  const mobileView = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [statusValue, setStatusValue] = useState("Any");
  const [sortByValue, setSortByValue] = useState("Name");
  const [selectedGenres, setSelectedGenres] = useState([]);

  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Stack spacing={2} mt={2}>
        <FormControl>
          <RadioGroupComponent
            id="status"
            label="Status"
            value={statusValue}
            itemList={status}
            setValue={setStatusValue}
          />
        </FormControl>
        <FormControl>
          <RadioGroupComponent
            id="sort-by"
            label="Sort By"
            value={sortByValue}
            itemList={sortBy}
            setValue={setSortByValue}
          />
        </FormControl>
        <CheckboxesTags
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: mobileView ? "left" : "right",
          }}
        >
          <Button variant="contained">Apply Filters</Button>
        </Box>
      </Stack>
      <Grid container columns={{ xs: 1, sm: 2 }} spacing={3} mt={2}>
        {BOOKS_WITH_TAGS.map((book, index) => (
          <Grid item xs={1} sm={1} key={index}>
            <HorizontalBookTile book={book} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
