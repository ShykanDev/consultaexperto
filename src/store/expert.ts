import { IExpert } from '@/interfaces/IExpert'
import { defineStore } from 'pinia'

const expertStore = defineStore('expert', {
  state: () => ({
    expertArea: '',
    expertName: '',
    expertUid: '',
    summary: '',
    expertData: {} as IExpert | any
  }),
  actions: {
    setExpertArea(expertArea: string) {
      this.expertArea = expertArea
    },
    setExpertName(expertName: string) {
      this.expertName = expertName
    },
    setExpertUid(expertUid: string) {
      this.expertUid = expertUid
    },
    setSummary(summary: string) {
      this.summary = summary
    },
    setExpertData(expertData: IExpert) {
      this.expertData = expertData
    },
    resetExpertData(){
      this.expertData = {} as IExpert
    }
  },
  getters: {
    getExpertName: (state) => state.expertName,
    getExpertArea: (state) => state.expertArea,
    getExpertUid: (state) => state.expertUid,
    getSummary: (state) => state.summary,
    getExpertData: (state) => state.expertData,
  },
  
})

export default expertStore
