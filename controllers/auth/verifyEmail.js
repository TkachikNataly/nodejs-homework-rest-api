const { User } = require("../../models/user");
const { createError } = require("../../utils");

const verifyEmail = async (req, res, next) => {
    try {
        const { verificationToken } = req.params;
        const user = await User.findOne({ verificationToken });

        if (!user) {
            throw createError(404);
        }

        await User.findByIdAndUpdate(user._id, {
            verificationToken: null,
            verify: true,
        });

        res.json({ message: "Veirification successful" });
    } catch (error) {
        next(error);
    }


};

module.exports = verifyEmail;