import { IExpert } from "@/interfaces/IExpert";
import { defineStore } from "pinia";

export const useExpertUiStore= defineStore('expertAdmin', {
  state: () => ({
    expertData: {} as IExpert
  }),
  getters: {
    getCurrentExpert: (state) => state.expertData
  },
  actions: {
    setExpertData(expert: IExpert) {
      this.expertData = expert;
    },
    resetCurrentExpert() {
      this.expertData = {} as IExpert;
    }
  }
});