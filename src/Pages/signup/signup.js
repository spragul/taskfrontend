import React from "react";
import "./signup.css";

import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { URL } from "../../backend link";
import { Link } from "react-router-dom";

const userSchemaValidation = yup.object({
  name: yup
    .string()
    .min(3, "Enter minmum 3 characters")
    .required("Please fill in your Name"),
  mobile: yup
  .string()
  .required()
  .matches(/^[0-9]+$/, "Must be only digits")
  .min(10, 'Must be exactly 10 digits')
  .max(10, 'Must be exactly 10 digits'),
  email: yup.string().email().required("Please fill in your Email"),
  password: yup.string().required("please write proper password"),
});

export default function Signup() {
  const navigate = useNavigate();
  const sign = async ({ newuser }) => {
    console.log(newuser);
    try {
      const response = await fetch(`${URL}/user/signup`, {
        method: "POST",
        body: JSON.stringify(newuser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.userrd === true) {
        navigate("/login");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        mobile: "",
        email: "",
        password: "",
      },
      validationSchema: userSchemaValidation,
      onSubmit: (newuser) => {
        sign({ newuser });
        console.log(newuser);
      },
    });

  return (
    <div className="sign-container">
      <div style={{height:"auto"}} className="sign-cord">
        <h1>Signup</h1>
        <p>Please Register Details</p>
        <form onSubmit={handleSubmit}>
          <div className="sign-body">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              type="text"
              name="name"
              size="lg"
            />
            {touched.name && errors.name ? (
              <span style={{ color: "crimson" }}>{errors.name}</span>
            ) : (
              ""
            )}
          </div>
          <div className="sign-body">
            <label htmlFor="mobile">Mobile</label>
            <input
              id="mobile"
              onChange={handleChange}
              onBlur={handleBlur}
              type="number"
              name="mobile"
              size="lg"
            />
            {touched.mobile && errors.mobile ? (
              <p style={{ color: "crimson" }}>{errors.mobile}</p>
            ) : (
              ""
            )}
          </div>
          <div className="sign-body">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              type="email"
              name="email"
              size="lg"
            />
            {touched.email && errors.email ? (
              <p style={{ color: "crimson" }}>{errors.email}</p>
            ) : (
              ""
            )}
          </div>
          <div className="sign-body">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              type="password"
              name="password"
              size="lg"
            />
            {touched.password && errors.password ? (
              <p style={{ color: "crimson" }}>{errors.password}</p>
            ) : (
              ""
            )}
          </div>
          <p>
            <button type="submit" className="button-sign">Sign UP</button>
          </p>
          <p className="sign-link">
            Already have an account?
            <Link to="/login" className="sign-link-btn">
              Login!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
