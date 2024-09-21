import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserTable from "../UserTable/UserTable";
import TreeTable from "../TreeTable/TreeTable";

export default function AllTabs() {
  return (
    <Tabs defaultValue="Users">
      <TabsList className="grid gap-4 grid-cols-2 ">
        <TabsTrigger value="Users">Users</TabsTrigger>
        <TabsTrigger value="Trees">Trees</TabsTrigger>
      </TabsList>
      <TabsContent value="Users">
        <div className="w-full ">
          <UserTable />
        </div>
      </TabsContent>
      <TabsContent value="Trees">
        <TreeTable />
      </TabsContent>
    </Tabs>
  );
}
