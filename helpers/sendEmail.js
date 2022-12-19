require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY, DB_BASE_URL } = process.env;

const mailTo = email => ({
  to: email,
  subject: 'Verify your account',
  text: 'Follow this link to complete verifying',
  html: ` <strong>Follow this link to complete verifying</strong> <br/> <a target="_blank" href="${DB_BASE_URL}/api/users/verify/${user.verificationToken}">Click here</a>`,
});

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

module.exports = { sendEmail, mailTo };
