import { Description } from "@mui/icons-material";
import React, { useState } from "react";
import { TextField, Button, Grid2, Typography, Paper } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useAuth } from "./AuthContext";

const RecipeForm = () => {
  const { token } = useAuth();
  const [recipe, setRecipe] = useState({
    title: "",
    time_minutes: "",
    price: "",
    description: "",
  });
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickAddRecipe = () => {
    // navigate("/addrecipe");
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const token = "70286b25b2b19a980c34dd79698aa4c7df5dc406";
    try {
      const response = await fetch(
        "https://api.raghavgupta.site/api/recipe/recipes/",
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recipe),
        }
      );

      if (response.ok) {
        const newRecipe = await response.json();
        console.log("Recipe created:", newRecipe);

        setRecipe({ title: "", price: "", time_minutes: "", description: "" });

        handleClose();
      } else {
        console.log("Error creating recipe");
      }
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  return (
    <>
      <Paper
        elevation={3}
        style={{ padding: "20px", maxWidth: "600px", margin: "20px auto" }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Add Recipe
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid2 container spacing={3}>
            <Grid2 item xs={12}>
              <TextField
                fullWidth
                label="Recipe Name"
                name="title"
                value={recipe.title}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid2>
            <Grid2 item xs={12}>
              <TextField
                fullWidth
                label="Time Required (minutes)"
                name="time_minutes"
                value={recipe.time_minutes}
                onChange={handleChange}
                required
                variant="outlined"
                type="number"
              />
            </Grid2>
            <Grid2 item xs={12}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                value={recipe.price}
                onChange={handleChange}
                required
                variant="outlined"
                type="number"
              />
            </Grid2>
            <Grid2 item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={recipe.description}
                onChange={handleChange}
                required
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid2>
            <Grid2 item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
                Create Recipe
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Paper>

      <Dialog open={openDialog} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogContent>
          <RecipeForm handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RecipeForm;
