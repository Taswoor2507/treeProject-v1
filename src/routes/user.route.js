import express from "express";
import { registerUser } from "../controlllers/user.controller.js";
const router = express.Router();

router.route("/register").post(registerUser);
export default router;