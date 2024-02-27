import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { URL } from "../../backend link";
import { useNavigate, useParams } from "react-router-dom";
import "./resetpassword.css";

//password schema
const passwordSchema = yup.object({
  password1: yup.string().required("Enter your new password"),
  password2: yup.string().required("Enter your Confirm Password"),
});

function ResetPassword() {
  const navigate = useNavigate();
  let { id, token } = useParams();
  const reset = async ({ newpassword }) => {
    console.log(newpassword);
    try {
      const response = await fetch(`${URL}/user/resetpassword/${id}/${token}`, {
        method: "POST",
        body: JSON.stringify(newpassword),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.rd == true) {
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

  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        password1: "",
        password2: "",
      },
      validateSchema: passwordSchema,
      onSubmit: (data) => {
        if (data.password1 === data.password2) {
          reset(data.password1);
        } else {
          toast.error("Password Not matching");
        }
        console.log(data);
      },
    });
  return (
    <div className="reset-container">
      <div className="reset-card">
        <h2>Change Password</h2>
        <p>New password Enter here</p>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-field">
            <label htmlFor="password1">New password</label>
            <input
              id="password1"
              value={values.password1}
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              name="password1"
              placeholder="Enter new password"
            />
            {touched.errors && errors.password1 ? (
              <p style={{ color: "crimson" }}>{errors.password1}</p>
            ) : (
              ""
            )}
          </div>
          <div className="form-field">
            <label htmlFor="password2">Confirm password</label>
            <input
              id="password2"
              type="password"
              name="password1"
              placeholder="Enter same password"
            />
            {touched.errors && errors.password2 ? (
              <p style={{ color: "crimson" }}>{errors.password2}</p>
            ) : (
              ""
            )}
          </div>
          <div className="btn-container">
            <button className="reset-btn" type="submit">
              Change
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ResetPassword;
