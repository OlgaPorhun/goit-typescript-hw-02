import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (inputValue.trim() === "") {
      setError("Please enter a search query.");
      return;
    }

    setError(null);
    onSubmit(inputValue);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchBar}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={styles.searchInput}
        placeholder="Search for images..."
      />
      <button type="submit" className={styles.searchButton}>
        Search
      </button>
      {error && <ErrorMessage message={error} />}
    </form>
  );
};

export default SearchBar;
