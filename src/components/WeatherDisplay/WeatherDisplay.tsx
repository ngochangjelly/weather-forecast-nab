import React, { useState, useEffect } from 'react';

import './WeatherDisplay.scss'
import { ELEMENT_TEST_IDS } from '../../constants'
import { WeatherInfo } from '../../types/weather'
import { formatDateName, formatDegree } from '../../utils/date'
interface WeatherDisplayProps {
  weatherList: WeatherInfo[]
}
const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherList }) => {
  const [currentWeather, setCurrentWeather] = useState<WeatherInfo | null>(null)
  useEffect(() => {
    setCurrentWeather(weatherList[0])
  }, [weatherList]);

  const handleSelectWeather = (item: WeatherInfo) => {
    setCurrentWeather(item)
  }
  return (
    <div className="WeatherDisplay">
      <div className="WeatherDisplay__container">
        <div className="WeatherDisplay__container__current" data-testid={ELEMENT_TEST_IDS.CURRENT_WEATHER}>
          <div className="WeatherDisplay__container__current__left">
            <div className="WeatherDisplay__container__current__left__location" data-testid={ELEMENT_TEST_IDS.CURRENT_WEATHER_TITLE}>
              {currentWeather ? currentWeather.title : ''}
            </div>
            <div className="WeatherDisplay__container__current__left__time">
              {formatDateName(currentWeather ? currentWeather.applicableDate : '')}
            </div>
            <div className="WeatherDisplay__container__current__left__temp">
              {currentWeather ? formatDegree(currentWeather.theTemp) : ''}
            </div>
            <div className="WeatherDisplay__container__current__left__abbrr">
              {currentWeather ? currentWeather.weatherStateName : ''}
            </div>
          </div>
          <div className="WeatherDisplay__container__current__right">
            <div className="WeatherDisplay__container__current__right__temp">
              {currentWeather ? formatDegree(currentWeather.maxTemp) : ''} / {currentWeather ? formatDegree(currentWeather.minTemp) : ''}
            </div>
            <div className="WeatherDisplay__container__current__right__icon">
              {currentWeather && currentWeather.weatherStateAbbr && <img src={`https://www.metaweather.com/static/img/weather/png/64/${currentWeather.weatherStateAbbr}.png`} alt="" />}
            </div>
          </div>
        </div>
        <div className="WeatherDisplay__container__list" data-element-type="weatherList" data-testid={ELEMENT_TEST_IDS.WEATHER_LIST}>
          {
            weatherList.map((item, id) => {
              return <div key={`weather-item-${id}`}
                data-testid={ELEMENT_TEST_IDS.WEATHER_LIST_ITEM}
                onClick={() => handleSelectWeather(item)} className={item === currentWeather ? "WeatherDisplay__container__list__item WeatherDisplay__container__list__item--active" : "WeatherDisplay__container__list__item"}>
                <div className="WeatherDisplay__container__list__item__header">
                  {formatDateName(item.applicableDate)}
                </div>
                <div className="WeatherDisplay__container__list__item__icon">
                  {item.weatherStateAbbr && <img src={`https://www.metaweather.com/static/img/weather/png/64/${item.weatherStateAbbr}.png`} alt="" />}
                </div>
                <div className="WeatherDisplay__container__list__item__body">
                  <div className="WeatherDisplay__container__list__item__body__state">{item.weatherStateName}</div>
                  <div className="WeatherDisplay__container__list__item__body__min">Min: {formatDegree(item.minTemp)}</div>
                  <div className="WeatherDisplay__container__list__item__body__max">Max: {formatDegree(item.maxTemp)}</div>
                </div>
              </div>
            })
          }
        </div>
      </div>
    </div>
  );
}

export default WeatherDisplay;
