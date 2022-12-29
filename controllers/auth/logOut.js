const services = require('../../services/auth');

const logOut = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const result = await services.signOut(_id);
    // console.log(result);
    res.status(204).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = logOut;
