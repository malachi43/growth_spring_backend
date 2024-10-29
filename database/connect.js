import mongoose from "mongoose";

const connectToDatabase = async url => {
    try {
        const connection = await mongoose.connect(url);
        return connection;
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default connectToDatabase;