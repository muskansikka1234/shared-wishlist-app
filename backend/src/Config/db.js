import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://msikka12356:detsX6fgZV8QynRf@cluster0.fdcjdtd.mongodb.net/crm?retryWrites=true&w=majority&appName=Cluster0"
    ).then(() => {
        console.log("DB connected");
        

    }).catch((error) => {
        console.log("MongoDB connection error", error);
    });
};