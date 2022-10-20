const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
const updateAvatar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const extention = originalname.split(".").pop();
    const filename = `${_id}.${extention}`;
    const resutUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resutUpload);
    await Jimp.read(resutUpload)
      .then((avatar) => {
        return avatar.resize(250, 250).write(resutUpload);
      })
      .catch((err) => {
        console.error(err);
      });
    const avatarUrl = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarUrl });
    res.json({ avatarUrl });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatar;
