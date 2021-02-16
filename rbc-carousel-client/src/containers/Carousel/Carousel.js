/* eslint-disable no-plusplus */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../../components/Button/Button';
import Arrow from '../../components/Arrow/Arrow';
import Loader from '../../components/Spinner/Loader';
import config from '../../config';
import './carousel.css';

// Carousel wrapper component
const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState('');
  const [categories, setCategories] = useState(['cats']);
  const [loading, setLoading] = useState(false);

  const shuffleArray = (array) => {
    // Based on the modern version of fisher-yates algorithm - O(n) solution
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    // Get all the images based on user Selection
    try {
      const getImages = async () => {
        if (categories.length > 1) {
          // When more than 1 category is selected form the query to have multiple params
          const query = categories.map((category) => `category=${category}`).join('&');
          const queryString = `${config.API_ENDPOINT}/api/images?${query}`;

          // Set the loading to true before making the axios call
          setLoading(true);
          const images = await axios.get(queryString);

          // When both shark and cats are selected randomize the order of the images displayed
          const finalResult = await shuffleArray(images.data);
          setData(finalResult);
        } else if (categories.length === 1) {
          // When there is only 1 category
          setLoading(true);
          const images = await axios.get(`${config.API_ENDPOINT}/api/images?category=${categories[0]}`);
          setData(images.data);
        } else {
          setData([]);
          setLoading(false);
        }
      };
      getImages();
    } catch (err) {
      console.error(err.message);
    }
  }, [categories]);

  const handleClick = (direction) => {
    // Based on the direction of the arrow - either go to the next elemet in the array or go back to the previous element
    if (direction === 'right') {
      currentIndex + 1 === data.length ? setCurrentIndex(0) : setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleCategoryClick = (name, isActive) => {
    // Check if the selected category is already active
    if (isActive) {
    // If active - remove the element from the categories array
      const filteredArray = categories.filter((cat) => cat !== name);
      setCategories(filteredArray);
    } else {
    // If not active - add the name to the categories array
      setCategories([...categories, name]);
    }

    setCurrentIndex(0);
  };

  const onLoad = () => {
    // When the image has finished loading- remove the spinner
    setLoading(false);
  };

  return (
    <div>
      {loading && <Loader />}
      <div>
        <Button name='Sharks' onClick={handleCategoryClick} />
        <Button name='Cats' onClick={handleCategoryClick} isActive='true' />
      </div>
      <div className='flex-container'>
        {currentIndex > 0 && <Arrow onClick={handleClick} direction='left' />}
        {data.length > 0 ? <><img
          src={data[currentIndex]?.source}
          alt='randomly selected animal from active category'
          onLoad={onLoad} />
        </>
          : <div style={{ color: 'lightgrey', padding: '50px' }}> No photos </div>}
        {currentIndex < data.length - 1 && <Arrow onClick={handleClick} direction='right' /> }
      </div>
    </div>
  );
};

export default Carousel;
