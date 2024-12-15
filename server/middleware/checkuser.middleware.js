import { getUserByUsername } from '../services/user.service.js';

const checkUser = (shouldExist) => async (req, res, next) => {
  try {
    const { user } = req.body;
    console.log(user)
    // Retrieve user using the service
    const username = await getUserByUsername(user);

    // Handle behavior based on `shouldExist` parameter
    if (shouldExist && !username) {
      // User is required to exist
      return res.status(404).json({ message: "User not found" });
    }

    if (!shouldExist && username) {
      // User must not exist 
      console.log("Username is taken")
      return res.status(400).json({ message: "Username is already taken" });
    }

    req.user = username;
    next();
  } catch (error) {
    console.error("Error in checkUser middleware:", error);
    res.status(500).json({ message: "Server error in user validation" });
  }
};

export default checkUser;
