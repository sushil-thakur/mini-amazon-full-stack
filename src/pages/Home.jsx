import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Box, Button, CircularProgress, Pagination } from "@mui/material";
import axiosInstance from "../../lib/axios_instance";
// rafce => react arrow function component with export
import { useNavigate } from "react-router";
const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProductList = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.post("/product/list", {
          page: 1,
          limit: 10,
        });
        setLoading(false);
        const productList = res?.data?.productList;
        const numberOfPages = res?.data?.totalPage;

        setProducts(productList);
        setTotalPage(numberOfPages);
      } catch (error) {
        setLoading(false);
        console.log("Product list api hit failed...");
        console.log(error);
      }
    };

    getProductList();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }
  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          navigate("/add-product");
        }}
      >
        Add Product
      </Button>
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
        {products.map((item) => {
          console.log(item);
          return (
            <ProductCard
              key={item._id}
              _id={item._id}
              name={item.name}
              brand={item.brand}
              category={item.category}
              price={item.price}
              quantity={item.quantity}
              description={item.description}
              image={item.image}
            />
          );
        })}
      </Box>
      <Pagination count={10} variant="outlined" />

    </>
    
  );
};

export default Home;