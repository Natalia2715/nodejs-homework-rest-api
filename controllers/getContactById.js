const { Contact } = require("../models/contact");
const { createError } = require("../helpers");
const { isValidObjectId } = require("mongoose");

const getContactById = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const isValid = isValidObjectId(contactId);
    if (!isValid) {
      throw createError(404);
    }
    const data = await Contact.findById(`${contactId}`);

    if (!data) {
      throw createError(404);
    }
    res.json(data);
  } catch (error) {
    next();
  }
};

module.exports = getContactById;
