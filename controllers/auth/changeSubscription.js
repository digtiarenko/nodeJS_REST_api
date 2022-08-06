const { joiSchemas } = require('../../models/user');
const services = require('../../services/auth');

const { createError } = require('../../helpers');

const changeSubscription = async (req, res, next) => {
  try {
    const { error } = joiSchemas.subscriptionSchema.validate(req.body);
    if (error) {
      throw createError(404, error.message);
    }
    const { subscription } = req.body;
    const { _id } = req.user;

    const result = await services.changeSubscription(_id, subscription);
    if (!result) {
      throw createError(404);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = changeSubscription;
