"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Leaf,
  Droplets,
  MapPin,
  Calendar,
  Bug,
  Clock,
  TreePine,
} from "lucide-react";

export default function TreeForm() {
  const [formData, setFormData] = useState({
    treeName: "",
    type: "",
    location: "",
    wateringSchedule: "",
    diseases: [],
    age: "",
    uses: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  const handleCheckboxChange = (disease) => {
    setFormData((prev) => ({
      ...prev,
      diseases: prev.diseases.includes(disease)
        ? prev.diseases.filter((d) => d !== disease)
        : [...prev.diseases, disease],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Here you would typically send the data to your backend
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-green-50 border-green-200">
      <CardHeader className="bg-green-100 border-b border-green-200">
        <CardTitle className="text-2xl font-bold text-green-800 flex items-center">
          <TreePine className="mr-2 h-6 w-6" />
          Tree Information Form
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="treeName"
              className="text-green-700 flex items-center"
            >
              <Leaf className="mr-2 h-4 w-4" />
              Tree Name
            </Label>
            <Input
              id="treeName"
              name="treeName"
              value={formData.treeName}
              onChange={handleInputChange}
              placeholder="Oak Tree"
              className="border-green-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-green-700 flex items-center">
              <TreePine className="mr-2 h-4 w-4" />
              Type
            </Label>
            <Select onValueChange={handleSelectChange} value={formData.type}>
              <SelectTrigger
                id="type"
                className="border-green-300 focus:border-green-500 focus:ring-green-500"
              >
                <SelectValue placeholder="Select tree type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Deciduous">Deciduous</SelectItem>
                <SelectItem value="Coniferous">Coniferous</SelectItem>
                <SelectItem value="Evergreen">Evergreen</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="location"
              className="text-green-700 flex items-center"
            >
              <MapPin className="mr-2 h-4 w-4" />
              Location
            </Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Park near City Center"
              className="border-green-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="wateringSchedule"
              className="text-green-700 flex items-center"
            >
              <Droplets className="mr-2 h-4 w-4" />
              Watering Schedule
            </Label>
            <Input
              id="wateringSchedule"
              name="wateringSchedule"
              value={formData.wateringSchedule}
              onChange={handleInputChange}
              placeholder="Weekly"
              className="border-green-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-green-700 flex items-center">
              <Bug className="mr-2 h-4 w-4" />
              Diseases
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {["Powdery mildew", "Root rot"].map((disease) => (
                <div key={disease} className="flex items-center space-x-2">
                  <Checkbox
                    id={disease}
                    checked={formData.diseases.includes(disease)}
                    onCheckedChange={() => handleCheckboxChange(disease)}
                    className="border-green-300 text-green-600 focus:ring-green-500"
                  />
                  <Label htmlFor={disease} className="text-green-700">
                    {disease}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="age" className="text-green-700 flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              Age
            </Label>
            <Input
              id="age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="50"
              className="border-green-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="uses" className="text-green-700 flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Uses
            </Label>
            <Textarea
              id="uses"
              name="uses"
              value={formData.uses}
              onChange={handleInputChange}
              placeholder="Furniture, Construction"
              className="border-green-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            Submit Tree Information
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
