import React from 'react';
import { useStore } from '@tanstack/react-store';
import { store } from '../store';

const BasicInformation = () => {
    const basicInformation = useStore(store, (state) => state.basicInformation);
    const setBasicInformation = (newState) => {
        store.setState((state) => ({
            ...state,
            basicInformation: newState,
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBasicInformation((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Basic Information</h2>
            <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={basicInformation.name}
                onChange={handleChange}
                className="w-full p-2 mb-2 border"
            />
            <input
                type="text"
                name="title"
                placeholder="Professional Title"
                value={basicInformation.title}
                onChange={handleChange}
                className="w-full p-2 mb-2 border"
            />
            <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={basicInformation.phone}
                onChange={handleChange}
                className="w-full p-2 mb-2 border"
            />
            <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={basicInformation.email}
                onChange={handleChange}
                className="w-full p-2 mb-2 border"
            />
            <input
                type="text"
                name="location"
                placeholder="Location"
                value={basicInformation.location}
                onChange={handleChange}
                className="w-full p-2 mb-2 border"
            />
        </div>
    );
};

export default BasicInformation;