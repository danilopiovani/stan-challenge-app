import React from 'react';
import { useEffect, useState, useContext } from 'react';
import Navigation from '../../components/Navigation';
import { useParams } from 'react-router-dom';
import { MainContext } from './../../context/MainContext';
import Carousel from '../../components/Carousel';

const Home: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const [dataFiltered, setDataFiltered] = useState([]);

  const { data, setData, selectedType, setSelectedType } =
    useContext(MainContext);

  useEffect(() => {
    if (data?.length === 0) {
      fetch('http://localhost:3001/data')
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        });
    }
  }, []);

  useEffect(() => {
    setSelectedType(type || '');
  }, [type]);

  useEffect(() => {
    if (data?.length > 0) {
      let localData: any[] = [...data];
      // filter by the type
      selectedType &&
        (localData = localData.filter(
          (item: any) => item.type === selectedType
        ));
      setDataFiltered(localData as any);
    }
  }, [data, selectedType]);

  return (
    <>
      <div>
        <Navigation />
        <Carousel dataSet={dataFiltered} />
      </div>
    </>
  );
};

export default Home;
