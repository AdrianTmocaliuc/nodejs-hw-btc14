const { Avatar } = require("../../models/avatars");

const fs = require("fs").promises;
const path = require("path");

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const saveAvatars = async (req, res, next) => {
  const { path: tempUpload, filename } = req.file;
  try {
    // console.log(req.file);
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const image = path.join("avatars", filename);
    const newAvatar = { ...req.body, avatar: image };
    //   console.log(newAvatar);
    await Avatar.create({ ...req.body });
    res.status(201).json(newAvatar);
  } catch (error) {
    await fs.unlink(tempUpload);
  }
};

module.exports = saveAvatars;
