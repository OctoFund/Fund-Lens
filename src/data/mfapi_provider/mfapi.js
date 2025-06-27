import API from "../api";
import networkModule from "../../network/module";
import HTTPRequestTypes from "../../network/HTTPRequestTypes";

class MF_API extends API {
    DOMAIN = "api.mfapi.in";
    SSL = true;
    getAllFundsList = async () => {
        var ret = [];

        // API Response format will be this one:
        // {
        //     schemeCode: 100027,
        //     schemeName: 'Grindlays Super Saver Income Fund-GSSIF-Half Yearly Dividend',
        //     isinGrowth: null,
        //     isinDivReinvestment: null
        // }
        const res = await networkModule.request(
                        HTTPRequestTypes.GET, 
                        this._constrcutURL("/mf")
                    );
        
		if(res.code != 200) {
            console.error(`Network Error from ${this.DOMAIN}. Response: ${res}`);
            return ret;
        }
        res.data.forEach(scheme => {
            ret.push(scheme.schemeName);
        });
        return ret;
    }
}

const mf_api = new MF_API();

export default mf_api;