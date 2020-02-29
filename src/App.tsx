import React, { useState, useEffect } from 'react';
import useFetch from './useFetch';

export interface ILocation {
  location: string;
  country: string;
}

export default function App() {
  const [searchString, setSearchString] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [doSearch, setDoSearch] = useState(false);
  const { response, loading, error } = useFetch('test.json', doSearch);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  useEffect(() => {
    setDoSearch(searchString.length > 0);
    setIsPanelOpen(searchString.length > 0);
  }, [searchString.length]);

  const renderSearchResults = () =>
    !loading &&
    !error &&
    response &&
    response.length > 0 && (
      <ul aria-label="search-results">
        {response.map((loc: ILocation, i: number) => (
          <li key={i}>
            {loc.location}, {loc.country}
          </li>
        ))}
      </ul>
    );

  return (
    <div className="App">
      <label htmlFor="search">Search:</label>
      <input
        type="text"
        aria-label="search-input"
        id="search"
        name="search"
        autoComplete="off"
        value={searchString}
        onChange={handleChange}
      />

      {isPanelOpen && (
        <div aria-label="search-panel">{renderSearchResults()}</div>
      )}
    </div>
  );
}
