import { Container, Box, TextField, Typography, Button } from "@mui/material";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function ForgotPassword() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const requestData = {
      username: formData.get("username"),
      email: formData.get("email"),
    };
    const res = await fetch("/api/change-password", {
      method: "PUT",
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (res.ok)
      router.push({
        pathname: "/change-password-success",
        query: { username: encodeURIComponent(requestData.username) },
      });
    else setError(data.error);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ minHeight: "100vh" }}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <Box
          component="form"
          autoComplete="off"
          // noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        >
          {error && (
            <Typography variant="body1" color="error" align="center">
              Password change failed. Check the details you provided are
              correct.
            </Typography>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            name="username"
            label="Username"
            type="text"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            label="Email"
            type="email"
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Request New Password
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
