import { Link } from "react-router-dom"
import { setDifficulty } from "../utils/react-utils"
import { formatTime } from "../utils/formatting-utils"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { useEffect } from "react"
import { getAllRecipes } from "../features/allRecipesSlice"
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const FeaturedRecipe: React.FC = () => {

  const recipes = useAppSelector((state) => state.recipes.allRecipes)
  const featRecipe = [...recipes].sort((a, b) => {
    if (a.averageRating < b.averageRating) return 1
    if (a.averageRating > b.averageRating) return -1
    return 0
  })[0]

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllRecipes())
  }, [])

  const starsArray = [];
	const wholePart = Math.floor(featRecipe.averageRating);
	const fractionalPart = (featRecipe.averageRating - wholePart) * 100;

	for (let i = 0; i < 5; i++) {
		if (i < wholePart) {
			starsArray.push(<FaStar key={i} className="yellowStars" />);
		} else if (i === wholePart && fractionalPart > 0) {
			starsArray.push(<FaStarHalfAlt key={i} className="yellowStars" />);
		} else {
			starsArray.push(<FaRegStar key={i} className="yellowStars" />);
		}
	}

  return (
    <div className="feat-recipe-wrapper">
      <h2 className="home-sub-header">Featured recipe</h2>
      <Link to={`/recipe/${featRecipe.recipeId}`}>
        <img
          className="feat-recipe-img"
          src={featRecipe.recipeImg}
          alt="An image of the dish" />
      </Link>
      <div className="recipe-facts-wrapper">
        <h3 className="recipe-title feat-recipe-el">
          {featRecipe.recipeTitle}
        </h3>
        <p className="feat-recipe-el difficulty-rating">
          {setDifficulty(featRecipe.difficulty)}
        </p>
      </div>
      <p className="feat-recipe-el">{featRecipe.tagLine}</p>
      <p className="recipe-el">{starsArray} </p>
      <div className="recipe-facts-wrapper">
        <p className="recipe-facts recipe-el">
          Prep time: {formatTime(featRecipe.timeToPrepare)}
        </p>
        <p className="recipe-facts recipe-el">
          <b>{featRecipe.ratingCount}</b> reviews / <b>{featRecipe.averageRating.toFixed(1)}</b> average
        </p>
      </div>
    </div>
  )
}

export default FeaturedRecipe
