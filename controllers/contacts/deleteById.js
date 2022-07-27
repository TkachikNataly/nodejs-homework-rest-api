const { Contact } = require("../../models/contacts");

const { createError } = require("../../utils");

const deleteById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await Contact.findByIdAndRemove(contactId);
        if (!result) {
            throw createError(404);
        }
        res.json({
            message: "Book deleted",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = deleteById;