import SearchInput from "./SearchInput";
import PLACEHOLDERS from "../common/placeholders";

function SearchIndexes({ indexesOptions, selectedIndexes, setSelectedIndexes }) {
  // const fundOptions = [
  //   { value: "HDFC Balanced Advantage Fund", label: "HDFC Balanced Advantage Fund" },
  //   { value: "ICICI Prudential Bluechip Fund", label: "ICICI Prudential Bluechip Fund" }
  // ];
  // const [selectedFunds, setSelectedFunds] = useState([]);

  return (
    <SearchInput 
      options={indexesOptions}
      selected={selectedIndexes}
      setSelected={setSelectedIndexes}
      label = {PLACEHOLDERS.home.index_search.label}
      placeholder = {PLACEHOLDERS.home.index_search.placeholder}
    />
  );
}

export default SearchIndexes; 