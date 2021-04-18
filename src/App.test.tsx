import React from 'react';

import { render, screen } from '@testing-library/react';

import App from './App';

it('should render app component properly', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/Enter city name/i);
  expect(inputElement).toBeInTheDocument();
});
