const Contact = require('../../models/contact.js');

const updateFavorite = async (contactId, favorite) => {
  const data = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    },
  );
  return data;
};

module.exports = updateFavorite;
