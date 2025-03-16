import express from "express";
import { signUp, signIn, logout } from "../Controllers/user.controller.js";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", signIn);
router.post("/logout", logout)
export default router;