import asyncHandler from "../utils/asyncHandler.util.js";
import Tree from "../models/tree.model.js";
import QRcode from "../models/qrcode.model.js"
import ApiError from "../utils/apiError.utils.js";
import ApiResponse from "../utils/apiResponse.util.js";
import QrCode from "qrcode";

// Controller to add a new tree and its QR code
// Add a new tree
const addTree = asyncHandler(async (req, res, next) => {
    const { treeName, type, location, wateringSchedule, diseases, age, uses, qrCodeUrl } = req.body;
  
    // Validation
    if (!treeName || !type || !location || !age || !uses) {
      return next(new ApiError("All fields are required", 400));
    }
    const treeExist = await Tree.findOne({ treeName });
    if (treeExist) {
      return next(new ApiError("Tree name already exists", 400));
    }
  
    // Create tree
    const newTree = await Tree.create({
      treeName,
      type,
      location,
      wateringSchedule,
      diseases,
      age,
      uses,
    });

   

// Generate the QR code (this will generate a long URL)
  const generateQrCode= await QrCode.toDataURL(newTree._id.toString())

  if(!generateQrCode){
    return next(new ApiError("Failed to generate QR code", 500));
  }
    // Create QR code
    const newQrCode = await QRcode.create({
      tree: newTree._id,
      qrCodeUrl : generateQrCode
    });
  
    // Attach QR code to tree
    newTree.qrCode = newQrCode._id;
    await newTree.save();
  
    return res.status(201).json(new ApiResponse(201, {newTree, treeQrCode:generateQrCode}, "Tree added successfully"));
  });


  //get all trees 

const getAllTrees = asyncHandler(async(req,res,next)=>{
     const trees= await Tree.find({}).populate("qrCode");
     if(!trees ||trees.length === 0 ){
        return next(new ApiError("No trees found", 404));
     }
     const totalTrees = await Tree.countDocuments();

     return res.status(200).json(new ApiResponse(200, {totalTrees,trees}, "all trees"));
})


//controller get tree by id

const getTreeById = asyncHandler(async(req,res,next)=>{
 
    const { treeId } = req.params;

    // Find tree by ID
    const tree = await Tree.findById(treeId).populate("qrCode");

    if (!tree) {
      return next(new ApiError("Tree not found", 404));
    }

    return res.status(200).json(new ApiResponse(200, tree, "Tree found successfully"));

})


// Controller to update details of a specific tree by its ID
const updateTree = asyncHandler(async (req, res, next) => {
    const { treeId } = req.params;
    const { treeName, type, location, wateringSchedule, diseases, age, uses } = req.body;
  
    // Find the tree by ID
    const tree = await Tree.findById(treeId);
  
    // Check if tree exists
    if (!tree) {
      return next(new ApiError("Tree not found", 404));
    }
  
    // Check if the tree name already exists for another tree (if treeName is provided)
    if (treeName) {
      const treeWithSameName = await Tree.findOne({ treeName });
      if (treeWithSameName && treeWithSameName._id.toString() !== treeId) {
        return next(new ApiError("Tree name already exists", 400));
      }
    }
  
    // Update only the provided fields, leaving others unchanged
    if (treeName) tree.treeName = treeName;
    if (type) tree.type = type;
    if (location) tree.location = location;
    if (wateringSchedule) tree.wateringSchedule = wateringSchedule;
    if (diseases) tree.diseases = diseases || ['None']; // Default to 'None' if diseases not provided
    if (age) tree.age = age;
    if (uses) tree.uses = uses;
  
    // Save the updated tree
    const updatedTree = await tree.save();
  
    // Return a success response
    return res.status(200).json(new ApiResponse(200, updatedTree, "Tree updated successfully"));
  });
  
  

  //controller to delete  a tree based on id 
  const deleteTree = asyncHandler(async (req, res, next) => {
    const { treeId } = req.params;
  
    // Find the tree by ID first
    const tree = await Tree.findById(treeId);
  
    // Check if tree exists
    if (!tree) {
      return next(new ApiError("Tree not found", 404));
    }
  
    // Delete the associated QR code if it exists
    if (tree.qrCode) {
      await QRcode.findByIdAndDelete(tree.qrCode);
    }
  
    // Delete the tree after handling the QR code
    await Tree.findByIdAndDelete(treeId);
  
    // Return a success response
    return res.status(200).json(new ApiResponse(200, null, "Tree and associated QR code deleted successfully"));
  });
  


export { addTree,  getAllTrees , getTreeById, updateTree, deleteTree};
