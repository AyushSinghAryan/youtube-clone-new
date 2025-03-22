import express from "express";
import AuthRoutes from "./Routes/user.routes.js";
import VideoRoutes from "./Routes/video.routes.js"
import CommetRoutes from "./Routes/comment.routes.js"
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
// app.use(cors({
//     origin: 'http://localhost:5173', //react app url
//     credentials: true
// }))
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        // Allow all origins
        callback(null, true);
    },
    credentials: true
}));

// use for parse body req
app.use(express.json());
// use for  parse and extract cookie data from HTTP requests
app.use(cookieParser());
const PORT = 3000;


app.use("/auth", AuthRoutes);
app.use("/api", VideoRoutes);
app.use("/commentApi", CommetRoutes);
// listen to the port 

const DB = "mongodb+srv://user007:test1234@cluster0.jn2ie.mongodb.net/newYoutube-clone?retryWrites=true&w=majority"

mongoose.connect(DB).then(() => {
    console.log("Connection Successful");
}).catch((e) => {
    console.log(e);
});



app.listen(PORT, "0.0.0.0", () => {
    console.log(`connected at port ${PORT} `);
});


//     "start": "nodemon server.js",
