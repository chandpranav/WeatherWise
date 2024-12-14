import { getUserByUsername } from '../services/user.service.js';

const checkUser = async (req, res, next) => {
    try {
        const { username } = req.body;

        // Retrieve user using the service
        const user = await getUserByUsername(username);

        // Attach user to request object for downstream use
        req.user = user;
        next();
    } catch (error) {
        console.error("Error in checkUser middleware:", error);
        res.status(400).json({ message: error.message });
    }
};

export default checkUser;
