import mongoose from 'mongoose';

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

const dbConnect = async (): Promise<void> => {
  mongoose.set('strictQuery', true);
  if (connection.isConnected) {
    return console.log('DB is already connected');
  }
  if (!process.env.MONGODB_URI) {
    return console.log('Missing .env variable MONGODB_URI for DB connection');
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || '', {
      dbName: 'whisper',
    });
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log({ message: 'Failed to connect DB', error });
    process.exit();
  }
};

export default dbConnect;
