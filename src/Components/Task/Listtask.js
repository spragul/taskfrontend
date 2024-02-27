import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../../backend link";
import { toast } from "react-toastify";
import { AppState } from "../Provider/Provider";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiOutlineExclamationCircle } from "react-icons/ai";

function Listtask({ props }, { index }) {
  const { task, setTask, refresh, setRefresh } = AppState();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  //task completion set true or false
  async function addtaskcomplete(chanestatus, id) {
    const data = { taskcompletion: chanestatus };
    console.log(data, id);
    const response = await axios.patch(`${URL}/task/complete/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.data.rd == true) {
      toast.success(response.data.message);
      setRefresh(refresh + 1);
    } else {
      toast.error(response.data.message);
    }
  }

  function addtaskcompleteStatus(status, id) {
    if (status === true) {
      addtaskcomplete(true, id);
    } else {
      addtaskcomplete(false, id);
    }
  }

  //delete task
  async function deletetask(id) {
    try {
      let response = await axios.delete(`${URL}/task/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.rd === true) {
        toast.success(response.data.message);
        const fitered = task.filter((value) => value._id !== id);
        setTask(fitered);
      } else {
        toast.warning(response.data.message);
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  }
  return (
    <div className="list-container ">
      <div
        className="list-card"
        style={{
          border: `10px solid ${props.taskcompletion ? "green" : "red"}`,
        }}
      >
        <div>
          <div className="list-header">
            <p>
              {props.taskcompletion == true ? (
                <AiOutlineCheckCircle className="task-icon bg-success" />
              ) : (
                <AiOutlineExclamationCircle className="task-icon bg-danger" />
              )}
            </p>
            <p>Mark status here</p>
            <p className="status-button">
              {props.taskcompletion == true ? (
                <button
                  className="notcomplete"
                  onClick={() => {
                    addtaskcompleteStatus(false, props._id);
                  }}
                >
                  Not Complete
                </button>
              ) : (
                <button
                  className="complete"
                  onClick={() => {
                    addtaskcompleteStatus(true, props._id);
                  }}
                >
                  Complete
                </button>
              )}
            </p>
          </div>
        </div>
        <div className="list-body">
          <div className="body-message">
            <h2>
              Task Title:<span>{props.taskname}</span>
            </h2>
            <p>
              Discription:<span>{props.discription}</span>
            </p>
            <p>
              Ending Date:<span>{props.endingdate.split("T")[0]}</span>
            </p>
          </div>
          <div className="btn-container">
            <button
              type="button"
              className="btn bg-primary details-btn"
              onClick={() => navigate(`/detailtask/${props._id}`)}
            >
              Details
            </button>
            <button
              type="button"
              className="btn bg-danger delete-btn"
              onClick={() => deletetask(props._id)}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn bg-secondary edit-btn"
              onClick={() => navigate(`/edittask/${props._id}`)}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listtask;
