import React from 'react';
import renderer from 'react-test-renderer';

import App from './App';
/* eslint-disable no-undef */
it('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});
