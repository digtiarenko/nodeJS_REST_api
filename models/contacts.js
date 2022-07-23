// const fs = require('fs/promises')

const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

const updateContacts = async data => {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, '\t'));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  // console.log(data);
  return JSON.parse(data);
};

const getContactById = async contactId => {
  const data = await listContacts();
  const oneContact = data.find(contact => contact.id === contactId);
  if (!oneContact) {
    return null;
  }
  return oneContact;
};

const removeContact = async contactId => {
  const data = await listContacts();
  const index = data.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removedContact] = data.splice(index, 1);
  await updateContacts(data);
  return removedContact;
};

const addContact = async ({ name, email, phone }) => {
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  data.push(newContact);
  await updateContacts(data);
  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const data = await listContacts();
  const index = data.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  data[index] = { name, email, phone };
  await updateContacts(data);
  return data[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
