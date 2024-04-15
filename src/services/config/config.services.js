import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    timeout: 5000,
    responseType: 'json',
    headers: {
        'content-type': 'application/json',
    },
    auth: {
        username: 'admin',
        password: '123456',
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
