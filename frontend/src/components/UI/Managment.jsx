import React, { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("todo");

  const statuses = ["todo", "inprogress", "done"];

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTask,
        status: "todo",
      },
    ]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTaskStatus = (id, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Task Management Board
      </h1>

      {/* Add Task */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Enter new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="p-2 border rounded-l-md w-80 focus:outline-none"
        />
        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>

      {/* Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statuses.map((status) => (
          <div key={status} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold capitalize mb-4 text-center">
              {status === "todo"
                ? "To Do"
                : status === "inprogress"
                ? "In Progress"
                : "Done"}
            </h2>
            <div className="space-y-4">
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <div
                    key={task.id}
                    className="bg-gray-100 p-3 rounded flex flex-col space-y-2"
                  >
                    <span className="text-lg">{task.title}</span>

                    <div className="flex justify-between items-center">
                      {/* Status Change */}
                      <select
                        value={task.status}
                        onChange={(e) =>
                          updateTaskStatus(task.id, e.target.value)
                        }
                        className="text-sm p-1 rounded border"
                      >
                        {statuses.map((option) => (
                          <option key={option} value={option}>
                            {option === "todo"
                              ? "To Do"
                              : option === "inprogress"
                              ? "In Progress"
                              : "Done"}
                          </option>
                        ))}
                      </select>

                      {/* Delete Button */}
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
