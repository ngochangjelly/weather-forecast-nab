import React, { useState } from 'react';
import './App.scss';
import WeatherDisplay from './components/WeatherDisplay'

import SearchInput from './components/SearchInput'
import { WeatherInfo } from './types/weather'
const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [weatherList, setWeathersList] = useState<WeatherInfo[]>([])
  return (
    <div className="App__container">
      <div className="App__container__block">
        <div className="App__container__block--center">
          <SearchInput setWeathersList={setWeathersList}
            setIsLoading={setIsLoading} />
          <WeatherDisplay weatherList={weatherList} />
        </div>
      </div>
    </div>
  );
}

export default App;
