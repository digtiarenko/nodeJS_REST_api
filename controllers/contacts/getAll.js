// const Contact = require('../../models/contact.js');
const services = require('../../services/contacts');

const getAll = async (req, res, next) => {
  const { id: owner } = req.user;
  const { page = 1, limit = 10, favorite = { $in: [true, false] } } = req.query;
  const skip = (page - 1) * limit;

  try {
    const result = await services.getAllContacts(owner, skip, limit, favorite);
    res.json(result).status(200);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = getAll;
