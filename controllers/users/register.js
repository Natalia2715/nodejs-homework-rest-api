const { User } = require("../../models/user");
const { createError, sendEmail, createVerifyEmail } = require("../../helpers");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();
  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const mail = createVerifyEmail(email, verificationToken);
  await sendEmail(mail);
  res.status(201).json({
    status: "success",
    code: 201,
    user: {
      email,
      subscription: result.subscription,
      verificationToken,
    },
  });
};

module.exports = register;
