import React from "react";
import { MdDragIndicator } from "react-icons/md";

const WorkExperienceItem = React.memo(({ item, index }) => {
  return (
    <div className="px-2 py-4 mb-4 flex items-start justify-center bg-slate-50 rounded-xl">
      <div className="text-2xl text-slate-400 cursor-grabbing">
        <MdDragIndicator />
      </div>
      <div>
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={item.company}
          onChange={(e) => item.onChange(index, e)}
          className="w-full p-2 mb-2 border rounded-lg"
        />
        <input
          type="text"
          name="jobTitle"
          placeholder="Job Title"
          value={item.jobTitle}
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
        <textarea
          name="description"
          placeholder="Job Description"
          value={item.description}
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
          Currently working here
        </label>
      </div>
    </div>
  );
});

export default WorkExperienceItem;
