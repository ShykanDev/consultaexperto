import { defineStore } from 'pinia'

const authStore = defineStore('auth', {
  state: () => ({
    isAuth: false,
  }),
  actions: {
    setIsAuth(isAuth: boolean) {
      this.isAuth = isAuth
    },
  },
  getters: {
    getIsAuth: (state) => state.isAuth,
  },
})

export default authStore
