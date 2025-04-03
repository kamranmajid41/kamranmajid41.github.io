import React, { useState, useEffect } from 'react';
import VirusInstallation from './VirusInstallation'; 
import { FaLinkedin, FaUserCircle, FaFilePdf } from 'react-icons/fa';

import './App.css';

const App = () => {
  const [installationComplete, setInstallationComplete] = useState(false);

  const iconStyle = {
    color: '#fff',
    fontSize: '2rem',
    textDecoration: 'none',
    margin: '0',
  };

  useEffect(() => {
    // Check if installation is already complete (stored in localStorage)
    if (localStorage.getItem('installationComplete') === 'true') {
      setInstallationComplete(true);
    }
  }, []);

  return (
    <>
     {!installationComplete ? (
        <VirusInstallation />
      ) : (
        <div className="black-screen">

          {/* Main Name */}
          <div className="name">kamran majid</div>

          <div style={{ display: 'flex', gap: '10px', zIndex: 1 }}>
          <a href="https://www.linkedin.com/in/kamran-majid-0571121b0/" target="_blank" rel="noopener noreferrer" style={iconStyle}>
            <FaLinkedin />
          </a>
          <a href="https://devpost.com/kamranmajid41" target="_blank" rel="noopener noreferrer" style={iconStyle}>
            <FaUserCircle />
          </a>
          <a href="https://drive.google.com/drive/folders/11qkU5q6wQNPWrR3QVbf4oALVv8zwNaYr?usp=sharing" target="_blank" rel="noopener noreferrer" style={iconStyle}>
            <FaFilePdf />
          </a>
        </div>

        </div>
      )}
    </>
  );
};

export default App;

