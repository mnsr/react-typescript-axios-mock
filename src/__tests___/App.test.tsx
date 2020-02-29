import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { cleanup, render, fireEvent, wait } from '@testing-library/react';
import axios from 'axios';
import App from '../App';

jest.mock('axios');

afterEach(cleanup);

test('type text into input, and  display search results', async () => {
  // our test searchString
  const searchString = 'syd';

  // Render App
  const { getByLabelText, queryByLabelText, debug } = render(<App />);

  // find the input
  const input: HTMLElement = getByLabelText('search-input');

  // search panel should not be rendered at this point
  expect(queryByLabelText('search-panel')).not.toBeInTheDocument();

  // this fire the onChange event and set the value to 'syd'
  fireEvent.change(input, { target: { value: searchString } });

  // useFetch should be called to get data
  expect(axios.get).toHaveBeenCalled();

  // search panel is loaded in the document
  expect(queryByLabelText('search-panel')).toBeInTheDocument();

  // wait for search results to be rendered
  await wait(() => {
    expect(queryByLabelText('search-results')).toBeInTheDocument();
  });

  // OPTIONAL: view in terminal to see rendered html
  // debug();
});
