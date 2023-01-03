const { User } = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;
const { createError } = require('../../helpers');

const signUp = async (name, email, password, avatarURL) => {
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, `${email} is already exists`);
  }
  // creating new user
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    avatarURL,
  });
  console.log('newUser', newUser);
  // creating token
  const payload = { id: newUser._id };
  const token = jwt.sign(payload, SECRET_KEY);

  const loginedUser = await User.findByIdAndUpdate(
    newUser._id,
    { token },
    { new: true },
  );
  return loginedUser;
};

module.exports = signUp;
