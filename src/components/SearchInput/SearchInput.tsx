import React, { useEffect, useMemo, useState } from 'react'
import debounce from 'lodash.debounce'
import { searchLocation, getWeather } from '../../services/weather'
import { WeatherInfo, SearchLocationResponse } from '../../types/weather'
import { processWeatherListData } from '../../utils/processWatherListData'
import './SearchInput.scss'
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
      if (e.target.getAttribute('data-element-type') === 'dropDown') {
        return
      }
      const selectedWoeid = e.target.getAttribute('data-woeid')
      setCityItems([])
      setIsLoading(true)
      setSearchValue('')
      const data = await getWeather({ woeid: selectedWoeid })
      const finalWeatherData = processWeatherListData(data)
      setWeathersList(finalWeatherData)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="SearchInput">
      <div className="SearchInput__wrapper">
        <div className="SearchInput__block">
          <div className="SearchInput__block__table">
            <div className="SearchInput__block__table__data">
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                type="text"
                placeholder="Enter city name..."
                required
              />
            </div>
            <div className="SearchInput__block__table__data" id="s-cover">
              <button type="submit">
                <div id="s-circle"></div>
                <span></span>
              </button>
            </div>
          </div>
        </div>
        {isSearching && (
          <div className="SearchInput__block__searching">
            loading...
          </div>
        )}
      </div>
      {cityItems && cityItems.length > 0 && <div className="SearchInput__dropdown">
        <ul
          className="SearchInput__dropdown__list"
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
      </div>}
    </div>
  )
}

export default SearchInput