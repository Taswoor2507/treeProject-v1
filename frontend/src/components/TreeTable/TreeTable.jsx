import * as React from "react";
import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PenIcon, TrashIcon } from "lucide-react";
import { deleteTreeThunk, STATUSES, treeThunk } from "@/redux/treeSlice/TreeSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast, Toaster } from "react-hot-toast"; // Import toast

export default function TreeTable() {
  const dispatch = useDispatch();

  // Combined useSelector for treeReducer
  const { status, trees } = useSelector((state) => state.treeReducer || {});

  // Fetch trees when component mounts
  useEffect(() => {
    dispatch(treeThunk());
  }, [dispatch]);

  // Handle delete action
  const handleDelete = async (treeId) => {
    try {
      const resultAction = await dispatch(deleteTreeThunk(treeId)).unwrap(); // Dispatch delete action
      if (resultAction.success) {
        toast.success("Tree deleted successfully!", { duration: 1500 });
        
        // Fetch the updated trees after successful deletion
        dispatch(treeThunk());
      } else {
        throw new Error("Failed to delete tree");
      }
    } catch (error) {
      toast.error("Error deleting tree.", { duration: 1500 });
    }
  };
    
  // Check loading and error states
  if (status === STATUSES.loading) {
    return <div>Loading...</div>;
  }
  if (status === STATUSES.error) {
    return <div>Error fetching trees</div>;
  }

  const treesData = trees?.data?.trees || [];

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Check if there are trees */}
          {treesData.length > 0 ? (
            treesData.map((tree, index) => (
              <TableRow key={index} className="border-b last:border-b-0">
                <TableCell className="font-medium">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={tree.image} alt={tree.name} />
                    <AvatarFallback>{tree.treeName.charAt(0)}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{tree.treeName}</TableCell>
                <TableCell>{tree.location}</TableCell>
                <TableCell>{tree.type}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <PenIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(tree._id)}
                    className="h-8 w-8 p-0"
                  >
                    <TrashIcon className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              {/* Show "No trees found" message when there are no trees */}
              <TableCell colSpan={5} className="text-center">
                No trees found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
