import express from "express";
import authRole from "../middlewares/roleBaseAuth.middleware.js";
import { addTree, deleteTree, getAllTrees, getTreeById, updateTree } from "../controlllers/tree.controller.js";
const router = express.Router();

router.route("/add-tree").post(addTree)
router.route("/all").get(getAllTrees)
router.route("/:treeId").get(getTreeById)
router.route("/:treeId").patch(updateTree)
router.route("/:treeId").delete(deleteTree)
export default router;