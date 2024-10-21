import React from 'react';
import BasicInformation from './BasicInformation';
import WorkExperience from './WorkExperience';
import Education from './Education';
import Skills from './Skills';
import Summary from './Summary';
import Awards from './Awards';
import Volunteering from './Volunteering';
import TemplateSelection from './TemplateSelection';

const EditorLayout = () => {
    return (
        <div className="p-4 w-1/2">
            <h1 className="text-2xl font-bold mb-4">Resume Editor</h1>
            <BasicInformation />
            <WorkExperience />
            <Education />
            <Skills />
            <Summary />
            <Awards />
            <Volunteering />
            <TemplateSelection />
        </div>
    );
};

export default EditorLayout;