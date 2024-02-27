import React, { useEffect, useState } from "react";
import { AppState } from "../Provider/Provider";
import axios from "axios";
import { URL } from "../../backend link";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbartop from "../NavBar.js/navbar";
import { Loading } from "../../Pages/Loading";

function TaskDetails() {
  const [data, setData] = useState({});
  const [count, setCount] = useState("");
  const { task } = AppState();
  const { id } = useParams();
  const token = sessionStorage.getItem("token");
  const mytask = task.filter((val) => val._id === id);

  //task completion
  async function addtaskcomplete(chanestatus, id) {
    const data = { taskcompletion: chanestatus };
    console.log(data, id);
    const response = await axios.patch(`${URL}/task/complete/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success(response.data.message);
    console.log(response);
    if (response.data.complete) {
      setCount(count + 1);
    }
  }

  //task Status
  function addtaskcompleteStatus(status, id) {
    if (status === true) {
      addtaskcomplete(true, id);
    } else {
      addtaskcomplete(false, id);
    }
  }

  //get task data
  useEffect(() => {
    async function gatdata() {
      try {
        let response = await axios.get(`${URL}/task/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.getonetask) {
          setData(response.data.getonetask);
          toast.success(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    }
    if (mytask[0]) {
      setData(mytask[0]);
    } else {
      gatdata();
    }
  }, [count]);
  return (
    <Navbartop>
      {data.taskname ? (
        <div className="detail-container">
          <div
            className="detail-card"
            style={{
              border: `10px solid ${data.taskcompletion ? "green" : "red"}`,
            }}
          >
            <h1>
              <span>{data.taskname}</span>
            </h1>
            <p>
              <span className="details-heading">Discription:</span>
              <span className="detail-body">{data.discription}</span>
            </p>
            <p>
              <span className="details-heading">Details:</span>
              <span className="detail-body">{data.details}</span>
            </p>
            <p>
              <span className="details-heading">Starting Date:</span>
              <span className="detail-body">
                {data.startingdate.split("T")[0]}
              </span>
            </p>
            <p>
              <span className="details-heading">Ending Date:</span>
              <span className="detail-body">
                {data.endingdate.split("T")[0]}
              </span>
            </p>
            <p>
              <span className="details-heading">Taskcompletion:</span>
              <span className="detail-body">
                {data.taskcompletion === true ? (
                  <span>true</span>
                ) : (
                  <span>false</span>
                )}
              </span>
            </p>
            <p>
              <p>Task Complete status change here</p>
              {data.taskcompletion == true ? (
                <button
                  className="notcomplete"
                  onClick={() => {
                    addtaskcompleteStatus(false, data._id);
                  }}
                >
                  Not Complete
                </button>
              ) : (
                <button
                  className="complete"
                  onClick={() => {
                    addtaskcompleteStatus(true, data._id);
                  }}
                >
                  Complete
                </button>
              )}
            </p>
            <p className="details-back">
              <Link
                style={{ marginTop: "5px" }}
                className="btn btn-success"
                to={"/dashboard"}
              >
                Back
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </Navbartop>
  );
}

export default TaskDetails;
