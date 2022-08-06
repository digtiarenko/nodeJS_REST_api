const services = require('../../services/contacts');
const { createError } = require('../../helpers');

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await services.deleteContact(contactId);
    if (!result) {
      throw createError(404);
    }
    res.json({ message: 'Contact deleted', result });
  } catch (error) {
    next(error);
  }
};

module.exports = remove;
