import React from "react";
import ProductCard from "../components/ProductCard";
import { Box } from "@mui/material";

// rafce => react arrow function component with export

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        margin: "5rem",
        gap: "3rem",
      }}
    >
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard /> <ProductCard />
      <ProductCard />
      <ProductCard /> <ProductCard />
      <ProductCard />
      <ProductCard /> <ProductCard />
      <ProductCard />
      <ProductCard /> <ProductCard />
      <ProductCard />
      <ProductCard />
    </Box>
  );
};

export default Home;