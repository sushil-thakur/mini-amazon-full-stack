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
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getProductList = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.post("/product/list", {
          page: currentPage,
          limit: 6,
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
  }, [currentPage]);

  if (loading) {
    return <CircularProgress />;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        margin: "3rem 0",
      }}
    >
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

      <Pagination
        count={totalPage}
        page={currentPage}
        color="primary"
        onChange={(event, value) => {
          setCurrentPage(value);
        }}
      />
    </Box>
  );
};

export default Home;