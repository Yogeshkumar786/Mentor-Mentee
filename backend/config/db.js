import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/mentor-mentee')

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.once('open', () => {
  console.log('MongoDB connected successfully');
});

export default mongoose;