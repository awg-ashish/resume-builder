import React from 'react';
import { useStore } from '@tanstack/react-store';
import { store } from '../store';

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
        <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Summary</h2>
            <textarea
                placeholder="Brief Summary or Career Objective"
                value={summary}
                onChange={handleChange}
                className="w-full p-2 mb-2 border"
            />
        </div>
    );
};

export default Summary;