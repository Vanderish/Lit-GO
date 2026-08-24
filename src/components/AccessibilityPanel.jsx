import React, { useState, useEffect } from 'react';

export default function AccessibilityPanel({ showToast }) {
  const [panelOpen, setPanelOpen] = useState(false);
  const [fontSize, setFontSizeState] = useState(16);
  const [isDyslexic, setIsDyslexic] = useState(false);
  const [isContrast, setIsContrast] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    setIsDyslexic(document.body.classList.contains('font-dyslexic'));
    setIsContrast(document.body.classList.contains('high-contrast'));
  }, []);

  const handleFontSizeChange = (val, notify = true) => {
    let num = parseInt(val, 10) || 16;
    let size = 16;
    if (num >= 19) size = 20;
    else if (num >= 17) size = 18;
    else size = 16;

    setFontSizeState(size);
    document.documentElement.style.fontSize = size + 'px';
    document.body.style.fontSize = size + 'px';

    if (notify && showToast) {
      const label = size === 16 ? '16px (Normal)' : size === 18 ? '18px (Sedang)' : '20px (Besar)';
      showToast('Ukuran teks: ' + label, 'info');
    }
  };

  const toggleDyslexia = () => {
    const next = !isDyslexic;
    setIsDyslexic(next);
    if (next) {
      document.body.classList.add('font-dyslexic');
    } else {
      document.body.classList.remove('font-dyslexic');
    }
    if (showToast) {
      showToast(next ? 'Font ramah disleksia diaktifkan' : 'Font ramah disleksia dinonaktifkan', 'info');
    }
  };

  const toggleContrast = () => {
    const next = !isContrast;
    setIsContrast(next);
    if (next) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    if (showToast) {
      showToast(next ? 'Mode kontras tinggi diaktifkan' : 'Mode kontras tinggi dinonaktifkan', 'info');
    }
  };

  const toggleTTS = () => {
    if (!('speechSynthesis' in window)) {
      if (showToast) showToast('Fitur Text-to-Speech tidak didukung browser kamu.', 'error');
      return;
    }

    if (!isSpeaking) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance('Selamat datang di Lit-GO. Platform edukasi literasi dan etika kecerdasan buatan. Silakan selesaikan radar asesmen, modul pembelajaran, dan simulasi lab interaktif.');
      u.lang = 'id-ID';
      u.onend = () => setIsSpeaking(false);
      u.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(u);
      if (showToast) showToast('Membacakan ringkasan platform...', 'info');
    } else {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      if (showToast) showToast('Text-to-Speech dihentikan.', 'info');
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        id="a11y-fab"
        onClick={() => setPanelOpen(!panelOpen)}
        title="Panel Aksesibilitas Inklusif"
      >
        <i className="fa-solid fa-universal-access"></i>
      </button>

      {/* Floating Panel Drawer */}
      <div id="a11y-panel" className={panelOpen ? '' : 'hidden'}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid var(--line)' }}>
          <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--navy)' }}>
            <i className="fa-solid fa-universal-access text-indigo mr-1"></i> Aksesibilitas Inklusif
          </span>
          <button
            onClick={() => setPanelOpen(false)}
            style={{ background: 'none', border: 'none', color: 'var(--text-dim)', fontSize: '1rem', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        {/* Text Size Slider */}
        <div className="a11y-row" style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '8px 0', borderBottom: '1px solid var(--line)', marginBottom: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="a11y-row-label" style={{ fontSize: '0.84rem', fontWeight: 600 }}>
              <i className="fa-solid fa-font text-indigo mr-1"></i> Ukuran Teks
            </span>
            <span className="a11y-size-val" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--indigo)' }}>
              {fontSize}px
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-dim)' }}>16px</span>
            <input
              type="range"
              min="16"
              max="20"
              step="2"
              value={fontSize}
              onChange={(e) => handleFontSizeChange(e.target.value)}
              className="a11y-size-slider"
              style={{ flex: 1, accentColor: 'var(--indigo)', cursor: 'pointer' }}
            />
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-dim)' }}>20px</span>
          </div>
        </div>

        {/* Dyslexia Font Switch */}
        <div className="a11y-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0' }}>
          <span className="a11y-row-label" style={{ fontSize: '0.84rem', fontWeight: 600 }}>
            <i className="fa-solid fa-wand-magic-sparkles text-teal mr-1"></i> Font Ramah Disleksia
          </span>
          <button
            className={`switch-toggle a11y-switch-dyslexia ${isDyslexic ? 'on' : ''}`}
            onClick={toggleDyslexia}
            title="Toggle Font Disleksia"
          ></button>
        </div>

        {/* High Contrast Switch */}
        <div className="a11y-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0' }}>
          <span className="a11y-row-label" style={{ fontSize: '0.84rem', fontWeight: 600 }}>
            <i className="fa-solid fa-circle-half-stroke text-amber mr-1"></i> Kontras Tinggi
          </span>
          <button
            className={`switch-toggle a11y-switch-contrast ${isContrast ? 'on' : ''}`}
            onClick={toggleContrast}
            title="Toggle Kontras Tinggi"
          ></button>
        </div>

        {/* TTS Switch */}
        <div className="a11y-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderTop: '1px solid var(--line)', marginTop: '8px', paddingTop: '10px' }}>
          <span className="a11y-row-label" style={{ fontSize: '0.84rem', fontWeight: 600 }}>
            <i className="fa-solid fa-volume-high text-emerald mr-1"></i> Text-to-Speech
          </span>
          <button
            className={`switch-toggle a11y-switch-tts ${isSpeaking ? 'on' : ''}`}
            onClick={toggleTTS}
            title="Toggle Text-to-Speech"
          ></button>
        </div>
      </div>
    </>
  );
}
