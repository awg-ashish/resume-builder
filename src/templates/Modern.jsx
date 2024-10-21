import React, { useEffect, useRef } from "react";
import { useStore } from "@tanstack/react-store";
import { store } from "../store";
import html2canvas from "html2canvas";

const Modern = ({ data }) => {
  const {
    basicInformation,
    workExperience,
    education,
    skills,
    summary,
    awards,
    volunteering,
  } = data;
  const canvasRef = useRef(null);
  const resumeRef = useRef(null);

  // Function to capture the content of the resume into a canvas
  const captureToCanvas = async () => {
    const canvas = await html2canvas(resumeRef.current, {
      scale: 1, // Adjust the scale for higher quality if needed
      width: 794, // A4 width in pixels (at 96 DPI)
      height: 1123, // A4 height in pixels (at 96 DPI)
    });

    const canvasElement = canvasRef.current;
    const context = canvasElement.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(canvas, 0, 0);
  };

  useEffect(() => {
    captureToCanvas(); // Capture canvas when the component mounts or updates
  }, [
    basicInformation,
    workExperience,
    education,
    skills,
    summary,
    awards,
    volunteering,
  ]);

  return (
    <div className="flex flex-col items-center">
      {/* Container for the resume preview */}
      <div
        id="resume-preview"
        ref={resumeRef}
        className="relative z-0 w-[210mm] h-[297mm] bg-white p-6 shadow-lg"
      >
        <h1 className="text-xl font-bold">{basicInformation.name}</h1>
        <p>{basicInformation.title}</p>
        <p>{basicInformation.phone}</p>
        <p>{basicInformation.email}</p>
        <p>{basicInformation.location}</p>

        {summary && (
          <div className="mt-4">
            <h2 className="text-lg font-bold">Summary</h2>
            <p>{summary}</p>
          </div>
        )}

        {workExperience.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-bold">Work Experience</h2>
            {workExperience.map((item, index) => (
              <div key={index} className="mb-2">
                <h3 className="text-md font-bold">{item.company}</h3>
                <p>{item.jobTitle}</p>
                <p>
                  {item.startDate} - {item.current ? "Present" : item.endDate}
                </p>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-bold">Education</h2>
            {education.map((item, index) => (
              <div key={index} className="mb-2">
                <h3 className="text-md font-bold">{item.institution}</h3>
                <p>
                  {item.degree} in {item.fieldOfStudy}
                </p>
                <p>
                  {item.startDate} - {item.current ? "Present" : item.endDate}
                </p>
              </div>
            ))}
          </div>
        )}

        {skills.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-bold">Skills</h2>
            <ul>
              {skills.map((item, index) => (
                <li key={index}>
                  {item.name} - {item.level}
                </li>
              ))}
            </ul>
          </div>
        )}

        {awards.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-bold">Awards</h2>
            {awards.map((item, index) => (
              <div key={index}>
                <h3 className="text-md font-bold">{item.title}</h3>
                <p>{item.awarder}</p>
                <p>{item.date}</p>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        )}

        {volunteering.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-bold">Volunteering</h2>
            {volunteering.map((item, index) => (
              <div key={index}>
                <h3 className="text-md font-bold">{item.organization}</h3>
                <p>{item.role}</p>
                <p>
                  {item.startDate} - {item.current ? "Present" : item.endDate}
                </p>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Canvas element for displaying the captured content */}
      <canvas
        ref={canvasRef}
        className="mt-6 border-2 border-gray-300"
      ></canvas>
    </div>
  );
};

export default Modern;
