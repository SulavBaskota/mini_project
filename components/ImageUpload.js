import { Button, TextField, Grid, Box, Typography } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";

const Input = styled("input")({
  display: "none",
});

export default function ImageUpload({ selectedImage, setSelectedImage }) {
  const [imageUrl, setImageUrl] = useState(null);

  const handleChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Grid item xs={8}>
        <TextField
          disabled={!selectedImage}
          id="image-file-name"
          value={selectedImage ? selectedImage.name : "No file selected."}
          size="small"
          sx={{ width: "100%" }}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid item xs={4} sx={{ paddingLeft: 1 }}>
        <Input
          accept="image/*"
          id="select-image"
          type="file"
          onChange={handleChange}
        />
        <label htmlFor="select-image">
          <Button variant="contained" component="span">
            <UploadIcon />
            Upload
          </Button>
        </label>
      </Grid>
      <Grid item xs={12}>
        {imageUrl && selectedImage && (
          <Box mt={2} mb={2}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Typography variant="body1" color="text.secondary">
                  Image Preview:
                </Typography>
              </Grid>
              <Grid item>
                <img src={imageUrl} alt={selectedImage.name} height="200px" />
              </Grid>
            </Grid>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}
