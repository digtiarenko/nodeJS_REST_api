require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);
// const email = {
//   to: 'multibagginz@gmail.com', // Change to your recipient
//   from: 'baggins999@gmail.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };

const sendEmail = async data => {
  // eslint-disable-next-line no-useless-catch
  try {
    await sgMail.send({ data, from: 'baggins999@gmail.com' });
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
