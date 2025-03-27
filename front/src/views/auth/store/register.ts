import { defineStore } from "pinia";

export const useRegisterStore = defineStore('registerStore', {
    state: () => {
        return {
            status: false as boolean
        }
    },
    actions: {
        setStatus(val: boolean) {
            this.status = val;
        }
    }
});