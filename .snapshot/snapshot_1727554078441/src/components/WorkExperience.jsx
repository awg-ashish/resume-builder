import React from 'react';
import { useStore } from '@tanstack/react-store';
import { store } from '../store';
import WorkExperienceItem from './WorkExperienceItem';

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
            [name]: type === 'checkbox' ? checked : value,
        };
        setWorkExperience(newItems);
    };

    const addItem = () => {
        const newItems = [
            ...workExperience,
            { company: '', jobTitle: '', startDate: '', endDate: '', description: '', current: false },
        ];
        setWorkExperience(newItems);
    };

    const moveItem = (fromIndex, toIndex) => {
        const newItems = [...workExperience];
        const [movedItem] = newItems.splice(fromIndex, 1);
        newItems.splice(toIndex, 0, movedItem);
        setWorkExperience(newItems);
    };

    return (
        <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Work Experience</h2>
            {workExperience.map((item, index) => (
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