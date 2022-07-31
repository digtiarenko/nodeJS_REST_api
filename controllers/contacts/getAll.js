const Contact = require('../../models/contact.js');

const getAll = async (req, res, next) => {
  try {
    const result = await Contact.find({});
    res.json(result).status(200);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = getAll;
