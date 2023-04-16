import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import MyComponent from '../components/MyComponent';
import {
  MainContext,
  MainContextProvider,
  MainContextState,
} from '../context/MainContext';

describe('MyComponent', () => {
  it('should render the name prop', () => {
    const name = 'World';
    const { getByText } = render(<MyComponent name={name} />);
    expect(getByText(`Hello, ${name}!`)).toBeInTheDocument();
  });
});
test('should render the component with dark mode', () => {
  const darkMode = true;
  const contextValue: MainContextState = {
    darkMode,
    setDarkMode: jest.fn(),
    data: [],
    setData: () => {},
    selectedType: 'home',
    setSelectedType: () => {},
    currentIndexSelected: -1,
    setCurrentIndexSelected: () => {},
    startingAt: 0,
    setStartingAt: () => {},
  };

  const name = 'Dark Mode true';
  const { getByText } = render(
    <MainContext.Provider value={contextValue}>
      <MyComponent name={name} />
    </MainContext.Provider>
  );

  expect(getByText(`Hello, ${name}!`)).toBeInTheDocument();
});

test('should render the component with light mode', () => {
  const darkMode = false;

  const contextValue: MainContextState = {
    darkMode,
    setDarkMode: jest.fn(),
    data: [],
    setData: () => {},
    selectedType: 'home',
    setSelectedType: () => {},
    currentIndexSelected: -1,
    setCurrentIndexSelected: () => {},
    startingAt: 0,
    setStartingAt: () => {},
  };

  const name = 'Dark Mode false';
  const { getByText } = render(
    <MainContext.Provider value={contextValue}>
      <MyComponent name={name} />
    </MainContext.Provider>
  );

  expect(getByText(`Hello, ${name}!`)).toBeInTheDocument();
});
