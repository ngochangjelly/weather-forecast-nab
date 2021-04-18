import React from 'react';

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ELEMENT_TEST_IDS } from '../../constants'
import { server } from "../../mocks/server";
import { locationListResponseTextQuery } from '../../mocks/weather'
import SearchInput from './index'

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

it("should not show dropdown when input empty", () => {
  render(<SearchInput setWeathersList={jest.fn()} setIsLoading={jest.fn()} guessedLattLong={null} />);
  const input = screen.getByTestId(ELEMENT_TEST_IDS.INPUT);
  userEvent.click(input);

  expect(screen.queryByTestId(ELEMENT_TEST_IDS.LIST)).not.toBeInTheDocument();
});

it('can search for a location and show data', async () => {
  render(<SearchInput setWeathersList={jest.fn()} setIsLoading={jest.fn()} guessedLattLong={null} />)
  userEvent.type(screen.getByTestId(ELEMENT_TEST_IDS.INPUT), 'ho chi m')
  expect((screen.getByTestId(ELEMENT_TEST_IDS.INPUT) as HTMLInputElement).value).toBe(
    'ho chi m'
  )
  await screen.findByTestId(ELEMENT_TEST_IDS.LIST)
  expect(screen.getAllByTestId(ELEMENT_TEST_IDS.LIST_ITEM)).toHaveLength(
    locationListResponseTextQuery.length
  )
  // dropdown list should disappear when clicking list item
  userEvent.click(screen.getByText(locationListResponseTextQuery[0].title))
  await waitFor(() => {
    expect(screen.queryByTestId(ELEMENT_TEST_IDS.LIST)).not.toBeInTheDocument()
  })
})