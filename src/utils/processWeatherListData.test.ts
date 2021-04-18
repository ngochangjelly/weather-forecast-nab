import { weatherList, weatherListResponse, processedWeatherListResponse, wrongSearchWeatherResponse } from '../mocks/weather';
import {processWeatherListData} from './processWeatherListData'

describe('processWeatherListData', () => {
  it('should run correctly', () => {
    expect(processWeatherListData(weatherListResponse)).toEqual(
      processedWeatherListResponse
    )
  })
  it('should return empty list when input wrong format type', () => {
    expect(
      processWeatherListData({
        ...weatherList,
        strange_attribute: null,
      } as wrongSearchWeatherResponse)
    ).toEqual([])
  })
})
