import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Nav from './components/Nav'
import Home from './components/pages/Home'
import Recipes from './components/pages/Recipes'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import Error from './components/Error'
import LoginSuccess from './components/pages/LoginSuccess'
import SingleRecipe from './components/pages/SingleRecipe'
import { CreateRecipe } from './components/pages/CreateRecipe'
import CreateRecipeSuccess from './components/pages/CreateRecipeSuccess'
import { CreateFork } from './components/pages/CreateFork'
import ForkedRecipes from './components/pages/ForkedRecipes'
import CreateForkSuccess from './components/pages/CreateForkSuccess'

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Nav />
      <main>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/recipes' element={<Recipes />}/>
          <Route path='/recipes/:cuisineName' element={<Recipes />}/>
          <Route path='/recipe/:recipeId' element={<SingleRecipe />} />
          <Route path='/recipe/:recipeId/forks/:originalRecipeId' element={<ForkedRecipes />} />
          <Route path='/recipes/add_recipe' element={<CreateRecipe />}/>
          <Route path='/recipes/add_recipe/success' element={<CreateRecipeSuccess />}/>
          <Route path='/recipes/create_fork' element={<CreateFork />}/>
          <Route path='/recipes/create_fork/success' element={<CreateForkSuccess />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/login/success' element={<LoginSuccess />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/*' element={<Error />}/>
        </Routes>
      </main>
    </>
  )
}

export default App
