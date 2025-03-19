import express from "express";
import { getAllVideo, getAllVideoByUserID, getVideoById, uploadVideo, updateVideo, deleteVideo } from "../Controllers/video.controller.js";
import auth from "../Middleware/authentication.js";
const router = express.Router();


router.post('/video', auth, uploadVideo);
router.get("/allVideo", getAllVideo);// here we don't give auth 
router.get("/getVideoById/:id", getVideoById);// pass id in url
router.get("/:userId/channel", getAllVideoByUserID)

router.put('/video/:id', auth, updateVideo);
router.delete('/video/:id', auth, deleteVideo);

export default router;