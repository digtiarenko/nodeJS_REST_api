const register = require('./register');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logOut = require('./logOut');
const changeSubscription = require('./changeSubscription');
const setAvatar = require('./setAvatar');
const verifyEmail = require('./verify');
const secondVerify = require('./secondVerify');

module.exports = {
  register,
  login,
  getCurrent,
  logOut,
  changeSubscription,
  setAvatar,
  verifyEmail,
  secondVerify,
};
