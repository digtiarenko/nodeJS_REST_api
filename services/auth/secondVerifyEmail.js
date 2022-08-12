const { User } = require('../../models/user');
const { createError, sendEmail } = require('../../helpers');

const secondVerifyEmail = async email => {
  const user = await User.findOne({ email });

  if (!user) {
    throw createError(404);
  }
  if (user.verified) {
    throw createError(400, 'Verification has already been passed');
  }
  const mailTo = {
    to: email,
    subject: 'Verify your account',
    text: 'Follow this link to complete verifying',
    html: ` <strong>Follow this link to complete verifying</strong> <br/> <a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Click here</a>`,
  };
  await sendEmail(mailTo).then(console.log(`Email sent to ${email} `));
  return user;
};

module.exports = secondVerifyEmail;
