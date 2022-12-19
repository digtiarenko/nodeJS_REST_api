const services = require('../../services/auth');

const logOut = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await services.signOut(_id);
    // console.log(result);
    res.status(204);
  } catch (error) {
    next(error);
  }
};

module.exports = logOut;
