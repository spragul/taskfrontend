import React from "react";
import { AppState } from "../Provider/Provider";
import Listtask from "./Listtask";
import Navbartop from "../NavBar.js/navbar";
import { Loading } from "../../Pages/Loading";

function Mytasklist() {
  const { task } = AppState();
  return (
    <Navbartop>
      {task.length === 0 ? (
        <Loading />
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
