import React from 'react';
import './arrow.css';

// Carousel wrapper component
const Arrow = ({ direction, onClick }) => <i onClick={() => onClick(direction)} className={`arrow ${direction}`}> </i>;

export default Arrow;
