import React, { useState } from "react";
import { useAuth } from "./AuthContext";

import { TextField, Button, Grid2, Typography, Paper } from "@mui/material";

const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "https://api.raghavgupta.site/api/user/token/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      login(data.token);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", maxWidth: "600px", margin: "20px auto" }}
    >
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Log In
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid2 container spacing={3}>
          <Grid2 item xs={12}>
            <TextField
              fullWidth
              label="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </Grid2>

          <Grid2 item xs={12}>
            <TextField
              type="password"
              label="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </Grid2>

          <Button fullWidth type="submit" variant="contained" color="primary">
            Log In
          </Button>
        </Grid2>
      </form>
    </Paper>
  );
};

export default LoginForm;
