import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Tree = ({ tree }) => {
  return (
    <div>
      <Card className="">
        <CardHeader className="p-0">
          <img
            src={
              "https://img.freepik.com/free-photo/photorealistic-view-tree-nature-with-branches-trunk_23-2151478087.jpg?t=st=1726600357~exp=1726603957~hmac=57ee43e7f1c79b233447aaa91d707f3e3f24e969e5b793407bf31ec1bc08b907&w=740"
            }
            alt={tree.treeName}
            className="w-full h-[200px] object-cover"
          />
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg font-semibold mb-2">
            {tree.treeName}
          </CardTitle>
          <p className="text-sm text-gray-600">Type: {tree.type}</p>
          <p className="text-sm text-gray-600">Location: {tree.location}</p>
        </CardContent>
        <CardFooter>
          <button className="w-full bg-black text-white px-4 py-2 rounded-sm">
            View Details
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Tree;
