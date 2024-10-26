import { useState, useEffect, render } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import RecipeForm from "./RecipeForm";
import { useAuth } from "./AuthContext";

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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Password } from "@mui/icons-material";

function RecipeTile() {
  const [recipes, setRecipes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  // const token = "70286b25b2b19a980c34dd79698aa4c7df5dc406";
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("query");

  const [tagList, setTagList] = useState([]);
  const [ingredientList, setIngredientList] = useState([]);
  const [likedList, setLikedList] = useState({});

  const handleRecipeTileClick = (id) => {
    navigate(`/recipeDetail/${id}`);
  };

  const handleTagClick = (tag_id) => {
    if (tagList.includes(tag_id)) {
      setTagList((prev) => prev.filter((id) => id !== tag_id));
    } else {
      setTagList((prev) => [...prev, tag_id]);
    }
  };

  const handleIngredientClick = (ingredient_id) => {
    if (ingredientList.includes(ingredient_id)) {
      setIngredientList((prev) => prev.filter((id) => id !== ingredient_id));
    } else {
      setIngredientList((prev) => [...prev, ingredient_id]);
    }
  };

  const handleLoveButtonClick = async (recipe_id) => {
    try {
      let url = `https://api.raghavgupta.site/api/recipe/recipes/${recipe_id}/like_recipe/`;
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.status);

      if (response.data.status === "liked")
        setLikedList((prev) => ({ ...prev, [recipe_id]: true }));
      else setLikedList((prev) => ({ ...prev, [recipe_id]: false }));
    } catch (error) {
      console.log("Error posting the like. Please retry.", error);
    }
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
        console.log(location);
        let url = "https://api.raghavgupta.site/api/recipe/recipes";
        if (location.pathname.includes("/user-recipes")) {
          url = "https://api.raghavgupta.site/api/recipe/recipes/user-recipes";
        } else if (location.pathname.includes("/liked-recipes")) {
          url = "https://api.raghavgupta.site/api/recipe/recipes/liked-recipes";
        }
        const queryParams = [];

        if (searchQuery) {
          queryParams.push(`search=${searchQuery}`);
        }

        if (tagList.length > 0) {
          const tagUrl = tagList.map((x) => String(x)).join(",");
          queryParams.push(`tags=${tagUrl}`);
        }
        if (ingredientList.length > 0) {
          const ingredientUrl = ingredientList.map((x) => String(x)).join(",");
          queryParams.push(`ingredients=${ingredientUrl}`);
        }

        if (queryParams.length > 0) {
          url += `?${queryParams.join("&")}`;
        }

        console.log(url);
        const response = await axios.get(url, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });

        const initialLikedStatus = response.data.reduce((acc, recipe) => {
          acc[recipe.id] = recipe.is_liked;
          return acc;
        }, {});

        console.log(location);
        setRecipes(response.data);
        setLikedList(initialLikedStatus);
      } catch {
        console.log("Error while fetching the recipes. Please retry.");
        setRecipes([]);
      }
    };

    fetchRecipes();
  }, [searchQuery, tagList, ingredientList, location, token]);

  return (
    <div>
      {recipes ? (
        <Grid2 container spacing={3}>
          {!searchQuery && (
            <Card sx={{ width: 345 }}>
              <CardMedia
                className="addRecipeImage"
                component="img"
                height="200"
                image={require("./collage.jpg")}
              />
              <Button
                sx={{
                  marginTop: "5px",
                }}
                variant="outlined"
                // href="/about"
                onClick={handleClickAddRecipe}
                type="button"
              >
                Add Recipe
              </Button>
            </Card>
          )}

          {recipes.map((recipe, index) => (
            <Grid2 item xs={12} sm={6} md={4} key={index}>
              <Card
                className="recipe-tile"
                sx={{ width: 345 }}
                onClick={() => handleRecipeTileClick(recipe.id)}
              >
                {/* {recipe.image && ( */}
                <CardMedia
                  className={!recipe.image ? "noImage" : ""}
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
                        }}
                        clickable
                        onClick={(event) => {
                          event.stopPropagation();
                          handleTagClick(tag.id);
                        }}
                        variant={
                          tagList.includes(tag.id) ? "filled" : "outlined"
                        }
                        key={tag.id}
                        label={tag.name}
                        color="primary"
                      />
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
                          handleIngredientClick(ingredient.id);
                        }}
                        variant={
                          ingredientList.includes(ingredient.id)
                            ? "filled"
                            : "outlined"
                        }
                        color="secondary"
                        key={index}
                        label={ingredient.name}
                      />
                    ))}
                  </Stack>
                </CardContent>

                <Button
                  variant="outlined"
                  // color="#ff1744"
                  sx={{
                    marginBottom: "5px",
                    color: "#ff4081",
                    alignContent: "center",
                  }}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleLoveButtonClick(recipe.id);
                  }}
                  startIcon={
                    likedList[recipe.id] ? (
                      <FavoriteIcon />
                    ) : (
                      <FavoriteBorderIcon />
                    )
                  }
                >
                  {likedList[recipe.id] ? "Unlove" : "Love"}
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
