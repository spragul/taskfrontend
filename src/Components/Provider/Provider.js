import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { URL } from "../../backend link";
import { toast } from "react-toastify";
import axios from "axios";

const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [task, setTask] = useState([]);
  const [refresh, setRefresh] = useState(0);

  const token = sessionStorage.getItem("token");
  useEffect(() => {
    const getDetails = async () => {
      try {
        let response = await axios.get(`${URL}/task`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response) {
          if (response.data.rd) {
            console.log(response.data.task)
            toast.success(response.data.message);
            setTask(response.data.task);
          }else{
            toast.error(response.data.message);
          }
        }
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    };
    if (token) {
      getDetails();
    }
  }, [refresh]);

  return (
    <AppContext.Provider
      value={{
        task,
        setTask,
        refresh,
        setRefresh,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const AppState = () => {
  return useContext(AppContext);
};
export default AppProvider;
