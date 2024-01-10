import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../app/hooks";
import { recipeId } from "../features/singleRecipeSlice";
import { Recipe, getForksById } from "../features/allRecipesSlice";
import { formatTime, lengthenDate } from "../utils/formatting-utils";
import { setDifficulty } from "../utils/react-utils";
import { Link } from "react-router-dom";

const RecipeCard: React.FC<Recipe> = (props) => {

	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const handleClick = () => {
		navigate(`/recipe/${props.recipeId}`)
		dispatch(recipeId(props.recipeId))
	}

	return (
		<div className="recipe-wrapper">
			<img
				className="recipe-img"
				src={props.recipeImg}
				onClick={handleClick} />
			<div className="recipe-info-wrapper">
				<p className="recipe-el timestamp">
					{lengthenDate(props.postedOn)}
				</p>
				<div className="recipe-facts-wrapper">
					<h3 className="recipe-el recipe-title">
						{props.recipeTitle}
					</h3>
					{props.originalRecipeId ? (
						<p className="recipe-el recipe-title">
							(Forked)
						</p>
					) : (
						null
					)}
				</div>
				<p className="recipe-el">
					{props.tagLine}
				</p>
				<div className="recipe-facts-wrapper">
					{props.averageRating ? (
						<p className="recipe-facts recipe-el">
							Average score of <b>{props.averageRating.toFixed(1)}</b> from <b>{props.ratingCount}</b> reviews.
						</p>
					) : (
						<p className="recipe-facts recipe-el">
							This {props.originalRecipeId ? "forked recipe" : "recipe"} has not been rated yet.
						</p>
					)}
				</div>
				<div className="recipe-facts-wrapper">
					{props.directForkCount ? (
						props.directForkCount === 1 ? (
							<p className="recipe-facts recipe-el">This {props.originalRecipeId ? "forked recipe" : "recipe"} has been directly forked once.</p>
						) : (
							<p className="recipe-facts recipe-el">This {props.originalRecipeId ? "forked recipe" : "recipe"} has been directly forked <b>{props.directForkCount}</b> times.</p>
						)
					) : (
						<p className="recipe-facts recipe-el">This {props.originalRecipeId ? "forked recipe" : "recipe"} has not been forked yet.</p>
					)}
				</div>
				<div className="recipe-facts-wrapper">
					<p className="recipe-facts recipe-el">
						Difficulty: {setDifficulty(props.difficulty)}
					</p>
					<p className="recipe-facts recipe-el">
						Prep time: {formatTime(props.timeToPrepare)}
					</p>
				</div>
				<div className="btn-container-alt">
					{props.forkCount | props.directForkCount ? (
						<Link to={`/recipe/${props.recipeId}/forks`}>
							<button
								className="styled-btn fork-btn"
								onClick={() => {
									dispatch(getForksById({
										forkedFromId: props.recipeId
									}))
								}}>
								View forks
							</button>
						</Link>
					) : (
						null
					)}
					{props.originalRecipeId ? (
						<Link to={`/recipe/${props.originalRecipeId}`}>
							<button
								className="styled-btn fork-btn"
								onClick={() => {
									dispatch(getForksById({
										originalRecipeId: props.originalRecipeId
									}))
								}}>
								View original
							</button>
						</Link>
					) : (
						null
					)}
				</div>
			</div>
		</div>
	);
};

export default RecipeCard;
