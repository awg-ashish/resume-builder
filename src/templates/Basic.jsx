import React from "react";

const A4_WIDTH_PX = 794; // Approx width of A4 in pixels at 96 DPI (default web)
const A4_HEIGHT_PX = 1123; // Approx height of A4 in pixels at 96 DPI

const Basic = ({ data }) => {
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
    <div style={{ width: A4_WIDTH_PX, height: "auto" }}>
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
              <p>{item.awarder}</p>
              <p>{item.date}</p>
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
              <p>
                {item.startDate} - {item.current ? "Present" : item.endDate}
              </p>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Basic;
