import express from "express"
import { addComment, deleteComment, getAllComments, getTreeComments } from "../controlllers/comments.controller.js";
const router = express.Router();
import verifyJWT from "../middlewares/auth.middleware.js";

router.route("/add-comment").post(verifyJWT,addComment);
router.route("/get-all-comments/:treeId").get(getTreeComments);
router.route("/all").get(getAllComments);
router.route("/delete/:commentId").delete(deleteComment);
export default router;