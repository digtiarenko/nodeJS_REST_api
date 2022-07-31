const Contact = require('../../models/contact.js');
const { createError } = require('../../helpers');
const Joi = require('joi');

const contactAddSchema = Joi.object({
  name: Joi.string().max(50).required(),
  email: Joi.string().required(),
  phone: Joi.string()
    .pattern(/^[0-9+()-_ ]*$/)
    .max(20)
    .required(),
  favorite: Joi.boolean(),
});

const post = async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = post;
