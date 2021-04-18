import React from 'react';

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ELEMENT_TEST_IDS, CLASS, STYLE } from '../../constants'
import { weatherList } from '../../mocks/weather'
import WeatherDisplay from '../WeatherDisplay';

it("should render properly", async () => {
  render(<WeatherDisplay weatherList={weatherList} />);
  expect(screen.queryByTestId(ELEMENT_TEST_IDS.CURRENT_WEATHER)).toBeInTheDocument();
  expect(screen.queryByTestId(ELEMENT_TEST_IDS.WEATHER_LIST)).toBeInTheDocument();
});

it("should render properly", async () => {
  render(<WeatherDisplay weatherList={weatherList} />);
  expect(screen.queryByTestId(ELEMENT_TEST_IDS.CURRENT_WEATHER)).toBeInTheDocument();
  // check css of weather list items when they are active and being hovered
  userEvent.hover(screen.queryAllByTestId(ELEMENT_TEST_IDS.WEATHER_LIST_ITEM)[1])
  waitFor(() => {
    expect(screen.queryAllByTestId(ELEMENT_TEST_IDS.WEATHER_LIST_ITEM)[0]).toHaveClass(CLASS.WEATHER_LIST_ITEM_ACTIVE)
    expect(screen.queryAllByTestId(ELEMENT_TEST_IDS.WEATHER_LIST_ITEM)[1]).toHaveStyle(`background-color: ${STYLE.WEATHER_LIST_ITEM_HOVER.BACKGROUND_COLOR}`)
  })
});

it("should set current weather item when selected", async () => {
  render(<WeatherDisplay weatherList={weatherList} />);
  userEvent.click(screen.queryAllByTestId(ELEMENT_TEST_IDS.WEATHER_LIST_ITEM)[2])
  expect(screen.queryByTestId(ELEMENT_TEST_IDS.CURRENT_WEATHER_TITLE)?.textContent).toEqual(weatherList[2].title)
});