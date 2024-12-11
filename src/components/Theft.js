import { useState, useEffect } from "react";
import request from "../api/request";
import { ENDPOINTS } from "../api/endpoints";

const Theft = ({ park }) => {
  const [alertMsg, setAlertMsg] = useState("No thefts reported");

  const fetchAlert = async () => {
    try {
      const data = await request(ENDPOINTS.GET_ALERT, "GET");
      setAlertMsg(data.msg);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let intervalId;

    if (park) {
      intervalId = setInterval(() => {
        fetchAlert();
      }, 3000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [park]);

  return (
    <div>
      <h2 style={{ margin: 0 }}> Unauthorized Movement Alert</h2>
      <p>{alertMsg}</p>
    </div>
  );
};

export default Theft;
