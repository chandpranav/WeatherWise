import Router from "express";
import User from "../model/user.js"; // Import the User model

// Create a user
const createUser = async (req, res) => {
  try {
    console.log("creating a user")
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Get user data by email
const getUserData = async (req, res) => {
  try {
    const email = req.params.email; // Use a more descriptive parameter name
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
    
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Update user data by email
const updateUserData = async (req, res) => {
  try {
    const email = req.params.email; // Use a more descriptive parameter name
    const updatedUser = await User.findOneAndUpdate(
      { email },
      req.body,
      { new: true, runValidators: true } // `new: true` returns the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Delete user data by username
const deleteUserData = async (req, res) => {
  try {
    const user = req.params.user; // Use a more descriptive parameter name
    const deletedUser = await User.findOneAndDelete({ user });

    if (!deletedUser) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Export the functions
export { createUser, getUserData, updateUserData, deleteUserData };