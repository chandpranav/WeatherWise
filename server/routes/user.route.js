import { Router } from "express";
import {
  createUser,
  loginUser,
  setFavoriteLocation,
  getFavoriteLocation,
  deleteUserData
} from "../controller/user.controller.js"; // Import controller functions
import checkInput from "../middleware/checkinput.middleware.js";
import checkUser from "../middleware/checkuser.middleware.js"; 

const userRoute = Router();

// Define all the routes for user-related operations
userRoute.post("/", checkInput, checkUser(false), createUser); // Create a new user
userRoute.post("/login", checkInput, checkUser(true), loginUser); // Login a user
userRoute.post("/setfavorite", checkUser(true), setFavoriteLocation); // Set a users favorite location
userRoute.get("/getfavorite", getFavoriteLocation); // Get a users favorite location
userRoute.delete("/delete", checkUser(true), deleteUserData); // Delete user by username

export default userRoute;