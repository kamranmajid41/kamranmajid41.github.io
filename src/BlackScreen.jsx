import React, { useState, useEffect } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { FaLinkedin, FaUserCircle, FaFilePdf } from 'react-icons/fa';
import './BlackScreen.css';

const BlackScreen = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const particlesLoaded = (container) => console.log(container);

  return (
    <div className="black-screen">
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
      <div className="menu-bar">
        <ul className="menu-list">
          <li><a href="#home">Home</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#honors">Honors</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>

      <div className="name">Kamran Majid</div>
    </div>
  );
};

export default BlackScreen;
