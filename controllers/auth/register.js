const { joiSchemas } = require('../../models/user');
const { createError } = require('../../helpers');
const services = require('../../services/auth');
const gravatar = require('gravatar');
// const { nanoid } = require('nanoid');

const register = async (req, res, next) => {
  try {
    // Joi-schema validation
    const { error } = joiSchemas.registerSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    // Unique user validation
    const { name, email, password } = req.body;
    const avatarURL = gravatar.url(email);
    // const verificationToken = nanoid();
    const user = await services.signUp(name, email, password, avatarURL);
    // const mailTo = {
    //   to: email,
    //   subject: 'Verify your account',
    //   text: 'Follow this link to complete verifying',
    //   html: `<strong>'Follow this link to complete verifying'</strong> <br/> <a target="_blank" href="${DB_BASE_URL}/users/verify/${verificationToken}">Click here</a>`,
    // };
    // console.log(user);
    // await sendEmail(mailTo(email)).then(console.log(`Email sent to ${email} `));

    res.status(201).json({
      name: user.name,
      email: user.email,
      avatarURL: user.avatarURL,
      token: user.token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
