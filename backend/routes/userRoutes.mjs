import express from "express";
const router = express.Router();
import tokenVerification from "../Middleware/tokenVerification.mjs";
import { createUser, getAllUsers, updateUser, deleteUser, login, getLoggedInUser, isAdmin } from "../controller/userController.mjs";
import {
  loginValidation,
  signupValidation,
} from "../Middleware/userValidation.mjs";


router.get("/user",tokenVerification, getAllUsers);
router.post("/user", signupValidation, createUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
router.post("/user/login", loginValidation, login);
router.get("/user/me", tokenVerification, getLoggedInUser); // Fetch logged-in user's details
router.get('/isAdmin', tokenVerification, isAdmin);

export default router;