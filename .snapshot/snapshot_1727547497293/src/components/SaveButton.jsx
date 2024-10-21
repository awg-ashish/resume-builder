// This is the SaveButton.jsx file
import React from 'react';
import { useStore } from '../store';
import { saveToLocalStorage } from '../utils/localStorage';

const SaveButton = () => {
    const [basicInformation] = useStore('basicInformation');
    const [workExperience] = useStore('workExperience');
    const [education] = useStore('education');
    const [skills] = useStore('skills');
    const [summary] = useStore('summary');
    const [awards] = useStore('awards');
    const [volunteering] = useStore('volunteering');
    const [template] = useStore('template');

    const handleSave = () => {
        const resumeData = {
            basicInformation,
            workExperience,
            education,
            skills,
            summary,
            awards,
            volunteering,
            template,
        };
        saveToLocalStorage('resumeData', resumeData);
        alert('Resume data saved successfully!');
    };

    return (
        <button onClick={handleSave} className="bg-green-500 text-white p-2 rounded mb-4">
            Save
        </button>
    );
};

export default SaveButton;