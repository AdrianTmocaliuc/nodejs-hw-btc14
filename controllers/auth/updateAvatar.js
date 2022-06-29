const { User } = require("../../models/user");

const fs = require("fs").promises;
const path = require("path");

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateAvatars = async (req, res, next) => {
  const { path: tempUpload, filename } = req.file;
  try {
    // console.log(req.user);
    const resultUpload = path.join(avatarsDir, filename);
    const image = path.join("avatars", filename);
    // const newAvatar = { ...req.body, avatarURL: image };
    await fs.rename(tempUpload, resultUpload);
    await User.findByIdAndUpdate(
      req.user._id,
      { avatarURL: image },
      { new: true }
    );
    //   console.log(newAvatar);
    // await User.create({ ...req.body });
    res.json(image);
  } catch (error) {
    if (error.message("not such file")) {
      await fs.unlink(tempUpload);
    }
    throw error;
  }
};

module.exports = updateAvatars;
