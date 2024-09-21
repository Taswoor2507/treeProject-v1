"use client";

import * as React from "react";
import { X, Bug } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MultiSelector() {
  const [tags, setTags] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue.trim());
    } else if (e.key === "Backspace" && !inputValue) {
      removeTag(tags[tags.length - 1]);
    }
  };

  const addTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleAddClick = () => {
    if (inputValue.trim()) {
      addTag(inputValue.trim());
    }
  };

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [tags]);

  return (
    <div className="w-full space-y-2">
      <Label htmlFor="dataPoints" className="text-green-700 flex items-center">
        <Bug className="mr-2 h-4 w-4" />
        Add Data Point(s)
      </Label>
      <div className="flex items-center w-full border border-green-300 rounded-md focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 bg-white">
        <div className="flex flex-wrap items-center flex-1 p-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center bg-green-100 text-green-800 text-sm rounded-md m-1 px-2 py-1"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 text-green-600 hover:text-green-800 focus:outline-none"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          <Input
            ref={inputRef}
            type="text"
            id="dataPoints"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 min-w-[50px] p-0 text-sm"
            placeholder={tags.length === 0 ? "Enter data points" : ""}
          />
        </div>
        <Button
          type="button"
          onClick={handleAddClick}
          className="m-1 bg-green-600 hover:bg-green-700 text-white"
        >
          Add
        </Button>
      </div>
    </div>
  );
}
