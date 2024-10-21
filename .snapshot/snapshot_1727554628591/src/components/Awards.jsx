import React from 'react';
import { useStore } from '@tanstack/react-store';
import { store } from '../store';
import { useDrag, useDrop } from 'react-dnd';

const AwardItem = ({ item, index, moveItem }) => {
    const [, ref] = useDrag({
        type: 'AWARD',
        item: { index },
    });

    const [, drop] = useDrop({
        accept: 'AWARD',
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
                name="title"
                placeholder="Award Title"
                value={item.title}
                onChange={(e) => item.onChange(index, e)}
                className="w-full p-2 mb-2 border"
            />
            <input
                type="text"
                name="awarder"
                placeholder="Awarder"
                value={item.awarder}
                onChange={(e) => item.onChange(index, e)}
                className="w-full p-2 mb-2 border"
            />
            <input
                type="date"
                name="date"
                placeholder="Date"
                value={item.date}
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
        </div>
    );
};

const Awards = () => {
    const awards = useStore(store, (state) => state.awards) || [];
    const setAwards = (newState) => {
        store.setState((state) => ({
            ...state,
            awards: newState,
        }));
    };

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const newItems = [...awards];
        newItems[index] = {
            ...newItems[index],
            [name]: value,
        };
        setAwards(newItems);
    };

    const addItem = () => {
        const newItems = [
            ...awards,
            { title: '', awarder: '', date: '', description: '' },
        ];
        setAwards(newItems);
    };

    const moveItem = (fromIndex, toIndex) => {
        const newItems = [...awards];
        const [movedItem] = newItems.splice(fromIndex, 1);
        newItems.splice(toIndex, 0, movedItem);
        setAwards(newItems);
    };

    return (
        <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Awards and Achievements</h2>
            {awards.map((item, index) => (
                <AwardItem
                    key={index}
                    item={{ ...item, onChange: handleChange }}
                    index={index}
                    moveItem={moveItem}
                />
            ))}
            <button onClick={addItem} className="bg-blue-500 text-white p-2 rounded">
                Add Award
            </button>
        </div>
    );
};

export default Awards;