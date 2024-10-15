import { useEffect, useState } from "react";
import axios from "axios";
import { CardMedia, Typography, Button, Chip, Box, Grid2 } from "@mui/material";

function RecipeDetail() {
  const [recipe, setRecipe] = useState([]);
  const token = "70286b25b2b19a980c34dd79698aa4c7df5dc406";

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          "https://api.raghavgupta.site/api/recipe/recipes/1/",
          {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setRecipe(response.data);
      } catch (error) {
        console.log("Error while loading the recipe...");
        setRecipe({ error: "Failed" });
      }
    };

    fetchRecipe();
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100vh",
        padding: "20px",
        backgroundColor: "#f8f8f8",
        display: "flex",
      }}
    >
      <Box
        component="img"
        src={recipe.image}
        alt={recipe.title}
        sx={{
          display: "flex",
          width: "50%",
          height: "auto",
          padding: "2px",
          backgroundColor: "black",
        }}
      />

      <Box
        sx={{
          //   display: "flex",
          width: "50%",
          padding: "2px",
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{ marginTop: "10px" }}
          //   gutterBottom
        >
          {recipe.title}
        </Typography>
        <Typography
          variant="h6"
          //   fontWeight="bold"
          sx={{ color: "grey", fontFamily: "arial" }}
          gutterBottom
        >
          By Raghav Gupta
        </Typography>
        <br></br>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            marginBottom: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {recipe.tags &&
            recipe.tags.map((tag) => (
              <Chip
                sx={{ alignContent: "center", justifyContent: "center" }}
                key={tag.id}
                label={tag.name}
                color="primary"
              />
            ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            marginBottom: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {recipe.ingredients &&
            recipe.ingredients.map((ingredient) => (
              <Chip
                sx={{ alignContent: "center", justifyContent: "center" }}
                key={ingredient.id}
                label={ingredient.name}
                // color="secondary"
              />
            ))}
        </Box>

        <Box
          sx={{
            padding: "10px",
          }}
        >
          <Typography
            sx={{
              padding: "10px",
            }}
            variant="body1"
            gutterBottom
          >
            {recipe.description || "No description available."}
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          onClick={() => console.log("Button Clicked")}
        >
          Save Recipe
        </Button>
      </Box>
    </Box>
  );
}

export default RecipeDetail;
