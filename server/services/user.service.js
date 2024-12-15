import User from '../model/user.js';

export async function getUserByUsername(username) {
    try {
        // Find the user by username
        console.log(`Looking for ${username}`)
        const user = await User.findOne({ user: username });

        // Return the user if found, otherwise return null
        if (user) {
            return user;
        } else {
            console.warn(`User not found: ${username}`);
            return null;
        }
    } catch (error) {
        console.error("Error retrieving user by username:", error);
        return null; // Return null to signal an error to the caller
    }
}
