const Contact = require('../../models/contact.js');

const getOneContact = async contactId => {
  const data = await Contact.findById(contactId);
  return data;
};
module.exports = getOneContact;
