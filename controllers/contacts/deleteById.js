const contacts = require("../../models/contacts");
const { createError } = require("../../utils");

const deleteById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await contacts.removeContact(contactId);
        if (!result) {
            throw createError(404);
        }
        res.json({
            message: "contact deleted",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = deleteById;