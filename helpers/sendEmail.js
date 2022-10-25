const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;
const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "martiniuk_natalia@meta.ua",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  try {
    const mail = { ...data, from: "martiniuk_natalia@meta.ua" };

    await transport.sendMail(mail);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = sendEmail;
