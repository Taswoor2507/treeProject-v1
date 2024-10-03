import TreeDetails from "@/components/TreeDetails/TreeDetails";
import TreeForm from "@/components/TreesForm/TreeForm";
import React from "react";

const About = () => {
  return (
    <>
      <div>
        {/* <TreeDetails /> */}
        <div className="w-full">
          <div className="inner mx-w-7xl mx-auto min-h-[100vh] bg-slate-600 p-6">
            <p className="mb-4 text-[24px] text-white">
              Welcome to our Tree Identification and Information Management
              System! Our mission is to provide a comprehensive platform for
              tracking and managing trees, making it easier for users to access
              detailed information about various tree species. Through our web
              and mobile applications, we aim to offer essential data on trees
              such as their names, types, locations, watering schedules, growth
              patterns, and more.
            </p>
            <p className="mb-4 text-[24px] text-white"> 
              Our system is designed to help preserve records of trees, maintain
              accurate growth data, and detect any signs of damage or disease.
              By integrating technology with environmental care, we make tree
              information accessible to everyone—from students and educators to
              city planners and environmentalists.
            </p>
            <p className="mb-4 text-[24px] text-white">
              With the help of QR code technology, we provide an easy way to
              identify trees and access their information quickly. Our project
              also offers expert tips on tree care, such as proper planting,
              watering, and fertilization, promoting better tree management
              practices.
            </p>
            <p className="mb-4 text-[24px] text-white">
              We are passionate about contributing to urban forestry, botanical
              education, and environmental preservation. Join us in making the
              world greener, one tree at a time!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
