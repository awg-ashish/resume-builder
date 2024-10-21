import React from "react";
import BasicInformation from "./BasicInformation";
import WorkExperience from "./WorkExperience";
import Education from "./Education";
import Skills from "./Skills";
import Summary from "./Summary";
import Awards from "./Awards";
import Volunteering from "./Volunteering";
import TemplateSelection from "./TemplateSelection";
import SaveButton from "./SaveButton";

const EditorLayout = () => {
  return (
    <div className="p-4 pt-0 w-full">
      <div className="fixed z-10 w-[46%] bg-slate-100 border border-slate-100 rounded-xl pt-10 top-0">
        <div className="p-3 border rounded-xl bg-white border-white flex justify-between items-center shadow-2xl">
          <h1 className="text-3xl font-bold">Resume Editor</h1>
          <SaveButton />
        </div>
      </div>
      <div className="relative top-32 z-0 w-full">
        <BasicInformation />
        <WorkExperience />
        <Education />
        <Skills />
        <Summary />
        <Awards />
        <Volunteering />
        <TemplateSelection />
      </div>
    </div>
  );
};

export default EditorLayout;
