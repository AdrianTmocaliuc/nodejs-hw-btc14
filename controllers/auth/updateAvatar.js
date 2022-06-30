const { User } = require("../../models/user");

const fs = require("fs").promises;
const path = require("path");

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateAvatars = async (req, res, next) => {
  const { path: tempUpload, filename } = req.file;
  try {
    const { _id: id } = req.user;

    // const [extension] = filename.split('.').reverse();
    // const name = `${id}.${extension}`
    const name = id + "." + filename;
    const image = path.join("avatars", name);

    const resultUpload = path.join(avatarsDir, name);
    await fs.rename(tempUpload, resultUpload);
    await User.findByIdAndUpdate(id, { avatarURL: image }, { new: true });

    res.json(image);
  } catch (error) {
    if (error.message("not such file")) {
      await fs.unlink(tempUpload);
    }
    throw error;
  }
};

module.exports = updateAvatars;
