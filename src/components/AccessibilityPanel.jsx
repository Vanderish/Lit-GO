import { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import './AccessibilityPanel.css';

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
      <button
        id="a11y-fab"
        onClick={() => setPanelOpen(!panelOpen)}
        title={isEnglish ? 'Inclusive Accessibility Panel' : 'Panel Aksesibilitas Inklusif'}
        aria-label="Accessibility Settings"
      >
        <i className="fa-solid fa-universal-access"></i>
      </button>

      <div id="a11y-panel" className={panelOpen ? '' : 'hidden'}>
        
        <div className="a11y-panel-header">
          <span className="a11y-panel-title">
            <i className="fa-solid fa-universal-access text-indigo"></i>
            {isEnglish ? 'Inclusive Accessibility' : 'Aksesibilitas Inklusif'}
          </span>
          <button
            className="a11y-panel-close"
            onClick={() => setPanelOpen(false)}
            aria-label="Close Accessibility Panel"
          >
            ✕
          </button>
        </div>

        <div className="a11y-row a11y-row-col">
          <div className="a11y-slider-header">
            <span className="a11y-row-label">
              <i className="fa-solid fa-font text-indigo mr-1"></i> {isEnglish ? 'Text Size' : 'Ukuran Teks'}
            </span>
            <span className="a11y-size-val">
              {fontSize}px
            </span>
          </div>
          <div className="a11y-slider-control">
            <span className="a11y-slider-label">16px</span>
            <input
              type="range"
              min="16"
              max="20"
              step="2"
              value={fontSize}
              onChange={(e) => handleFontSize(e.target.value)}
              className="a11y-size-slider"
            />
            <span className="a11y-slider-label">20px</span>
          </div>
        </div>

        <div className="a11y-row">
          <span className="a11y-row-label">
            <i className="fa-solid fa-wand-magic-sparkles text-teal mr-1"></i> {isEnglish ? 'Dyslexia-Friendly Font' : 'Font Ramah Disleksia'}
          </span>
          <button
            className={`switch-toggle a11y-switch-dyslexia ${isDyslexic ? 'on' : ''}`}
            onClick={toggleDyslexia}
            title={isEnglish ? 'Toggle Dyslexia Font' : 'Toggle Font Disleksia'}
          ></button>
        </div>

        <div className="a11y-row">
          <span className="a11y-row-label">
            <i className="fa-solid fa-circle-half-stroke text-amber mr-1"></i> {isEnglish ? 'High Contrast' : 'Kontras Tinggi'}
          </span>
          <button
            className={`switch-toggle a11y-switch-contrast ${isContrast ? 'on' : ''}`}
            onClick={toggleContrast}
            title={isEnglish ? 'Toggle High Contrast' : 'Toggle Kontras Tinggi'}
          ></button>
        </div>

        <div className="a11y-row">
          <span className="a11y-row-label">
            <i className="fa-solid fa-globe text-indigo mr-1"></i> {isEnglish ? 'English Language' : 'Bahasa Inggris'}
          </span>
          <button
            className={`switch-toggle a11y-switch-lang ${isEnglish ? 'on' : ''}`}
            onClick={toggleLanguage}
            title={isEnglish ? 'Switch to Indonesian' : 'Beralih ke Bahasa Inggris'}
          ></button>
        </div>

        <div className="a11y-row a11y-row-footer">
          <span className="a11y-row-label">
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