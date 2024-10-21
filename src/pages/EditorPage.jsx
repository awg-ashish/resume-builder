import React from "react";
import EditorLayout from "../components/EditorLayout";
import PreviewLayout from "../components/PreviewLayout";
import Navbar from "../components/Navbar";

const EditorPage = () => {
  return (
    <div className="flex bg-slate-100 h-screen">
      <div className="w-2/12">
        <Navbar />
      </div>
      <div className="w-6/12 p-2 m-2 mt-0 pt-0 border-rounded h-screen overflow-y-auto hide-scrollbar">
        <EditorLayout />
      </div>
      <div className="w-4/12 p-2 m-2 mt-0 pt-0 h-screen overflow-y-auto hide-scrollbar">
        <PreviewLayout />
      </div>
    </div>
  );
};

export default EditorPage;
