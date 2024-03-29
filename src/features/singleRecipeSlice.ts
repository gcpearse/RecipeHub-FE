import { AppThunk } from "../app/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../utils/api-utils";
import { Recipe } from "./allRecipesSlice";
import { getUserById } from "./userSlice";

interface SingleRecipe extends Recipe {
  recipeIngredients: []
}

interface SingleRecipeState {
  recipe: SingleRecipe,
  recipeId: string | undefined,
  isLoading: boolean
}

const initialState: SingleRecipeState = {
  recipe: {
    recipeId: "",
    recipeTitle: "",
    tagLine: "",
    difficulty: 0,
    timeToPrepare: 0,
    recipeMethod: "",
    postedOn: "",
    recipeImg: "",
    cuisine: "",
    forkedFromId: 0,
    originalRecipeId: 0,
    userId: 0,
    cuisineId: 0,
    forkCount: 0,
    directForkCount: 0,
    ratingCount: 0,
    averageRating: 0,
    username: "",
    recipeIngredients: []
  },
  recipeId: "",
  isLoading: false
};

const singleRecipeSlice = createSlice({
  name: "singleRecipe",
  initialState,
  reducers: {
    singleRecipe: (state, action: PayloadAction<SingleRecipe>) => {
      state.recipe = action.payload
      state.isLoading = false
    },
    recipeId: (state, action: PayloadAction<string>) => {
      state.recipeId = action.payload
      state.isLoading = true
    }
  }
})

export const getSingleRecipe = (recipeId: number | string | undefined ): AppThunk => {
  return async (dispatch) => {
    try {
      const response = await api.get(`/recipes/${recipeId}`);
      dispatch(singleRecipe(response.data))
      dispatch(getUserById(response.data.userId))
    }
    catch (error) {
      console.log(error)
    }
  }
}

export const { singleRecipe, recipeId } = singleRecipeSlice.actions
export default singleRecipeSlice.reducer;