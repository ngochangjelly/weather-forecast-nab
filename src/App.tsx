
import './assets/scss/index.scss';
import React, { useEffect, useState } from 'react';

import './App.scss';
import Loader from './components/Loader'
import SearchInput from './components/SearchInput'
import WeatherDisplay from './components/WeatherDisplay'
import { NAVIGATOR_API_PERMISSION_STATES } from './constants';
import { WeatherInfo, LattLong } from './types/weather'

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [weatherList, setWeathersList] = useState<WeatherInfo[]>([])
  const [guessedLattLong, setGuessedLattLong] = useState<LattLong | null>(null)

  useEffect(() => {
    try {
      // use navigator API to automatically detect client location
      setIsLoading(true)
      navigator?.permissions?.query({ name: 'geolocation' }).then(function (result) {
        if (result.state === NAVIGATOR_API_PERMISSION_STATES.GRANTED) {
          navigator.geolocation.getCurrentPosition(function (position) {
            setGuessedLattLong({
              latt: position.coords.latitude, long: position.coords.longitude
            })
          })
        }
      })
    } catch (err) {

    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <div className="App">
      <div className="App__container">
        <div className="App__container__block">
          <div className="App__container__block--start">
            <SearchInput setWeathersList={setWeathersList}
              guessedLattLong={guessedLattLong}
              setIsLoading={setIsLoading} />
            {
              isLoading &&
              <Loader />
            }
            {weatherList && weatherList.length > 0 && <WeatherDisplay weatherList={weatherList} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
