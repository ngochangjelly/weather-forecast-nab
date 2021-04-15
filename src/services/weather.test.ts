import axios, { AxiosResponse } from "axios";
import { mocked } from 'ts-jest/utils'
import { weatherListResponse } from '../mocks/weather'
import {getWeather, searchLocation} from '../services/weather'

const mockedAxios = axios as jest.Mocked<typeof axios>;

it('should fetch weather list data', async() => {
  mockedAxios.get.mockResolvedValueOnce({ data: weatherListResponse })
  // search for new delhi with woeid code 28743736
  const data = await getWeather({ woeid: 28743736 })
  expect(data).toBe(weatherListResponse)

})