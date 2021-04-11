export interface WeatherInfo {
  id: Number
  applicableDate:	Date,
  weatherStateName:	String,
  weatherStateAbbr:	String,
  windSpeed:	Number,
  windDirection:	Number,
  windDirectionCompass: String,
  minTemp: Number,
  maxTemp: Number,
  airPressure:	Number,
  humidity: Number,
  visibility: Number,
  predictability: Number
}

export type SearchLocationResponse = {
  latt_long: string,
  location_type: string,
  title: string,
  woeid: number
}[]