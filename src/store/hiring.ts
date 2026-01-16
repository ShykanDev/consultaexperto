import { defineStore } from 'pinia';

export const useHiringStore = defineStore('hiring', {
    state: () => ({
        expertName: '',
        expertSpecialty: '',
        expertUid: '',
    }),
    actions: {
        setExpertHiringData(expName: string, expSpecialty: string, expUid: string) {
            this.expertName = expName;
            this.expertSpecialty = expSpecialty;
            this.expertUid = expUid;
        },
    },
    getters: {
        getExpertHiringData: (state) => state,
    },
});