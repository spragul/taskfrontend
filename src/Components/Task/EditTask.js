import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../../backend link";
import { toast } from "react-toastify";
import { Loading } from "../../Pages/Loading";
import { Editform } from "./Editform";
import Navbartop from "../NavBar.js/navbar";
import { AppState } from "../Provider/Provider";

function UpdateTask() {
  const { id } = useParams();
  const token = sessionStorage.getItem("token");
  const { task } = AppState();
  const [selecteddata, setSelecteddata] = useState({});

  //get data
  async function getdata(id) {
    try {
      const response = await axios.get(`${URL}/task/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      if (response.data.rd === true) {
        setSelecteddata(response.data.getonetask);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }

  useEffect(() => {
    //if data filter Context
    if (task.length > 0) {
      let data = task.filter((value) => {
        return value._id === id;
      });
      if (data[0]) {
        setSelecteddata(data[0]);
      }
    } else {
      getdata(id);
    }
  }, [id]);

  return (
    <Navbartop>
      {selecteddata._id ? <Editform props={selecteddata} /> : <Loading />}
    </Navbartop>
  );
}
export default UpdateTask;
