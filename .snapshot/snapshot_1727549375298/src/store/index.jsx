import { Store } from '@tanstack/store';
import resumeStore from './resumeStore';

const store = Store({
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