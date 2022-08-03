const Contact = require('../models/contact.js');

const getAll = async (req, res, next) => {
  try {
    const { id: owner } = req.user;
    const {
      page = 1,
      limit = 10,
      favorite = { $in: [true, false] },
    } = req.query;

    const skip = (page - 1) * limit;

    const data = await Contact.find(
      { owner, favorite },
      '-createdAt -updatedAt',
      {
        skip,
        limit: Number(limit),
      },
    ).populate('owner', 'name email');
    return data;
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const services = { getAll };
module.exports = services;
