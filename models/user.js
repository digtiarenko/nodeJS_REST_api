const { Schema, model } = require('mongoose');
const Joi = require('joi');

const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: true,
    },
    token: {
      type: String,
    },
    subscription: {
      type: String,
    },
    avatarURL: {
      type: String,
    },
    // verificationToken: {
    //   type: String,
    //   required: true,
    // },
    // verified: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  { versionKey: false, timestamps: true },
);

const User = model('user', userSchema);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const joiSchemas = {
  registerSchema,
  loginSchema,
  subscriptionSchema,
  emailSchema,
};

module.exports = { User, joiSchemas };
