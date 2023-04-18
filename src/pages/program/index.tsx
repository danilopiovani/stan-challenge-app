import React from 'react';
import { useContext, useEffect, useState } from 'react';
import Navigation from '../../components/Navigation';
import { useParams } from 'react-router-dom';
import { MainContext } from './../../context/MainContext';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import Skeleton from './skeleton.svg';
import SkeletonProgram from './skeletonProgram.svg';

type ProgramData = {
  id: number;
  type: string;
  title: string;
  year: number;
  description: string;
  genre: string;
  language: string;
  rating: string;
  image: string;
};

const Program: React.FC = () => {
  const navigate = useNavigate();
  const { data, setData, selectedType, currentIndexSelected } =
    useContext(MainContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [programToShow, setProgramToShow] = useState<ProgramData | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
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

  useEffect(() => {
    if (data?.length > 0) {
      const program = data.filter(
        (item: ProgramData) => item.id.toString() === id
      )?.[0];
      setProgramToShow(program || null);
      // setTimeout to simulate loading
      // setTimeout(() => {
      //   setLoading(false);
      // }, 500);
      setLoading(false);
    }
  }, [data]);

  return (
    <div data-testid={`program_${id}`} className={styles.programWrapper}>
      <Navigation />
      {!loading ? (
        programToShow ? (
          <div key={programToShow.id} className={styles.content}>
            <img src={programToShow?.image} alt="Program image" />
            <div className={styles.details}>
              <div className={styles.header}>
                <div className={styles.title}>{programToShow?.title}</div>
                <div className={styles.generalInfo}>
                  <span>{programToShow?.rating}</span>
                  <span>|</span>
                  <span>{programToShow?.year}</span>
                  <span>|</span>
                  <span>{programToShow?.genre}</span>
                  <span>|</span>
                  <span>{programToShow?.language}</span>
                </div>
              </div>
              <div>{programToShow?.description}</div>
            </div>
          </div>
        ) : (
          <div className={styles.notFoundText}>
            An unknown error occurred. Please try again later.
          </div>
        )
      ) : (
        <div className={styles.content}>
          <img src={Skeleton} alt="Skeleton" />
          <div className={styles.skeletonProgram}>
            <img src={SkeletonProgram} alt="Skeleton Program" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Program;
