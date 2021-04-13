import React, { useState } from 'react';
import { WeatherInfo } from '../../types/weather'
import './WeatherDisplay.scss'
import { formatDateName, formatDegree } from '../../utils/date'
interface WeatherDisplayProps {
  weatherList: WeatherInfo[]
}
const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherList }) => {
  const [currentWeather, setCurrentWeather] = useState<WeatherInfo>(weatherList[0])
  if (!weatherList || !weatherList.length) return <div></div>
  if (!currentWeather) {
    setCurrentWeather(weatherList[0])
  }
  const handleSelectWeather = (id: number) => {
    console.log('***************   ', id)
    if (weatherList[id]) {
      setCurrentWeather(weatherList[id])
    }
  }
  return (
    <div className="WeatherDisplay__container">
      <div className="WeatherDisplay__container__current">
        <div className="WeatherDisplay__container__current__left">
          <div className="WeatherDisplay__container__current__left__location">
            { currentWeather ? currentWeather.title : ''}
          </div>
          <div className="WeatherDisplay__container__current__left__time">
            { formatDateName(currentWeather ? currentWeather.applicableDate : '') }
          </div>
          <div className="WeatherDisplay__container__current__left__temp">
          { currentWeather ? formatDegree(currentWeather.theTemp) : ''}
          </div>
          <div className="WeatherDisplay__container__current__left__abbrr">
          { currentWeather ? currentWeather.weatherStateName : ''}
          </div>
        </div>
        <div className="WeatherDisplay__container__current__right">
          <div className="WeatherDisplay__container__current__right__temp">
          { currentWeather ? formatDegree(currentWeather.maxTemp) : ''} / { currentWeather ? formatDegree(currentWeather.minTemp) : ''}
          </div>
          <div className="WeatherDisplay__container__current__right__icon">
            { currentWeather && currentWeather.weatherStateAbbr && <img src={`https://www.metaweather.com/static/img/weather/png/64/${currentWeather.weatherStateAbbr}.png`} alt=""/>}
          </div>
        </div>
      </div>
      <div className="WeatherDisplay__container__list" data-element-type="weatherList">
        {
          weatherList.map((item, id) => {
            return <div key={`weather-item-${id}`} onClick={() => handleSelectWeather(id)}>
              <div className="WeatherDisplay__container__list__header">
                {formatDateName(item.applicableDate)}
              </div>
              <div className="WeatherDisplay__container__list__icon">
              { item && item.weatherStateAbbr && <img src={`https://www.metaweather.com/static/img/weather/png/64/${item.weatherStateAbbr}.png`} alt=""/>}
              </div>
              <div className="WeatherDisplay__container__list__body">
                <div className="WeatherDisplay__container__list__body__state">{item.weatherStateName}</div>
                <div className="WeatherDisplay__container__list__body__min">Min: {formatDegree(item.minTemp)}</div>
                <div className="WeatherDisplay__container__list__body__max">Max: {formatDegree(item.maxTemp)}</div>
              </div>
            </div>
          })
        }
      </div>
    </div>
  );
}

export default WeatherDisplay;
