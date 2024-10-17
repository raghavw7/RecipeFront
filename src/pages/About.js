import { React } from "react";
import { Typography, Box } from "@mui/material";

export default function About() {
  return (
    <>
      <Typography
        variant="h3"
        fontWeight="bold"
        sx={{ marginTop: "10px", color: "#424242" }}
        gutterBottom
      >
        About MakeMe
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // Centers horizontally
          // alignItems: "center", // Centers vertically within the parent
          // height: "100vh", // Takes full height of the viewport for vertical centering
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            width: "75%",
            height: "50%",
            padding: "2px",
          }}
        >
          <Typography
            variant="p"
            sx={{
              color: "grey",
              fontFamily: "sans-serif",
              padding: "20px",
              margin: "10px 10px 10px 10px",
            }}
            gutterBottom
          >
            Welcome to MakeMe! your ultimate kitchen companion! Whether you're a
            seasoned chef or just starting your culinary journey, this app is
            designed to make cooking fun, easy, and interactive. Imagine having
            a world of recipes right at your fingertips, allowing you to
            discover new dishes, tweak your favorites, and save them for later.
            With our Recipe DB App, you can create, edit, and delete recipes as
            you explore your cooking creativity. Found a dish you love? Save it
            to your favorites for quick access whenever you need. You can search
            through a vast collection of recipes by ingredients, tags, or even
            specific cuisines, making meal planning easier than ever. Want a
            spicy dish with simple ingredients you already have at home? Just
            search, and the perfect recipe is yours! Each recipe is detailed,
            including ingredients, cooking instructions, and vibrant images, so
            you know exactly what you're getting into before you start. Plus,
            it's interactive! Browse through various recipes, leave your mark by
            updating or creating your own, and even share the love by saving
            your top picks. The app is designed with you in mind, combining the
            joy of cooking with the ease of technology. So whether you're
            whipping up dinner for the family or prepping a special meal, let
            our Recipe DB App be your go-to guide for all things delicious!
          </Typography>
        </Box>
      </Box>
    </>
  );
}
