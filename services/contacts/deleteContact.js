const Contact = require('../../models/contact.js');

const deleteContact = async contactId => {
  const data = await Contact.findByIdAndRemove(contactId);
  return data;
};

module.exports = deleteContact;
