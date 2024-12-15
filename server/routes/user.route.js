import { Router } from "express";
import {
  //getUserData,
  createUser,
  loginUser,
  //updateUserData,
  //deleteUserData,
} from "../controller/user.controller.js"; // Import controller functions
import checkInput from "../middleware/checkinput.middleware.js";
import checkUser from "../middleware/checkuser.middleware.js"; 

const userRoute = Router();

// Define all the routes for user-related operations
userRoute.post("/", checkInput, checkUser(false), createUser); // Create a new user
userRoute.post("/login", checkInput, checkUser(true), loginUser); // Login a user

export default userRoute;