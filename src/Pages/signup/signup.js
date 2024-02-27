import React from "react";
import "./signup.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { URL } from "../../backend link";
import { Link } from "react-router-dom";

const userSchemaValidation = yup.object({
  name: yup.string().required("Please fill in your Name"),
  mobile: yup.string().required("Enter your Mobile Number"),
  email: yup.string().required("Please fill in your Email"),
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
    <div id="signpageImage" className="bg-cl back">
      <MDBContainer fluid style={{ height: "100vh", height: "auto" }}>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="my-5 mx-auto"
              style={{
                borderRadius: "1rem",
                maxWidth: "500px",
                backgroundColor: "#8000385e",
              }}
            >
              <MDBCardBody className="p-5 w-100 d-flex flex-column">
                <h2 className="fw-bold mb-2 text-white text-center">Signup</h2>
                <p className="text-white mb-3">Please Register Details</p>
                <form onSubmit={handleSubmit} className="text-areas">
                  <MDBInput
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    wrapperClass="mb-4 w-100"
                    style={{ color: "white" }}
                    label="Name"
                    id="formControlLg"
                    type="text"
                    name="name"
                    size="lg"
                  />
                  {touched.name && errors.name ? (
                    <p style={{ color: "crimson" }}>{errors.name}</p>
                  ) : (
                    ""
                  )}
                  <MDBInput
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.mobile}
                    wrapperClass="mb-4 w-100"
                    style={{ color: "white" }}
                    label="mobile"
                    id="formControlLg"
                    type="number"
                    name="mobile"
                    size="lg"
                  />
                  {touched.mobile && errors.mobile ? (
                    <p style={{ color: "crimson" }}>{errors.mobile}</p>
                  ) : (
                    ""
                  )}
                  <MDBInput
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    wrapperClass="mb-4 w-100"
                    style={{ color: "white" }}
                    label="Email address"
                    id="formControlLg"
                    type="email"
                    name="email"
                    size="lg"
                  />
                  {touched.email && errors.email ? (
                    <p style={{ color: "crimson" }}>{errors.email}</p>
                  ) : (
                    ""
                  )}
                  <MDBInput
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    wrapperClass="mb-4 w-100"
                    style={{ color: "white" }}
                    label="Password"
                    id="formControlLg"
                    type="password"
                    name="password"
                    size="lg"
                  />
                  {touched.password && errors.password ? (
                    <p style={{ color: "crimson" }}>{errors.password}</p>
                  ) : (
                    ""
                  )}

                  <MDBBtn type="submit" size="lg">
                    Signup
                  </MDBBtn>
                </form>
                <hr></hr>
                <div>
                  <p>
                    Already have an account?
                    <Link to="/login" style={{ color: "white" }}>
                      Login!
                    </Link>
                  </p>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
