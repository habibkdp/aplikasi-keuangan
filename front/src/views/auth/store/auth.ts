import { defineStore } from "pinia";

export const useAuthStore = defineStore('authStore', {
    state: () => {
        return {
            name: '',
            email: '',
            rememberToken: '',
            accessToken: ''
        }
    },
    actions: {
        setUser(data: ResponseDataType) {
            localStorage.setItem('token', data.access_token);
            this.name = data.user.name;
            this.email = data.user.email;
            this.accessToken = data.access_token;
        }
    }
});

interface ResponseDataType {
    access_token: string,
    user: UserDataType
}

interface UserDataType {
    name: string,
    email: string,
    rememberToken: string,
    accessToken: string
}