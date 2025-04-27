import React, { useState } from "react";

const TaskForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") return;
    onSubmit({ title, assignedTo });
    setTitle("");
    setAssignedTo("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "20px" }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        required
      />
      <input
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        placeholder="Assign To"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
