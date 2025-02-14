import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import * as yup from "yup";
import axiosInstance from "../../lib/axios_instance";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import toast from "react-hot-toast";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
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
  const [file, setFile] = useState(null);
  const [localUrl, setLocalUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const navigate = useNavigate();
  const addProduct = async (values) => {
    let imageUrl = null;

    if (file) {
      // upload this file to cloudinary
      const cloud_name = "dlkcko4n6";
      const upload_preset = "iims_preset";
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", upload_preset);

      try {
        setImageLoading(true);
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formData
        );

        imageUrl = res?.data?.secure_url;
      } catch (error) {
        console.log("Image upload failed");
        console.log(error);
      } finally {
        setImageLoading(false);
      }

      // cloudinary gives url
    }
    try {
      setLoading(true);
      await axiosInstance.post("/product/add", { ...values, image: imageUrl });

      navigate("/");
    } catch (error) {
      console.log("Add product api hit failed...");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || imageLoading) {
    return <CircularProgress />;
  }
  return (
    <>
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
                width: 500,
                boxShadow:
                  "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                padding: "1rem",
              }}
            >
              <Typography variant="h5">Add Product</Typography>

              {localUrl && (
                <img
                  src={localUrl}
                  alt="Product image"
                  width={"100%"}
                  height={250}
                />
              )}

              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload image
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => {
                    const image = event.target.files[0];
                    setFile(image);
                    const imageLocalUrl = URL.createObjectURL(image);
                    console.log(imageLocalUrl);
                    setLocalUrl(imageLocalUrl);
                  }}
                />
              </Button>

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
                  <FormHelperText error>
                    {formik.errors.quantity}
                  </FormHelperText>
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
                  <FormHelperText error>
                    {formik.errors.category}
                  </FormHelperText>
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

              <Button
                fullWidth
                variant="contained"
                color="success"
                type="submit"
                disabled={loading || imageLoading}
              >
                submit
              </Button>
            </form>
          );
        }}
      </Formik>
    </>
  );
};

export default AddProduct;