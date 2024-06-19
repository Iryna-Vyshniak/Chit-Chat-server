import regExp from './regExp.js';

const required = [true, 'This field is required'];
const length = lgth => [lgth, `Must be ${lgth} characters or more`];
const emailRegex = [regExp.email, 'Invalid email'];
const genderEnum = ['male', 'female', 'other'];
const defaultAvatar = '';
const defaultPhone = '';
const defaultBirthday = '';

export {
    required,
    length,
    emailRegex,
    genderEnum,
    defaultAvatar,
    defaultPhone,
    defaultBirthday
};