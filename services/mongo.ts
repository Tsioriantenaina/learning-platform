import mongoose from 'mongoose';

export async function dbConnect() {
    try {
        const connexion = await mongoose.connect(`${process.env.MONGODB_CONNECTION_STRING}`);
        return connexion;
    } catch (error) {
        console.log(error);
    }

}