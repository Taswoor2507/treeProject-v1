import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PenIcon, TrashIcon } from "lucide-react";

const leaves = [
  {
    image: "/placeholder.svg?height=32&width=32",
    name: "Johan Muhammad",
    Email: "exampleuser12345@gmail.com",
    reason: "User",
  },
  {
    image: "/placeholder.svg?height=32&width=32",
    name: "Md. Jobdul Islam",
    Email: "exampleuser12345@gmail.com",
    reason: "User",
  },
  {
    image: "/placeholder.svg?height=32&width=32",
    name: "Md. Touhidul Hoque",
    Email: "exampleuser12345@gmail.com",
    reason: "User",
  },
  {
    image: "/placeholder.svg?height=32&width=32",
    name: "Jubair Ahmad",
    Email: "exampleuser12345@gmail.com",
    reason: "User",
  },
  {
    image: "/placeholder.svg?height=32&width=32",
    name: "Sakib Al Hasan",
    Email: "exampleuser12345@gmail.com",
    status: "Rejected",
    reason: "Admin",
  },
];

export default function UserTable() {
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
          {leaves.map((leave, index) => (
            <TableRow key={index} className="border-b last:border-b-0">
              <TableCell className="font-medium">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={leave.image} alt={leave.name} />
                  <AvatarFallback>{leave.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{leave.name}</TableCell>
              <TableCell>{leave.Email}</TableCell>

              <TableCell>{leave.reason}</TableCell>
              <TableCell className="text-right">
                {/* <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <PenIcon className="h-4 w-4" />
                </Button> */}
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <TrashIcon className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
