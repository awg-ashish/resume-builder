import React from 'react';
import { useStore } from '@tanstack/react-store';
import { store } from '../store';
import { useDrag, useDrop } from 'react-dnd';

const VolunteeringItem = ({ item, index, moveItem }) => {
    const [, ref] = useDrag({
        type: 'VOLUNTEERING',
        item: { index },
    });

    const [, drop] = useDrop({
        accept: 'VOLUNTEERING',
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
                name="organization"
                placeholder="Organization Name"
                value={item.organization}
                onChange={(e) => item.onChange(index, e)}
                className="w-full p-2 mb-2 border"
            />
            <input
                type="text"
                name="role"
                placeholder="Role"
                value={item.role}
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
                placeholder="Description"
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
                Currently volunteering here
            </label>
        </div>
    );
};

const Volunteering = () => {
    const volunteering = useStore(store, (state) => state.volunteering);
    const setVolunteering = (newState) => {
        store.setState((state) => ({
            ...state,
            volunteering: newState,
        }));
    };

    const handleChange = (index, e) => {
        const { name, value, type, checked } = e.target;
        setVolunteering((prev) => {
            const newItems = [...prev];
            newItems[index] = {
                ...newItems[index],
                [name]: type === 'checkbox' ? checked : value,
            };
            return newItems;
        });
    };

    const addItem = () => {
        setVolunteering((prev) => [
            ...prev,
            { organization: '', role: '', startDate: '', endDate: '', description: '', current: false },
        ]);
    };

    const moveItem = (fromIndex, toIndex) => {
        setVolunteering((prev) => {
            const newItems = [...prev];
            const [movedItem] = newItems.splice(fromIndex, 1);
            newItems.splice(toIndex, 0, movedItem);
            return newItems;
        });
    };

    return (
        <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Volunteering</h2>
            {volunteering.map((item, index) => (
                <VolunteeringItem
                    key={index}
                    item={{ ...item, onChange: handleChange }}
                    index={index}
                    moveItem={moveItem}
                />
            ))}
            <button onClick={addItem} className="bg-blue-500 text-white p-2 rounded">
                Add Volunteering Experience
            </button>
        </div>
    );
};

export default Volunteering;