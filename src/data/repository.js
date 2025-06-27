import githubuser_api from "./githubupercontent_provider/githubupercontent";
import mf_api from "./mfapi_provider/mfapi";

class DataRepository {
    /**
     * Gets the list of names of all the available mutual funds.
     * @returns {Array} List of names (String) of funds. 
     * Like; ["MF 1", "MF 2"];
     */
    getAllFundsList = async () => {
        return await mf_api.getAllFundsList();
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