import React from 'react';
import { useStore } from '../store';

const Summary = () => {
    const [state, setState] = useStore('summary');

    const handleChange = (e) => {
        const { value } = e.target;
        setState(value);
    };

    return (
        <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Summary</h2>
            <textarea
                placeholder="Brief Summary or Career Objective"
                value={state}
                onChange={handleChange}
                className="w-full p-2 mb-2 border"
            />
        </div>
    );
};

export default Summary;