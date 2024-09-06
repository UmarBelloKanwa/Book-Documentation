import React from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.css";

const SearchBar = ({ ...props }) => {
  return (
    <div className={styles.searchBar}>
      <input {...props} />
      <FaSearch className={styles.searchIcon}/>
    </div>
  );
};

export default SearchBar;
