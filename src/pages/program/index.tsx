import React from 'react';
import { useContext, useEffect } from 'react';
import Navigation from '../../components/Navigation';
import { useParams } from 'react-router-dom';
import { MainContext } from './../../context/MainContext';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

const Program: React.FC = () => {
  const navigate = useNavigate();
  const { data, setData, selectedType, currentIndexSelected } =
    useContext(MainContext);
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    console.log('currentIndexSelected', currentIndexSelected);
    // fetch data if landing on this page directly
    if (data?.length === 0) {
      fetch('http://localhost:3001/data')
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        });
    }
    const handleBackspacePress = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        navigate(`/home/${selectedType}`);
      }
    };
    window.addEventListener('keydown', handleBackspacePress);
    return () => {
      window.removeEventListener('keydown', handleBackspacePress);
    };
  }, []);
  return (
    <div className={styles.programWrapper}>
      <Navigation />
      {data
        ?.filter((item: any) => item.id.toString() === id)
        .map((item: any) => (
          <div key={item.id} className={styles.content}>
            <img src={item?.image} />
            <div className={styles.details}>
              <div className={styles.header}>
                <div className={styles.title}>{item?.title}</div>
                <div className={styles.generalInfo}>
                  <span>{item?.rating}</span>
                  <span>|</span>
                  <span>{item?.year}</span>
                  <span>|</span>
                  <span>{item?.genre}</span>
                  <span>|</span>
                  <span>{item?.language}</span>
                </div>
              </div>
              <div>{item?.description}</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Program;
