const { Contact } = require("../../models/contacts");

const { createError } = require("../../utils");
const getById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await Contact.findById(contactId);
        if (!result) {
            throw createError(404);
        }
        res.json({ message: "Deleted" });
    } catch (error) {
        next(error);
    }
};

module.exports = getById;