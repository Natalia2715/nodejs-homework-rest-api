const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");

const getContactById = async (req, res) => {
  const contactId = req.params.contactId;
  const data = await Contact.findById(`${contactId}`);

  if (!data) {
    throw createError(404);
  }
  res.json(data);
};

module.exports = getContactById;
