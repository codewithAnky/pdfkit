import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

const dbConnect = async () => {
    if (mongoose.connection.readyState >= 1) return;

    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log('MongoDB Connected')).catch(err => console.error(err));
};

export default dbConnect;
