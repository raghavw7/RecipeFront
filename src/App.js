import "./App.css";
import RecipeTile from "./components/RecipeTile";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import RecipeForm from "./components/RecipeForm";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <br></br>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/addrecipe" element={<RecipeForm />} />
        </Routes>
      </div>

      <div className="recipe-box">
        <RecipeTile />
      </div>
    </>
  );
}

export default App;
