import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import React from "react";
import { URL } from "../../backend link";
import { AppState } from "../Provider/Provider";

//Schema from yup
const taskSchemaValidation = yup.object({
  _id: yup.string(),
  taskname: yup.string().required("Please Fill the task title "),
  discription: yup.string().required("Please Fill the task Discription "),
  details: yup.string().required("Please Fill the task Details "),
  startingdate: yup.date(),
  taskcompletion: yup.boolean().required(),
  endingdate: yup.date(),
});

export function Editform({ props }) {
  console.log(props);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const { task, setTask } = AppState();

  //update task Details
  async function edittask(taskupdate) {
    try {
      let response = await axios.put(`${URL}/task/edit`, taskupdate, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.rd === true) {
        toast.success(response.data.message);
        let data = response.data.task;
        let getdata = task.filter((value) => {
          return value._id !== response.data.task._id;
        });
        setTask([...getdata, data]);
        navigate("/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Error ${error}`);
    }
  }
  //useFormik access
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        _id: props._id,
        taskname: props.taskname,
        discription: props.discription,
        details: props.details,
        startingdate: props.startingdate.split("T")[0],
        endingdate: props.endingdate.split("T")[0],
        taskcompletion: props.taskcompletion,
      },
      validationSchema: taskSchemaValidation,
      onSubmit: (task1) => {
        console.log({ task1 });
        edittask(task1);
      },
    });
  return (
    <form onSubmit={handleSubmit}>
      <div className="card">
        <div className="card-header" style={{ textAlign: "left" }}>
          <h2>Edit Task</h2>
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
                  type="date"
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
                  type="date"
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
          <div className="form-group">
            <label>taskcompletion</label>
            <div>
              <select
                value={values.taskcompletion}
                onChange={handleChange}
                name="taskcompletion"
                className="dropdown-select form-control"
              >
                <option>true</option>
                <option>false</option>
              </select>
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
  );
}
