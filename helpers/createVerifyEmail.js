const { BASE_URL } = process.env;

const createVerifyEmail = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: "registration confirm",
    html: `<a href="${BASE_URL}/api/users/verify/:${verificationToken}" target="_blank">Press to confirm email</a>`,
  };
  return mail;
};

module.exports = createVerifyEmail;
