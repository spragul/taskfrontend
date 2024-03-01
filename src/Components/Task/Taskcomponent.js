import React from "react";
import { AppState } from "../Provider/Provider";
import Listtask from "./Listtask";
import Navbartop from "../NavBar.js/navbar";
import { Link } from "react-router-dom";

function Mytasklist() {
  const { task } = AppState();
  return (
    <Navbartop>
      {task.length === 0 ? (
        <div className="empty-container">
          <h1>Your Task List is Empty</h1>
          <p>Add Task Here</p>
          <Link className="empty-btn" to="/addtask">Add new task</Link>
        </div>
      ) : (
        <div className="total-background">
          <h1>Dashboard</h1>
          {task.map((value, index) => (
            <Listtask props={value} key={index} />
          ))}
        </div>
      )}
    </Navbartop>
  );
}
export default Mytasklist;
