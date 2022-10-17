const express = require("express");
const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

const { auth, isValidId, validateBody } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAllContacts));

router.get("/:contactId", auth, isValidId, ctrlWrapper(ctrl.getContactById));

router.post("/", auth, validateBody(schemas.add), ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", auth, isValidId, ctrlWrapper(ctrl.deleteContact));

router.put(
  "/:contactId",
  auth,
  validateBody(schemas.add),
  isValidId,
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  auth,
  validateBody(schemas.updateFavorite),
  isValidId,
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
