import React, { useState } from 'react';
import './App.scss';

import SearchInput from './components/SearchInput'
import { WeatherInfo } from './types/weather'
const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [weatherLists, setWeathersList] = useState<WeatherInfo[]>([])
  return (
    <div className="app__container">
      <div>
        <SearchInput setWeathersList={setWeathersList}
          setIsLoading={setIsLoading} />
        {/* <WeatherInfo /> */}
      </div>
    </div>
  );
}

export default App;
