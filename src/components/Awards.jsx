import React from "react";
import { useStore } from "@tanstack/react-store";
import { store } from "../store";
import { useDrag, useDrop } from "react-dnd";
import Button from "./ui/Button";
import { MdDragIndicator } from "react-icons/md";

const AwardItem = ({ item, index, moveItem }) => {
  const [, ref] = useDrag({
    type: "AWARD",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "AWARD",
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
          name="title"
          placeholder="Award Title"
          value={item.title}
          onChange={(e) => item.onChange(index, e)}
          className="w-full p-2 mb-2 border rounded-lg"
        />
        <input
          type="text"
          name="awarder"
          placeholder="Awarder"
          value={item.awarder}
          onChange={(e) => item.onChange(index, e)}
          className="w-full p-2 mb-2 border rounded-lg"
        />
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={item.date}
          onChange={(e) => item.onChange(index, e)}
          className="w-full p-2 mb-2 border rounded-lg"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={item.description}
          rows={6}
          onChange={(e) => item.onChange(index, e)}
          className="w-full p-2 mb-2 border rounded-lg"
        />
      </div>
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
      { title: "", awarder: "", date: "", description: "" },
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
    <div className="my-4 py-4 pr-20 pl-6 border rounded-xl bg-white border-white">
      <h2 className="text-xl font-bold mb-2">Awards and Achievements</h2>
      {awards.map((item, index) => (
        <AwardItem
          key={index}
          item={{ ...item, onChange: handleChange }}
          index={index}
          moveItem={moveItem}
        />
      ))}
      <Button addItem={addItem}>Add Award</Button>
    </div>
  );
};

export default Awards;
