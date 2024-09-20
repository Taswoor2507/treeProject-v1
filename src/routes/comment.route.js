import express from "express"
import verifyJWT from "../middlewares/auth.middleware.js";
import authRole from "../middlewares/roleBaseAuth.middleware.js";
import { addComment, deleteComment, getAllComments, getTreeComments } from "../controlllers/comments.controller.js";
const router = express.Router();

router.route("/add-comment").post(verifyJWT,addComment);
router.route("/get-all-comments/:treeId").get(getTreeComments);
router.route("/all").get(verifyJWT , authRole("admin"), getAllComments);
router.route("/delete/:commentId").delete(verifyJWT , authRole("admin"), deleteComment);
export default router;