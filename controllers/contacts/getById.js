const Contact = require('../../models/contact.js');
const { createError } = require('../../helpers');

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw createError(404);
    }
    res.json(result).status(200);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
