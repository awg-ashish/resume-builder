import React from "react";
import { useStore } from "@tanstack/react-store";
import { store } from "../store";
import { useDrag, useDrop } from "react-dnd";
import Button from "./ui/Button";
import { MdDragIndicator } from "react-icons/md";

const SkillItem = ({ item, index, moveItem }) => {
  const [, ref] = useDrag({
    type: "SKILL",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "SKILL",
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
      className="px-2 py-4 mb-4 flex items-start bg-slate-50 rounded-xl"
    >
      <div className="text-2xl text-slate-400">
        <MdDragIndicator />
      </div>
      <div className="flex-1">
        <input
          type="text"
          name="name"
          placeholder="Skill Name"
          value={item.name}
          onChange={(e) => item.onChange(index, e)}
          className="w-full p-2 mb-2 border rounded-lg"
        />

        <select
          name="level"
          value={item.level}
          onChange={(e) => item.onChange(index, e)}
          className="w-full p-2 mb-2 border rounded-lg"
        >
          <option value="">Select Proficiency Level</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="expert">Expert</option>
        </select>
      </div>
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
    const newItems = [...skills, { name: "", level: "" }];
    setSkills(newItems);
  };

  const moveItem = (fromIndex, toIndex) => {
    const newItems = [...skills];
    const [movedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, movedItem);
    setSkills(newItems);
  };

  return (
    <div className="my-4 py-4 pr-20 pl-6 border rounded-xl bg-white border-white">
      <h2 className="text-xl font-bold mb-2">Skills</h2>
      {skills.map((item, index) => (
        <SkillItem
          key={index}
          item={{ ...item, onChange: handleChange }}
          index={index}
          moveItem={moveItem}
        />
      ))}

      <Button addItem={addItem}>Add Skills</Button>
    </div>
  );
};

export default Skills;
