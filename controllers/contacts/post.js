const services = require('../../services/contacts');
const { createError } = require('../../helpers');
const Joi = require('joi');

const contactAddSchema = Joi.object({
  name: Joi.string().max(50).required(),
  email: Joi.string(),
  phone: Joi.string()
    .pattern(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
    )
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
    const newContact = req.body;
    const { id: owner } = req.user;

    const result = await services.createNewContact({
      newContact,
      owner,
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = post;
