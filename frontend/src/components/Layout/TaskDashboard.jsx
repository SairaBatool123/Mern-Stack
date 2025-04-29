import React, { useEffect, useState } from "react";
import Header from "../UI/Header";
import Footer from "../UI/Footer";
import Card from "../UI/Card";
import axios from "axios";
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_API_BASEURL;

function TaskDashboard() {
  const [Data, setData] = useState();

  const headers = {
    userId: localStorage.getItem("userId"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    //  const token = localStorage.getItem("token")
    const fetch = async () => {
      // console.log("Headers being sent: ", headers); // ADD THIS

      const response = await axios.get(`${apiUrl}/task/get-all-tasks`, {
        headers,
      });
      // console.log(response.data);
      setData(response.data.user);
    };
    fetch();
  });
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 p-8">
        {Data && (
          <h1 className="text-3xl font-bold text-center mb-8">
            {`Welcome ${Data.name} On Task Management Board`}
          </h1>
        )}
        <Card home={"true"} />
        <Footer />
      </div>
    </>
  );
}

export default TaskDashboard;
