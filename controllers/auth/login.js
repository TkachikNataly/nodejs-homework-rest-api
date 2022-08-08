const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");
const { createError } = require("../../utils");
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !bcrypt.compare(password, user.password)) {
            throw createError(401, "Email or password is wrong");
        }
        const payload = { id: user._id };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
        await User.findByIdAndUpdate(user._id, { token });
        res.json({ token });
    } catch (error) {
        next(error);
    }
};

module.exports = login;