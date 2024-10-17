import "./App.css";
import RecipeTile from "./components/RecipeTile";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import RecipeForm from "./components/RecipeForm";
import LoginForm from "./components/Login";
import RecipeDetail from "./components/RecipeDetailView";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      {/* <br /> */}
      <div className="container">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/addrecipe"
            element={<PrivateRoute element={<RecipeForm />} />}
          />
          <Route path="/" element={<PrivateRoute element={<RecipeTile />} />} />
          <Route
            path="/recipeDetail/:recipeId"
            element={<PrivateRoute element={<RecipeDetail />} />}
          />
          <Route
            path="/search"
            element={<PrivateRoute element={<RecipeTile />} />}
          />
        </Routes>
      </div>

      {/* <div className="recipe-box">
        <RecipeTile />
      </div> */}
    </AuthProvider>
  );
}

export default App;
