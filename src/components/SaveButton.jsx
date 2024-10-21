import React, { useRef } from "react";
import { useStore } from "@tanstack/react-store";
import { store } from "../store";
import { saveToLocalStorage } from "../utils/localStorage";
import { exportToPDF } from "../utils/pdfExport";
import { exportToJson, importFromJson } from "../utils/jsonUtils";
import { FaSave } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import { VscJson } from "react-icons/vsc";
import { CgPushRight } from "react-icons/cg";
import { CgPushLeft } from "react-icons/cg";

const SaveButton = () => {
  const basicInformation = useStore(store, (state) => state.basicInformation);
  const workExperience = useStore(store, (state) => state.workExperience);
  const education = useStore(store, (state) => state.education);
  const skills = useStore(store, (state) => state.skills);
  const summary = useStore(store, (state) => state.summary);
  const awards = useStore(store, (state) => state.awards);
  const volunteering = useStore(store, (state) => state.volunteering);
  const template = useStore(store, (state) => state.template);

  const fileInputRef = useRef(null);

  const handleSave = () => {
    const resumeData = {
      basicInformation,
      workExperience,
      education,
      skills,
      summary,
      awards,
      volunteering,
      template,
    };
    saveToLocalStorage("resumeData", resumeData);
    alert("Resume data saved successfully!");
  };

  const handlePrint = () => {
    exportToPDF("resume-preview", "resume.pdf");
  };

  const handleExportJson = () => {
    const resumeData = {
      basicInformation,
      workExperience,
      education,
      skills,
      summary,
      awards,
      volunteering,
      template,
    };
    exportToJson(resumeData);
  };

  const handleImportJson = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const resumeData = await importFromJson(file);
        store.setState((state) => ({
          ...state,
          basicInformation:
            resumeData.basicInformation || state.basicInformation,
          workExperience: resumeData.workExperience || state.workExperience,
          education: resumeData.education || state.education,
          skills: resumeData.skills || state.skills,
          summary: resumeData.summary || state.summary,
          awards: resumeData.awards || state.awards,
          volunteering: resumeData.volunteering || state.volunteering,
          template: resumeData.template || state.template,
        }));
        alert("Resume data imported successfully!");
      } catch (error) {
        alert("Failed to import resume data. Please check the file format.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={handleExportJson}
        className="bg-slate-700 text-white p-2 rounded ml-2 flex"
      >
        <VscJson />
        <CgPushRight />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="application/json"
        onChange={handleImportJson}
      />
      <button
        onClick={() => fileInputRef.current.click()}
        className="bg-slate-700 text-white p-2 rounded ml-2 flex"
      >
        <VscJson />
        <CgPushLeft />
      </button>
      <button
        onClick={handleSave}
        className="bg-slate-700 text-white p-2 ml-2 rounded"
      >
        <FaSave />
      </button>
      <button
        onClick={handlePrint}
        className="bg-green-700 text-white p-2 rounded ml-2 flex items-center"
      >
        <FaFilePdf />
        <span className="text-xs ml-1">Download PDF</span>
      </button>
    </div>
  );
};

export default SaveButton;
