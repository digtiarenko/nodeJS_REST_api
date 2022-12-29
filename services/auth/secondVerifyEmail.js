const { User } = require('../../models/user');
const { createError, sendEmail, mailTo } = require('../../helpers');

const secondVerifyEmail = async email => {
  const user = await User.findOne({ email });

  if (!user) {
    throw createError(404);
  }
  if (user.verified) {
    throw createError(400, 'Verification has already been passed');
  }
  // const mailTo = {
  //   to: email,
  //   subject: 'Verify your account',
  //   text: 'Follow this link to complete verifying',
  //   html: ` <strong>Follow this link to complete verifying</strong> <br/> <a target="_blank" href="${DB_BASE_URL}/api/users/verify/${user.verificationToken}">Click here</a>`,
  // };
  await sendEmail(mailTo(email)).then(console.log(`Email sent to ${email} `));
  return user;
};

module.exports = secondVerifyEmail;
