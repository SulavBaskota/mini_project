import { TextField } from "@mui/material";
import { useState } from "react";
import EditNovelTemplate from "../../components/EditNovelTemplate";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const CreateNovelTextFieldComponents = ({ error }) => (
  <>
    <TextField
      required
      id="name"
      name="title"
      label="Novel Name"
      error={error}
      helperText={error ? "Title unavailable" : ""}
    />
    <TextField
      required
      id="synopsis"
      name="desc"
      label="Novel Description"
      multiline
      rows={5}
    />
  </>
);

export default function CreateNovel() {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedGenres || !selectedImage) return;
    const formData = new FormData(event.currentTarget);

    const imgData = new FormData();
    imgData.append("file", selectedImage);
    imgData.append("upload_preset", "book-cover-pics");
    const cloudinaryResponse = await fetch(
      "https://api.cloudinary.com/v1_1/readhub/image/upload",
      {
        method: "POST",
        body: imgData,
      }
    ).then((res) => res.json());

    const requestData = {
      title: formData.get("title"),
      img: cloudinaryResponse.secure_url,
      author: session.user.id,
      desc: formData.get("desc"),
      genre: selectedGenres,
    };
    const res = await fetch("/api/author/create-novel", {
      method: "POST",
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    if (!res.ok) {
      if (res.error === "title not available") {
        setError(true);
        return;
      }
      if (res.error === "bad request") router.push("/400");
    }
    setError(false);
    const data = await res.data;
    router.push({
      pathname: "/novel",
      query: { novel_id: encodeURIComponent(data._id) },
    });
  };

  return (
    <EditNovelTemplate
      pageTitle={"Create New Novel"}
      imageLabel={"Upload Book Cover Art"}
      buttonLink={"author/my-novels"}
      buttonLabel={"Create Novel"}
      selectedGenres={selectedGenres}
      setSelectedGenres={setSelectedGenres}
      selectedImage={selectedImage}
      setSelectedImage={setSelectedImage}
      textFieldComponents={<CreateNovelTextFieldComponents error={error} />}
      handleSubmit={handleSubmit}
    />
  );
}
