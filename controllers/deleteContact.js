const { Contact } = require("../models/contact");
const { isValidObjectId } = require("mongoose");
const { createError } = require("../helpers");

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const isValid = isValidObjectId(contactId);
    if (!isValid) {
      throw createError(404);
    }
    const result = await Contact.findByIdAndDelete(`${contactId}`);
    if (!result) {
      throw createError(404);
    }
    res.json({
      message: "Contact deleted",
    });
  } catch (error) {
    next();
  }
};

module.exports = deleteContact;
