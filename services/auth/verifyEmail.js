const { User } = require('../../models/user');
const { createError } = require('../../helpers');

const verifyEmail = async verificationToken => {
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw createError(404, 'User not found');
  }

  const data = await User.findByIdAndUpdate(
    user._id,
    {
      verificationToken: '',
      verified: true,
    },
    { new: true },
  );
  return data;
};

module.exports = verifyEmail;
