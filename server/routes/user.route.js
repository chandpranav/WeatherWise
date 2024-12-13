import { Router } from "express";
import {
  //getUserData,
  createUser,
  //updateUserData,
  //deleteUserData,
} from "../controller/user.controller.js"; // Import controller functions
//import checkUser from "../middleware/checkuser.middleware.js"; // Import your middleware

const userRoute = Router();

// Define all the routes for user-related operations
//userRoute.get("/:email", checkUser, getUserData); // Read user by email
userRoute.post("/", createUser); // Create a new user
//userRoute.patch("/:email", updateUserData); // Update user by email
//userRoute.delete("/:email", deleteUserData); // Delete user by email

export default userRoute;