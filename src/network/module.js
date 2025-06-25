import HTTPRequestTypes from "./HTTPRequestTypes";
import axiosAdapter from "./axios/axiosAdapter";

class NetworkModule {
    request = async (requestType, url, headers = {}, data = null) => {
        switch(requestType) {
            case HTTPRequestTypes.GET:
                return await axiosAdapter.get(url, headers);
            case HTTPRequestTypes.POST:
                return await axiosAdapter.post(url, data, headers);
            case HTTPRequestTypes.DELETE:
                return await axiosAdapter.delete(url, headers);
            case HTTPRequestTypes.PATCH:
                return await axiosAdapter.patch(url, data, headers);
            case HTTPRequestTypes.PUT:
                return await axiosAdapter.put(url, data, headers);
            default:
                throw new Error('Unsupported request type');
        }
    }
}

const networkModule = new NetworkModule();

export default networkModule;