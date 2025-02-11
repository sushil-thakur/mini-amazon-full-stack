import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import * as yup from "yup";
import axiosInstance from "../../lib/axios.instance";
import { useNavigate } from "react-router";

const categoryList = [
  "grocery",
  "electronics",
  "electrical",
  "clothing",
  "kitchen",
  "kids",
  "laundry",
];
const AddProduct = () => {
  const navigate = useNavigate();
  const addProduct = async (values) => {
    try {
      await axiosInstance.post("/product/add", values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      navigate("/");
    } catch (error) {
      console.log("Add product api hit failed...");
      console.log(error);
    }
  };
  return (
    <Formik
      initialValues={{
        name: "",
        brand: "",
        price: 0,
        quantity: 1,
        category: "",
        image: "",
        description: "",
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
        addProduct(values);
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
              width: 410,
              boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
              padding: "1rem",
            }}
          >
            <Typography variant="h5">Add Product</Typography>

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

export default AddProduct;