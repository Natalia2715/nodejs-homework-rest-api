const { createError, createVerifyEmail, sendEmail } = require("../../helpers");
const { User } = require("../../models/user");

const resendVerify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(400, "Email not found");
  }

  if (user.verify) {
    throw createError(400, "Verification has already been passed");
  }
  const mail = createVerifyEmail(email, user.verificationToken);
  await sendEmail(mail);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerify;
