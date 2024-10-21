import React from "react";
import { useStore } from "@tanstack/react-store";
import { store } from "../src/store";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdDragIndicator } from "react-icons/md";
import Button from "../src/components/ui/Button";

// SortableItem for dnd-kit
const SortableItem = ({ id, item, onChange }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
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
          onChange={onChange}
          className="w-full p-2 mb-2 border rounded-lg"
        />

        <select
          name="level"
          value={item.level}
          onChange={onChange}
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

// Main Skills component
const Skills = () => {
  const skills = useStore(store, (state) => state.skills) || [];

  const setSkills = (newSkills) => {
    store.setState((state) => ({
      ...state,
      skills: newSkills,
    }));
  };

  // Handle dragging and sorting
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = skills.findIndex((item) => item.id === active.id);
      const newIndex = skills.findIndex((item) => item.id === over.id);
      setSkills(arrayMove(skills, oldIndex, newIndex));
    }
  };

  // Handle change for inputs and selects
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSkills = [...skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [name]: value,
    };
    setSkills(updatedSkills);
  };

  // Add a new skill
  const addItem = () => {
    const newSkill = {
      id: `item-${Date.now()}`, // Ensure unique ID
      name: "",
      level: "",
    };
    setSkills([...skills, newSkill]);
  };

  return (
    <div className="my-4 py-4 pr-20 pl-6 border rounded-xl bg-white border-white">
      <h2 className="text-xl font-bold mb-2">Skills</h2>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={skills.map((skill) => skill.id)} // Map to item IDs
          strategy={verticalListSortingStrategy}
        >
          {skills.map((item, index) => (
            <SortableItem
              key={item.id}
              id={item.id}
              item={item}
              onChange={(e) => handleChange(index, e)}
            />
          ))}
        </SortableContext>
      </DndContext>

      <Button addItem={addItem}>Add Skills</Button>
    </div>
  );
};

export default Skills;
