import express from "express";
const router = express.Router();
import Task from "../schema/taskSchema.mjs";
import tokenVerification from "../Middleware/tokenVerification.mjs";
import {
  createTask,
  getInCompleteTask,
  updateTask,
  getCompleteTask,
  deleteTask,
  updateCompleteTask,
  getLoggedInTask,
} from "../controller/taskController.mjs";

// Create-Task
router.post("/create-task", tokenVerification, createTask);
router.put("/update-task/:id", tokenVerification,updateTask);
router.put("/update-complete-task/:id", tokenVerification,updateCompleteTask);
router.put("/get-complete-task/:id", tokenVerification, getCompleteTask);
router.put("/get-incomplete-task/:id", tokenVerification, getInCompleteTask);
router.delete("/delete-task/:id",tokenVerification, deleteTask);
router.get("/get-all-tasks", tokenVerification, getLoggedInTask);

export default router;
