import React, { useRef } from 'react';
import { useStore } from '@tanstack/react-store';
import { store } from '../store';
import { saveToLocalStorage } from '../utils/localStorage';
import { exportToPDF } from '../utils/pdfExport';
import { exportToJson, importFromJson } from '../utils/jsonUtils';

const SaveButton = () => {
    const basicInformation = useStore(store, (state) => state.basicInformation);
    const workExperience = useStore(store, (state) => state.workExperience);
    const education = useStore(store, (state) => state.education);
    const skills = useStore(store, (state) => state.skills);
    const summary = useStore(store, (state) => state.summary);
    const awards = useStore(store, (state) => state.awards);
    const volunteering = useStore(store, (state) => state.volunteering);
    const template = useStore(store, (state) => state.template);

    const fileInputRef = useRef(null);

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

    const handleExportJson = () => {
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
        exportToJson(resumeData);
    };

    const handleImportJson = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const resumeData = await importFromJson(file);
                store.setState((state) => ({
                    ...state,
                    basicInformation: resumeData.basicInformation || state.basicInformation,
                    workExperience: resumeData.workExperience || state.workExperience,
                    education: resumeData.education || state.education,
                    skills: resumeData.skills || state.skills,
                    summary: resumeData.summary || state.summary,
                    awards: resumeData.awards || state.awards,
                    volunteering: resumeData.volunteering || state.volunteering,
                    template: resumeData.template || state.template,
                }));
                alert('Resume data imported successfully!');
            } catch (error) {
                alert('Failed to import resume data. Please check the file format.');
            }
        }
    };

    return (
        <div>
            <button onClick={handleSave} className="bg-green-500 text-white p-2 rounded mb-4">
                Save
            </button>
            <button onClick={handlePrint} className="bg-blue-500 text-white p-2 rounded mb-4 ml-2">
                Generate PDF
            </button>
            <button onClick={handleExportJson} className="bg-yellow-500 text-white p-2 rounded mb-4 ml-2">
                Export to JSON
            </button>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="application/json"
                onChange={handleImportJson}
            />
            <button
                onClick={() => fileInputRef.current.click()}
                className="bg-purple-500 text-white p-2 rounded mb-4 ml-2"
            >
                Import from JSON
            </button>
        </div>
    );
};

export default SaveButton;