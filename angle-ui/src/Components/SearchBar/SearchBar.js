import React, { useState } from "react";
import "./search-bar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = event => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter(value => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="search-inputs">
        <input
          onChange={handleFilter}
          type="text"
          placeholder={placeholder}
          value={wordEntered}
        ></input>
        <div className="search-icon">
          {filteredData.length == 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clear-btn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="data-result">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a className="data-item" href={value.url} target="_blank">
                <p>{value.title}</p> <p className="author">by {value.author}</p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
