require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY } = process.env;

const sendEmail = async data => {
  sgMail.setApiKey(SENDGRID_API_KEY);
  // eslint-disable-next-line no-useless-catch
  try {
    await sgMail.send({ ...data, from: 'baggins999@gmail.com' });
    return true;
  } catch (error) {
    console.log('error:', error);
    throw error;
  }
};

module.exports = sendEmail;
