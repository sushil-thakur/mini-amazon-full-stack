import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Box, Button, CircularProgress } from "@mui/material";
import axiosInstance from "../../lib/axios_instance";
// rafce => react arrow function component with export
import { useNavigate } from "react-router";
const Home = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.post(
          "/product/list",
          {
            page: 1,
            limit: 10,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const productList = res.data?.productList;
        const totalPage = res?.data?.totalPage;
        setProducts(productList);
        console.log(productList);
      } catch (error) {
        console.log("Get products api hit failed...");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
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
          return (
            <ProductCard
              key={item._id}
              name={item.name}
              brand={item.brand}
              category={item.category}
              price={item.price}
              quantity={item.quantity}
            />
          );
        })}
      </Box>
    </>
  );
};

export default Home;