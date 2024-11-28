import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Text } from '@mantine/core';
import { FaLinkedin, FaUserCircle, FaFilePdf } from 'react-icons/fa';

import './App.css';

function App() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const particlesLoaded = (container) => console.log(container);

  const iconStyle = {
    color: '#fff',
    fontSize: '2rem',
    textDecoration: 'none',
    margin: '0',
  };

  return (
    <>
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={{
            background: { color: { value: "#000000" } },
            fpsLimit: 120,
            interactivity: {
              events: { onClick: { enable: true, mode: "push" }, onHover: { enable: true, mode: "repulse" }, resize: true },
              modes: { push: { quantity: 4 }, repulse: { distance: 200, duration: 0.4 } },
            },
            particles: {
              color: { value: "#ffffff" },
              links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.5, width: 1 },
              move: { direction: "none", enable: true, outModes: { default: "bounce" }, speed: 6 },
              number: { density: { enable: true, area: 800 }, value: 80 },
              opacity: { value: 0.5 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 5 } },
            },
            detectRetina: true,
          }}
        />
      )}

      <div
        style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start',
          height: '100vh', backgroundColor: 'black', paddingLeft: '2rem',
        }}
      >
        <Text
          className="name"
          weight={600}
          size="xl"
          style={{ marginBottom: '1rem', lineHeight: '1' }}
        >
          Kamran Majid
        </Text>

        <div style={{ display: 'flex', gap: '5px', zIndex: 1 }}>
          <a href="https://www.linkedin.com/in/kamran-majid-0571121b0/" target="_blank" rel="noopener noreferrer" style={iconStyle}>
            <FaLinkedin />
          </a>
          <a href="https://devpost.com/kamranmajid41" target="_blank" rel="noopener noreferrer" style={iconStyle}>
            <FaUserCircle />
          </a>
          <a href="/Kamran_Majid_Resume.pdf" download="Kamran_Majid_Resume.pdf" target="_blank" rel="noopener noreferrer" style={iconStyle}>
            <FaFilePdf />
          </a>
        </div>

        
      </div>
    </>
  );
}

export default App;
