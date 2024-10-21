import React from 'react';
import { useStore } from '../store';
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

const WorkExperience = () => {
    const [state, setState] = useStore('workExperience');

    const handleChange = (index, e) => {
        const { name, value, type, checked } = e.target;
        setState((prev) => {
            const newItems = [...prev];
            newItems[index] = {
                ...newItems[index],
                [name]: type === 'checkbox' ? checked : value,
            };
            return newItems;
        });
    };

    const addItem = () => {
        setState((prev) => [
            ...prev,
            { company: '', jobTitle: '', startDate: '', endDate: '', description: '', current: false },
        ]);
    };

    const moveItem = (fromIndex, toIndex) => {
        setState((prev) => {
            const newItems = [...prev];
            const [movedItem] = newItems.splice(fromIndex, 1);
            newItems.splice(toIndex, 0, movedItem);
            return newItems;
        });
    };

    return (
        <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Work Experience</h2>
            {state.map((item, index) => (
                <WorkExperienceItem
                    key={index}
                    item={{ ...item, onChange: handleChange }}
                    index={index}
                    moveItem={moveItem}
                />
            ))}
            <button onClick={addItem} className="bg-blue-500 text-white p-2 rounded">
                Add Work Experience
            </button>
        </div>
    );
};

export default WorkExperience;