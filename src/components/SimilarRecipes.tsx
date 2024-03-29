import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import ReviewStars from "./ReviewStars";
import { getAllRecipes } from "../features/allRecipesSlice";

const SimilarRecipes: React.FC = () => {

  const allRecipes = useAppSelector((state) => state.recipes.allRecipes);
  const recipeData = useAppSelector((state) => state.singleRecipe.recipe);
  const filteredRecipes = allRecipes.filter((recipe) => recipe.cuisineId === recipeData.cuisineId && recipe.recipeTitle !== recipeData.recipeTitle);

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllRecipes())
  }, [])

  return (
    <div className="similarSPR">
      <h2 className="profile-header">Similar Recipes</h2>
      <ul>
        {filteredRecipes.slice(0, 3).map((recipe) => (
          <li key={recipe.recipeId}>
            <h4 className="profile-header">{recipe.recipeTitle}</h4>
            <div>
              <img src={recipe.recipeImg} />
              <ReviewStars />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SimilarRecipes;
