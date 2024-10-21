import React from "react";
import { FaPlus } from "react-icons/fa";

const Button = ({ children, addItem }) => {
  return (
    <div className="w-full flex items-center justify-center py-2">
      <div
        className="border rounded-xl py-1 px-4 hover:cursor-pointer hover:bg-slate-100 flex items-center justify-center"
        onClick={addItem}
      >
        <FaPlus />
        <span className="px-2">{children}</span>
      </div>
    </div>
  );
};

export default Button;
