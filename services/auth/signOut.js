const { User } = require('../../models/user');

const signOut = async _id => {
  const user = await User.findByIdAndUpdate(_id, { token: '' }, { new: true });

  return user;
};

module.exports = signOut;
