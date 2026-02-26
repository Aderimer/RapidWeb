import { defineStore } from 'pinia';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const useAuthStore = defineStore('auth', {
    state: () => ({
        username: null,
        token: null,
        role: null
    }),
    actions: {
        async login(credentials) {
            try {
                const response = await axios.post('http://localhost:3000/users/login', credentials);
                this.username = response.data.data.username;
                this.token = response.data.data.token;
                this.role = response.data.data.role;
                localStorage.setItem('token', this.token);
                localStorage.setItem('username', this.username);
                localStorage.setItem('role', this.role);
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
                return response;
            } catch (error) {
                throw error;
            }
        },

        async register(userData) {
            try {
                const response = await axios.post('http://localhost:3000/users/signup', userData);
            } catch (error) {
                throw error
            }
        },
        
        logout() {
            try {
                axios.post('http://localhost:3000/users/logout');
            this.user = null;
            this.token = null;
            this.role = null;
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('role');
            delete axios.defaults.headers.common['Authorization'];
            } catch (error) {
                console.error('Logout failed:', error);
            }
        }
    }
});