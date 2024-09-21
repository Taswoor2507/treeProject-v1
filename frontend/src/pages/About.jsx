import TreeDetails from "@/components/TreeDetails/TreeDetails";
import TreeForm from "@/components/TreesForm/TreeForm";
import React from "react";

const About = () => {
  return (
    <>
      <div>
        <TreeDetails />
        <div className="w-full">
          <TreeForm />
        </div>
      </div>
    </>
  );
};

export default About;
