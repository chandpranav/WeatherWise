import User from '../model/user.js';

export async function getUserByUsername(username) {
    try {
        // Find the user by username
        const user = await User.findOne({ username });

        // Return the user if found
        if (user) {
            return user;
        } else {
            throw new Error("User not found");
        }
    } catch (error) {
        console.error("Error retrieving user by username:", error);
        throw new Error("Error retrieving user"); // Throw an error to the caller
    }
}
