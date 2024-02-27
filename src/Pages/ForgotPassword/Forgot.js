import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import "./forgot.css";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../../backend link";
import { toast } from "react-toastify";

const userSchemaValidation = yup.object({
  email: yup.string().required("Enter your email it is required"),
});

function ForgotPassword() {
  const navigate = useNavigate();

  const emailsend = async (d) => {
    try {
      const response = await fetch(`${URL}/user/forgotpassword`, {
        method: "POST",
        body: JSON.stringify(d),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.rd == true) {
        navigate("/login");
        toast.success(data.message);
      } else {
        toast.error(data.message);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      toast("error");
    }
  };

  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: userSchemaValidation,
      onSubmit: (newemail) => {
        emailsend(newemail);
      },
    });

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <h3>Forgot Password</h3>
        <h4>Task Management application</h4>
        <p>
          Just enter your email address below and we'll send you a link to
          Gmail, reset your password
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <label htmlFor="gmail">
              Email Address<span style={{ color: "crimson" }}>*</span>
            </label>
            <input
              id="gmail"
              name="email"
              onBlur={handleBlur}
              value={values.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
            {touched.errors && errors.email ? (
              <p style={{ Color: "crimson" }}>{errors.email}</p>
            ) : (
              ""
            )}
            <div className="btn-container">
              <button className="reset-btn" type="submit">
                Send Mail
              </button>
            </div>
          </div>
          <div className="form-link">
            <p>
              Already have an account?{" "}
              <Link className="link-btn" to="/login">
                Login!
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
