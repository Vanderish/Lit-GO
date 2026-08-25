import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PromptSafetyPage() {
  const navigate = useNavigate();
  const [promptText, setPromptText] = useState('');

  const parsePrompt = (text) => {
    let score = 50,
      ctx = false,
      ins = false,
      fmt = false,
      safe = true;
    const good = [
      ['bertindak sebagai', 'ctx'],
      ['konteks', 'ctx'],
      ['jelaskan', 'ins'],
      ['ringkas', 'ins'],
      ['format', 'fmt'],
      ['tabel', 'fmt'],
    ];
    const risk = ['password', 'rahasia', 'nik', 'rekening', 'curi', 'hack'];

    good.forEach(([kw, type]) => {
      if (text.toLowerCase().includes(kw)) {
        score += 10;
        if (type === 'ctx') ctx = true;
        if (type === 'ins') ins = true;
        if (type === 'fmt') fmt = true;
      }
    });

    risk.forEach((kw) => {
      if (text.toLowerCase().includes(kw)) {
        score -= 25;
        safe = false;
      }
    });

    return { score: Math.max(10, Math.min(100, score)), ctx, ins, fmt, safe };
  };

  const promptStats = parsePrompt(promptText);

  return (
    <div className="page-wrap">
      {/* Back to Dashboard Button */}
      <div style={{ marginBottom: '16px' }}>
        <button
          className="btn-lab-ghost"
          onClick={() => navigate('/dashboard')}
          style={{ padding: '8px 16px', fontSize: '0.85rem', fontWeight: 600 }}
        >
          <i className="fa-solid fa-arrow-left mr-2"></i> Kembali ke Dashboard
        </button>
      </div>

      <div className="hub-section-head" style={{ marginBottom: '24px' }}>
        <div>
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--emerald)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
            SANDBOX LAB 04
          </div>
          <h1 className="hub-section-title" style={{ fontSize: '1.6rem' }}>Prompt Safety Lab</h1>
          <p className="hub-section-sub">Parser Anatomi Prompt &amp; Penguji Keamanan Data Sensitif</p>
        </div>
      </div>

      <div className="panel" style={{ padding: '28px' }}>
        <div className="lab-inner">
          <div className="lab-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--navy)' }}>Input Prompt Text:</span>
              <button
                className="btn-lab-ghost"
                style={{ fontSize: '0.76rem', padding: '5px 14px' }}
                onClick={() =>
                  setPromptText(
                    'Bertindak sebagai tutor AI beretika. Jelaskan konteks definisi Machine Learning dalam format tabel ringkas untuk siswa SMA, tanpa meminta password atau data rahasia pengguna.'
                  )
                }
              >
                <i className="fa-solid fa-wand-magic-sparkles mr-1"></i> Muat Contoh Prompt Aman
              </button>
            </div>
            <textarea
              id="prompt-input"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              rows="7"
              placeholder="Ketik prompt kamu di sini untuk diuji oleh engine parser anatomi..."
              style={{
                width: '100%',
                padding: '14px',
                border: '1px solid var(--line)',
                borderRadius: '12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.86rem',
                color: 'var(--navy)',
                background: 'var(--bg)',
                resize: 'vertical',
                outline: 'none',
              }}
            ></textarea>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '10px' }}>
              <span>
                Status Keamanan:{' '}
                <strong style={{ color: promptStats.safe ? 'var(--emerald)' : 'var(--red)' }}>
                  {promptStats.safe ? 'Aman & Terstruktur' : '⚠️ Terdeteksi Kata Kunci Berisiko'}
                </strong>
              </span>
              <span id="prompt-chars">{promptText.length} karakter</span>
            </div>
          </div>

          <div className="lab-sidebar">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="lab-sidebar-title">
              Engine Parser
              <span className="score-pill">
                Skor: <strong style={{ color: 'var(--indigo)' }}>{promptStats.score}</strong>/100
              </span>
            </div>
            <div
              className="parser-output"
              style={{ wordBreak: 'break-word', minHeight: '100px', fontSize: '0.84rem' }}
              dangerouslySetInnerHTML={{
                __html: promptText
                  ? promptText
                      .replace(
                        /(bertindak sebagai|konteks|jelaskan|ringkas|format|tabel)/gi,
                        '<mark style="background:rgba(16,185,129,0.18); color:var(--emerald); font-weight:bold; border-radius:3px; padding:0 3px;">$1</mark>'
                      )
                      .replace(
                        /(password|rahasia|nik|rekening|curi|hack)/gi,
                        '<mark style="background:rgba(239,68,68,0.15); color:var(--red); font-weight:bold; border-radius:3px; padding:0 3px;">$1</mark>'
                      )
                  : 'Hasil parsing anatomi akan dianalisis secara otomatis...',
              }}
            ></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.78rem' }}>
              <div style={{ padding: '8px 10px', border: '1px solid var(--line)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', background: 'var(--white)' }}>
                <span>Konteks</span>
                <span>{promptStats.ctx ? '✅' : '⬜'}</span>
              </div>
              <div style={{ padding: '8px 10px', border: '1px solid var(--line)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', background: 'var(--white)' }}>
                <span>Instruksi</span>
                <span>{promptStats.ins ? '✅' : '⬜'}</span>
              </div>
              <div style={{ padding: '8px 10px', border: '1px solid var(--line)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', background: 'var(--white)' }}>
                <span>Format</span>
                <span>{promptStats.fmt ? '✅' : '⬜'}</span>
              </div>
              <div style={{ padding: '8px 10px', border: '1px solid var(--line)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', background: 'var(--white)' }}>
                <span>Keamanan</span>
                <span>{promptStats.safe ? '✅' : '❌'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
