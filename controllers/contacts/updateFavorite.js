const Contact = require('../../models/contact.js');
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
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateFavorite;
