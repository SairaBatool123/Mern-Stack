import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/createUser/", { title, description })
      .then((result) => {
        console.log("User created:", result);
        setTitle("");
        setDescription("");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-8">Add Task</h1>
      <form
        onSubmit={Submit}
        className="bg-white w-full max-w-md mx-auto p-8 rounded-lg shadow-lg space-y-6"
      >
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-2 font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="mb-2 font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            placeholder="Enter Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-300"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default CreateTask;
