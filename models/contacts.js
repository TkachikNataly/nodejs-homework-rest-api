const Joi = require("joi");
const { Schema, model } = require("mongoose");

const contactsSchema = new Schema({
    name: {
        type: String,
        required: [true, "Set name for contact"],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    }
});

const contactAddScheme = Joi.object({
    name: Joi.string().required(),
    email: Joi.string(),
    phone: Joi.string(),
    favorite: Joi.bool(),
});

const updateFavorite = Joi.object({
    favorite: Joi.bool().required(),
});

const schemas = {
    contactAddScheme,
    updateFavorite,
};

const Contact = model("contact", contactsSchema);

module.exports = {
    Contact,
    schemas,
};