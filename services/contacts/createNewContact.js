const Contact = require('../../models/contact.js');

const createNewContact = async ({ newContact, owner }) => {
  const data = await Contact.create({ ...newContact, owner });
  return data;
};

module.exports = createNewContact;
