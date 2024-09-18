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
    name: "Pine",
    Location: "Gilgit",
    Type: "Sacred Banyan",
  },
  {
    image: "/placeholder.svg?height=32&width=32",
    name: "Willow",
    Location: "Hunza",
    Type: "Silver Maple",
  },
  {
    image: "/placeholder.svg?height=32&width=32",
    name: "Palm",
    Location: "Skardu",
    Type: "Monterey Cypress",
  },
  {
    image: "/placeholder.svg?height=32&width=32",
    name: "Baobabd",
    Location: "Ghizar",
    Type: "Weeping Willow",
  },
  {
    image: "/placeholder.svg?height=32&width=32",
    name: "Birch",
    Location: "Danyoure",
    status: "Rejected",
    Type: "Eastern White Pine",
  },
];

export default function TreeTable() {
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
          {leaves.map((leave, index) => (
            <TableRow key={index} className="border-b last:border-b-0">
              <TableCell className="font-medium">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={leave.image} alt={leave.name} />
                  <AvatarFallback>{leave.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{leave.name}</TableCell>
              <TableCell>{leave.Location}</TableCell>

              <TableCell>{leave.Type}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <PenIcon className="h-4 w-4" />
                </Button>
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
