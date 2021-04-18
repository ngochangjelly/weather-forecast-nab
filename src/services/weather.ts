import axios from 'axios'

import { SearchLocationResponse, SearchWeatherResponse } from '../types/weather'

type SearchWeatherParams = {
  woeid: number
}
interface searchLocationParams {
  type: string,
  value?: string
}

export const getWeather = async ({
    woeid,
  } : SearchWeatherParams): Promise<SearchWeatherResponse> => {
  const { data } = await axios.get(`/api/location/${woeid}/`)
  return data
}

export const searchLocation = async ({
  type,
  value,
}: searchLocationParams): Promise<SearchLocationResponse> =>
  {
    const queryType = type === 'text' ? 'query' : 'lattlong'
    const { data } = await axios.get(
      `/api/location/search/?${queryType}=${value}`
    )
    return data
  }