import Router from "express";
import Favorite from "../model/favorite.js"
import User from "../model/user.js"; // Import the User model
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Create a user
const createUser = async (req, res) => {
  try {
    console.log("Creating a user");

    const { user, password } = req.body;

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the user with hashed password
    const newUser = await User.create({
      user,
      password: hashedPassword,
    });

    // Create the favorite object associated with the user
    await Favorite.create({ user: newUser.user, favoriteLocation: "" });

    // Return success response
    res.status(201).json({
      status: "success",
      data: {
        user: {
          id: newUser._id,
          user: newUser.user,
        },
      },
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({
      status: "fail",
      message: "Server error during user creation",
    });
  }
};


// Login user
const loginUser = async (req, res) => {
  try {
    console.log("Verifying password");

    const { password } = req.body;
    const user = req.user; // Retrieved from the middleware

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id }, // Payload
      process.env.JWT_SECRET || "yourSecretKey", // Secret key
      { expiresIn: "1h" } // Token expiration
    );

    // Successful login: Return token and user data
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

const setFavoriteLocation = async (req, res) => {
  const { user, favoriteLocation } = req.body;
  console.log("Setting Favorite Location")
  try {
    //checkuser
    const favorite = await Favorite.findOneAndUpdate(
      { user }, // Match the user
      { favoriteLocation }, // Update the favorite location
      { upsert: true, new: true } // Create if it doesn't exist, and return updated document
    );
    res.status(200).json({ message: "Favorite location updated", favorite });
  } catch (error) {
    console.error("Error setting favorite location:", error);
    res.status(500).json({ message: "Failed to update favorite location" });
  }
};

const getFavoriteLocation = async (req, res) => {
  const { user } = req.query; // Assuming `user` is passed as a query parameter
  console.log('Getting favorite location')
  try {
    //Checkuser

    // Find the favorite location for the user
    const favorite = await Favorite.findOne({ user });

    // If no favorite is found, return null
    if (!favorite || !favorite.favoriteLocation) {
      return res.status(200).json({ favoriteLocation: null });
    }

    // Return the favorite location
    res.status(200).json({ favoriteLocation: favorite.favoriteLocation });
  } catch (error) {
    console.error("Error fetching favorite location:", error);
    res.status(500).json({ message: "Failed to fetch favorite location." });
  }
};

const deleteUserData = async (req, res) => {
  try {
    const user = req.body.user; // Fetch the user from the request body
    console.log(`Deleting data for user: ${user}`);

    // Ensure `user` exists
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "User identifier is required",
      });
    }

    // Delete User and Favorite atomically
    const deletedUser = await User.findOneAndDelete({ user: user });
    const deletedFavorite = await Favorite.findOneAndDelete({ user: user });

    // Check if the user was found
    if (!deletedUser) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    // Response for successful deletion
    res.status(200).json({
      status: "success",
      message: "User and associated data deleted successfully",
      data: { deletedUser, deletedFavorite },
    });
  } catch (err) {
    console.error("Error deleting user:", err);

    // Handle unexpected errors
    res.status(500).json({
      status: "error",
      message: "An error occurred while deleting user data",
      error: err.message,
    });
  }
};

// Export the functions
export { createUser, loginUser, setFavoriteLocation, getFavoriteLocation, deleteUserData };