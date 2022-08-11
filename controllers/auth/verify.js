const services = require('../../services/auth');

const verify = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const result = await services.verifyEmail(verificationToken);
    res.status(200).json({ message: 'Verification successful', result });
  } catch (error) {
    next(error);
  }
};

module.exports = verify;
