import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MainContext } from './../../context/MainContext';
import styles from './styles.module.css';
import Skeleton from './skeleton.svg';

interface MyComponentProps {
  dataSet: any[];
}

type DataType = any[] | null;

const Carousel: React.FC<MyComponentProps> = ({ dataSet }) => {
  const navigate = useNavigate();
  const {
    currentIndexSelected,
    setCurrentIndexSelected,
    startingAt,
    setStartingAt,
  } = useContext(MainContext);
  const [loading, setLoading] = useState(true);
  const [dataToShow, setDataToShow] = useState<DataType>(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    window.addEventListener('keydown', handleArrowPress);

    return () => {
      window.removeEventListener('keydown', handleArrowPress);
    };
  }, [currentIndexSelected, startingAt, dataToShow]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (dataSet?.length > 0) {
      // get max 6 items from the data set starting at the startingAt index
      const lengthToSlice =
        dataSet?.length - 1 - startingAt >= 6
          ? startingAt + 6
          : startingAt + (dataSet?.length - startingAt);
      let localDataStart = dataSet.slice(startingAt, lengthToSlice);

      // get items from the beginning of the data set to fill the remaining 6 items
      let localDataEnd = dataSet.slice(0, 6 - localDataStart.length);

      // concat the two arrays
      let localData =
        dataSet?.length >= 6
          ? localDataStart.concat(localDataEnd)
          : localDataStart;

      setDataToShow(localData);
    }
  }, [startingAt, currentIndexSelected, dataSet]);

  useEffect(() => {
    if (dataToShow) {
      if (dataToShow?.length > 0) {
        // timeout to simulate a delay in the loading
        // included only to be able to see the skeleton
        // setTimeout(() => {
        //   setLoading(false);
        // }, 500);
        setLoading(false);
      }
    }
  }, [dataToShow]);

  const handleArrowPress = (e: KeyboardEvent) => {
    // switch case for the key pressed
    switch (e.key) {
      case 'ArrowLeft':
        handleLeftDirection();
        break;
      case 'ArrowRight':
        handleRightDirection();
        break;
      // case enter
      case 'Enter':
        navigate(`/program/${dataToShow?.[currentIndexSelected]?.id}`);
      default:
        break;
    }
  };

  const handleLeftDirection = () => {
    // will decrease the starting at by 1 if the current index selected is equal to 0
    // 0 is the index Point for the left arrow for all screen sizes
    let defineNewStartingAtArrowLeft = startingAt;
    currentIndexSelected === 0 &&
      (defineNewStartingAtArrowLeft = startingAt - 1);

    // if the new starting at is smaller than 0, set it to the length of the data set
    defineNewStartingAtArrowLeft < 0 &&
      (defineNewStartingAtArrowLeft = dataSet?.length - 1);

    setStartingAt(defineNewStartingAtArrowLeft);

    // move left until the index point
    // stay at the index point while pressing left
    setCurrentIndexSelected(
      currentIndexSelected > 0 ? currentIndexSelected - 1 : 0
    );
  };

  const handleRightDirection = () => {
    // define the transition index for the new starting at
    let indexPoint = 4;
    windowSize.width <= 1080 && (indexPoint = 1);
    windowSize.width <= 720 && (indexPoint = 0);

    // will increase the starting at by 1 if the current index selected is equal to the index point
    let defineNewStartingAt = startingAt;
    currentIndexSelected === indexPoint &&
      (defineNewStartingAt = startingAt + 1);

    // if the new starting at is bigger than the length of the data set, set it to 0
    defineNewStartingAt > dataSet?.length - 1 && (defineNewStartingAt = 0);

    setStartingAt(defineNewStartingAt);

    // move right until the index point
    // stay at the index point while pressing right
    let newIndexToBeSet = indexPoint;
    currentIndexSelected < indexPoint &&
      (newIndexToBeSet = currentIndexSelected + 1);
    setCurrentIndexSelected(newIndexToBeSet);
  };
  return (
    <section data-testid="carousel" className={`${styles.carouselWrapper}`}>
      {!loading ? (
        dataToShow?.map((item: any, index: any) => (
          <Link key={item.id} to={`/program/${item?.id}`}>
            <div
              key={`div_${item.id}`}
              data-testid={`divImg_${item.id}_${
                currentIndexSelected === index ? 'active' : 'inactive'
              }`}
              className={`${styles.imgWrapper} ${
                currentIndexSelected === index ? styles.active : ''
              }`}
              onClick={() => {
                setCurrentIndexSelected(index);
              }}
              // onMouseEnter={() => {
              //   setCurrentIndexSelected(index);
              // }}
              // onMouseLeave={() => {
              //   setCurrentIndexSelected(-1);
              // }}
            >
              <img key={`img_${item.id}`} src={item.image} alt={item.title} />
            </div>
          </Link>
        ))
      ) : (
        <div data-testid="skeleton">
          {Array(6)
            .fill('id_')
            .map((_, i) => (
              <div key={`div_${i}`} className={`${styles.imgWrapper}`}>
                <img key={`img_${i}`} src={Skeleton} alt={'skeleton'} />
              </div>
            ))}
        </div>
      )}
    </section>
  );
};

export default Carousel;
