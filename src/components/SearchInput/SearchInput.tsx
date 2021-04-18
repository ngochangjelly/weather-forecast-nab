import React, { useEffect, useMemo, useState, useRef } from 'react'

// @ts-ignore
import debounce from 'lodash.debounce'

import './SearchInput.scss'
import { ELEMENT_TEST_IDS, STYLE } from '../../constants'
import useOnClickOutside from '../../hooks/useClickOutside'
import { searchLocation, getWeather } from '../../services/weather'
import { WeatherInfo, SearchLocationResponse, LattLong } from '../../types/weather'
import { processWeatherListData } from '../../utils/processWeatherListData'
interface SearchInputProps {
  setWeathersList: React.Dispatch<React.SetStateAction<WeatherInfo[]>>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  guessedLattLong: LattLong | null
}
const SearchInput: React.FC<SearchInputProps> = ({
  setWeathersList,
  setIsLoading,
  guessedLattLong
}) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [cityItems, setCityItems] = useState<SearchLocationResponse>([])
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [dropDownTop, setDropDownTop] = useState<string>('150px')
  const [isMyInputFocused, setIsMyInputFocused] = useState(false);

  const ref = useRef<HTMLUListElement>(null);
  useOnClickOutside(ref, () => setModalOpen(false));

  const debouncedFetchLocationList = useMemo(
    () =>
      debounce(async (searchValue: string) => {
        try {
          if (searchValue.trim() !== '') {
            setModalOpen(true)
            setIsLoading(true)
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
          setIsLoading(false)
        }
      }, 300),
    [setIsLoading]
  )

  const fetchWeatherListFromGUessedLocation = async () => {
    try {
      if (searchValue !== '') {
        return
      }
      if (!isMyInputFocused) return
      if (!guessedLattLong || !guessedLattLong.latt || !guessedLattLong.long) return
      setCityItems([])
      setIsLoading(true)
      const lattLongQuery = guessedLattLong.latt + ', ' + guessedLattLong.long
      const data = await searchLocation({ type: 'lattlong', value: lattLongQuery })
      if (data.length > 1) {
        setModalOpen(true)
        setCityItems(data)
      }
      if (data.length === 1) {
        const weathers = await getWeather({ woeid: data[0]?.woeid })
        const finalWeatherweathers = processWeatherListData(weathers)
        setWeathersList(finalWeatherweathers)
      }
    } catch (err) {
      setCityItems([])
    } finally {
      setIsLoading(false)
    }
  }
  const handleStyling = () => {
    const searchInput = document.getElementsByClassName('SearchInput__wrapper__block')[0]
    //  distance from search input to window top minus its padding top and bottom
    const topFromInput = searchInput.getBoundingClientRect().top + searchInput.clientHeight - STYLE.SEARCH_INPUT_PADDING_BOTTOM - STYLE.SEARCH_INPUT_PADDING_TOP
    if (topFromInput) {
      setDropDownTop(`${topFromInput}px`)
    }
  }
  useEffect(() => {
    handleStyling()
    fetchWeatherListFromGUessedLocation()
    debouncedFetchLocationList(searchValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, debouncedFetchLocationList, guessedLattLong, isMyInputFocused])

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const handleSelectCity = async (e: any):Promise<any> => {
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
        <div data-testid="currentWeather"></div>
        <div className="SearchInput__wrapper__title">Search weather of cities around the world</div>
        {
          navigator && !guessedLattLong && <div className="SearchInput__wrapper__notification">If you want to use auto location detection, <br />please allow location access in Browser settings</div>
        }
        {
          navigator && guessedLattLong && searchValue === '' && isMyInputFocused && <div className="SearchInput__wrapper__notification">We guess you&apos;re currently in:</div>
        }
        <div className="SearchInput__wrapper__block">
          <div className="SearchInput__wrapper__block__search__container">
            <input onBlur={() => setIsMyInputFocused(false)}
              onFocus={() => setIsMyInputFocused(true)} value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Enter city name..."
              className="SearchInput__wrapper__block__search__input" type="text" data-testid={ELEMENT_TEST_IDS.INPUT} />
          </div>
        </div>
      </div>
      {isModalOpen && cityItems && cityItems.length > 0 && <div
        data-testid={ELEMENT_TEST_IDS.LIST}
        className="SearchInput__dropdown" style={{ top: dropDownTop }}>
        <ul
          ref={ref}
          className="SearchInput__dropdown__list"
          data-element-type="dropDown"
          onClick={handleSelectCity}
        >
          {cityItems.map(({ title, woeid }) => {
            return (
              <li
                data-testid={ELEMENT_TEST_IDS.LIST_ITEM}
                key={woeid}
                data-woeid={woeid}
              >
                {title}
              </li>
            )
          })}
        </ul>
      </div>}
    </div >
  )
}

export default SearchInput