// const Contact = require('../../models/contact.js');
const services = require('../../services/contacts');

const getAll = async (req, res, next) => {
  const result = await services.getAll(req, res, next);
  res.status(200).json(result);

  // try {
  //   const { id: owner } = req.user;
  //   const {
  //     page = 1,
  //     limit = 10,
  //     favorite = { $in: [true, false] },
  //   } = req.query;

  //   const skip = (page - 1) * limit;

  //   const result = await Contact.find(
  //     { owner, favorite },
  //     '-createdAt -updatedAt',
  //     {
  //       skip,
  //       limit: Number(limit),
  //     },
  //   ).populate('owner', 'name email');
  //   res.json(result).status(200);
  // } catch (error) {
  //   res.status(500).json({ message: 'Server Error' });
  // }
};

module.exports = getAll;
