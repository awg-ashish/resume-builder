import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditorPage from './EditorPage';
import { loadFromLocalStorage } from '../utils/localStorage';
import { store } from '../store';
import ErrorBoundary from '../components/ErrorBoundary';

const App = () => {
    useEffect(() => {
        const resumeData = loadFromLocalStorage('resumeData');
        if (resumeData) {
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