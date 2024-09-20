import express from "express";
import authRole from "../middlewares/roleBaseAuth.middleware.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import { addTree, deleteTree, getAllTrees, getTreeById, updateTree } from "../controlllers/tree.controller.js";
const router = express.Router();

router.route("/add-tree").post(addTree)
router.route("/all").get(getAllTrees)
router.route("/:treeId").get(getTreeById)
router.route("/:treeId").patch(verifyJWT , authRole("admin"), updateTree)
router.route("/:treeId").delete(verifyJWT , authRole("admin"),deleteTree)
export default router;