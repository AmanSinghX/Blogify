import React from 'react';
import logo from '../assets/logo.png'; // Adjust the path according to your file structure

function Logo({ width = '100px' }) {
  return (
    <div>
      <img src={logo} alt="Logo" style={{ width }} />
    </div>
  );
}

export default Logo;
