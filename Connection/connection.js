import mongoose from "mongoose";


mongoose
    .connect("mongodb://localhost:27017/youtubeBackend")
    .then(() => console.log("DB connection successful!"))
    .catch((err) => {
        console.log(err);
    });

const db = mongoose.connection;

db.on("open", () => {
    console.log("Database connection is successful")
})

db.on("error", () => {
    console.log("Connection is not successful")
})
export default db;