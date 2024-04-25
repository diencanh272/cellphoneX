import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8008',
    timeout: 5000,
    responseType: 'json',
    headers: {
        'content-type': 'application/json',
    },
});

axiosClient.interceptors.request.use(async (config) => {
    // Kiểm tra request gửi đi
    // Handle token ...
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            //get data
            return response.data;
        }

        return response;
    },
    (error) => {
        // Handle errors
        throw error;
    },
);

export default axiosClient;
