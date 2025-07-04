import API from "../api";
import networkModule from "../../network/module";
import HTTPRequestTypes from "../../network/HTTPRequestTypes";

class GITHUBUPERCONTENT_API extends API {
    DOMAIN = "raw.githubusercontent.com";
    SSL = true;
    getAllIndexList = async () => {
        var ret = [];

        // API Response format will be this one:
        // {
        //     "d": [
        //      {
        //          "__type": "IISL.ResearchPaper",
        //          "category": null,
        //          "title": null,
        //          "documentname": null,
        //          "downloadUrl": null,
        //          "dateofindex": null,
        //          "formatdate": null,
        //          "TitleName": null,
        //          "indextype": "NIFTY 100",
        //          "indexgroup": null,
        //          "Date": null
        //      }
        // }
        const res = await networkModule.request(
                        HTTPRequestTypes.GET, 
                        this._constrcutURL("/asrajavel/mf-index-data/main/index list.json")
                    );
        
		if(res.code != 200) {
            console.error(`Network Error from ${this.DOMAIN}. Response: ${res}`);
            return ret;
        }
        const indexNamesSet = new Set();
        res.data["d"].forEach(index => {
            indexNamesSet.add(index.indextype);
        });
        indexNamesSet.forEach(index => {
            ret.push(index);
        });
        return ret;
    }
    getOneIndexData = async (index = "") => {
        var ret = [];
        if(index.trim().length == 0) {
            return ret;
        }
        const res = await networkModule.request(
            HTTPRequestTypes.GET, 
            this._constrcutURL("/asrajavel/mf-index-data/main/index data/" + index + ".json")
        );
        if(res.code != 200) {
            console.error(`Network Error from ${this.DOMAIN}. Response: ${res}`);
            return ret;
        }
        ret = JSON.parse(res.data['d']);
        return ret;
    }
}

const githubuser_api = new GITHUBUPERCONTENT_API();

export default githubuser_api;