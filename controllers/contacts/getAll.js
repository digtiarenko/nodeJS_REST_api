const Contact = require('../../models/contact.js');

const getAll = async (req, res, next) => {
  try {
    const { id: owner } = req.user;
    const result = await Contact.find(
      { owner },
      '-createdAt -updatedAt',
    ).populate('owner', 'name email');
    res.json(result).status(200);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = getAll;
