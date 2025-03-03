const { Contact } = require("../../models/contacts");

const { createError } = require("../../utils");

const updateById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await Contact.findByIdAndUpdate(contactId, req.body, {
            new: true,
        });
        if (!result) {
            throw createError(404);
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = updateById;