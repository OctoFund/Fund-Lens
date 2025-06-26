import axios from "axios";
import ResponseFormat from "../ResponseFormat";

const axiosAdapter = {
    get: async (url, headers) => {
        try {
            const response = await axios.get(url, { headers });
            const rf = new ResponseFormat(response.status, 
                                    response.statusText, 
                                    response.data);
            return rf;
        }
        catch (error) {
            const status = error.response?.status || 0;
            const statusText = error.message || "Network Error";

            const rf = new ResponseFormat(
                status,
                statusText,
                null // or { error: true, message: statusText }
            );
            return rf;
        }
    },
    post: async (url, data, headers) => {
        const response = await axios.post(url, data, { headers });
        const rf = new ResponseFormat(response.status, 
            response.statusText, 
            response.data);
        return rf;
    },
    put: async (url, data, headers) => {
        const response = await axios.put(url, data, { headers });
        const rf = new ResponseFormat(response.status, 
            response.statusText, 
            response.data);
        return rf;
    },
    patch: async (url, data, headers) => {
        const response = await axios.patch(url, data, { headers });
        const rf = new ResponseFormat(response.status, 
            response.statusText, 
            response.data);
        return rf;
    },
    delete: async (url, headers) => {
        const response = await axios.delete(url, { headers });
        const rf = new ResponseFormat(response.status, 
            response.statusText, 
            response.data);
        return rf;
    }
};

export default axiosAdapter;