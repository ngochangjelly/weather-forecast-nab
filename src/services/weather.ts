import axios from 'axios'
import { SearchLocationResponse } from '../types/weather'

type SearchWeatherParams = {
  woeid: number
}
interface searchLocationParams {
  type: string,
  value?: string
}

const LOCATION_QUERY_BY_QUERY_URL = (query: string) => `/api/location/search/?query=(${query})`
const LOCATION_QUERY_BY_LAT_LONG_URL = (latt: string, long: string) => `/api/location/search/?lattlong=(${latt}),(${long})`

export const getWeather = async ({woeid} : SearchWeatherParams) => {
  const { data } = await axios.get(
    `/api/location/${woeid}`
  )
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