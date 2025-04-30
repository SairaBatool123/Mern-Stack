import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import { handleError, handleSuccess } from "../../utils/utils";
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_API_BASEURL;

function Card({ home }) {
  // FORM 
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
   const headersUpdateTask = {
     userId: localStorage.getItem("userId"),
     Authorization: `Bearer ${localStorage.getItem("token")}`,
   };
  const handleCompleteTask = async (id) => {
    try {
      const response = await axios.put(
        `${apiUrl}/task/update-complete-task/${id}`,
        {},
        {
          headers: headersUpdateTask,
        }
      );
      handleSuccess("Task Updated", response);
    } catch (error) {
      handleError(error);
      console.log(error);
    }
    setData((prevData) => ({
      ...prevData,
      tasks: prevData.tasks.map((task) =>
        task._id === id ? { ...task, complete: !task.complete } : task
      ),
    }));
  };
  // GET ALL TASKS
  const [Data, setData] = useState();
  const headersGet = {
    userId: localStorage.getItem("userId"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    //  const token = localStorage.getItem("token")
    const fetch = async () => {
      // console.log("Headers being sent: ", headers); // ADD THIS
      const response = await axios.get(`${apiUrl}/task/get-all-tasks`, {
        headers: headersGet,
      });
      console.log(response.data);
      setData(response.data.user);
    };
    fetch();
  }, []);
  // Data && console.log(Data.tasks);

  // ADD/CREATE TASK
  const headers = {
    userId: localStorage.getItem("userId"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
 const handleAddTask = async () => {
   try {
     const response = await axios.post(
       `${apiUrl}/task/create-task`,
       {
         title,
         description,
       },
       {
         headers,
       }
     );
     handleSuccess("Task Created", response);

     // Form close and clear
     setShowForm(false);

     // Refresh tasks
     setData((prevData) => ({
       ...prevData,
       tasks: [...prevData.tasks, response.data.task], // assuming API returns { task: {...} }
     }));
   } catch (error) {
     handleError("User Should be a Logged In", error);
     console.log("Add Task Error:", error);
   }
 };
  // DELETE TASK
  const headersDelete = {
    userId: localStorage.getItem("userId"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
 let deleteTask = async (id) => {
   try {
     const response = await axios.delete(`${apiUrl}/task/delete-task/${id}`, {
       headers: headersDelete,
     });

     handleSuccess("Task Deleted", response);

     // Only update state if delete succeeded
     setData((prevData) => ({
       ...prevData,
       tasks: prevData.tasks.filter((task) => task._id !== id),
     }));
   } catch (error) {
     handleError(error);
     console.error("Delete Task Error:", error);
   }
 };
  return (
    <>
      {home === "true" && (
        <>
          <div
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl duration-300 p-6 flex flex-col justify-between hover:scale-105 hover:cursor-pointer transition-all m-6"
            onClick={() => setShowForm(true)}
          >
            <FontAwesomeIcon icon={faAdd} className="text-2xl mt-10" />
            <h2 className="text-xl text-center mb-10">Add Task</h2>
          </div>
          {showForm && (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 bg-white p-6 rounded-xl shadow-md m-6">
              <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 mb-3 rounded border"
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 mb-3 rounded border"
              />
              <div className="flex gap-4">
                <button
                  onClick={handleAddTask}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Add +
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {Data &&
          Data.tasks &&
          Data.tasks.map((items, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col justify-between"
            >
              <div className="flex justify-end gap-6 text-gray-600 text-xl">
                <FontAwesomeIcon
                  icon={faTrash}
                  className="hover:text-red-500 cursor-pointer transition duration-300"
                  onClick={() => deleteTask(items._id)}
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {items.title}
                </h3>
                <p className="text-gray-600">{items.description}</p>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  className={`${
                    items.complete === false ? "bg-fuchsia-800" : "bg-green-700"
                  } text-white py-2 rounded font-semibold transition duration-300 hover:cursor-pointer`}
                  onClick={() => handleCompleteTask(items._id)}
                >
                  {items.complete === true ? "Complete" : "In Progress"}
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Card;
