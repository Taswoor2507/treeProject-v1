import asyncHandler from "../utils/asyncHandler.util.js";
import Comment from "../models/comment.model.js";
import Tree from "../models/tree.model.js";
import ApiError from "../utils/apiError.utils.js";
import ApiResponse from "../utils/apiResponse.util.js";

// Add a comment to a tree
const addComment = asyncHandler(async (req, res, next) => {
    const { content, treeId } = req.body;
    const user = req?.user?.user;
    const userId = req?.user?.user.id;
    console.log("check user id " , userId);
    console.log("check user value", user)
    // const userId = req?.user?.id; // Get userId from auth middleware
     const userName = user.fullName;
    // Validation - Check if required fields are provided
    if (!content || !treeId) {
        return next(new ApiError("Content and Tree ID are required", 400));
    }

    // Check if the tree exists
    const tree = await Tree.findById(treeId);
    if (!tree) {
        return next(new ApiError("Tree not found", 404));
    }

    // Create a new comment
    const newComment = await Comment.create({
        content,
        user: userId,   // Link to the authenticated user
        tree: treeId,   // Link to the tree being commented on
    });

    // Respond with success
    return res.status(201).json(new ApiResponse(201, {newComment,userName}, "Comment added successfully"));
});



//get all comments of specific tree 
const getTreeComments = asyncHandler(async (req,res, next)=>{
    const { treeId } = req.params;

    // Check if the tree exists
    const tree = await Tree.findById(treeId);
    if (!tree) {
        return next(new ApiError("Tree not found", 404));
    }

    // Fetch all comments for the tree
    const comments = await Comment.find({tree: treeId}).populate("user", "fullName");

    // Respond with success
    return res.status(200).json(new ApiResponse(200, {comments}, "Comments found successfully"));
})


// get ALL Comments 
const getAllComments = asyncHandler(async (req,res, next)=>{
    const comments = await Comment.find().populate("user", "fullName");
    if(!comments || comments.length === 0){
        return next(new ApiError("No comments found", 404));  // If no comments found, return an error with status 404  and message "No comments found"
    }

    const totalComments = await Comment.countDocuments();
    return res.status(200).json(new ApiResponse(200, {totalComments,comments}, "All comments fetched successfully"));
})

// delete a comment
const deleteComment = asyncHandler(async(req,res,next)=>{
    const {commentId} = req.params
    const comment = await Comment.findById(commentId);
    if(!comment){
        return next(new ApiError("Comment not found", 404));
    }
   
    await Comment.findByIdAndDelete(comment.id);
    return res.status(200).json(new ApiResponse(200, {}, "Comment deleted successfully"));
    
})
export { addComment, getTreeComments , getAllComments , deleteComment};
