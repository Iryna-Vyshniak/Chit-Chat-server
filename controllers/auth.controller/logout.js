import connectToMongoDB from '../../db/connectToMongoDB.js';
import ctrlWrapper from '../../decorators/controllerWrapper.js';

const logout = ctrlWrapper(async (req, res) => {
  await connectToMongoDB();

  res.cookie('jwt', '', { maxAge: 0 });

  res.status(200).json({
    data: {
      message: 'Successfully logged out',
    },
  });
});

export default logout;