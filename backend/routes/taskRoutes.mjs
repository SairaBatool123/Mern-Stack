import express from "express";
const router = express.Router();
import tokenVerification from "../Middleware/tokenVerification.mjs";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  moveTask,
} from "../controller/taskController.mjs";

router.post("/task", tokenVerification, createTask);
router.put("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);
// router.post("/task/login", loginValidation, login);
// router.get("/task/me", tokenVerification, getLoggedInTask);

export default router;
