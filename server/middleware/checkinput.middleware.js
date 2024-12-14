const checkInput = (req, res, next) => {
    const { user, password } = req.body;

    if (!user || !password) {
        return res.status(400).json({ message: "User and password are required" });
    }

    next(); // Proceed to the next middleware or controller
};

export default checkInput;
  