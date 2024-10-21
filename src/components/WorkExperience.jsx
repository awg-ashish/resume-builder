import React from "react";
import { useStore } from "@tanstack/react-store";
import { store } from "../store";
import WorkExperienceItem from "./WorkExperienceItem";
import Button from "./ui/Button";
import { Reorder } from "framer-motion";

const WorkExperience = () => {
  const workExperience = useStore(store, (state) => state.workExperience) || [];

  const setWorkExperience = (newState) => {
    store.setState((state) => ({
      ...state,
      workExperience: newState,
    }));
  };

  const handleChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const newItems = [...workExperience];
    newItems[index] = {
      ...newItems[index],
      [name]: type === "checkbox" ? checked : value,
    };
    setWorkExperience(newItems);
  };

  const addItem = () => {
    const newItems = [
      ...workExperience,
      {
        id: `${Date.now()}`, // Add unique id for each item
        company: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        description: "",
        current: false,
      },
    ];
    setWorkExperience(newItems);
  };

  return (
    <div className="my-4 py-4 pr-20 pl-6 border rounded-xl bg-white border-white">
      <h2 className="text-xl font-bold mb-2">Work Experience</h2>
      <Reorder.Group
        axis="y"
        values={workExperience}
        onReorder={setWorkExperience} // Pass the reordered array to the state setter
      >
        {workExperience.map((item, index) => (
          <WorkExperienceItem
            key={`${item.id}`}
            item={item}
            index={index}
            handleChange={handleChange}
          />
        ))}
      </Reorder.Group>
      <Button addItem={addItem}>Add Work Experience</Button>
    </div>
  );
};

export default WorkExperience;
