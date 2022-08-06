const { User } = require('../../models/user');
const bcrypt = require('bcrypt');
const { createError } = require('../../helpers');

const signUp = async (name, email, password) => {
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, `${email} is already exists`);
  }
  // creating new user
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ name, email, password: hashPassword });
  return result;
};

module.exports = signUp;
