export interface WeatherInfo {
  title: string,
  applicableDate:	string,
  weatherStateName:	string,
  weatherStateAbbr:	string,
  theTemp: number,
  minTemp: number,
  maxTemp: number,
}

export type SearchLocationResponse = {
  distance?: number,
  latt_long: string,
  location_type: string,
  title: string,
  woeid: number
}[]

export type SearchWeatherResponseParent = {
  latt_long: string,
  location_type: string,
  title: string,
  woeid: number
}

export type SourceItem  = {
  crawl_rate: number,
  slug: string,
  title: string,
  url: string,
}

export interface ConsolidatedWeatherItem {
  air_pressure: number,
  applicable_date: string,
  created: string,
  humidity: number,
  id: number,
  max_temp: number,
  min_temp: number,
  predictability: number,
  the_temp: number,
  visibility: number,
  weather_state_abbr: string,
  weather_state_name: string,
  wind_direction: number,
  wind_direction_compass: string,
  wind_speed: number,
}

export interface SearchWeatherResponse {
  consolidated_weather: ConsolidatedWeatherItem[],
  title: string,
  latt_long: string,
  location_type: string,
  parent: SearchWeatherResponseParent,
  sources: SourceItem[],
  sun_rise: string,
  sun_set: string,
  time: string,
  timezone: string,
  timezone_name: string,
  woeid: number
}[]

export interface wrongSearchWeatherResponse {
  consolidated_weather: ConsolidatedWeatherItem[],
  title: string,
  latt_long: string,
  location_type: string,
  parent: SearchWeatherResponseParent,
  sources: SourceItem[],
  sun_rise: string,
  sun_set: string,
  time: string,
  timezone: string,
  timezone_name: string,
  woeid: number,
  strange_attribute: null
}

export type LattLong = {
  latt: number,
  long: number
}