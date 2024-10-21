import { Store } from '@tanstack/store';

// Define the initial state
const initialState = {
    basicInformation: {
        name: '',
        title: '',
        phone: '',
        email: '',
        location: '',
    },
    workExperience: [],
    education: [],
    skills: [],
    summary: '',
    awards: [],
    volunteering: [],
    template: 'basic',
};

// Create the store
const store = new Store(initialState);

export { store };