const services = require('../../services/auth');

const logOut = async (req, res) => {
  const { _id } = req.user;
  const result = await services.signOut(_id);
  res.status(204).json(result);
};

module.exports = logOut;
