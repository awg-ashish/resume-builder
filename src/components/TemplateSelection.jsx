import React from 'react';
import { useStore } from '@tanstack/react-store';
import { store } from '../store';

const TemplateSelection = () => {
    const template = useStore(store, (state) => state.template);
    const setTemplate = (newState) => {
        store.setState((state) => ({
            ...state,
            template: newState,
        }));
    };

    const handleChange = (e) => {
        const { value } = e.target;
        setTemplate(value);
    };

    return (
        <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Template Selection</h2>
            <select
                value={template}
                onChange={handleChange}
                className="w-full p-2 mb-2 border"
            >
                <option value="basic">Basic Template</option>
                <option value="modern">Modern Template</option>
                <option value="professional">Professional Template</option>
            </select>
        </div>
    );
};

export default TemplateSelection;