import { COMPLETED_BOOKS } from "../constants/COMPLETED_BOOKS";
import HomeSectionTemplate from "./HomeSectionTemplate";
import BookTile from "./BookTile";

export default function CompletedBooks() {
  return (
    <HomeSectionTemplate
      sectionTitle={"Completed"}
      lowLevelComp={<BookTile bookList={COMPLETED_BOOKS} />}
    />
  );
}
