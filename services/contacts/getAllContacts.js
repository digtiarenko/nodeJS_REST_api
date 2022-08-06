const Contact = require('../../models/contact.js');

const getAllContacts = async (owner, skip, limit, favorite) => {
  const data = await Contact.find(
    { owner, favorite },
    '-createdAt -updatedAt',
    {
      skip,
      limit: Number(limit),
    },
  ).populate('owner', 'name email');
  return data;
};

module.exports = getAllContacts;
