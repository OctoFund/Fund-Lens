import githubuser_api from "./githubupercontent_provider/githubupercontent";
import mf_api from "./mfapi_provider/mfapi";

class DataRepository {
    /**
     * Gets the list of names of all the available mutual funds.
     * @returns {Array} List of names (String) of funds. 
     * Like; [{name: "MF 1", code:1}, {name: "MF 2", code:2}];
     */
    getAllFundsList = async () => {
        return await mf_api.getAllFundsList();
    }

    /**
     * Gets the list of names of all the regular type mutual funds available.
     * @returns {Array} List of names (String) of funds. 
     * Like; [{name: "MF 1", code:1}, {name: "MF 2", code:2}];
     */
    getAllRegularFundsList = async () => {
        return await mf_api.getAllRegularFundsList();
    }

    /**
     * Gets the list of names of all the direct type mutual funds available.
     * @returns {Array} List of names (String) of funds. 
     * Like; [{name: "MF 1", code:1}, {name: "MF 2", code:2}];
     */
    getAllDirectFundsList = async () => {
        return await mf_api.getAllDirectFundsList();
    }

    /**
     * Gets the list of names of all the direct or regular type mutual funds available.
     * @returns {Array} List of names (String) of funds. 
     * Like; [{name: "MF 1", code:1}, {name: "MF 2", code:2}];
     */
    getAllDirectOrRegularFundsList = async () => {
        return await mf_api.getAllDirectOrRegularFundsList();
    }

    /**
     * Gets the list of titles of all the indexes.
     * @returns {Array} List of names (String) of indexes. 
     * Like; ["NIFTY 50", "NIFTY 100"];
     */
    getAllIndexList = async () => {
        return await githubuser_api.getAllIndexList();
    }
}

const dataRepository = new DataRepository();

export default dataRepository;