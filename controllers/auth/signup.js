const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const { createError } = require("../../utils");

const signup = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            throw createError(409, "Email in use");
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const result = await User.create({ ...req.body, password: hashPassword });
        res.status(201).json({
            user: {
                email: result.email,
                subscription: result.subscription,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = signup;