import React, { useState, useEffect } from 'react';
import Logo from '../Logo/Logo';
import './SplashScreen.css';

export default function SplashScreen({ minDuration = 2000, onFinished }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Start exit transition after minDuration
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      const finishTimer = setTimeout(() => {
        setIsVisible(false);
        if (onFinished) onFinished();
      }, 700); // Duration of fade-out animation
      return () => clearTimeout(finishTimer);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration, onFinished]);

  if (!isVisible) return null;

  return (
    <div className={`splash-screen-overlay ${isFadingOut ? 'splash-fade-out' : ''}`}>
      <div className="splash-backdrop-glow"></div>
      
      <div className="splash-content">
        {/* Center Logo with Animated Aura */}
        <div className="splash-logo-container">
          <div className="splash-logo-pulse"></div>
          <div className="splash-logo-svg">
            <Logo size={72} color="#2563EB" showText={false} />
          </div>
        </div>

        {/* Brand Text Reveal */}
        <div className="splash-brand-wrap">
          <h1 className="splash-title">
            <span className="splash-letter">L</span>
            <span className="splash-letter">I</span>
            <span className="splash-letter">T</span>
            <span className="splash-dash">-</span>
            <span className="splash-letter accent">G</span>
            <span className="splash-letter accent">O</span>
          </h1>
          <p className="splash-subtitle">AI Readiness &amp; Digital Literacy Platform</p>
        </div>

        {/* Micro Shimmer Progress Line */}
        <div className="splash-progress-track">
          <div className="splash-progress-bar"></div>
        </div>
      </div>
    </div>
  );
}
