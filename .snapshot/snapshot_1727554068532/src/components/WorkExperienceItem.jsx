import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const WorkExperienceItem = ({ item, index, moveItem }) => {
    const [, ref] = useDrag({
        type: 'WORK_EXPERIENCE',
        item: { index },
    });

    const [, drop] = useDrop({
        accept: 'WORK_EXPERIENCE',
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveItem(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    return (
        <div ref={(node) => ref(drop(node))} className="border p-2 mb-2">
            <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={item.company}
                onChange={(e) => item.onChange(index, e)}
                className="w-full p-2 mb-2 border"
            />
            <input
                type="text"
                name="jobTitle"
                placeholder="Job Title"
                value={item.jobTitle}
                onChange={(e) => item.onChange(index, e)}
                className="w-full p-2 mb-2 border"
            />
            <input
                type="date"
                name="startDate"
                placeholder="Start Date"
                value={item.startDate}
                onChange={(e) => item.onChange(index, e)}
                className="w-full p-2 mb-2 border"
            />
            <input
                type="date"
                name="endDate"
                placeholder="End Date"
                value={item.endDate}
                onChange={(e) => item.onChange(index, e)}
                className="w-full p-2 mb-2 border"
            />
            <textarea
                name="description"
                placeholder="Job Description"
                value={item.description}
                onChange={(e) => item.onChange(index, e)}
                className="w-full p-2 mb-2 border"
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
    );
};

export default WorkExperienceItem;