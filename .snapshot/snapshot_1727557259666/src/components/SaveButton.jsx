import React from 'react';
import { useStore } from '@tanstack/react-store';
import { store } from '../store';
import { saveToLocalStorage } from '../utils/localStorage';
import { exportToPDF } from '../utils/pdfExport';

const SaveButton = () => {
    const basicInformation = useStore(store, (state) => state.basicInformation);
    const workExperience = useStore(store, (state) => state.workExperience);
    const education = useStore(store, (state) => state.education);
    const skills = useStore(store, (state) => state.skills);
    const summary = useStore(store, (state) => state.summary);
    const awards = useStore(store, (state) => state.awards);
    const volunteering = useStore(store, (state) => state.volunteering);
    const template = useStore(store, (state) => state.template);

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

    const handlePrint = () => {
        exportToPDF('resume-preview', 'resume.pdf');
    };

    return (
        <div>
            <button onClick={handleSave} className="bg-green-500 text-white p-2 rounded mb-4">
                Save
            </button>
            <button onClick={handlePrint} className="bg-blue-500 text-white p-2 rounded mb-4 ml-2">
                Generate PDF
            </button>
        </div>
    );
};

export default SaveButton;