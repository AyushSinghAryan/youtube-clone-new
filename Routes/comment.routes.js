import express from "express";
import { addComment, getCommentByVideoId, updateComment, deleteComment } from "../Controllers/comment.controller.js";
import auth from "../Middleware/authentication.js";
const router = express.Router();

router.post('/comment', auth, addComment);
// if user login then also user can read comment , if not then also read comment 
router.get("/comment/:videoId", getCommentByVideoId);

// Only the logged-in user can edit or delete their own comment
router.put('/comment/:id', auth, updateComment);
router.delete('/comment/:id', auth, deleteComment);
export default router;