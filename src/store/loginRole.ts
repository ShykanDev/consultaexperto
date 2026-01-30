import { defineStore } from "pinia";

export const useLoginRoleStore = defineStore("loginRole", {
  state: () => ({
    role: "user" as "user" | "expert" | "admin",
  }),
  actions: {
    setRole(role: "user" | "expert" | "admin") {
      this.role = role;
    },
  },
  getters: {
    getRole(): "user" | "expert" | "admin" {
      return this.role;
    },
  },
});
