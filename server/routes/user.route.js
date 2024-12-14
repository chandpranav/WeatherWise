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
//userRoute.get("/:email", checkUser, getUserData); // Read user by email
userRoute.post("/", createUser); // Create a new user
userRoute.post("/login", checkInput, checkUser, loginUser); // Login a user
//userRoute.patch("/:email", updateUserData); // Update user by email
//userRoute.delete("/:email", deleteUserData); // Delete user by email

export default userRoute;