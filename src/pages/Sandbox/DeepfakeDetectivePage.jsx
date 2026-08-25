import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';

export default function DeepfakeDetectivePage() {
  const navigate = useNavigate();
  const { state, saveState, showToast } = useProgress();
  const [dfOverlayOn, setDfOverlayOn] = useState(false);

  const magBoxRef = useRef(null);
  const magLensRef = useRef(null);
  const magImgRef = useRef(null);

  const handleMagMove = (e) => {
    if (!magBoxRef.current || !magLensRef.current || !magImgRef.current) return;
    const box = magBoxRef.current;
    const r = box.getBoundingClientRect();
    const x = e.clientX - r.left,
      y = e.clientY - r.top;
    const lens = magLensRef.current;
    lens.style.display = 'block';
    lens.style.left = x - 65 + 'px';
    lens.style.top = y - 65 + 'px';
    lens.style.backgroundImage = `url('${magImgRef.current.src}')`;
    lens.style.backgroundSize = `${box.clientWidth * 2.2}px ${box.clientHeight * 2.2}px`;
    lens.style.backgroundPosition = `-${x * 2.2 - 65}px -${y * 2.2 - 65}px`;
  };

  const handleCompleteInspection = () => {
    let newBadges = [...state.badges];
    if (!newBadges.includes(2)) {
      newBadges.push(2);
      saveState({ ...state, badges: newBadges });
      showToast('Inspeksi selesai! E-Badge Penjaga Etika berhasil didapatkan.', 'amber');
    } else {
      showToast('Inspeksi selesai! Artefak visual berhasil diidentifikasi.', 'success');
    }
  };

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
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--teal)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
            SANDBOX LAB 01
          </div>
          <h1 className="hub-section-title" style={{ fontSize: '1.6rem' }}>Deepfake Detective</h1>
          <p className="hub-section-sub">Inspeksi Artefak Visual &amp; Kejanggalan Rekayasa Gambar AI Generatif</p>
        </div>
      </div>

      <div className="panel" style={{ padding: '28px' }}>
        <div className="lab-inner">
          <div className="lab-box">
            <div
              className="magnifier-box"
              id="deepfake-box"
              ref={magBoxRef}
              onMouseMove={handleMagMove}
              onMouseLeave={() => magLensRef.current && (magLensRef.current.style.display = 'none')}
              style={{ height: '380px' }}
            >
              <img
                id="deepfake-img"
                ref={magImgRef}
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80"
                alt="Target Deepfake"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                id="df-overlay"
                style={{ display: dfOverlayOn ? 'block' : 'none', position: 'absolute', inset: 0, pointerEvents: 'none' }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '30%',
                    right: '25%',
                    width: '44px',
                    height: '44px',
                    border: '2px solid var(--red)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(239,68,68,0.15)',
                    fontSize: '0.75rem',
                    fontWeight: 900,
                    color: 'var(--red)',
                  }}
                >
                  1
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '28%',
                    left: '32%',
                    width: '38px',
                    height: '38px',
                    border: '2px solid var(--amber)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(245,158,11,0.15)',
                    fontSize: '0.75rem',
                    fontWeight: 900,
                    color: 'var(--amber)',
                  }}
                >
                  2
                </div>
              </div>
              <div className="magnifier-lens" id="mag-lens" ref={magLensRef}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                <i className="fa-solid fa-hand-pointer mr-1"></i> Arahkan kursor ke foto untuk memperbesar lensa kanta
              </span>
              <button className="btn-lab-ghost" onClick={() => setDfOverlayOn(!dfOverlayOn)} id="df-overlay-btn">
                <i className={`fa-solid ${dfOverlayOn ? 'fa-eye-slash' : 'fa-eye'} mr-1`}></i>{' '}
                {dfOverlayOn ? 'Sembunyikan Sorotan' : 'Tampilkan Sorotan Artefak'}
              </button>
            </div>
          </div>

          <div className="lab-sidebar">
            <div className="lab-sidebar-title">Temuan Artefak Visual:</div>
            <div
              style={{
                background: 'rgba(239,68,68,0.06)',
                border: '1px solid rgba(239,68,68,0.2)',
                borderRadius: '10px',
                padding: '14px',
                fontSize: '0.82rem',
              }}
            >
              <strong style={{ color: 'var(--red)', display: 'block', marginBottom: '4px' }}>
                1. Asimetri Refleksi Retina
              </strong>
              Pantulan cahaya pada iris mata kiri dan kanan tidak konsisten dengan arah sumber cahaya latar belakang.
            </div>
            <div
              style={{
                background: 'rgba(245,158,11,0.07)',
                border: '1px solid rgba(245,158,11,0.25)',
                borderRadius: '10px',
                padding: '14px',
                fontSize: '0.82rem',
              }}
            >
              <strong style={{ color: 'var(--amber)', display: 'block', marginBottom: '4px' }}>
                2. Over-Smoothing Tekstur Kulit
              </strong>
              Pori-pori dan batas telinga terlalu halus — tanda khas generative blending dari model diffusion.
            </div>
            <button className="btn-lab" onClick={handleCompleteInspection} style={{ width: '100%', marginTop: '10px' }}>
              <i className="fa-solid fa-circle-check mr-1"></i> Selesaikan Inspeksi Artefak
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
