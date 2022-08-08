const { User } = require('../../models/user');

const changeAvatar = async (_id, avatarURL) => {
  const data = await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });
  return data;
};

module.exports = changeAvatar;
