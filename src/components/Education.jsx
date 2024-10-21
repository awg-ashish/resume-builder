import React from "react";
import { useStore } from "@tanstack/react-store";
import { store } from "../store";
import { useDrag, useDrop } from "react-dnd";
import Button from "./ui/Button";
import { MdDragIndicator } from "react-icons/md";

const EducationItem = ({ item, index, moveItem }) => {
  const [, ref] = useDrag({
    type: "EDUCATION",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "EDUCATION",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => ref(drop(node))}
      className="px-2 py-4 mb-4 flex items-start justify-center bg-slate-50 rounded-xl"
    >
      <div className="text-2xl text-slate-400">
        <MdDragIndicator />
      </div>
      <div>
        <input
          type="text"
          name="institution"
          placeholder="Institution Name"
          value={item.institution}
          onChange={(e) => item.onChange(index, e)}
          className="w-full p-2 mb-2 border rounded-lg"
        />
        <input
          type="text"
          name="degree"
          placeholder="Degree"
          value={item.degree}
          onChange={(e) => item.onChange(index, e)}
          className="w-full p-2 mb-2 border rounded-lg"
        />
        <input
          type="text"
          name="fieldOfStudy"
          placeholder="Field of Study"
          value={item.fieldOfStudy}
          onChange={(e) => item.onChange(index, e)}
          className="w-full p-2 mb-2 border rounded-lg"
        />
        <input
          type="date"
          name="startDate"
          placeholder="Start Date"
          value={item.startDate}
          onChange={(e) => item.onChange(index, e)}
          className="w-full p-2 mb-2 border rounded-lg"
        />
        <input
          type="date"
          name="endDate"
          placeholder="End Date"
          value={item.endDate}
          onChange={(e) => item.onChange(index, e)}
          className="w-full p-2 mb-2 border rounded-lg"
        />
        <label>
          <input
            type="checkbox"
            name="current"
            checked={item.current}
            onChange={(e) => item.onChange(index, e)}
          />
          Currently studying here
        </label>
      </div>
    </div>
  );
};

const Education = () => {
  const education = useStore(store, (state) => state.education) || [];
  const setEducation = (newState) => {
    store.setState((state) => ({
      ...state,
      education: newState,
    }));
  };

  const handleChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const newItems = [...education];
    newItems[index] = {
      ...newItems[index],
      [name]: type === "checkbox" ? checked : value,
    };
    setEducation(newItems);
  };

  const addItem = () => {
    const newItems = [
      ...education,
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        current: false,
      },
    ];
    setEducation(newItems);
  };

  const moveItem = (fromIndex, toIndex) => {
    const newItems = [...education];
    const [movedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, movedItem);
    setEducation(newItems);
  };

  return (
    <div className="my-4 py-4 pr-20 pl-6 border rounded-xl bg-white border-white">
      <h2 className="text-xl font-bold mb-2">Education</h2>
      {education.map((item, index) => (
        <EducationItem
          key={index}
          item={{ ...item, onChange: handleChange }}
          index={index}
          moveItem={moveItem}
        />
      ))}

      <Button addItem={addItem}>Add Education</Button>
    </div>
  );
};

export default Education;
