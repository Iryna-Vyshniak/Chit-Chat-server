import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d',
  });

  res.cookie('jwt', token, {
    //   for security reasons
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15days 24hours 60min 60s 1000ms => MS
    httpOnly: true, // the user will not access this cookie via JavaScript. Prevent XSS attacks cross-site scripting attacks
    sameSite: 'None', // Set 'sameSite' to 'None' to ensure cookies are sent with cross-site requests
    secure: true,
  });
};

export default generateTokenAndSetCookie;