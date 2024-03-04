import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../../backend link";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import Navbartop from "../NavBar.js/navbar";
import { AppState } from "../Provider/Provider";

//yup schema validetaion used on formik
const taskSchemaValidation = yup.object({
  taskname: yup
    .string()
    .min(5, "Please enter a TaskName more than 5 character")
    .max(150, "Please enter a TaskName more than 50 character")
    .required("Please Fill the task title "),
  discription: yup
    .string()
    .min(5, "Please enter a discription more than 5 character")
    .max(150, "Please enter a discription more than 150 character")
    .required("Please Fill the task Discription "),
  details: yup.string().required("Please Fill the task Details "),
  startingdate: yup.date(),
  endingdate: yup.date(),
});

function AddNewTask() {
  const { task, setTask } = AppState();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  //add task data
  async function myfun({ taskdetails }) {
    try {
      let response = await axios.post(`${URL}/task/createtask`, taskdetails, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.rd === true) {
        toast.success(response.data.message);
        const mydata = response.data.mytask;
        setTask([...task, mydata]);
        navigate("/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Error ${error}`);
    }
  }

  //formik controll
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        taskname: "",
        discription: "",
        details: "",
        startingdate: "",
        endingdate: "",
      },
      validationSchema: taskSchemaValidation,
      onSubmit: (taskdetails) => {
        myfun({ taskdetails });
      },
    });

  return (
    <Navbartop>
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-header" style={{ textAlign: "left" }}>
            <h2>Add New Task</h2>
          </div>
          <div className="card-body" style={{ textAlign: "left" }}>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Taskname</label>
                  <input
                    type="text"
                    name="taskname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.taskname}
                    className="form-control"
                  ></input>
                </div>
                {touched.taskname && errors.taskname ? (
                  <p style={{ color: "crimson" }}>{errors.taskname}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Discription</label>
                  <input
                    type="text"
                    name="discription"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.discription}
                    className="form-control"
                  ></input>
                </div>
                {touched.discription && errors.discription ? (
                  <p style={{ color: "crimson" }}>{errors.discription}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Details</label>
                  <input
                    type="text"
                    name="details"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.details}
                    className="form-control"
                  ></input>
                </div>
                {touched.details && errors.details ? (
                  <p style={{ color: "crimson" }}>{errors.details}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Starting Date</label>
                  <input
                    type="datetime-local"
                    name="startingdate"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.startingdate}
                    className="form-control"
                  ></input>
                </div>
                {touched.startingdate && errors.startingdate ? (
                  <p style={{ color: "crimson" }}>{errors.startingdate}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Ending Date</label>
                  <input
                     type="datetime-local"
                    name="endingdate"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.endingdate}
                    className="form-control"
                  ></input>
                </div>
                {touched.endingdate && errors.endingdate ? (
                  <p style={{ color: "crimson" }}>{errors.endingdate}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="card-footer" style={{ textAlign: "left" }}>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>{" "}
            |
            <Link className="btn btn-danger" to={"/dashboard"}>
              Back
            </Link>
          </div>
        </div>
      </form>
    </Navbartop>
  );
}

export default AddNewTask;
