import { defineStore } from "pinia";

export const useExpertUiStore= defineStore('expertAdmin', {
  state: () => ({
    expertUid: '',
  }),
  getters: {
    getExpertUid: (state) => state.expertUid,
  },
  actions: {
    resetExpertUid() {
      this.expertUid = '';
    },
    setExpertUid(uid: string) {
      this.expertUid = uid;
    },
  },
  persist:true
});