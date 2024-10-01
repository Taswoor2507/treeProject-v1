import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { singleTreeThunk, STATUSES } from "@/redux/treeSlice/TreeSlice";
import treeImage from "../../assets/treesimg/tree1.jpg";
import QRCode from "../../assets/treesimg/QRCode.png";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import axiosInstance from "@/axiosCofig/axiosInstance";
import { getTreeComments } from "@/redux/commentSlice/CommentSlice";

export default function TreeDetails() {
  const { treeId } = useParams(); // Get the tree ID from the URL
  const dispatch = useDispatch();
  const tree = useSelector((state) => state?.treeReducer?.tree?.data); // Get the specific tree from state
  const allComments = useSelector((state) => state?.commentReducer);
  const currStatus = allComments?.status;
  const commentsList = allComments?.comments?.data?.comments || [];

  const [comment, setComment] = useState(""); // Add comment state
console.log("all comments " , commentsList)
  useEffect(() => {
    if (treeId) {
      dispatch(singleTreeThunk(treeId));
      dispatch(getTreeComments(treeId));
    }
  }, [dispatch, treeId]);

  if (!tree) {
    return <div>Loading....</div>;
  }

  if (currStatus === STATUSES.loading) {
    return <p>Loading comments....</p>;
  }

  if (currStatus === STATUSES.error) {
    return <p>Error in fetching comments.</p>;
  }

  const {qrCode , treeName, type, location, wateringSchedule, diseases, uses } = tree;

  // Handle form submit to send the comment to the backend
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (comment.trim() === "") {
      alert("Please enter a comment.");
      return;
    }

    try {
      const response = await axiosInstance.post(`/comments/add-comment`, {
        treeId,  // The ID of the tree you're commenting on
        content: comment,  // The comment entered by the user
      });

      if (response.status >= 200 && response.status < 300) {
        setComment(""); // Clear comment input
        alert("Comment submitted successfully!");
        dispatch(getTreeComments(treeId)); // Optionally refetch comments
      } else {
        console.error("Failed to submit comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-8 p-4 max-w-4xl mx-auto ">
        <div className="w-full h-[450px]">
          <img
            src={treeImage}
            alt="Tree"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full flex justify-around flex-col">
          <div className="w-full space-y-4">
            <div className="flex gap-5">
              <h1 className="text-xl font-bold">Tree Name</h1>
              <p className="text-green-600 font-semibold text-xl">{treeName}</p>
            </div>
            <div>
              <p className="text-green-600 font-semibold text-xl">Type</p>
              <p className="text-green-500 font-semibold text-lg">{type}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="text-sm text-gray-500">{location}</p>
            </div>
            <div>
              <p className="text-black">Watering Schedule</p>
              <p className="text-green-600">{wateringSchedule}</p>
            </div>
            <div>
              <p className="text-black">Diseases</p>
              <div className="flex gap-5">
                {diseases?.map((disease, index) => (
                  <p key={index} className="text-red-500 font-semibold text-sm">
                    {disease}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <p className="text-black">Uses</p>
              <p className="text-[#a1662f] font-semibold">{uses}</p>
            </div>
          </div>
          <div className="flex w-1/2">
            <img src={qrCode?.qrCodeUrl} alt="Tree" className="object-contain" />
          </div>
        </div>
      </div>

      {/* Comment Submission Form */}
      <div className="flex flex-col gap-8 p-4 max-w-4xl mx-auto border justify-between h-52 overflow-auto">
        <form onSubmit={handleCommentSubmit} className="w-full space-y-4">
          <Textarea
            placeholder="Type your message here."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit" className="bg-green-400 px-4 py-2 rounded-sm">
            Submit
          </button>
        </form>

        {/* Comments List */}
        <div className="w-full  ">
          {commentsList.length > 0 ? (
            commentsList.map((comment, index) => (
              <Card key={index} className="py-2 px-2">
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-avatar.jpg" alt="User Avatar" />
                      <AvatarFallback>{comment?.user?.fullName[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{comment?.user?.fullName}</p>
                      <p className="text-sm mt-5 text-gray-500">{comment.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No comments yet</p>
          )}
        </div>
      </div>
    </>
  );
}
