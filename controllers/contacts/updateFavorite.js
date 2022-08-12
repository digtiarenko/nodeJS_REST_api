const services = require('../../services/contacts');
const { createError } = require('../../helpers');
const Joi = require('joi');

const updateFavoriteContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const updateFavorite = async (req, res, next) => {
  try {
    const { error } = updateFavoriteContactSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { contactId } = req.params;
    const { favorite } = req.body;
    const result = await services.updateFavorite(contactId, favorite);
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateFavorite;
