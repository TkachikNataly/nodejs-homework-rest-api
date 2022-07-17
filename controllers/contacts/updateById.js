const contacts = require("../../models/contacts");
const { createError } = require("../../utils");
const { contactAddScheme } = require("../../shemas/contacts");



const updateById = async (req, res, next) => {
    try {
        const { error } = contactAddScheme.validate(req.body);
        if (error) {
            throw createError(400, error.message);
        }
        const { contactId } = req.params;
        const result = await contacts.updateContact(contactId, req.body);
        if (!result) {
            throw createError(404);
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = updateById;