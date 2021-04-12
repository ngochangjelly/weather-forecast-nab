import { WeatherInfo, SearchWeatherResponse, ConsolidatedWeatherItem } from '../types/weather'

export const processWeatherListData = (data: SearchWeatherResponse) : WeatherInfo[] => {
    console.log(data)
    console.log(data.title)
    try {
        const {
            consolidated_weather,
            title,
          }: {
            consolidated_weather: ConsolidatedWeatherItem[]
            title: string
          } = data
        const finalData: WeatherInfo[] = consolidated_weather.map(
          ({
            weather_state_name,
            the_temp,
            min_temp,
            max_temp,
            applicable_date,
            weather_state_abbr,
          }) => {
            return {
              title,
              weatherStateName: weather_state_name,
              theTemp: the_temp,
              minTemp: min_temp,
              maxTemp: max_temp,
              applicableDate: applicable_date,
              weatherStateAbbr: weather_state_abbr,
            }
          }
        )
    
        return finalData
      } catch (error) {
        return []
      }
    // return []
}