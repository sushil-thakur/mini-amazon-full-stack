import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as yup from "yup";
import axiosInstance from "../../lib/axios_instance";

const categoryList = [
  "grocery",
  "electronics",
  "electrical",
  "clothing",
  "kitchen",
  "kids",
  "laundry",
];
const EditProduct = () => {
  const params = useParams();
  const productId = params.id;
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/product/detail/${productId}`);

        setProductDetails(res?.data?.productDetails);
      } catch (error) {
        console.log("Fetch product api from edit product page failed...");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getProductDetails();
  }, []);

  const editProduct = async (values) => {
    try {
      const res = await axiosInstance.put(`/product/edit/${productId}`, values);
      navigate(`/product-detail/${productId}`);
    } catch (error) {
      console.log("Edit product api hit failed....");
      console.log(error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }
  return (
    <Formik
      initialValues={{
        name: productDetails?.name || "",
        brand: productDetails.brand || "",
        price: productDetails?.price || 0,
        quantity: productDetails?.quantity || 1,
        category: productDetails?.category || "",
        image: "",
        description: productDetails?.description || "",
      }}
      validationSchema={yup.object({
        name: yup.string().required("Name is required.").trim().max(155),
        brand: yup.string().required().trim().max(155),
        price: yup.number().required().min(0),
        quantity: yup.number().required().min(1),
        category: yup.string().required().trim().oneOf(categoryList),
        description: yup.string().required().trim().min(10).max(1000),
        image: yup.string().notRequired().trim(),
      })}
      onSubmit={(values) => {
        editProduct(values);
      }}
    >
      {(formik) => {
        return (
          <form
            onSubmit={formik.handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "2rem",
              width: "430px",
              boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
              padding: "1rem",
            }}
          >
            <Typography variant="h5">Edit Product</Typography>

            {productDetails?.image && (
              <img src={productDetails.image} width={"100%"} height={250} />
            )}

            <FormControl fullWidth>
              <TextField
                required
                label="Name"
                {...formik.getFieldProps("name")}
              />

              {formik.touched.name && formik.errors.name ? (
                <FormHelperText error>{formik.errors.name}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                required
                label="Brand"
                {...formik.getFieldProps("brand")}
              />

              {formik.touched.brand && formik.errors.brand ? (
                <FormHelperText error>{formik.errors.brand}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                type="number"
                required
                label="Price"
                {...formik.getFieldProps("price")}
              />

              {formik.touched.price && formik.errors.price ? (
                <FormHelperText error>{formik.errors.price}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                type="number"
                required
                label="Quantity"
                {...formik.getFieldProps("quantity")}
              />

              {formik.touched.quantity && formik.errors.quantity ? (
                <FormHelperText error>{formik.errors.quantity}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select label="Category" {...formik.getFieldProps("category")}>
                <MenuItem value={"grocery"}>Grocery</MenuItem>
                <MenuItem value={"electronics"}>Electronics</MenuItem>
                <MenuItem value={"clothing"}>Clothing</MenuItem>
                <MenuItem value={"electrical"}>Electrical</MenuItem>
                <MenuItem value={"kids"}>Kids</MenuItem>
                <MenuItem value={"kitchen"}>Kitchen</MenuItem>
                <MenuItem value={"laundry"}>Laundry</MenuItem>
              </Select>
              {formik.touched.category && formik.errors.category ? (
                <FormHelperText error>{formik.errors.category}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                required
                label="Description"
                multiline
                minRows={4}
                maxRows={10}
                {...formik.getFieldProps("description")}
              />

              {formik.touched.description && formik.errors.description ? (
                <FormHelperText error>
                  {formik.errors.description}
                </FormHelperText>
              ) : null}
            </FormControl>

            <Button fullWidth variant="contained" color="success" type="submit">
              submit
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};

export default EditProduct;