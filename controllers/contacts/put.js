const Contact = require('../../models/contact.js');
const { createError } = require('../../helpers');
const Joi = require('joi');

const putSchema = Joi.object({
  name: Joi.string().max(50),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  phone: Joi.string()
    .pattern(/^[0-9+()-_ ]*$/)
    .max(20),
});

const put = async (req, res, next) => {
  try {
    const { error } = putSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { name, email, phone, favorite } = req.body;
    if (!name && !email && !phone && favorite === undefined) {
      throw createError(400, 'Missing fields');
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

module.exports = put;
