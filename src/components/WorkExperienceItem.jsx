import { useMotionValue, Reorder } from "framer-motion";
import React from "react";
import { MdDragIndicator } from "react-icons/md";
import { useRaisedShadow } from "../utils/useRaisedShadow"; // Custom hook for shadow

const WorkExperienceItem = ({ item, index, handleChange }) => {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y); // Use the custom hook for dynamic shadow

  return (
    <Reorder.Item
      value={item} // This needs to match with the `value` prop in Reorder.Group
      id={item.id}
      style={{ boxShadow, y }}
      className="px-2 py-4 mb-4 flex items-start justify-center bg-slate-50 rounded-xl"
    >
      <div className="text-2xl text-slate-400 cursor-grabbing">
        <MdDragIndicator />
      </div>
      <div>
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={item.company}
          onChange={(e) => handleChange(index, e)}
          className="w-full p-2 mb-2 border rounded-lg"
        />
        <input
          type="text"
          name="jobTitle"
          placeholder="Job Title"
          value={item.jobTitle}
          onChange={(e) => handleChange(index, e)}
          className="w-full p-2 mb-2 border rounded-lg"
        />
        <input
          type="date"
          name="startDate"
          placeholder="Start Date"
          value={item.startDate}
          onChange={(e) => handleChange(index, e)}
          className="w-full p-2 mb-2 border rounded-lg"
        />
        <input
          type="date"
          name="endDate"
          placeholder="End Date"
          value={item.endDate}
          onChange={(e) => handleChange(index, e)}
          className="w-full p-2 mb-2 border rounded-lg"
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={item.description}
          onChange={(e) => handleChange(index, e)}
          className="w-full p-2 mb-2 border rounded-lg"
        />
        <label>
          <input
            type="checkbox"
            name="current"
            checked={item.current}
            onChange={(e) => handleChange(index, e)}
          />
          Currently working here
        </label>
      </div>
    </Reorder.Item>
  );
};

export default WorkExperienceItem;
