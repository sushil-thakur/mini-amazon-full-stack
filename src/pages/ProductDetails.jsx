import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useParams } from "react-router";
import axiosInstance from "../../lib/axios_instance";
const ProductDetail = () => {
  const params = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const deleteProduct = async () => {
    try {
      setDeleteLoading(true);
      await axiosInstance.delete(`/product/delete/${params.id}`);
      navigate("/");
    } catch (error) {
      console.log("Delete product api hit failed...");
      console.log(error);
    } finally {
      setDeleteLoading(false);
    }
  };
  useEffect(() => {
    const getProductDetails = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/product/detail/${params.id}`);
        setLoading(false);
        const product = res.data?.productDetails;
        setProductDetails(product);
      } catch (error) {
        setLoading(false);
        console.log("Get product detail api hit failed...");
        console.log(error);
      }
    };

    getProductDetails();
  }, []);

  if (loading || deleteLoading) {
    return <CircularProgress />;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "1rem",
        gap: "3rem",
        margin: "3rem",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
    >
      <Box>
        <img
          src={
            productDetails?.image ||
            "https://cdn.thewirecutter.com/wp-content/media/2023/04/tv-buying-guide-2048px-0032.jpg?auto=webp&quality=75&width=1024"
          }
          alt={productDetails.name}
          height={"500px"}
        />
      </Box>

      <Stack
        sx={{
          gap: "2rem",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="h5">{productDetails.name}</Typography>
        <Chip
          label={productDetails.brand}
          variant="contained"
          color="warning"
        />

        <Typography variant="h6">Price:${productDetails.price}</Typography>
        <Typography variant="h6">
          Available Quantity:{productDetails.quantity}
        </Typography>

        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Typography variant="h6">Category:</Typography>
          <Chip
            label={productDetails.category}
            variant="contained"
            color="warning"
          />
        </Box>

        <Typography
          sx={{
            textAlign: "justify",
            lineHeight: "1.5rem",
            fontSize: "1.2rem",
          }}
        >
          {productDetails.description}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: "2rem",
          }}
        >
          <Button variant="contained" color="success" startIcon={<EditIcon />}>
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteOutlineIcon />}
            onClick={() => {
              deleteProduct();
            }}
          >
            Delete
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default ProductDetail;