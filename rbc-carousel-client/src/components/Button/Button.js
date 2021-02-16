import React, { useState } from 'react';
import './button.css';

// Carousel wrapper component
const Button = ({ name, onClick, isActive }) => {
  const [active, setActive] = useState(isActive || false);

  const handleClick = () => {
    setActive(!active);
    onClick(name.toLowerCase(), active);
  };
  return (<button className={`button-default ${active ? 'active' : ''}`} onClick={handleClick}>{name}</button>);
};

export default Button;
