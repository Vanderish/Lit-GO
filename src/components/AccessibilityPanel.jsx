import { useState } from 'react';
import { useProgress } from '../context/ProgressContext';

export default function AccessibilityPanel() {
  const [panelOpen, setPanelOpen] = useState(false);
  const {
    fontSize,
    handleFontSize,
    isDyslexic,
    toggleDyslexia,
    isContrast,
    toggleContrast,
    isEnglish,
    toggleLanguage,
    isSpeaking,
    toggleTTS,
  } = useProgress();

  return (
    <>
      {/* Floating Action Button */}
      <button
        id="a11y-fab"
        onClick={() => setPanelOpen(!panelOpen)}
        title={isEnglish ? 'Inclusive Accessibility Panel' : 'Panel Aksesibilitas Inklusif'}
        aria-label="Accessibility Settings"
      >
        <i className="fa-solid fa-universal-access"></i>
      </button>

      {/* Floating Panel Drawer */}
      <div id="a11y-panel" className={panelOpen ? '' : 'hidden'}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid var(--line)' }}>
          <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fa-solid fa-universal-access text-indigo"></i>
            {isEnglish ? 'Inclusive Accessibility' : 'Aksesibilitas Inklusif'}
          </span>
          <button
            onClick={() => setPanelOpen(false)}
            style={{ background: 'none', border: 'none', color: 'var(--text-dim)', fontSize: '1rem', cursor: 'pointer', padding: '4px' }}
            aria-label="Close Accessibility Panel"
          >
            ✕
          </button>
        </div>

        {/* Text Size Slider */}
        <div className="a11y-row" style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '8px 0', borderBottom: '1px solid var(--line)', marginBottom: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="a11y-row-label" style={{ fontSize: '0.84rem', fontWeight: 600 }}>
              <i className="fa-solid fa-font text-indigo mr-1"></i> {isEnglish ? 'Text Size' : 'Ukuran Teks'}
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
              onChange={(e) => handleFontSize(e.target.value)}
              className="a11y-size-slider"
              style={{ flex: 1, accentColor: 'var(--indigo)', cursor: 'pointer' }}
            />
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-dim)' }}>20px</span>
          </div>
        </div>

        {/* Dyslexia Font Switch */}
        <div className="a11y-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0' }}>
          <span className="a11y-row-label" style={{ fontSize: '0.84rem', fontWeight: 600 }}>
            <i className="fa-solid fa-wand-magic-sparkles text-teal mr-1"></i> {isEnglish ? 'Dyslexia-Friendly Font' : 'Font Ramah Disleksia'}
          </span>
          <button
            className={`switch-toggle a11y-switch-dyslexia ${isDyslexic ? 'on' : ''}`}
            onClick={toggleDyslexia}
            title={isEnglish ? 'Toggle Dyslexia Font' : 'Toggle Font Disleksia'}
          ></button>
        </div>

        {/* High Contrast Switch */}
        <div className="a11y-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0' }}>
          <span className="a11y-row-label" style={{ fontSize: '0.84rem', fontWeight: 600 }}>
            <i className="fa-solid fa-circle-half-stroke text-amber mr-1"></i> {isEnglish ? 'High Contrast' : 'Kontras Tinggi'}
          </span>
          <button
            className={`switch-toggle a11y-switch-contrast ${isContrast ? 'on' : ''}`}
            onClick={toggleContrast}
            title={isEnglish ? 'Toggle High Contrast' : 'Toggle Kontras Tinggi'}
          ></button>
        </div>

        {/* Language Switch */}
        <div className="a11y-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0' }}>
          <span className="a11y-row-label" style={{ fontSize: '0.84rem', fontWeight: 600 }}>
            <i className="fa-solid fa-globe text-indigo mr-1"></i> {isEnglish ? 'English Language' : 'Bahasa Inggris'}
          </span>
          <button
            className={`switch-toggle a11y-switch-lang ${isEnglish ? 'on' : ''}`}
            onClick={toggleLanguage}
            title={isEnglish ? 'Switch to Indonesian' : 'Beralih ke Bahasa Inggris'}
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
            title={isEnglish ? 'Toggle Text-to-Speech' : 'Toggle Text-to-Speech'}
          ></button>
        </div>
      </div>
    </>
  );
}
