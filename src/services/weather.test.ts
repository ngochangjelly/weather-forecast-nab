import axios from "axios";

import { weatherListResponse, locationListResponseTextQuery, locationListResponseLattlongQuery } from '../mocks/weather'
import {getWeather, searchLocation} from '../services/weather'

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
it('should fetch location list data by query type text', async() => {
  mockedAxios.get.mockResolvedValueOnce({data: locationListResponseTextQuery})
  // search for new delhi with woeid code 28743736
  const data = await searchLocation({ type: 'text', value: 'ho chi minh' })
  expect(data).toBe(locationListResponseTextQuery)

})
it('should fetch location list data by query type lattlong', async() => {
  mockedAxios.get.mockResolvedValue({data: locationListResponseLattlongQuery})
  const data = await searchLocation({ type: 'lattlong', value: '36.96,-122.02' })
  expect(data).toBe(locationListResponseLattlongQuery)
})
it('should fetch weather list data', async() => {
  mockedAxios.get.mockResolvedValueOnce({data: weatherListResponse})
  // search for new delhi with woeid code 28743736
  const data = await getWeather({ woeid: 28743736 })
  expect(data).toBe(weatherListResponse)

})