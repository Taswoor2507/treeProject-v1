import { Heart, BarChart2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import treeImage from "../../assets/treesimg/tree1.jpg";
import QRCode from "../../assets/treesimg/QRCode.png";

export default function TreeDetails() {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-8 p-4 max-w-4xl mx-auto border border-red-500">
        <div className="w-full h-[450px]">
          <img
            src={treeImage}
            alt="Tree"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full flex justify-around flex-col">
          <div className="w-full space-y-4">
            <h1 className="text-2xl font-bold">Tree Name</h1>
            <p className="text-green-600 font-semibold text-xl">Type</p>
            <p className="text-sm text-gray-500">location</p>
            <p className=" text-black">wateringSchedule </p>
            <p className=" text-black">diseases </p>
            <div className="flex gap-4">
              <p className="text-black">createdAt</p>
              <p className="text-black">updatedAt</p>
            </div>
          </div>
          <div className="flex  w-1/2">
            <img src={QRCode} alt="Tree" className="object-contain" />
          </div>
        </div>
      </div>
      <div className="flex flex-col  gap-8 p-4 max-w-4xl mx-auto border justify-between border-red-500">
        <div className="w-full space-y-4">
          <Textarea placeholder="Type your message here." />
          <button className="bg-green-400 px-4 py-2 rounded-sm">Submit</button>
        </div>
        <div className="w-full ">
          <Card className="py-2 px-2">
            {/* <CardHeader>
              <CardTitle>Comments</CardTitle>
            </CardHeader> */}
            <CardContent>
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src="/placeholder-avatar.jpg" alt="Jane Doe" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Jane Doe</p>
                  <p className="text-sm text-gray-500">
                    I really appreciate the insights and perspective shared in
                    this article. It's definitely given me something to think
                    about and has helped me see things from a different angle.
                    Thank you for writing and sharing!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
