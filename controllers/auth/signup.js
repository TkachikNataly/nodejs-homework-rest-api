const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const { createError, sendEmail } = require("../../utils");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const signup = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            throw createError(409, "Email in use");
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const avatarURL = gravatar.url(email);
        const verificationToken = nanoid();

        const result = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken });
        const mail = {
            to: email,
            subject: "confirmation of registration on the website",
            html: `<a target ="_blank" href = "http://localhost:3000/api/verify/${verificationToken}">click to confirm registration</a>`
        };

        await sendEmail(mail);


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