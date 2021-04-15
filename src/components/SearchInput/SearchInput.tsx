import React, { useEffect, useMemo, useState, useRef } from 'react'
import debounce from 'lodash.debounce'
import { searchLocation, getWeather } from '../../services/weather'
import { WeatherInfo, SearchLocationResponse } from '../../types/weather'
import { processWeatherListData } from '../../utils/processWatherListData'
import './SearchInput.scss'
import useOnClickOutside from '../../hooks/useClickOutside'
import Loader from '../common/Loader'
interface SearchInputProps {
  setWeathersList: React.Dispatch<React.SetStateAction<WeatherInfo[]>>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  isLoading: boolean
}
const SearchInput: React.FC<SearchInputProps> = ({
  setWeathersList,
  setIsLoading,
  isLoading
}) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [cityItems, setCityItems] = useState<SearchLocationResponse>([])
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [isModalOpen, setModalOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setModalOpen(false));

  const debouncedFetchLocationList = useMemo(
    () =>
      debounce(async (searchValue: string) => {
        try {
          if (searchValue.trim() !== '') {
            setModalOpen(true)
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
        <div className="SearchInput__wrapper__title">Search weather of cities<br/> around the world</div>
        <div className="SearchInput__wrapper__block">
          <div className="SearchInput__wrapper__block__search__container">
            <input value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Enter city name..."
              className="SearchInput__wrapper__block__search__input" type="text" />
          </div>
        </div>
        {(isSearching || isLoading) && (
          <Loader />
        )}
      </div>
      {isModalOpen && cityItems && cityItems.length > 0 && <div className="SearchInput__dropdown">
        <div
          className="SearchInput__dropdown__list"
          data-element-type="dropDown"
          onClick={handleSelectCity}
          ref={ref}
        >
          {cityItems.map(({ title, woeid }) => {
            return (
              <div
                key={woeid}
                data-woeid={woeid}
              >
                {title}
              </div>
            )
          })}
        </div>
      </div>}
    </div>
  )
}

export default SearchInput