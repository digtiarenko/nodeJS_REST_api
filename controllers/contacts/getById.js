const services = require('../../services/contacts');
const { createError } = require('../../helpers');

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  try {
    const result = await services.getOneContact(contactId, _id);
    if (!result) {
      throw createError(404);
    }
    res.json(result).status(200);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
