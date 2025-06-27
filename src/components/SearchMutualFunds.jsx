import SearchInput from "./SearchInput";
import PLACEHOLDERS from "../common/placeholders";


function SearchMutualFunds({ fundOptions, selectedMutualFunds, setSelectedMutualFunds }) {  
  // const fundOptions = [
  //   { value: "HDFC Balanced Advantage Fund", label: "HDFC Balanced Advantage Fund" },
  //   { value: "ICICI Prudential Bluechip Fund", label: "ICICI Prudential Bluechip Fund" }
  // ];
  // const [selectedFunds, setSelectedFunds] = useState([]);

  return (
    <SearchInput 
      options={fundOptions}
      selected={selectedMutualFunds}
      setSelected={setSelectedMutualFunds}
      label = {PLACEHOLDERS.home.mutual_fund_search.label}
      placeholder = {PLACEHOLDERS.home.mutual_fund_search.placeholder}
    />
  );
}

export default SearchMutualFunds; 