import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RecipeForm from "./RecipeForm";

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

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Password } from "@mui/icons-material";

function RecipeTile() {
  const [recipes, setRecipes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const token = "70286b25b2b19a980c34dd79698aa4c7df5dc406";
  const navigate = useNavigate();

  const handleRecipeTileClick = (id) => {
    navigate(`/recipeDetail/${id}`);
  };

  const handleTagClick = () => {
    // continue;
    navigate(`/recipeDetail/`);
  };

  const handleIngredientClick = () => {
    // continue;
  };

  const handleClickAddRecipe = () => {
    // navigate("/addrecipe");
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "https://api.raghavgupta.site/api/recipe/recipes/",
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
          {
            <Card sx={{ width: 345 }}>
              <CardMedia component="img" height="200" />
              <Button
                variant="outlined"
                href="/about"
                onClick={handleClickAddRecipe}
                type="button"
              >
                Add Recipe
              </Button>
            </Card>
          }
          {recipes.map((recipe, index) => (
            <Grid2 item xs={12} sm={6} md={4} key={index}>
              <Card
                className="recipe-tile"
                sx={{ width: 345 }}
                onClick={() => handleRecipeTileClick(recipe.id)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={
                    recipe.image
                      ? recipe.image
                      : require("./upload_image_default.png")
                  }
                  alt={recipe.title}
                />

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {recipe.title}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "center",
                      mb: 1,
                    }}
                  >
                    {recipe.tags.map((tag, index) => (
                      <Chip
                        sx={{
                          alignContent: "center",
                          justifyContent: "center",
                        }}
                        clickable
                        onClick={(event) => {
                          event.stopPropagation();
                          handleTagClick(tag);
                        }}
                        key={tag.id}
                        label={tag.name}
                        color="primary"
                      />
                      // <Chip key={index} label={tag.name} />
                    ))}
                  </Stack>

                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "center",
                    }}
                  >
                    {recipe.ingredients.map((ingredient, index) => (
                      <Chip
                        sx={{
                          alignContent: "center",
                          justifyContent: "center",
                        }}
                        clickable
                        onClick={(event) => {
                          event.stopPropagation();
                          handleIngredientClick();
                        }}
                        variant="outlined"
                        color="secondary"
                        key={index}
                        label={ingredient.name}
                      />
                    ))}
                  </Stack>
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

      <Dialog open={openDialog} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogContent>
          <RecipeForm handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default RecipeTile;
