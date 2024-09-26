import { useState, useEffect } from "react";
import axios from "axios";

function RecipeTile() {
  const [recipes, setRecipes] = useState([]);
  const token = "9575209bc950ce728d01f1c5825b6b982258f976";

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("/api/recipe/recipes/", {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });

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
        <div>
          <h4>Recipes</h4>
          <ul className="list-group">
            {recipes.map((recipe, index) => (
              <>
                <li className="list-group-item" key={index}>
                  <ul>
                    <li key={index}>{recipe.title}</li>
                    <li>
                      <>
                        {recipe.tags.map((tag, index) => (
                          <>
                            <li className="list-group-item" key={index}>
                              {tag.name}
                            </li>
                          </>
                        ))}
                      </>
                    </li>
                    <li>
                      <>
                        {recipe.ingredients.map((ingredient, index) => (
                          <>
                            <li className="list-group-item" key={index}>
                              {ingredient.name}
                            </li>
                          </>
                        ))}
                      </>
                    </li>
                  </ul>
                </li>
              </>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default RecipeTile;
