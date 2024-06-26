import mongoose from 'mongoose';

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('Database connection successful');
  } catch (error) {
    console.log('Error connecting to MongoDB', error.message);
    process.exit(1);
  }
};

export default connectToMongoDB;