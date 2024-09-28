import { useState, useEffect } from "react";
import axios from "axios";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Grid2,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import FavoriteIcon from "@mui/icons-material/Favorite";

function RecipeTile() {
  const [recipes, setRecipes] = useState([]);
  const token = "70286b25b2b19a980c34dd79698aa4c7df5dc406";

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "http://ec2-3-110-101-11.ap-south-1.compute.amazonaws.com/api/recipe/recipes/",
          {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setRecipes(response.data);
      } catch {
        console.log("Error while fetching the recipes. Please retry.");
        setRecipes({ error: "Failed" });
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      {recipes ? (
        <Grid2 container spacing={3}>
          {recipes.map((recipe, index) => (
            <Grid2 item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={recipe.image}
                  alt={recipe.title}
                />

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {recipe.title}
                  </Typography>

                  <Stack direction="row" spacing={1}>
                    {recipe.tags.map((tag, index) => (
                      <Chip key={index} label={tag.name} />
                    ))}
                  </Stack>

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ marginTop: 2 }}
                  >
                    Ingredients:
                    {recipe.ingredients.map((ingredient, index) => (
                      <Typography
                        key={index}
                        variant="body2"
                        color="textSecondary"
                      >
                        {ingredient.name}
                      </Typography>
                    ))}
                  </Typography>
                </CardContent>

                <Button variant="outlined" startIcon={<FavoriteIcon />}>
                  Like
                </Button>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <p> Loading....</p>
      )}
    </div>
  );
}

export default RecipeTile;
