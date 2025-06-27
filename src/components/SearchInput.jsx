import Select from "react-select";

function SearchInput({ options, search, setSearch, label, placeholder }) {
  // const fundOptions = [
  //   { value: "HDFC Balanced Advantage Fund", label: "HDFC Balanced Advantage Fund" },
  //   { value: "ICICI Prudential Bluechip Fund", label: "ICICI Prudential Bluechip Fund" }
  // ];
  // const [selectedFunds, setSelectedFunds] = useState([]);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <Select
        isMulti
        options={options}
        selectedOptions={search}
        setSelectedOptions={setSearch}
        placeholder={placeholder}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    </div>
  );
}

export default SearchInput; 