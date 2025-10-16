import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import './App.css'
import { getSuggestionsQuery } from './api/suggestions.api';
import type { DaySuggestion, SuggestionsData } from './api/suggestions.api';
import { ContentCardManager } from './components/ContentCardManager';
import { ContentCard } from './components/ContentCard';

function App() {
  const [city, setCity] = useState('Almaty');
  const [searchCity, setSearchCity] = useState('Almaty');

  const { loading, error, data } = useQuery<SuggestionsData>(getSuggestionsQuery, {
    variables: { city: searchCity },
  });

  const handleSearch = () => {
    setSearchCity(city);
  };

  return (
    <>
      <h1>Activity Suggestions by Weather</h1>
      <div>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {data && (
        <ContentCardManager
          items={data.getSuggestions.data}
          renderItem={(day: DaySuggestion, index: number) => (
            <ContentCard key={index} daySuggestion={day} />
          )}
        />
      )}
    </>
  )
}

export default App
