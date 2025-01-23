//setup axios
import Axios from 'axios';
import { setupCache, type AxiosCacheInstance } from 'axios-cache-interceptor';

const axios = setupCache(Axios); 

declare global {
    interface Window {
        axios: AxiosCacheInstance;
    }
}

window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Content-Type'] = 'application/json';
window.axios.defaults.baseURL = `${import.meta.env.VITE_API_URL}`
window.axios.defaults.withCredentials = true
