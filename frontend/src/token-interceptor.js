import axios from 'axios';

axios.interceptors.request.use(config => {
    const { token } = useAuthStore();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
})

axios.interceptors.push({
    responseError: function (error) {
        if (error.response && error.response.status === 401) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
});