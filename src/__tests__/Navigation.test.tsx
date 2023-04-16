import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { MainContext, MainContextState } from '../context/MainContext';
import Navigation from '../components/Navigation';

test('renders Navigation component with Home, TV Shows and Movies links', () => {
  const darkMode = false;
  const contextValue: MainContextState = {
    darkMode,
    setDarkMode: jest.fn(),
    data: [],
    setData: () => {},
    selectedType: '',
    setSelectedType: () => {},
    currentIndexSelected: -1,
    setCurrentIndexSelected: jest.fn(),
    startingAt: 0,
    setStartingAt: jest.fn(),
  };
  render(
    <BrowserRouter>
      <MainContext.Provider value={contextValue}>
        <Navigation />
      </MainContext.Provider>
    </BrowserRouter>
  );
  const homeLink = screen.getByRole('link', { name: 'Home' });
  const tvShowsLink = screen.getByRole('link', { name: 'TV Shows' });
  const moviesLink = screen.getByRole('link', { name: 'Movies' });
  expect(homeLink).toBeInTheDocument();
  expect(tvShowsLink).toBeInTheDocument();
  expect(moviesLink).toBeInTheDocument();
});
