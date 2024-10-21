import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditorPage from './EditorPage';
import { loadFromLocalStorage } from '../utils/localStorage';
import { useStore } from '@tanstack/react-store';
import { store } from '../store';
import ErrorBoundary from '../components/ErrorBoundary';

const App = () => {
    useEffect(() => {
        const resumeData = loadFromLocalStorage('resumeData');
        if (resumeData) {
            store.setState((state) => ({
                ...state,
                basicInformation: resumeData.basicInformation,
                workExperience: resumeData.workExperience,
                education: resumeData.education,
                skills: resumeData.skills,
                summary: resumeData.summary,
                awards: resumeData.awards,
                volunteering: resumeData.volunteering,
                template: resumeData.template,
            }));
        }
    }, []);

    return (
        <Router>
            <ErrorBoundary>
                <Routes>
                    <Route path="/" element={<EditorPage />} />
                </Routes>
            </ErrorBoundary>
        </Router>
    );
};

export default App;