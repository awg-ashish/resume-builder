import React, { useRef, useEffect, useState } from "react";
import { toPng } from "html-to-image";

const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

const Basic = ({ data, onImagesGenerated }) => {
  const templateRef = useRef(null);
  const [imagesGenerated, setImagesGenerated] = useState(false); // New state to track image generation

  useEffect(() => {
    const generateImages = async () => {
      if (templateRef.current && !imagesGenerated) {
        // Ensure it only runs if images haven't been generated
        const pages = [];
        const totalHeight = templateRef.current.scrollHeight;
        const totalPages = Math.ceil(totalHeight / A4_HEIGHT_PX);

        for (let i = 0; i < totalPages; i++) {
          const clone = templateRef.current.cloneNode(true);
          clone.style.position = "absolute";
          clone.style.top = `-${i * A4_HEIGHT_PX}px`;
          clone.style.left = "0";
          clone.style.visibility = "visible";
          document.body.appendChild(clone);

          const dataUrl = await toPng(clone, {
            width: A4_WIDTH_PX,
            height: A4_HEIGHT_PX,
            bgcolor: "white",
            pixelRatio: 2,
          });

          pages.push(dataUrl);
          document.body.removeChild(clone);
        }

        if (pages.length > 0) {
          onImagesGenerated(pages);
          setImagesGenerated(true); // Mark that images have been generated
        }
      }
    };

    generateImages();
  }, [data, onImagesGenerated, imagesGenerated]); // Add imagesGenerated to dependencies

  const {
    basicInformation,
    workExperience,
    education,
    skills,
    summary,
    awards,
    volunteering,
  } = data;

  return (
    <div
      ref={templateRef}
      style={{
        position: "absolute",
        left: "-9999px",
        width: A4_WIDTH_PX,
        visibility: "hidden",
      }}
    >
      <h1 className="text-2xl font-bold">{basicInformation.name}</h1>
      <p>{basicInformation.title}</p>
      <p>{basicInformation.phone}</p>
      <p>{basicInformation.email}</p>
      <p>{basicInformation.location}</p>
      {summary && (
        <div>
          <h2 className="text-xl font-bold">Summary</h2>
          <p>{summary}</p>
        </div>
      )}
      {workExperience.length > 0 && (
        <div>
          <h2 className="text-xl font-bold">Work Experience</h2>
          {workExperience.map((item, index) => (
            <div key={index}>
              <h3 className="text-lg font-bold">{item.company}</h3>
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
        <div>
          <h2 className="text-xl font-bold">Education</h2>
          {education.map((item, index) => (
            <div key={index}>
              <h3 className="text-lg font-bold">{item.institution}</h3>
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
        <div>
          <h2 className="text-xl font-bold">Skills</h2>
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
        <div>
          <h2 className="text-xl font-bold">Awards</h2>
          {awards.map((item, index) => (
            <div key={index}>
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      )}
      {volunteering.length > 0 && (
        <div>
          <h2 className="text-xl font-bold">Volunteering</h2>
          {volunteering.map((item, index) => (
            <div key={index}>
              <h3 className="text-lg font-bold">{item.organization}</h3>
              <p>{item.role}</p>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Basic;
