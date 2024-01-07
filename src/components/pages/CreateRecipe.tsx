import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormValues {
	recipeTitle: string;
	tagLine: string;
	difficulty: number;
	timeToPrepare: number;
	recipeMethod: string;
	recipeImg: string;
	cuisine: string;
	forkedFromId: string;
	originalRecipeId: string;
	userId: string;
	cuisineId: string;
}
export const CreateRecipe: React.FC = () => {
	const isNavToggled = useAppSelector((state) => state.navToggle.value);
	const dispatch = useAppDispatch();
	const { register, handleSubmit } = useForm<FormValues>();

	const submitForm: SubmitHandler<FormValues> = (data) => {};

	return (
		<div className={isNavToggled ? "page-slide-in" : "page-slide-out"}>
			<form className="auth-form" onSubmit={handleSubmit(submitForm)}>
				<h2 className="auth-header">Create a new recipe</h2>
				<div className="input-wrapper">
					<label htmlFor="recipeTitle" className="input-label">
						Recipe Title
					</label>
					<input
						type="text"
						id="recipeTitle"
						className="input-field"
						{...register("recipeTitle")}
						required
					/>
				</div>
				<div className="input-wrapper">
					<label htmlFor="tagLine" className="input-label">
						Add a Yummy Tag Line
					</label>
					<input
						type="text"
						id="tagLine"
						autoComplete="on"
						className="input-field"
						{...register("tagLine")}
						required
					/>
				</div>
				<div className="input-wrapper">
					<label htmlFor="difficulty" className="input-label">
						Difficulty Rating
					</label>
					<select
						id="difficulty"
						className="input-field"
						{...register("difficulty")}
						required
						value="placeholder"
					>
						<option value="placeholder" disabled>
							How difficult is this recipe?
						</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
					</select>
				</div>
				<div className="input-wrapper">
					<label htmlFor="timeToPrepare" className="input-label">
						Time To Prepare
					</label>
					<input
						type="number"
						placeholder="time in minutes"
						id="timeToPrepare"
						className="input-field"
						{...register("timeToPrepare")}
						required
					/>
				</div>
				<div className="input-wrapper">
					<label htmlFor="recipeImg" className="input-label">
						Recipe Image URL
					</label>
					<input
						type="url"
						id="recipeImg"
						className="input-field"
						{...register("recipeImg")}
						required
					/>
				</div>
				<div className="input-wrapper">
					<label htmlFor="cuisine" className="input-label">
						Difficulty Rating
					</label>
					<select
						id="cuisine"
						className="input-field"
						value="placeholder"
						{...register("cuisine")}
						required
					>
						<option value="placeholder" disabled>
							e.g. Italian
						</option>
					{	//map over the cuisine array return <option> for each
          }
					</select>
				</div>
        <div className="input-wrapper">
					<label htmlFor="recipeMethod" className="input-label" >Method</label>
					<textarea
						id="recipeMethod"
            rows={5}
            placeholder="Add your step by step instructions here"
						autoComplete="on"
						className="input-field"
						{...register("recipeMethod")}
						required
					/>
				</div>
        <button
						type="submit"
						className="styled-btn auth-btn"
						>
						Add Recipe
					</button>
			</form>
		</div>
	);
};
