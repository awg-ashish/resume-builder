import React, { useRef, useState, useEffect } from "react";
import { useStore } from "@tanstack/react-store";
import { store } from "../store";
import { toPng } from "html-to-image";
import Basic from "../templates/Basic";
import Modern from "../templates/Modern";


const A4_WIDTH_PX = 794; // Approx width of A4 in pixels at 96 DPI (default web)
const A4_HEIGHT_PX = 1123; // Approx height of A4 in pixels at 96 DPI

const PreviewLayout = () => {
  const [overlayVisible, setOverlayVisible] = useState(false); // Initially set to false
  const [imageSrcs, setImageSrcs] = useState([]); // Store multiple page image sources
  const [activePage, setActivePage] = useState(0); // Track the active page in overlay
  const templateRef = useRef(null); // Reference for capturing the component

  const template = useStore(store, (state) => state.template) || "basic";

  // Fetch data from store
  const basicInformation =
    useStore(store, (state) => state.basicInformation) || {};
  const workExperience = useStore(store, (state) => state.workExperience) || [];
  const education = useStore(store, (state) => state.education) || [];
  const skills = useStore(store, (state) => state.skills) || [];
  const summary = useStore(store, (state) => state.summary) || "";
  const awards = useStore(store, (state) => state.awards) || [];
  const volunteering = useStore(store, (state) => state.volunteering) || [];

  // Data to be passed to the template components
  const templateData = {
    basicInformation,
    workExperience,
    education,
    skills,
    summary,
    awards,
    volunteering,
  };

  // Dynamically render template based on selected template type
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <Modern data={templateData} />;
      case "basic":
        return <Basic data={templateData} />;
      default:
        return null;
    }
  };

  // Generate image from template whenever the data changes
  useEffect(() => {
    const generateImage = async () => {
      if (templateRef.current) {
        const pages = [];
        const totalHeight = templateRef.current.scrollHeight;
        const totalPages = Math.ceil(totalHeight / A4_HEIGHT_PX); // Calculate number of pages

        // Loop through each page and capture content accordingly
        for (let i = 0; i < totalPages; i++) {
          // Adjust the scroll position to capture the next page
          templateRef.current.scrollTop = i * A4_HEIGHT_PX; // Offset for each page
          console.log(templateRef.current.scrollTop);

          // Wait a moment for the scroll to settle before capturing the image
          await new Promise((resolve) => setTimeout(resolve, 100));

          // Capture the image for the current page
          const dataUrl = await toPng(templateRef.current, {
            width: A4_WIDTH_PX,
            height: A4_HEIGHT_PX,
            offsetY: i * A4_HEIGHT_PX, // Offset for each page
            bgcolor: "white", // Set white background
            pixelRatio: 2, // Higher resolution for the image
            style: {
              border: "1px solid black", // 1px border around the image
            },
          });

          pages.push(dataUrl); // Add each page to the array
        }

        setImageSrcs(pages); // Save all the page images to state
      }
    };

    generateImage(); // Call the generateImage function
  }, [
    basicInformation,
    workExperience,
    education,
    skills,
    summary,
    awards,
    volunteering,
    template,
  ]);
  // Re-run on data change

  // Handle overlay toggle
  const handleOverlayToggle = () => {
    setOverlayVisible(true); // Show overlay only when image is clicked
  };

  // Handle click outside overlay to close it
  const handleOverlayClose = (e) => {
    if (e.target === e.currentTarget) {
      setOverlayVisible(false); // Close overlay when clicked outside
    }
  };

  return (
    <div className="p-4 pt-0 w-full">
      <div className="fixed z-10 w-[27%] bg-slate-100 border border-slate-100 rounded-xl pt-10">
        <div className="p-3 border rounded-xl bg-white border-white flex justify-between items-center shadow-2xl">
          <h1 className="text-3xl font-bold">Preview</h1>
        </div>
      </div>

      <div
        className="relative z-0 w-full h-[calc(100vh-32px)] overflow-y-auto hide-scrollbar"
        ref={templateRef} // Reference to the template for image capture
      >
        {renderTemplate()}
      </div>

      {imageSrcs.length > 0 &&
        !overlayVisible && ( // Only show image if overlay is not visible
          <div
            className="relative z-0 w-full h-[calc(100vh-32px)] overflow-y-auto hide-scrollbar"
            onClick={handleOverlayToggle} // Show overlay when image is clicked
          >
            {imageSrcs.map((imageSrc, index) => (
              <img
                key={index}
                src={imageSrc}
                alt={`Generated Page ${index + 1}`}
                style={{
                  aspectRatio: 1 / 1.414,
                  cursor: "zoom-in",
                  border: "1px solid black", // 1px border around the image
                  background: "white", // White background
                  marginBottom: "10px", // Space between pages
                }}
              />
            ))}
          </div>
        )}

      {overlayVisible && imageSrcs.length > 0 && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-80 flex justify-center items-center"
          onClick={handleOverlayClose} // Close the overlay when clicked outside
        >
          <div
            className="h-auto w-[60vw] overflow-y-scroll bg-white" // Allow scrolling of content
          >
            {imageSrcs.map((imageSrc, index) => (
              <img
                key={index}
                src={imageSrc}
                alt={`Overlay Page ${index + 1}`}
                style={{
                  width: "100%", // Allow image to fit the width of the screen
                  marginBottom: "15px", // Space between pages
                  cursor: "grab",
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewLayout;
