// This is the BasicInformation.jsx file
import React from 'react';
import { useStore } from '../store';

const BasicInformation = () => {
    const [state, setState] = useStore('basicInformation');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Basic Information</h2>
            <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={state.name}
                onChange={handleChange}
                className="w-full p-2 mb-2 border"
            />
            <input
                type="text"
                name="title"
                placeholder="Professional Title"
                value={state.title}
                onChange={handleChange}
                className="w-full p-2 mb-2 border"
            />
            <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={state.phone}
                onChange={handleChange}
                className="w-full p-2 mb-2 border"
            />
            <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={state.email}
                onChange={handleChange}
                className="w-full p-2 mb-2 border"
            />
            <input
                type="text"
                name="location"
                placeholder="Location"
                value={state.location}
                onChange={handleChange}
                className="w-full p-2 mb-2 border"
            />
        </div>
    );
};

export default BasicInformation;