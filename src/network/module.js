const HTTPRequestTypes = require("./HTTPRequestTypes");
const axiosAdapter = require("./axios/axiosAdapter");

class NetworkModule {
    request = (requestType, url, headers = {}, data = null) => {
        switch(requestType) {
            case HTTPRequestTypes.GET:
                return axiosAdapter.get(url, headers);
            case HTTPRequestTypes.POST:
                return axiosAdapter.post(url, data, headers);
            case HTTPRequestTypes.DELETE:
                return axiosAdapter.delete(url, headers);
            case HTTPRequestTypes.PATCH:
                return axiosAdapter.patch(url, data, headers);
            case HTTPRequestTypes.PUT:
                return axiosAdapter.put(url, data, headers);
            default:
                throw new Error('Unsupported request type');
        }
    }
}

const networkModule = new NetworkModule();

module.exports = networkModule;