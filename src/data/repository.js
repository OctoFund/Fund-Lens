import MF_API from "./mfapi_provider/mfapi";

class DataRepository {
    /**
     * Gets the list of names of all the available mutual funds.
     * @returns {Array} List of names (String) of funds. 
     * Like; ["MF 1", "MF2"];
     */
    getAllFundsList = async () => {
        return await MF_API.getAllFundsList();
    }
}

const dataRepository = new DataRepository();

export default dataRepository;