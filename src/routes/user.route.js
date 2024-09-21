import express from "express";
import { 
    deleteUser, 
    getAllUsers, 
    getUserById, 
    loginUser, 
    logoutUser, 
    refreshToken, 
    registerUser 
} from "../controlllers/user.controller.js"; // Fixed typo in controllers directory
import verifyJWT from "../middlewares/auth.middleware.js";
import authRole from "../middlewares/roleBaseAuth.middleware.js";

const router = express.Router();

// User registration
router.route("/register").post(registerUser);

// User login
router.route("/login").post(loginUser);

// Logout route, protected by JWT
router.route("/logout").post(verifyJWT, logoutUser);

// Delete user, only admin can delete a user, so verifyJWT and role-based auth are applied
router.route("/delete/:userId").delete(verifyJWT, authRole("admin"), deleteUser);

// Get all users (Uncomment the below line if you want only admin to access this route)
router.route("/all").get(verifyJWT, authRole("admin"), getAllUsers);

// Get user by ID (User must be authenticated)
router.route("/:userId").get(verifyJWT, getUserById);

// Refresh token route (This usually doesn't need JWT verification, depending on your use case)
router.route("/refreshtoken").get(refreshToken);

export default router;
