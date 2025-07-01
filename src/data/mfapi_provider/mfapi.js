import API from "../api";
import networkModule from "../../network/module";
import HTTPRequestTypes from "../../network/HTTPRequestTypes";

class MF_API extends API {
    DOMAIN = "api.mfapi.in";
    SSL = true;
    getAllFundsList = async () => {
        const ret = [];
        const res = await networkModule.request(
            HTTPRequestTypes.GET,
            this._constrcutURL("/mf")
        );

        if (res.code != 200) {
            console.error(`Network Error from ${this.DOMAIN}. Response: ${res}`);
            return ret;
        }

        const schemeMap = new Map();
        res.data.forEach(scheme => {
            // Use schemeCode as the unique key
            if (!schemeMap.has(scheme.schemeCode)) {
                schemeMap.set(scheme.schemeCode, {
                    name: scheme.schemeName,
                    code: scheme.schemeCode
                });
            }
        });

        schemeMap.forEach(schemeObj => {
            ret.push(schemeObj);
        });
        return ret;
    }

    getAllRegularFundsList = async () => {
        const ret = [];
        const res = await networkModule.request(
            HTTPRequestTypes.GET,
            this._constrcutURL("/mf")
        );

        if (res.code != 200) {
            console.error(`Network Error from ${this.DOMAIN}. Response: ${res}`);
            return ret;
        }

        const schemeMap = new Map();
        res.data.forEach(scheme => {
            const name = scheme.schemeName.toLowerCase();
            if (name.includes("regular") && !schemeMap.has(scheme.schemeCode)) {
                schemeMap.set(scheme.schemeCode, {
                    name: scheme.schemeName,
                    code: scheme.schemeCode
                });
            }
        });

        schemeMap.forEach(schemeObj => {
            ret.push(schemeObj);
        });
        return ret;
    }

    getAllDirectFundsList = async () => {
        const ret = [];
        const res = await networkModule.request(
            HTTPRequestTypes.GET,
            this._constrcutURL("/mf")
        );

        if (res.code != 200) {
            console.error(`Network Error from ${this.DOMAIN}. Response: ${res}`);
            return ret;
        }

        const schemeMap = new Map();
        res.data.forEach(scheme => {
            const name = scheme.schemeName.toLowerCase();
            if (name.includes("direct") && !schemeMap.has(scheme.schemeCode)) {
                schemeMap.set(scheme.schemeCode, {
                    name: scheme.schemeName,
                    code: scheme.schemeCode
                });
            }
        });

        schemeMap.forEach(schemeObj => {
            ret.push(schemeObj);
        });
        return ret;
    }

    getAllDirectOrRegularFundsList = async () => {
        const ret = [];
        const res = await networkModule.request(
            HTTPRequestTypes.GET,
            this._constrcutURL("/mf")
        );

        if (res.code != 200) {
            console.error(`Network Error from ${this.DOMAIN}. Response: ${res}`);
            return ret;
        }

        const schemeMap = new Map();
        res.data.forEach(scheme => {
            const name = scheme.schemeName.toLowerCase();
            if ((name.includes("direct") || name.includes("regular")) && !schemeMap.has(scheme.schemeCode)) {
                schemeMap.set(scheme.schemeCode, {
                    name: scheme.schemeName,
                    code: scheme.schemeCode
                });
            }
        });

        schemeMap.forEach(schemeObj => {
            ret.push(schemeObj);
        });
        return ret;
    }

    getOneFundData = async (fundId = 0) => {
        const ret = [];
        if(fundId == 0) {
            return ret;
        }
        if(isNaN(fundId)) {
            return ret;
        }
        const res = await networkModule.request(
            HTTPRequestTypes.GET,
            this._constrcutURL("/mf/" + fundId)
        );
        if (res.code != 200) {
            console.error(`Network Error from ${this.DOMAIN}. Response: ${res}`);
            return ret;
        }

        return res.data.data;
    }
}

const mf_api = new MF_API();

export default mf_api;