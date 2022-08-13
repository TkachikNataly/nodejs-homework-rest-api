const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
    {
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "pro",
        },
        token: {
            type: String,
            default: null,
        },
        avatarURL: {
            type: String,
            required: true,
        },
    },
    { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

const signup = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
    subscription: Joi.string(),
    token: Joi.string(),
});

const login = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
});

const schemas = {
    signup,
    login,
};

module.exports = { User, schemas };
