import SearchInput from "./SearchInput";
import PLACEHOLDERS from "../common/placeholders";


function SearchMutualFunds({ fundOptions, searchMutualFunds, setSearchMutualFunds }) {
  console.log(fundOptions);
  
  // const fundOptions = [
  //   { value: "HDFC Balanced Advantage Fund", label: "HDFC Balanced Advantage Fund" },
  //   { value: "ICICI Prudential Bluechip Fund", label: "ICICI Prudential Bluechip Fund" }
  // ];
  // const [selectedFunds, setSelectedFunds] = useState([]);

  return (
    <SearchInput 
      options={fundOptions}
      search={searchMutualFunds}
      setSearch={setSearchMutualFunds}
      label = {PLACEHOLDERS.home.mutual_fund_search.label}
      placeholder = {PLACEHOLDERS.home.mutual_fund_search.placeholder}
    />
  );
}

export default SearchMutualFunds; 