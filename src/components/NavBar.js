import {
  Link,
  useMatch,
  useNavigate,
  useResolvedPath,
  useLocation,
} from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useCallback, useContext, useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function Navbar() {
  const { token, logout } = useAuth();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const searchpath = useContext(location.pathname);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    let url = "";
    url = location.pathname.includes("/user-recipes")
      ? `/user-recipes/search?query=${query}`
      : location.pathname.includes("/liked-recipes")
      ? `/user-recipes/search?query=${query}`
      : `/search?query=${query}`;
    navigate(url);
    setQuery("");
  };

  const handleLoveButtom = (e) => {
    e.preventDefault();
    navigate("liked-recipes");
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed", // Make navbar fixed
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000, // Ensure it stays above other content
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#333", // Dark background
          padding: "10px 20px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          color: "#fff", // White text
        }}
      >
        <Link
          to="/"
          className="site-title"
          style={{
            fontWeight: "bold",
            fontSize: "24px",
            color: "#fff", // White logo text
            textDecoration: "none", // Remove underline from logo
          }}
        >
          Make Me
        </Link>

        <Button
          variant="outlined"
          // color="#ff1744"
          sx={{
            marginBottom: "5px",
            color: "#ff4081",
          }}
          onClick={handleLoveButtom}
          startIcon={<FavoriteIcon />}
          // gutterBottom
        >
          Loved Recipes
        </Button>

        <Box
          component="form"
          onSubmit={handleSearchSubmit}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "50%", // Adjust width as needed
            maxWidth: "600px",
          }}
        >
          <TextField
            name="query"
            value={query}
            placeholder="Search Recipes"
            onChange={(e) => setQuery(e.target.value)}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#fff", // Light input against dark navbar
                "& fieldset": {
                  borderColor: "#2e2e2e",
                  borderWidth: "2px",
                },
              },
            }}
          />
          <Button
            type="submit"
            sx={{
              marginLeft: "8px",
              backgroundColor: "#007BFF",
              color: "#fff",
              height: "56px",
              "&:hover": {
                backgroundColor: "#0056b3",
              },
            }}
          >
            Search
          </Button>
        </Box>

        <Box
          component="ul"
          sx={{
            display: "flex",
            listStyle: "none",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <CustomLink to="/"> Home </CustomLink>
          <CustomLink to="/user-recipes"> My Recipes</CustomLink>
          <CustomLink to="/about"> About </CustomLink>

          {token ? (
            <>
              <CustomLink to="/addrecipe"> Add Recipe </CustomLink>
              <li
                onClick={handleLogout}
                className="active"
                style={{
                  cursor: "pointer",
                  color: "#fff", // Logout button in white
                  listStyle: "none",
                }}
              >
                Logout
              </li>
            </>
          ) : (
            <CustomLink to="/login"> Login </CustomLink>
          )}
        </Box>
      </Box>

      {/* Add padding to prevent content from hiding behind the fixed navbar */}
      <Box sx={{ paddingTop: "80px" }}></Box>
    </>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""} style={{ listStyle: "none" }}>
      <Link
        to={to}
        {...props}
        style={{
          textDecoration: "none", // Remove underline
          color: isActive ? "#007BFF" : "#fff", // Active link blue, others white
        }}
      >
        {children}
      </Link>
    </li>
  );
}
