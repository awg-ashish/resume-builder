import React from 'react';
import { useStore } from '@tanstack/react-store';
import { store } from '../store';
import { useDrag, useDrop } from 'react-dnd';

const SkillItem = ({ item, index, moveItem }) => {
    const [, ref] = useDrag({
        type: 'SKILL',
        item: { index },
    });

    const [, drop] = useDrop({
        accept: 'SKILL',
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
                name="name"
                placeholder="Skill Name"
                value={item.name}
                onChange={(e) => item.onChange(index, e)}
                className="w-full p-2 mb-2 border"
            />
            <select
                name="level"
                value={item.level}
                onChange={(e) => item.onChange(index, e)}
                className="w-full p-2 mb-2 border"
            >
                <option value="">Select Proficiency Level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
            </select>
        </div>
    );
};

const Skills = () => {
    const skills = useStore(store, (state) => state.skills) || [];
    const setSkills = (newState) => {
        store.setState((state) => ({
            ...state,
            skills: newState,
        }));
    };

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const newItems = [...skills];
        newItems[index] = {
            ...newItems[index],
            [name]: value,
        };
        setSkills(newItems);
    };

    const addItem = () => {
        const newItems = [
            ...skills,
            { name: '', level: '' },
        ];
        setSkills(newItems);
    };

    const moveItem = (fromIndex, toIndex) => {
        const newItems = [...skills];
        const [movedItem] = newItems.splice(fromIndex, 1);
        newItems.splice(toIndex, 0, movedItem);
        setSkills(newItems);
    };

    return (
        <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Skills</h2>
            {skills.map((item, index) => (
                <SkillItem
                    key={index}
                    item={{ ...item, onChange: handleChange }}
                    index={index}
                    moveItem={moveItem}
                />
            ))}
            <button onClick={addItem} className="bg-blue-500 text-white p-2 rounded">
                Add Skill
            </button>
        </div>
    );
};

export default Skills;