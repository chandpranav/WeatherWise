import { getUserByEmail } from "../services/user.service.js"; // Ensure the correct import

const checkUser = async (req, res, next) => {
  try {
    const email = req.params.email; // Use a descriptive parameter name
    const user = await getUserByEmail(email); // Fetch user by email

    // Check if user does not exist
    if (!user) {
      throw new Error("User does not exist");
    }

    next(); // User exists, proceed to the next middleware or route handler
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(404).json({ error: err.message || "User not found" }); // Return a 404 status for not found
  }
};

export default checkUser;