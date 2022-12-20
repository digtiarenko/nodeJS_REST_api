const Contact = require('../../models/contact.js');

// const getOneContact = async (contactId, _id) => {
//   const data = await Contact.find({
//     $and: [{ _id: contactId }, { owner: _id }],
//   });
//   return data;
// };

const getOneContact = async (contactId, _id) => {
  const data = await Contact.find({
    $and: [
      {
        _id: { $eq: contactId },
        owner: { $eq: _id },
      },
    ],
  });
  return data;
};
module.exports = getOneContact;
