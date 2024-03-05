import React from "react";
import "./signin.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import { URL } from "../../backend link";
import { useNavigate } from "react-router-dom";
import { AppState } from "../../Components/Provider/Provider";
import axios from "axios";

const userSchemaValidation = yup.object({
  email: yup.string().required("Please fill in your Email"),
  password: yup.string().required("please write proper password"),
});

function Signin() {
  const { refresh, setRefresh } = AppState();
  const navigate = useNavigate();
  const log = async ({ loginuser }) => {
    console.log(loginuser);
    try {
      const data= await axios.post(`${URL}/user/login`,loginuser);
      if (data.data.token) {
        sessionStorage.setItem("token", data.data.token);
        sessionStorage.setItem("myid", data.data.myid);
        navigate("/");
        toast.success(data.data.message);
        setRefresh(refresh + 1);
      } else {
        toast.error(data.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(`error: ${error}`);
    }
  };
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: userSchemaValidation,
      onSubmit: (loginuser) => {
        log({ loginuser });
      },
    });

  return (
    <div className="my-container">
      <div className="wrapper login">
        <div className="container" style={{ padding: "0px" }}>
          <div className="col-left">
            <div className="login-text">
              <h2>Welcome!</h2>
              <p>
                Create your account.<br></br>For Free!
              </p>
              <Link to="/signup" className="btn">
                Sign Up
              </Link>
            </div>
          </div>
          <div className="col-right">
            <div className="login-form">
              <h2>Login</h2>
              <form onSubmit={handleSubmit}>
                <p>
                  <label htmlFor="email">
                    Email address<span>*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    onBlur={handleBlur}
                    value={values.email}
                    onChange={handleChange}
                    placeholder="Username or Email"
                    required
                  />
                  {touched.email && errors.email ? (
                    <p style={{ color: "crimson" }}>{errors.email}</p>
                  ) : (
                    ""
                  )}
                </p>
                <p>
                  <label htmlFor="password">
                    Password<span>*</span>
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                  />
                  {touched.errors && errors.password ? (
                    <p style={{ color: "crimson" }}>{errors.password}</p>
                  ) : (
                    ""
                  )}
                </p>
                <p>
                  <input type="submit" value="Sign In" />
                </p>
                <p>
                  <Link to="/forgotpassword">Forgot password?</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
