import networkModule from "../network/module";

class API {
    DOMAIN = "sample.com";
    SSL = false
    _constrcutURL = (homeRoute) => {
        let url = "";
        if(this.SSL) {
            url += "https://";
        }
        else {
            url += "http://";
        }
        url += this.DOMAIN;
        url += homeRoute;
        return url;
    }
    getAllFundsList = async () => {
        throw Error("NOT Implemented");
    }
    getAllIndexList = async () => {
        throw Error("NOT Implemented");
    }
    
};

export default API;