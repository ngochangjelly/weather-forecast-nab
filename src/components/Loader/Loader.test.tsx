import React from 'react';

import { render, screen } from '@testing-library/react'

import Loader from '.';
import { ELEMENT_TEST_IDS } from '../../constants';

it("should render properly", async () => {
  render(<Loader />);
  expect(screen.queryByTestId(ELEMENT_TEST_IDS.LOADING)).toBeInTheDocument();
});
