const { Contact, schemas } = require("../models/contact");
const { isValidObjectId } = require("mongoose");
const { createError } = require("../helpers");

const updateContact = async (req, res, next) => {
  try {
    const { error } = schemas.add.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { contactId } = req.params;
    const isValid = isValidObjectId(contactId);
    if (!isValid) {
      throw createError(404);
    }
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw createError(404);
    }
    res.status(200).json(result);
  } catch (error) {
    next(res.json(error.status, { message: error.message }));
  }
};

module.exports = updateContact;
