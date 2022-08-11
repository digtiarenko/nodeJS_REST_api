const { joiSchemas } = require('../../models/user');
const { createError, sendEmail } = require('../../helpers');
const services = require('../../services/auth');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');
const mail = require('@sendgrid/mail');

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
    const verificationToken = nanoid();
    const user = await services.signUp(
      name,
      email,
      password,
      avatarURL,
      verificationToken,
    );
    const mailTo = {
      to: mail,
      subject: 'Verify your account',
      html: `<a target="_blank" href="http://localhost:3000/users/verify/${verificationToken}"> </a>`,
    };
    await sendEmail(mailTo);
    res.status(201).json({
      name: user.name,
      email: user.email,
      avatarURL: user.avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
