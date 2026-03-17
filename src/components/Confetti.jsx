import React, { useEffect } from 'react';
import './Confetti.css';

const Confetti = () => {
  useEffect(() => {
    // Generate simple CSS confetti dots
    const container = document.getElementById('confetti-container');
    if (!container) return;
    
    const isMobile = window.innerWidth <= 768;
    const pieceCount = isMobile ? 25 : 75; // Less on mobile to prevent lag

    const colors = ['#fbc02d', '#4caf50', '#f44336', '#2196f3', '#9c27b0'];
    for (let i = 0; i < pieceCount; i++) {
       const conf = document.createElement('div');
       conf.classList.add('confetti-piece');
       conf.style.left = `${Math.random() * 100}%`;
       conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
       conf.style.animationDelay = `${Math.random() * 2}s`;
       conf.style.animationDuration = `${isMobile ? 1.5 + Math.random() * 2 : 2 + Math.random() * 3}s`;
       container.appendChild(conf);
    }
    
    return () => {
       if (container) container.innerHTML = '';
    };
  }, []);

  return <div id="confetti-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 999 }}></div>;
};

export default Confetti;
