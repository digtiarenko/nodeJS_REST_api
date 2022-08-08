const Contact = require('../../models/contact.js');

const updateContact = async (contactId, name, email, phone, favorite) => {
  const updatedContact = { name, email, phone, favorite };
  const data = await Contact.findByIdAndUpdate(contactId, updatedContact, {
    new: true,
  });
  return data;
};

module.exports = updateContact;
