import mongoose from "mongoose";
const connectionString = process.env.MONGOOSE_CONN;

export const connectdb = async () => {
    await mongoose.connect(connectionString).then(
        () => console.log("connected to database")
    );

}