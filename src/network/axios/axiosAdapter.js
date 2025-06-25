const axios = require('axios');

const axiosAdapter = {
    request: (url, method, headers, data) => {
        return axios({ url, method, headers, data });
    },
    get: (url, headers) => {
        return axios.get(url, { headers });
    },
    post: (url, data, headers) => {
        return axios.post(url, data, { headers });
    },
    put: (url, data, headers) => {
        return axios.put(url, data, { headers });
    },
    patch: (url, data, headers) => {
        return axios.patch(url, data, { headers });
    },
    delete: (url, headers) => {
        return axios.delete(url, { headers });
    }
};

module.exports = axiosAdapter;{}