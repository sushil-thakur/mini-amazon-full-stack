import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router";
import * as yup from "yup";
import axiosInstance from "../../lib/axios_instance";
import { successNotification } from "../../utils/notification";
import { Toaster } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  // register user api hit
  const registerstudent = async (values) => {
    try {
      console.log("Registering student with values:", values); // Log the values being sent
      const res = await axiosInstance.post("/student/register", values);
      successNotification("User is registered successfully");

      navigate("/login");
    } catch (error) {
      console.log("Register user error...");
      console.log(error);
      if (error.response) {
        console.log("Server responded with:", error.response.data); // Log server response
      }
    }
  };

  return (
    <Box>
      <Toaster />
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          address: "",
          password: "",
          gender: "",
          phoneNumber: "",
        }}
        validationSchema={yup.object({
          fullName: yup
            .string()
            .required("Full name is required.")
            .trim()
            .max(255, "Full name must be at max 255 characters."),
          email: yup
            .string()
            .email("Must be valid email.")
            .required("Email is required.")
            .trim()
            .max(100, "Email must be at max 100 characters.")
            .lowercase(),
          address: yup
            .string()
            .notRequired()
            .max(255, "Address must be at max 255 characters.")
            .trim(),
          password: yup
            .string()
            .required("Password is required.")
            .trim()
            .min(8, "Password must be at least 8 characters.")
            .max(30, "Password must be at max 30 characters."),
          gender: yup
            .string()
            .required("Gender is required.")
            .trim()
            .oneOf(["Male", "Female", "Other", "PreferNotToSay"]),
          phoneNumber: yup
            .string()
            .notRequired()
            .trim()
            .min(10, "Phone number must be at least 10 characters.")
            .max(20, "Phone number must be at max 20 characters."),
        })}
        onSubmit={async (values) => {
          registerstudent(values);
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
                gap: "1.5rem",
                width: 400,
                boxShadow:
                  "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                padding: "1rem",
              }}
            >
              <Typography variant="h5">Register</Typography>
              <FormControl fullWidth>
                <TextField
                  required
                  label="Full Name"
                  {...formik.getFieldProps("fullName")}
                />

                {formik.touched.fullName && formik.errors.fullName ? (
                  <FormHelperText error>
                    {formik.errors.fullName}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  required
                  label="Email"
                  {...formik.getFieldProps("email")}
                />

                {formik.touched.email && formik.errors.email ? (
                  <FormHelperText error>{formik.errors.email}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  required
                  label="Password"
                  {...formik.getFieldProps("password")}
                />

                {formik.touched.password && formik.errors.password ? (
                  <FormHelperText error>
                    {formik.errors.password}
                  </FormHelperText>
                ) : null}
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  label="Address"
                  {...formik.getFieldProps("address")}
                />

                {formik.touched.address && formik.errors.address ? (
                  <FormHelperText error>{formik.errors.address}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label="Phone Number"
                  {...formik.getFieldProps("phoneNumber")}
                />

                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <FormHelperText error>
                    {formik.errors.phoneNumber}
                  </FormHelperText>
                ) : null}
              </FormControl>
              <FormControl fullWidth>
                <InputLabel required>Gender</InputLabel>
                <Select
                  required
                  label="Gender"
                  {...formik.getFieldProps("gender")}
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                  <MenuItem value={"PreferNotToSay"}>
                    Prefer Not To Say
                  </MenuItem>
                </Select>

                {formik.touched.gender && formik.errors.gender ? (
                  <FormHelperText error>{formik.errors.gender}</FormHelperText>
                ) : null}
              </FormControl>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  width: "100%",
                }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  color="warning"
                  type="submit"
                >
                  submit
                </Button>

                <Link
                  to="/login"
                  style={{
                    color: "orangered",
                    textDecoration: "none",
                  }}
                >
                  Already registered? Login
                </Link>
              </Box>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default Register;