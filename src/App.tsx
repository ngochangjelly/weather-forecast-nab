import React, { useState } from 'react';
import './assets/scss/index.scss';
import './App.scss';
import WeatherDisplay from './components/WeatherDisplay'

import SearchInput from './components/SearchInput'
import { WeatherInfo } from './types/weather'
const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [weatherList, setWeathersList] = useState<WeatherInfo[]>([])
  return (
    <div className="App">
      <div className="App__container">
        <div className="App__container__block">
          <div className="App__container__block--start">
            <SearchInput setWeathersList={setWeathersList}
              setIsLoading={setIsLoading} isLoading={isLoading}/>
            {weatherList && weatherList.length > 0 && <WeatherDisplay weatherList={weatherList} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
