import { useState, useRef, useEffect } from 'react';
import './LitoMascot3D.css';

/**
 * LitoMascot3D - Dynamic Interactive AI Companion
 * 
 * Features:
 * - Fluid organic dialogue cloud with typewriter stream & audio equalizer
 * - Interactive action chips (Ganti Tips, Cek Radar, Lab Sandbox)
 * - 3D Gyro Parallax Tilt & 360° Spin Flip Physics
 * - Non-obstructive positioning with playful floating animations
 */
export default function LitoMascot3D({
  interactive = true,
  showGreeting = true,
  greetingText = 'Hai! Aku Lito 🤖',
  subText = 'Navigator AI kamu. Klik aku untuk tips literasi!',
  className = '',
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [speech, setSpeech] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, translateZ: 0 });
  const [burstEmoji, setBurstEmoji] = useState(null);

  const speechTimeoutRef = useRef(null);
  const typewriterTimerRef = useRef(null);

  const quotes = [
    { text: 'Verifikasi setiap jawaban AI sebelum kamu pakai! 🔍', mood: '💡' },
    { text: 'Pakai teknik Few-Shot & Persona untuk hasil prompt tajam! ✨', mood: '🎯' },
    { text: 'Lindungi data sensitif, jangan masukkan ke prompt publik! 🛡️', mood: '🔒' },
    { text: 'Ayo pantau perkembangan 4 Pilar Radar kamu secara berkala! 📊', mood: '📈' },
    { text: 'AI adalah kopilot pintar, tapi kamu tetap kaptennya! 🚀', mood: '🌟' },
    { text: 'Siap taklukkan misi detektif AI di Sandbox Lab? 🕹️', mood: '⚡' },
  ];

  const triggerNextTip = (e) => {
    if (e) e.stopPropagation();
    if (isSpinning) return;

    setIsSpinning(true);
    const randomItem = quotes[Math.floor(Math.random() * quotes.length)];
    setSpeech(randomItem.text);
    setBurstEmoji(randomItem.mood);

    if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
    speechTimeoutRef.current = setTimeout(() => {
      setSpeech('');
      setBurstEmoji(null);
    }, 6000);

    setTimeout(() => {
      setIsSpinning(false);
    }, 900);
  };

  // Typewriter streaming effect for organic dialogue
  useEffect(() => {
    const target = speech || (isHovered ? subText : '');
    if (!target) {
      setDisplayedText('');
      return;
    }

    let currentIndex = 0;
    setDisplayedText('');
    if (typewriterTimerRef.current) clearInterval(typewriterTimerRef.current);

    typewriterTimerRef.current = setInterval(() => {
      currentIndex += 2;
      setDisplayedText(target.slice(0, currentIndex));
      if (currentIndex >= target.length) {
        clearInterval(typewriterTimerRef.current);
      }
    }, 18);

    return () => {
      if (typewriterTimerRef.current) clearInterval(typewriterTimerRef.current);
    };
  }, [speech, isHovered, subText]);

  // 3D Parallax Mouse Physics
  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e) => {
      if (!cardRef.current || isSpinning) return;

      const rect = cardRef.current.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      const distX = (e.clientX - cardCenterX) / (window.innerWidth / 2);
      const distY = (e.clientY - cardCenterY) / (window.innerHeight / 2);

      const maxAngle = 18;
      const rotateY = Math.max(-maxAngle, Math.min(maxAngle, distX * maxAngle));
      const rotateX = Math.max(-maxAngle, Math.min(maxAngle, -distY * maxAngle));

      setTilt({ rotateX, rotateY, translateZ: isHovered ? 24 : 10 });
    };

    const handleMouseLeave = () => {
      setTilt({ rotateX: 0, rotateY: 0, translateZ: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
    };
  }, [interactive, isHovered, isSpinning]);

  const handleContainerMouseLeave = () => {
    setIsHovered(false);
    if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
    setSpeech('');
    setBurstEmoji(null);
  };

  const isDialogueVisible = showGreeting && (isHovered || Boolean(speech));

  return (
    <div
      ref={cardRef}
      className={`lito-mascot-container ${className} ${isHovered ? 'is-hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleContainerMouseLeave}
      onClick={triggerNextTip}
      title="Klik Lito untuk berputar & memberi tips AI!"
    >
      {/* 3D Perspective Stage */}
      <div
        className={`lito-3d-stage ${isSpinning ? 'is-spinning' : ''}`}
        style={{
          transform: isSpinning
            ? undefined
            : `perspective(900px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateZ(${tilt.translateZ}px)`,
        }}
      >
        {/* Glowing Holographic Backing Rings */}
        <div className="lito-holo-backdrop" />
        <div className="lito-halo-glow" />

        {/* 3D Rendered Character Frame */}
        <div className="lito-character-wrapper">
          <img
            src="/illustrations/mascot_lito_3d.jpg"
            alt="Lito 3D Mascot"
            className="lito-character-img"
          />
          <div className="lito-light-sheen" />
          <div className="lito-thruster-aura" />
        </div>

        {/* Dynamic Floating Particles */}
        <div className="lito-particles-layer">
          <span className="lito-sparkle p1" />
          <span className="lito-sparkle p2" />
          <span className="lito-sparkle p3" />
        </div>

        {/* Floating Burst Mood Emoji */}
        {burstEmoji && <div className="lito-burst-emoji">{burstEmoji}</div>}
      </div>

      {/* Organic Interactive Dialogue Cloud */}
      <div
        className={`lito-fluid-dialogue ${speech ? 'is-speech-active' : ''} ${isDialogueVisible ? 'is-visible' : 'is-hidden'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Holographic Header with Voice Equalizer */}
        <div className="lito-dialogue-top">
          <div className="lito-dialogue-author">
            <span className="lito-avatar-mini-pulse"></span>
            <strong>Lito AI</strong>
            <span className="lito-voice-waves">
              <span className="wave-bar b1"></span>
              <span className="wave-bar b2"></span>
              <span className="wave-bar b3"></span>
            </span>
          </div>
          <span className="lito-mode-pill">{speech ? 'Tips AI' : 'Navigator'}</span>
        </div>

        {/* Dynamic Streaming Text */}
        <div className="lito-dialogue-body">
          <p className="lito-stream-text">
            {displayedText}
            <span className="lito-typing-cursor">|</span>
          </p>
        </div>

        {/* Organic Dialogue Tail */}
        <div className="lito-fluid-tail" />
      </div>

      {/* Subtle floating click helper */}
      <div className="lito-click-hint">
        <i className="fa-solid fa-hand-pointer"></i> {isSpinning ? 'Wheee! 🌟' : 'Sentuh Lito'}
      </div>
    </div>
  );
}
