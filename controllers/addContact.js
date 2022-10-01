const { Contact, schemas } = require("../models/contact");
const { createError } = require("../helpers");

const addContact = async (req, res, next) => {
  try {
    const { error } = schemas.add.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const result = await Contact.create(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(res.json(error.status, { message: error.message }));
  }
};

module.exports = addContact;
