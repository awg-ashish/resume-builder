import React from "react";
import { useStore } from "@tanstack/react-store";
import { store } from "../store";

const Summary = () => {
  const summary = useStore(store, (state) => state.summary);
  const setSummary = (newState) => {
    store.setState((state) => ({
      ...state,
      summary: newState,
    }));
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSummary(value);
  };

  return (
    <div className="my-4 py-4 pr-20 pl-6 border rounded-xl bg-white border-white">
      <h2 className="text-xl font-bold mb-2">Summary</h2>
      <textarea
        placeholder="Brief Summary or Career Objective"
        value={summary}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded-lg"
      />
    </div>
  );
};

export default Summary;
