import React from "react";
import { MdDashboardCustomize } from "react-icons/md";
import { BiSolidBookContent } from "react-icons/bi";
import { VscNotebookTemplate } from "react-icons/vsc";
import { FaEdit } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="fixed w-1/12 h-auto bg-white left-[7%] top-[6%] rounded-3xl shadow-2xl text-4xl flex flex-col justify-between items-center py-6 px-4 text-center text-slate-700">
      <div className="flex flex-col justify-center items-center rounded-xl px-2 py-4 my-2 w-full hover:bg-slate-100 hover:cursor-pointer hover:text-fuchsia-600">
        <MdDashboardCustomize />
        <p className="text-base">Dashboard</p>
      </div>
      <div className="flex flex-col justify-center items-center rounded-xl px-2 py-4 my-2 w-full hover:bg-slate-100 hover:cursor-pointer hover:text-fuchsia-600 text-fuchsia-600 ">
        <BiSolidBookContent />

        <p className="text-base">Content</p>
      </div>
      <div className="flex flex-col justify-center items-center rounded-xl px-2 py-4 my-2 w-full hover:bg-slate-100 hover:cursor-pointer hover:text-fuchsia-600">
        <VscNotebookTemplate />
        <p className="text-base">Templates</p>
      </div>
      <div className="flex flex-col justify-center items-center rounded-xl px-2 py-4 my-2 w-full hover:bg-slate-100 hover:cursor-pointer hover:text-fuchsia-600">
        <FaEdit />
        <p className="text-base">Customize</p>
      </div>
    </div>
  );
};

export default Navbar;
