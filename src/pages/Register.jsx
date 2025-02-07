import React from 'react'

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
import { Formik } from "formik";

import * as yup from "yup";
import { Link } from 'react-router';

const Register = () => {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        phoneNumber: "",
        address: "",
        dateOfBirth: "",
        gender: "",
      }}
      validationSchema={yup.object({
          firstName: yup.string().required().max(255),
          lastName: yup.string().required().max(100),
          password: yup.string().required().max(100).trim(),
          email: yup.string().required().email().max(100),
          phoneNumber: yup.number().notRequired().max(20),
          address: yup.string().required().max(255),
          dateOfBirth: yup.date().required(),
          gender: yup.string().required().oneOf(["Male", "Female", "Other"]),
      })}
      onSubmit={(values) => {
        console.log(values);
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
                label="First Name"
                {...formik.getFieldProps("firstName")}
              />

              {formik.touched.firstName && formik.errors.firstName ? (
                <FormHelperText error>{formik.errors.firstName}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                required
                label="Last Name"
                {...formik.getFieldProps("lastName")}
              />

              {formik.touched.lastName && formik.errors.lastName ? (
                <FormHelperText error>{formik.errors.lastName}</FormHelperText>
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
                <FormHelperText error>{formik.errors.password}</FormHelperText>
              ) : null}
            </FormControl>
            <FormControl fullWidth>
              <TextField label="Address" {...formik.getFieldProps("address")} />

              {formik.touched.address && formik.errors.address ? (
                <FormHelperText error>{formik.errors.address}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Age"
                {...formik.getFieldProps("age")}
              />

              {formik.touched.age && formik.errors.age ? (
                <FormHelperText error>
                  {formik.errors.age}
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
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
                <MenuItem value={"other"}>Other</MenuItem>
              </Select>

              {formik.touched.gender && formik.errors.gender ? (
                <FormHelperText error>{formik.errors.gender}</FormHelperText>
              ) : null}
            </FormControl>

            <Box 
            sx = {{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              gap: "10px",

            }}>
              
            
            <Button fullWidth variant="contained" color="warning" type="submit">
              submit
            </Button>

            <Link to = "/login"
            style={{
              color: "orangered",
              textDecoration: "none",
            }}>
              Already Registered? Login Now</Link>
            </Box>
          </form>
        );
      }}
    </Formik>
  );
};

export default Register;