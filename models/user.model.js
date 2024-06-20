import { Schema, model } from 'mongoose';

import handleMongooseError from '../helpers/handleMongooseError.js';
import addUpdateSettings from '../helpers/addUpdateSettings.js';

import {  required, length, emailRegex, defaultAvatar, defaultPhone, defaultBirthday } from '../utils/constants.js';

const userSchema = new Schema(
    {
      fullName: {
        type: String,
        required,
      },
      username: {
        type: String,
        unique: true,
        required,
      },
      password: {
        type: String,
        minlength: length(7),
        required,
      },
      email: {
        type: String,
        unique: true,
        match: emailRegex,
        required,
      },
      gender: {
        type: String,
        required,
        enum: ['male', 'female', 'other'],
      },
      avatar: {
        type: String,
        default: defaultAvatar,
      },
      phone: {
        type: String,
        default: defaultPhone,
      },
      birthday: {
        type: String,
        default: defaultBirthday,
      }
    },
    { versionKey: false, timestamps: true }
  );
  
  userSchema.post('save', handleMongooseError);
  userSchema.pre('findOneAndUpdate', addUpdateSettings);
  userSchema.post('findOneAndUpdate', handleMongooseError);
  
  const User = model('User', userSchema);
  
  export default User;