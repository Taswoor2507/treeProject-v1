import { useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, userThunk } from "@/redux/userSlice/UserSlice";
import { STATUSES } from "@/redux/treeSlice/TreeSlice";

export default function UserTable() {
  const dispatch = useDispatch();

  // Fetch users when the component mounts
  useEffect(() => {
    dispatch(userThunk());
  }, [dispatch]);

  const { status } = useSelector(state => state.userReducer); // No need to drill into users.data.users
  const users  = useSelector(state => state.userReducer?.users?.data); // No need to drill into users.data.users
  // console.log("users all" , users?.users?.data?.data?.users); // Log the entire users state to check its structure
  

  const allUsers = users?.users
  if (status === STATUSES.loading) {
    return <div>Loading...</div>;
  }
  
  if (status === STATUSES.error) {
    return <div>Error fetching users</div>;
  }
  // console.log("check users " ,  users)
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allUsers ?  allUsers?.map((user, index) => (
            <TableRow key={user.id || index} className="border-b last:border-b-0">
              <TableCell className="font-medium">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user?.image} alt={user?.name} />
                  <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role || "User"}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <TrashIcon className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">No users found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
