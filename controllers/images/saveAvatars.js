const fs = require("fs").promises;
const path = require("path");

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const saveAvatars = async (req, res, next) => {
  console.log(req.file);
  const { path: tempUpload, filename } = req.file;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
};

module.exports = saveAvatars;
