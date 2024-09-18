import express from "express";
import { deleteUser, getAllUsers, getUserById, loginUser, logoutUser, registerUser } from "../controlllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import authRole from "../middlewares/roleBaseAuth.middleware.js";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT ,logoutUser);
router.route("/delete/:userId").delete(verifyJWT , authRole("admin"),deleteUser);
router.route("/all").get(getAllUsers);
router.route("/:userId").get(verifyJWT ,getUserById);
export default router;


// router.route("/all").get(verifyJWT , authRole("admin"),getAllUsers);