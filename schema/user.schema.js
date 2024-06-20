import Joi from 'joi';

import regExp from '../utils/regExp.js';
import emailJoi from '../utils/joiError.js';

// SIGNUP
export const userSignupSchema = Joi.object({
  fullName: Joi.string()
    .trim()
    .min(3)
    .max(20)
    .required()
    .messages({ 'any.required': 'Full Name is required' }),
  username: Joi.string()
    .trim()
    .required()
    .min(3)
    .max(20)
    .messages({ 'any.required': 'Unique username is required' }),
  password: Joi.string().min(7).required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({ 'any.only': '{{#label}} does not match password' }),
  email: Joi.string().pattern(regExp.email).required().error(emailJoi),
  gender: Joi.string().valid('male', 'female', 'other').required(),
});

// SIGNIN
export const userSigninSchema = Joi.object({
  email: Joi.string().pattern(regExp.email).required().error(emailJoi),
  password: Joi.string().min(7).required(),
});