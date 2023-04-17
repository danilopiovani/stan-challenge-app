import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../public/logo.svg';
import styles from './styles.module.css';
import { MainContext } from './../../context/MainContext';

const Navigation: React.FC = () => {
  const { selectedType, setCurrentIndexSelected, setStartingAt } =
    useContext(MainContext);
  return (
    <nav className={styles.navWrapper}>
      <Link
        to="/home"
        className={`${styles.link} ${selectedType === '' ? styles.active : ''}`}
        onClick={() => {
          setCurrentIndexSelected(-1);
          setStartingAt(0);
        }}
      >
        <img src={Logo} alt="Logo" />
      </Link>
      <ul>
        <li>
          <Link
            to="/home"
            className={`${styles.link} ${
              selectedType === '' ? styles.active : ''
            }`}
            onClick={() => {
              setCurrentIndexSelected(-1);
              setStartingAt(0);
            }}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/home/series"
            className={`${styles.link} ${
              selectedType === 'series' ? styles.active : ''
            }`}
            onClick={() => {
              setCurrentIndexSelected(-1);
              setStartingAt(0);
            }}
          >
            TV Shows
          </Link>
        </li>
        <li>
          <Link
            to="/home/movie"
            className={`${styles.link} ${
              selectedType === 'movie' ? styles.active : ''
            }`}
            onClick={() => {
              setCurrentIndexSelected(-1);
              setStartingAt(0);
            }}
          >
            Movies
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
