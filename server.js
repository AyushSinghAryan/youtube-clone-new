import express from "express";
import db from "./Connection/connection.js";
import AuthRoutes from "./Routes/user.routes.js";
import VideoRoutes from "./Routes/video.routes.js"
import CommetRoutes from "./Routes/comment.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(cors({
    origin: 'http://localhost:5173', //react app url
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());
const PORT = 3000;


app.use("/auth", AuthRoutes);
app.use("/api", VideoRoutes);
app.use("/commentApi", CommetRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})



//     "start": "nodemon server.js",
