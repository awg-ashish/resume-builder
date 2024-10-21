import React, { useState, useCallback, useEffect } from "react";
import { useStore } from "@tanstack/react-store";
import { store } from "../store";
import Basic from "../templates/Basic";
import Modern from "../templates/Modern";
import debounce from "lodash.debounce";

const PreviewLayout = () => {
  const [imageSrcs, setImageSrcs] = useState(() => {
    const savedImages = localStorage.getItem("savedImages");
    return savedImages ? JSON.parse(savedImages) : [];
  });
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const template = useStore(store, (state) => state.template) || "basic";

  const basicInformation =
    useStore(store, (state) => state.basicInformation) || {};
  const workExperience = useStore(store, (state) => state.workExperience) || [];
  const education = useStore(store, (state) => state.education) || [];
  const skills = useStore(store, (state) => state.skills) || [];
  const summary = useStore(store, (state) => state.summary) || "";
  const awards = useStore(store, (state) => state.awards) || [];
  const volunteering = useStore(store, (state) => state.volunteering) || [];

  const templateData = {
    basicInformation,
    workExperience,
    education,
    skills,
    summary,
    awards,
    volunteering,
  };

  const handleImagesGenerated = useCallback((images) => {
    console.log("Images generated:", images);
    if (images && images.length > 0) {
      setImageSrcs(images);
      localStorage.setItem("savedImages", JSON.stringify(images));
    } else {
      console.error("No images generated");
    }
  }, []);

  const handleImageClick = () => {
    setIsOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
  };

  const regenerateImages = useCallback(
    debounce(() => {
      console.log("Regenerating images with data:", templateData);
      setImageSrcs([]);
      localStorage.removeItem("savedImages");
      renderTemplate();
    }, 500),
    [templateData]
  );

  useEffect(() => {
    if (imageSrcs.length === 0) {
      regenerateImages();
    }
  }, [templateData, regenerateImages, imageSrcs.length]);

  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return (
          <Modern
            data={templateData}
            onImagesGenerated={handleImagesGenerated}
          />
        );
      case "basic":
        return (
          <Basic
            data={templateData}
            onImagesGenerated={handleImagesGenerated}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 pt-0 w-full">
      <div className="fixed z-10 w-[27%] bg-slate-100 border border-slate-100 rounded-xl pt-10">
        <div className="p-3 border rounded-xl bg-white border-white flex justify-between items-center shadow-2xl">
          <h1 className="text-3xl font-bold">Preview</h1>
        </div>
      </div>

      <div className="relative z-0 w-full h-[calc(100vh-32px)] overflow-y-auto hide-scrollbar">
        {renderTemplate()}
      </div>

      {imageSrcs.length > 0 && (
        <div className="relative z-0 w-full h-[calc(100vh-32px)] overflow-y-auto hide-scrollbar">
          {imageSrcs.map((imageSrc, index) => (
            <img
              key={index}
              src={imageSrc}
              alt={`Generated Page ${index + 1}`}
              style={{
                aspectRatio: 1 / 1.414,
                cursor: "zoom-in",
                border: "1px solid black",
                background: "white",
                marginBottom: "10px",
              }}
              onClick={handleImageClick}
            />
          ))}
        </div>
      )}

      {isOverlayOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-white flex items-center justify-center z-50"
          onClick={handleCloseOverlay}
        >
          <div
            className="flex flex-col items-center overflow-auto"
            style={{ maxHeight: "90vh", width: "70%" }}
            onClick={(e) => e.stopPropagation()}
          >
            {imageSrcs.map((imageSrc, index) => (
              <img
                key={index}
                src={imageSrc}
                alt={`Zoomed Page ${index + 1}`}
                className="my-2"
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: "1 / 1.414",
                  cursor: "zoom-out",
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
