import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EditorPage from './EditorPage';
import { loadFromLocalStorage } from '../utils/localStorage';
import { useStore } from '../store';
import ErrorBoundary from '../components/ErrorBoundary';

const App = () => {
    const [setBasicInformation] = useStore('basicInformation');
    const [setWorkExperience] = useStore('workExperience');
    const [setEducation] = useStore('education');
    const [setSkills] = useStore('skills');
    const [setSummary] = useStore('summary');
    const [setAwards] = useStore('awards');
    const [setVolunteering] = useStore('volunteering');
    const [setTemplate] = useStore('template');

    useEffect(() => {
        const resumeData = loadFromLocalStorage('resumeData');
        if (resumeData) {
            setBasicInformation(resumeData.basicInformation);
            setWorkExperience(resumeData.workExperience);
            setEducation(resumeData.education);
            setSkills(resumeData.skills);
            setSummary(resumeData.summary);
            setAwards(resumeData.awards);
            setVolunteering(resumeData.volunteering);
            setTemplate(resumeData.template);
        }
    }, [
        setBasicInformation,
        setWorkExperience,
        setEducation,
        setSkills,
        setSummary,
        setAwards,
        setVolunteering,
        setTemplate,
    ]);

    return (
        <Router>
            <ErrorBoundary>
                <Switch>
                    <Route path="/" component={EditorPage} />
                </Switch>
            </ErrorBoundary>
        </Router>
    );
};

export default App;