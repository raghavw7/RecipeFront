import "./App.css";
import RecipeTile from "./components/RecipeTile";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import RecipeForm from "./components/RecipeForm";
import LoginForm from "./components/Login";
import RecipeDetail from "./components/RecipeDetailView";
import { Route, Routes, useLocation } from "react-router-dom";
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
          <Route path="/" element={<PrivateRoute element={<RecipeTile />} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/addrecipe"
            element={<PrivateRoute element={<RecipeForm />} />}
          />

          <Route
            path="/recipeDetail/:recipeId"
            element={<PrivateRoute element={<RecipeDetail />} />}
          />

          <Route
            path="/user-recipes/"
            element={<PrivateRoute element={<RecipeTile />} />}
          />

          <Route
            path="/search"
            element={<PrivateRoute element={<RecipeTile searchpath />} />}
          />

          <Route
            path="/user-recipes/search"
            element={<PrivateRoute element={<RecipeTile searchpath />} />}
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
