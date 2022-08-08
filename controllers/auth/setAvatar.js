const services = require('../../services/auth');
const path = require('path');
const fs = require('fs/promises');
const { createError } = require('../../helpers');
const Jimp = require('jimp');

const avatarsDir = path.join(__dirname, '..', '..', 'public', 'avatars');

const setAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempPath, originalname } = req.file;
  const [extension] = originalname.split('.').reverse();
  const newName = `${_id}.${extension}`;
  const uploadPath = path.join(avatarsDir, newName);
  Jimp.read(tempPath)
    .then(img => img.cover(250, 250).write(uploadPath))
    .catch(console.log);
  const avatarURL = path.join('avatars', newName);

  try {
    await fs.unlink(tempPath);
    const result = await services.changeAvatar(_id, avatarURL);
    if (!result) {
      throw createError(404);
    }
    res.status(200).json(result.avatarURL);
  } catch (error) {
    await fs.unlink(req.file.path);
    next(error);
  }
};

module.exports = setAvatar;
