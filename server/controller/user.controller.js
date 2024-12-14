import Router from "express";
import User from "../model/user.js"; // Import the User model
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Create a user
const createUser = async (req, res) => {
  try {
    console.log("Creating a user");

    const { user, password } = req.body;

    // Validate input
    if (!user || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Username and password are required",
      });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ user });
    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "Username is already taken",
      });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the user with hashed password
    const newUser = await User.create({
      user,
      password: hashedPassword,
    });

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
export { createUser, getUserData, updateUserData, deleteUserData, loginUser };