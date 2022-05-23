import { Container, Typography } from "@mui/material";
import { NEW_BOOKS } from "../constants/NEW_BOOKS";
import BookTile from "./BookTile";

export default function NewOngoingReleases() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h5" mt={3} mb={3}>
        New Ongoing Releases
      </Typography>
      <BookTile bookList={NEW_BOOKS} />
    </Container>
  );
}