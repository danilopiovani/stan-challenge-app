import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MainContext, MainContextState } from '../context/MainContext';
import Carousel from '../components/Carousel';
import React from 'react';

describe('Carousel', () => {
  const mockDataSet = [
    {
      id: 67298,
      title: 'Dr. Death',
      description:
        'Dr. Death tells the terrifying true story of Dr. Christopher Duntsch (Joshua Jackson), a brilliant but sociopathic neurosurgeon whose patients leave his operating room either permanently maimed or dead, and the two doctors who set out to stop him.',
      type: 'series',
      image:
        'https://streamcoimg-a.akamaihd.net/000/672/98/67298-PosterArt-2039396c9e27d6271c96776414d6a38c.jpg?resize=512px:*&quality=75&preferredFormat=image/jpeg',
      rating: 'MA 15+',
      genre: 'Drama',
      year: 2021,
      language: 'English',
    },
    {
      id: 65737,
      title: 'This Way Up',
      description:
        'This achingly funny and deeply moving comedy series follows the quick-witted Aine as she tries to get her life back in order and regain some semblance of happiness after suffering a nervous breakdown.',
      type: 'series',
      image:
        'https://streamcoimg-a.akamaihd.net/000/657/37/65737-PosterArt-15bee119eb92a5f33670e6bd3f1af967.jpg?resize=512px:*&quality=75&preferredFormat=image/jpeg',
      rating: 'MA 15+',
      genre: 'Comedy',
      year: 2019,
      language: 'English',
    },
    {
      id: 67517,
      title: 'Power Book III: Raising Kanan',
      description:
        'POWER BOOK III: RAISING KANAN is a prequel set in the 1990s that chronicles the early years of Kanan Stark, the character first played by executive producer Curtis "50 Cent" Jackson.',
      type: 'series',
      image:
        'https://streamcoimg-a.akamaihd.net/000/675/17/67517-PosterArt-d740bf2159cf9c3eb1b22db4043076ff.jpg?resize=512px:*&quality=75&preferredFormat=image/jpeg',
      rating: 'MA 15+',
      genre: 'Crime',
      year: 2021,
      language: 'English',
    },
    {
      id: 56197,
      title: 'First Wives Club',
      description:
        "TV adaptation of the comedy film about best friends Ari, Hazel \u0026 Bree who reunite to navigate Hazel's public divorce, Ari's unsatisfying marriage, and Bree's cheating husband. Together, they learn as long as they have each other, they're unstoppable.",
      type: 'series',
      image:
        'https://streamcoimg-a.akamaihd.net/000/561/97/56197-PosterArt-469c02a0132ce2629859f70303083c85.jpg?resize=512px:*&quality=75&preferredFormat=image/jpeg',
      rating: 'M',
      genre: 'Comedy',
      year: 2019,
      language: 'English',
    },
    {
      id: 26702,
      title: 'Black Monday',
      description:
        'BLACK MONDAY takes us back to October 19, 1987 – aka Black Monday, the worst stock market crash in the history of Wall Street.',
      type: 'series',
      image:
        'https://streamcoimg-a.akamaihd.net/000/267/02/26702-PosterArt-fa4764f2e5af823683130cec70f227ae.jpg?resize=512px:*&quality=75&preferredFormat=image/jpeg',
      rating: 'MA 15+',
      genre: 'Comedy',
      year: 2018,
      language: 'English',
    },
    {
      id: 3019990,
      title: "Harry Potter and the Philosopher's Stone",
      description:
        "11-year-old orphan Harry Potter discovers he's a wizard and enrols in Hogwarts, school of wizardry. There he learns the truth about himself, his family and the terrible evil that haunts the magical world.",
      type: 'movie',
      image:
        'https://streamcoimg-a.akamaihd.net/000/301/9990/3019990-PosterArt-5984e294f596ed0ad0c006162770e080.jpg?resize=512px:*&quality=75&preferredFormat=image/jpeg',
      rating: 'PG',
      genre: 'Fantasy',
      year: 2001,
      language: 'English',
    },
  ];
  const contextValue: MainContextState = {
    data: [],
    setData: () => {},
    selectedType: '',
    setSelectedType: () => {},
    currentIndexSelected: 3,
    setCurrentIndexSelected: jest.fn(),
    startingAt: 3,
    setStartingAt: jest.fn(),
  };

  it('should render the carousel', () => {
    render(
      <MemoryRouter>
        //{' '}
        <MainContext.Provider value={contextValue}>
          <Carousel dataSet={mockDataSet} />
        </MainContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('carousel')).toBeInTheDocument();
    expect(screen.getByAltText('Dr. Death')).toBeInTheDocument();
    expect(screen.getByAltText('This Way Up')).toBeInTheDocument();
    expect(
      screen.getByAltText('Power Book III: Raising Kanan')
    ).toBeInTheDocument();
    expect(screen.getByAltText('First Wives Club')).toBeInTheDocument();
    expect(screen.getByAltText('Black Monday')).toBeInTheDocument();
    expect(
      screen.getByAltText("Harry Potter and the Philosopher's Stone")
    ).toBeInTheDocument();
  });

  it('should show loading when data is not available', () => {
    render(
      <MemoryRouter>
        //{' '}
        <MainContext.Provider value={contextValue}>
          <Carousel dataSet={[]} />
        </MainContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should navigate to the description page on enter', () => {
    const spy = jest.spyOn(history, 'pushState');
    render(
      <MemoryRouter initialEntries={['/']}>
        <MainContext.Provider value={contextValue}>
          <Carousel dataSet={mockDataSet} />
        </MainContext.Provider>
      </MemoryRouter>
    );

    fireEvent.keyDown(window, { key: 'Enter' });
    console.log('spy.mock.calls', spy.mock.calls);
    expect(spy).toHaveBeenCalledWith(null, '', '/program/67517');
    spy.mockRestore();
  });

  it('should move left on left arrow key press', () => {
    const setCurrentIndexSelected = jest.fn();
    const setStartingAt = jest.fn();

    render(
      <MemoryRouter initialEntries={['/']}>
        <MainContext.Provider value={contextValue}>
          <Carousel dataSet={mockDataSet} />
        </MainContext.Provider>
      </MemoryRouter>
    );

    fireEvent.keyDown(window, { key: 'ArrowLeft' });

    expect(setCurrentIndexSelected).toHaveBeenCalledWith(2);
    expect(setStartingAt).toHaveBeenCalledWith(2);
  });

  it('should move right on right arrow key press', () => {
    const setCurrentIndexSelected = jest.fn();
    const setStartingAt = jest.fn();
    render(
      <MemoryRouter initialEntries={['/']}>
        <MainContext.Provider value={contextValue}>
          <Carousel dataSet={mockDataSet} />
        </MainContext.Provider>
      </MemoryRouter>
    );

    fireEvent.keyDown(window, { key: 'ArrowRight' });

    expect(setCurrentIndexSelected).toHaveBeenCalledWith(4);
    expect(setStartingAt).toHaveBeenCalledWith(4);
  });
});
