const { User } = require('../../models/user');
const { createError } = require('../../helpers');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const signIn = async (email, password) => {
  // Unique user validation by email
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401, `User with email:${email} does not exists`);
  }
  // Validating password
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw createError(401, 'Password is wrong');
  }
  // creating token
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY);
  const loginedUser = await User.findByIdAndUpdate(
    user._id,
    { token },
    { new: true },
  );

  return loginedUser;
};

module.exports = signIn;
