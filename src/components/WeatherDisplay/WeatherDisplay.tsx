import React, { useState } from 'react';
import { WeatherInfo } from '../../types/weather'
import './WeatherDisplay.scss'
import { formatDateName, formatDegree } from '../../utils/date'
interface WeatherDisplayProps {
  weatherList: WeatherInfo[]
}
const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherList }) => {
  return (
    <div className="WeatherDisplay__container">
      {
        weatherList.map((item, id) => {
          return <div key={`weather-item-${id}`}>
            <div className="WeatherDisplay__container__header">
              {formatDateName(item.applicableDate)}
            </div>
            <div className="WeatherDisplay__container__body">
              <div className="WeatherDisplay__container__body__min">Min: {formatDegree(item.minTemp)}</div>
              <div className="WeatherDisplay__container__body__max">Max: {formatDegree(item.maxTemp)}</div>
            </div>
          </div>
        })
      }
    </div>
  );
}

export default WeatherDisplay;
