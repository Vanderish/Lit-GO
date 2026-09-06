import React, { useState } from 'react';
import './DuolingoGame.css';

export default function DuolingoGameArena({ activeStep, onClose, onComplete }) {
  const { mod, step } = activeStep;

  // Game States
  const [selectedOption, setSelectedOption] = useState(null);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [dialogueIdx, setDialogueIdx] = useState(0);

  // For Word Bank / Sentence Builder (tileorder & promptpuzzle)
  const defaultWords = step.checkpoints || [
    'Verifikasi klaim ke sumber primer',
    'Uji konsistensi counter-prompt',
    'Cek DOI/URL asli sebelum menyalin'
  ];
  const [placedWords, setPlacedWords] = useState([]);
  const [availableWords, setAvailableWords] = useState(defaultWords);

  // For Bug Hunter
  const [selectedBugs, setSelectedBugs] = useState({ b1: false, b2: false });

  // For Matching Pairs
  const [matchedPairs, setMatchedPairs] = useState({});
  const [selectedLeft, setSelectedLeft] = useState(null);

  // For Swipe Bin (Private vs Safe)
  const [swipeBin, setSwipeBin] = useState({ k1: null, k2: null });

  // Calculate Progress (0% to 100%)
  const progress = checked && isCorrect ? 100 : (checked ? 40 : 25);

  // Handle Verify / Check button
  const handleCheck = () => {
    if (checked) return;

    let correct = false;

    // Type 1: Tebak Gambar & Speed Quiz (Multiple Choice)
    if (step.type?.startsWith('tebakgambar') || step.type === 'speedquiz' || step.opts) {
      const correctAns = step.ans ?? 1;
      correct = selectedOption === correctAns;
    }
    // Type 2: Dialogue Story (Multiple Choice / Next step)
    else if (step.type === 'dialogue') {
      correct = selectedOption !== null;
    }
    // Type 3: Word Bank Tile Order
    else if (step.type === 'tileorder' || step.type === 'promptpuzzle') {
      correct = placedWords.length === defaultWords.length;
    }
    // Type 4: Bug Hunter
    else if (step.type === 'bughunter') {
      correct = selectedBugs.b1 && selectedBugs.b2;
    }
    // Type 5: Matching Pairs
    else if (step.type === 'matching') {
      correct = Object.keys(matchedPairs).length >= (step.pairs?.length || 3);
    }
    // Type 6: Swipe Bin
    else if (step.type === 'swipebin') {
      correct = swipeBin.k1 === 'shred' && swipeBin.k2 === 'safe';
    }
    // Fallback
    else {
      correct = true;
    }

    setIsCorrect(correct);
    setChecked(true);
  };

  // Handle Continue button
  const handleContinue = () => {
    if (isCorrect) {
      // If there's dialogue progression
      if (step.type === 'dialogue' && dialogueIdx === 0) {
        setDialogueIdx(1);
        setSelectedOption(null);
        setChecked(false);
        setIsCorrect(false);
      } else {
        onComplete(step.id);
      }
    } else {
      // Retry
      setChecked(false);
      setSelectedOption(null);
    }
  };

  // Check if "PERIKSA" button should be active
  const isCheckEnabled = () => {
    if (checked) return false;
    if (step.opts || step.type?.startsWith('tebakgambar')) {
      return selectedOption !== null;
    }
    if (step.type === 'dialogue') {
      return selectedOption !== null;
    }
    if (step.type === 'tileorder' || step.type === 'promptpuzzle') {
      return placedWords.length > 0;
    }
    if (step.type === 'bughunter') {
      return selectedBugs.b1 || selectedBugs.b2;
    }
    if (step.type === 'matching') {
      return Object.keys(matchedPairs).length > 0;
    }
    if (step.type === 'swipebin') {
      return swipeBin.k1 !== null || swipeBin.k2 !== null;
    }
    return true;
  };

  // Select Avatar (student or AI robot depending on step)
  const avatarImg = (step.type === 'dialogue' || step.type?.startsWith('tebakgambar'))
    ? '/illustrations/duo_avatar_student.jpg'
    : '/illustrations/duo_avatar_robot.jpg';

  return (
    <div className="duo-viewport animate-fade-in">
      {/* 1. TOP HEADER BAR */}
      <header className="duo-header">
        <button className="duo-close-btn" onClick={onClose} aria-label="Tutup">
          ✕
        </button>

        <div className="duo-progress-container">
          <div className="duo-progress-track">
            <div className="duo-progress-fill" style={{ width: `${progress}%` }}>
              <div className="duo-progress-highlight"></div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN QUESTION ARENA */}
      <main className="duo-arena-body">
        {/* Category Pill Tag */}
        <div className="duo-category-pill">
          ✦ {step.tag ? step.tag.split('•')[0].trim() : 'LITERASI AI'}
        </div>

        {/* ---------------------------------------------------- */}
        {/* CASE A: TEBAK GAMBAR (3-Options Stack with Speech Bubble) */}
        {/* ---------------------------------------------------- */}
        {step.type?.startsWith('tebakgambar') && (
          <>
            <h1 className="duo-question-title">Pilih arti yang benar</h1>

            <div className="duo-dialogue-row">
              <div className="duo-avatar-wrap">
                <img src={avatarImg} alt="Karakter Duolingo" className="duo-avatar-img" />
              </div>
              <div className="duo-speech-bubble">
                <button 
                  className="duo-sound-btn" 
                  title="Dengarkan"
                  onClick={() => {
                    const utterance = new SpeechSynthesisUtterance(step.clueText || 'Kecerdasan Buatan');
                    utterance.lang = 'id-ID';
                    window.speechSynthesis?.speak(utterance);
                  }}
                >
                  🔊
                </button>
                <span>
                  {step.clueIcons?.join(' ')} {step.clueText || 'Probabilitas Statistik AI'}
                </span>
              </div>
            </div>

            <div className="duo-options-stack">
              {step.opts?.map((opt, i) => (
                <button
                  key={i}
                  className={`duo-option-card ${selectedOption === i ? 'selected' : ''} ${checked ? (i === step.ans ? 'correct' : (selectedOption === i ? 'wrong' : '')) : ''}`}
                  onClick={() => !checked && setSelectedOption(i)}
                >
                  <span className="duo-option-num">{i + 1}</span>
                  <span className="duo-option-text">{opt}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {/* ---------------------------------------------------- */}
        {/* CASE B: DUOLINGO DIALOGUE STORY (Step 1-1) */}
        {/* ---------------------------------------------------- */}
        {step.type === 'dialogue' && (
          <>
            <h1 className="duo-question-title">
              {dialogueIdx === 0 ? 'Pilih respon yang benar' : 'Simpulkan prinsip AI'}
            </h1>

            <div className="duo-dialogue-row">
              <div className="duo-avatar-wrap">
                <img src="/illustrations/duo_avatar_robot.jpg" alt="Tutor Robot" className="duo-avatar-img" />
              </div>
              <div className="duo-speech-bubble">
                <button 
                  className="duo-sound-btn" 
                  title="Dengarkan"
                  onClick={() => {
                    const text = dialogueIdx === 0
                      ? 'AI bekerja dengan prediksi probabilitas statistik kata, bukan kesadaran manusia.'
                      : 'Halusinasi data adalah ketika AI mengarang informasi dengan sangat meyakinkan.';
                    const utterance = new SpeechSynthesisUtterance(text);
                    utterance.lang = 'id-ID';
                    window.speechSynthesis?.speak(utterance);
                  }}
                >
                  🔊
                </button>
                <span>
                  {dialogueIdx === 0
                    ? 'Menurut UNESCO (2024), AI Generatif bekerja berbasis apa?'
                    : 'Apa bahaya terbesar dari fenomena Halusinasi AI?'}
                </span>
              </div>
            </div>

            <div className="duo-options-stack">
              {(dialogueIdx === 0 ? [
                'Prediksi probabilitas statistik kata berikutnya',
                'Kesadaran batin dan perasaan manusiawi',
                'Kekuatan sihir tanpa kalkulasi matematika'
              ] : [
                'AI menghasilkan fakta palsu yang terdengar sangat meyakinkan',
                'AI langsung mematikan komputer pengguna',
                'AI membaca nomor rekening secara otomatis'
              ]).map((opt, i) => (
                <button
                  key={i}
                  className={`duo-option-card ${selectedOption === i ? 'selected' : ''} ${checked ? (i === 0 ? 'correct' : (selectedOption === i ? 'wrong' : '')) : ''}`}
                  onClick={() => !checked && setSelectedOption(i)}
                >
                  <span className="duo-option-num">{i + 1}</span>
                  <span className="duo-option-text">{opt}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {/* ---------------------------------------------------- */}
        {/* CASE C: WORD BANK SENTENCE BUILDER (Step 4-2 & 3-1) */}
        {/* ---------------------------------------------------- */}
        {(step.type === 'tileorder' || step.type === 'promptpuzzle') && (
          <div className="duo-wordbank-container">
            <h1 className="duo-question-title">Susun urutan protokol fact-checking</h1>

            <div className="duo-dialogue-row">
              <div className="duo-avatar-wrap">
                <img src={avatarImg} alt="Karakter Duolingo" className="duo-avatar-img" />
              </div>
              <div className="duo-speech-bubble">
                <span>Susun 3 langkah verifikasi data AI yang benar:</span>
              </div>
            </div>

            {/* Answer Line Slots */}
            <div className="duo-sentence-slot-line">
              {placedWords.length === 0 ? (
                <span className="duo-slot-empty-placeholder">Ketuk kata di bawah untuk menyusun urutan...</span>
              ) : (
                placedWords.map((word, idx) => (
                  <button
                    key={idx}
                    className="duo-word-tile slotted"
                    onClick={() => {
                      if (checked) return;
                      setPlacedWords(placedWords.filter((_, i) => i !== idx));
                      setAvailableWords([...availableWords, word]);
                    }}
                  >
                    {word}
                  </button>
                ))
              )}
            </div>

            {/* Word Bank */}
            <div className="duo-words-grid">
              {availableWords.map((word, idx) => (
                <button
                  key={idx}
                  className="duo-word-tile"
                  onClick={() => {
                    if (checked) return;
                    setPlacedWords([...placedWords, word]);
                    setAvailableWords(availableWords.filter((_, i) => i !== idx));
                  }}
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* CASE D: BUG HUNTER / SPOT THE ERROR (Step 1-4) */}
        {/* ---------------------------------------------------- */}
        {step.type === 'bughunter' && (
          <>
            <h1 className="duo-question-title">Temukan 2 frasa Halusinasi Hukum</h1>

            <div className="duo-dialogue-row">
              <div className="duo-avatar-wrap">
                <img src="/illustrations/duo_avatar_robot.jpg" alt="Robot" className="duo-avatar-img" />
              </div>
              <div className="duo-speech-bubble">
                <span>Ketuk 2 bagian teks fiktif yang dikarang oleh AI di bawah ini:</span>
              </div>
            </div>

            <div style={{ background: '#F8FAFC', border: '2px solid #E5E5E5', borderRadius: '16px', padding: '24px', lineHeight: 2.2, fontSize: '1.1rem', color: '#4B4B4B', fontWeight: 600 }}>
              "Berdasarkan{' '}
              <button
                className={`duo-word-tile ${selectedBugs.b1 ? 'slotted' : ''}`}
                style={{ display: 'inline-block', margin: '0 4px', fontSize: '1rem', color: selectedBugs.b1 ? '#DC2626' : 'inherit' }}
                onClick={() => !checked && setSelectedBugs({ ...selectedBugs, b1: !selectedBugs.b1 })}
              >
                Pasal 999 UU Literasi Digital 1945
              </button>
              , seluruh operasional AI wajib diserahkan kepada{' '}
              <button
                className={`duo-word-tile ${selectedBugs.b2 ? 'slotted' : ''}`}
                style={{ display: 'inline-block', margin: '0 4px', fontSize: '1rem', color: selectedBugs.b2 ? '#DC2626' : 'inherit' }}
                onClick={() => !checked && setSelectedBugs({ ...selectedBugs, b2: !selectedBugs.b2 })}
              >
                Kementerian Kebudayaan Kuno
              </button>
              {' '}dengan sanksi pidana."
            </div>
          </>
        )}

        {/* ---------------------------------------------------- */}
        {/* CASE E: MATCHING CARDS (Step 1-2) */}
        {/* ---------------------------------------------------- */}
        {step.type === 'matching' && (
          <>
            <h1 className="duo-question-title">Cocokkan pasangan istilah AI</h1>

            <div className="duo-dialogue-row">
              <div className="duo-avatar-wrap">
                <img src={avatarImg} alt="Karakter" className="duo-avatar-img" />
              </div>
              <div className="duo-speech-bubble">
                <span>Ketuk istilah di kiri, lalu ketuk arti yang cocok di kanan:</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {step.pairs?.map((p, idx) => (
                  <button
                    key={idx}
                    className={`duo-option-card ${selectedLeft === idx ? 'selected' : ''} ${matchedPairs[idx] ? 'correct' : ''}`}
                    onClick={() => setSelectedLeft(idx)}
                  >
                    <span className="duo-option-text">{p.left}</span>
                    {matchedPairs[idx] && <span style={{ color: '#2563eb', fontWeight: 800 }}>✓</span>}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {step.pairs?.map((p, idx) => (
                  <button
                    key={idx}
                    className={`duo-option-card ${matchedPairs[idx] ? 'correct' : ''}`}
                    onClick={() => {
                      if (selectedLeft !== null && selectedLeft === idx) {
                        setMatchedPairs({ ...matchedPairs, [idx]: true });
                        setSelectedLeft(null);
                      }
                    }}
                  >
                    <span className="duo-option-text">{p.right}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ---------------------------------------------------- */}
        {/* CASE F: SWIPE / CLASSIFICATION BIN (Step 2-1) */}
        {/* ---------------------------------------------------- */}
        {step.type === 'swipebin' && (
          <>
            <h1 className="duo-question-title">Pilah privasi data AI</h1>

            <div className="duo-dialogue-row">
              <div className="duo-avatar-wrap">
                <img src="/illustrations/duo_avatar_robot.jpg" alt="Robot" className="duo-avatar-img" />
              </div>
              <div className="duo-speech-bubble">
                <span>Tentukan mana data yang HARUS DIRAHASIAKAN vs AMAN UNTUK AI:</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { id: 'k1', label: 'NIK, Password Rekening, & Rekam Medis' },
                { id: 'k2', label: 'Ringkasan Makalah Sejarah Umum' }
              ].map(item => (
                <div key={item.id} style={{ background: '#FFFFFF', border: '2px solid #E5E5E5', borderRadius: '16px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: '1rem', color: '#4B4B4B' }}>{item.label}</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      className={`duo-word-tile ${swipeBin[item.id] === 'shred' ? 'slotted' : ''}`}
                      style={{ fontSize: '0.82rem', padding: '8px 14px', color: swipeBin[item.id] === 'shred' ? '#DC2626' : '#4B4B4B' }}
                      onClick={() => setSwipeBin({ ...swipeBin, [item.id]: 'shred' })}
                    >
                      🚫 Rahasia
                    </button>
                    <button
                      className={`duo-word-tile ${swipeBin[item.id] === 'safe' ? 'slotted' : ''}`}
                      style={{ fontSize: '0.82rem', padding: '8px 14px', color: swipeBin[item.id] === 'safe' ? '#16A34A' : '#4B4B4B' }}
                      onClick={() => setSwipeBin({ ...swipeBin, [item.id]: 'safe' })}
                    >
                      ✅ Aman untuk AI
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ---------------------------------------------------- */}
        {/* FALLBACK / OTHER STEPS: MULTIPLE CHOICE */}
        {/* ---------------------------------------------------- */}
        {!step.type?.startsWith('tebakgambar') && step.type !== 'dialogue' && step.type !== 'tileorder' && step.type !== 'promptpuzzle' && step.type !== 'bughunter' && step.type !== 'matching' && step.type !== 'swipebin' && (
          <>
            <h1 className="duo-question-title">{step.title || 'Pilih jawaban yang benar'}</h1>

            <div className="duo-dialogue-row">
              <div className="duo-avatar-wrap">
                <img src={avatarImg} alt="Avatar" className="duo-avatar-img" />
              </div>
              <div className="duo-speech-bubble">
                <span>{step.reading || step.caseDesc || 'Pahami materi dan pilih opsi terbaik di bawah ini:'}</span>
              </div>
            </div>

            <div className="duo-options-stack">
              {(step.opts || [
                'Verifikasi fakta ke sumber primer terpercaya',
                'Menyalin mentah seluruh keluaran AI tanpa diedit',
                'Mengabaikan batasan etika penggunaan data'
              ]).map((opt, i) => (
                <button
                  key={i}
                  className={`duo-option-card ${selectedOption === i ? 'selected' : ''} ${checked ? (i === 0 ? 'correct' : (selectedOption === i ? 'wrong' : '')) : ''}`}
                  onClick={() => !checked && setSelectedOption(i)}
                >
                  <span className="duo-option-num">{i + 1}</span>
                  <span className="duo-option-text">{opt}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </main>

      {/* 3. BOTTOM ACTION BAR (DUOLINGO FOOTER) */}
      <footer className={`duo-footer-wrap ${checked ? (isCorrect ? 'correct' : 'wrong') : ''}`}>
        <div className="duo-footer-content">
          {!checked ? (
            <button
              className={`duo-btn-check ${isCheckEnabled() ? 'active' : 'disabled'}`}
              disabled={!isCheckEnabled()}
              onClick={handleCheck}
            >
              Periksa
            </button>
          ) : (
            <>
              <div className="duo-feedback-area">
                <div className="duo-feedback-circle">
                  {isCorrect ? '✓' : '✕'}
                </div>
                <div className="duo-feedback-text-stack">
                  <div className="duo-feedback-headline">
                    {isCorrect ? 'Luar biasa!' : 'Sayang sekali!'}
                  </div>
                  {isCorrect ? (
                    <div className="duo-feedback-sublinks">
                      <span>TERLALU MUDAH</span>
                      <span>•</span>
                      <span>TERLALU SULIT</span>
                      <span>•</span>
                      <span>LAPORKAN</span>
                    </div>
                  ) : (
                    <div className="duo-feedback-hint">
                      Jawaban belum tepat. Coba telaah kembali!
                    </div>
                  )}
                </div>
              </div>

              <button className="duo-btn-continue" onClick={handleContinue}>
                {isCorrect ? 'Lanjutkan' : 'Coba Lagi'}
              </button>
            </>
          )}
        </div>
      </footer>
    </div>
  );
}
