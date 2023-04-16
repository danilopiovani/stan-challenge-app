import React, { createContext, useState } from 'react';

interface MainContextState {
  data: any;
  setData: (data: any[]) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  currentIndexSelected: number;
  setCurrentIndexSelected: (index: number) => void;
  startingAt: number;
  setStartingAt: (startingAt: number) => void;
}

const MainContext = createContext<MainContextState>({
  data: [],
  setData: () => {},
  selectedType: '',
  setSelectedType: () => {},
  currentIndexSelected: -1,
  setCurrentIndexSelected: () => {},
  startingAt: 0,
  setStartingAt: () => {},
});

interface MyComponentProps {
  children: React.ReactNode;
  // Other props for the component
}

const MainContextProvider: React.FC<MyComponentProps> = ({ children }) => {
  const [data, setData] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [currentIndexSelected, setCurrentIndexSelected] = useState<number>(-1);
  const [startingAt, setStartingAt] = useState<number>(0);

  return (
    <MainContext.Provider
      value={{
        data,
        setData,
        selectedType,
        setSelectedType,
        currentIndexSelected,
        setCurrentIndexSelected,
        startingAt,
        setStartingAt,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainContextProvider, MainContextState };
