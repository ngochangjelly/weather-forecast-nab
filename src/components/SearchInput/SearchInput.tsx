import React, { useEffect, useMemo, useState } from 'react'
import debounce from 'lodash.debounce'
import { searchLocation, getWeather } from '../../services/weather'
import { WeatherInfo, SearchLocationResponse } from '../../types/weather'
import { processWeatherListData } from '../../utils/processWatherListData'

interface SearchInputProps {
  setWeathersList: React.Dispatch<React.SetStateAction<WeatherInfo[]>>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}
const SearchInput: React.FC<SearchInputProps> = ({
  setWeathersList,
  setIsLoading
}) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [cityItems, setCityItems] = useState<SearchLocationResponse>([])
  const [isSearching, setIsSearching] = useState<boolean>(false)

  const debouncedFetchLocationList = useMemo(
    () =>
      debounce(async (searchValue: string) => {
        try {
          if (searchValue.trim() !== '') {
            setIsSearching(true)
            const data = await searchLocation({
              type: 'text',
              value: searchValue.trim(),
            })
            setCityItems(data)
            return data
          }
        } catch {
          setCityItems([])
        } finally {
          setIsSearching(false)
        }
      }, 300),
    []
  )

  useEffect(() => {
    debouncedFetchLocationList(searchValue)
  }, [searchValue, debouncedFetchLocationList])

  const handleSelectCity = async (e: any) => {
    try {
      // disable if not <li /> clicked
      if (e.target.getAttribute('data-element-type') === 'dropDown') {
        return
      }
      const selectedWoeid = e.target.getAttribute('data-woeid')
      // setCityItems([])
      setIsLoading(true)
      setSearchValue('')
      const data = await getWeather({ woeid: selectedWoeid })
      const finalWeatherData = processWeatherListData(data)
      setWeathersList(finalWeatherData)
    } finally {
      // setIsLoading(false)
    }
  }

  return (
    <div className="w-100 position-relative">
      <div className="input-group">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="form-control"
          list="cityDataList"
          id="searchInput"
          data-testid="searchInput"
          placeholder="Enter city name..."
        />
        {isSearching && (
          <div className="input-group-text">
            loading...
          </div>
        )}
      </div>
      <ul
        data-element-type="dropDown"
        onClick={handleSelectCity}
      >
        {cityItems.map(({ title, woeid }) => {
          return (
            <li
              key={woeid}
              data-woeid={woeid}
            >
              {title}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SearchInput