import React from 'react';
import EditorLayout from '../components/EditorLayout';
import PreviewLayout from '../components/PreviewLayout';
import SaveButton from '../components/SaveButton';

const EditorPage = () => {
    return (
        <div className="flex">
            <div className="w-1/2">
                <SaveButton />
                <EditorLayout />
            </div>
            <div className="w-1/2">
                <PreviewLayout />
            </div>
        </div>
    );
};

export default EditorPage;