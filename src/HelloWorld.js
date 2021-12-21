import React from 'react';
import Button from '@mui/material/Button';

const HelloWorld = () => {
  
  function sayHello() {
    alert('Hello, World!');
  }
  
  return (
    <p>
      <Button variant="contained" onClick={sayHello}>Click me!</Button>
    </p>
  );
};

export default HelloWorld;
