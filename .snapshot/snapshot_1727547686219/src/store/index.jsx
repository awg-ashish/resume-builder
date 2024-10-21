import { createStore } from '@tanstack/react-store';
import resumeStore from './resumeStore';

const store = createStore({
    basicInformation: resumeStore.basicInformation,
    workExperience: resumeStore.workExperience,
    education: resumeStore.education,
    skills: resumeStore.skills,
    summary: resumeStore.summary,
    awards: resumeStore.awards,
    volunteering: resumeStore.volunteering,
    template: resumeStore.template,
});

export const useStore = store.useStore;
export default store;