import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import './DeepfakeDetectivePage.css';

export default function DeepfakeDetectivePage() {
  const navigate = useNavigate();
  const { state, saveState, showToast } = useProgress();
  const [dfOverlayOn, setDfOverlayOn] = useState(false);

  const magBoxRef = useRef(null);
  const magLensRef = useRef(null);
  const magImgRef = useRef(null);

  // Pergerakan kanta (magnifier) tetap di-handle via JS karena nilainya dinamis
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

      <div className="hub-section-head detective-header">
        <div>
          <div className="sandbox-label">
            SANDBOX LAB 01
          </div>
          <h1 className="hub-section-title detective-title">Deepfake Detective</h1>
          <p className="hub-section-sub">Inspeksi Artefak Visual &amp; Kejanggalan Rekayasa Gambar AI Generatif</p>
        </div>
      </div>

      <div className="panel panel-lab">
        <div className="lab-inner">
          <div className="lab-box">
            <div
              className="magnifier-box"
              id="deepfake-box"
              ref={magBoxRef}
              onMouseMove={handleMagMove}
              onMouseLeave={() => magLensRef.current && (magLensRef.current.style.display = 'none')}
            >
              <img
                id="deepfake-img"
                ref={magImgRef}
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80"
                alt="Target Deepfake"
                className="magnifier-img"
              />
              <div
                id="df-overlay"
                className={`df-overlay ${dfOverlayOn ? 'active' : ''}`}
              >
                <div className="df-marker df-marker-1">1</div>
                <div className="df-marker df-marker-2">2</div>
              </div>
              <div className="magnifier-lens" id="mag-lens" ref={magLensRef}></div>
            </div>
            
            <div className="lab-controls">
              <span className="lab-hint">
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
            
            <div className="artifact-card artifact-red">
              <strong className="artifact-title text-red">
                1. Asimetri Refleksi Retina
              </strong>
              Pantulan cahaya pada iris mata kiri dan kanan tidak konsisten dengan arah sumber cahaya latar belakang.
            </div>
            
            <div className="artifact-card artifact-amber">
              <strong className="artifact-title text-amber">
                2. Over-Smoothing Tekstur Kulit
              </strong>
              Pori-pori dan batas telinga terlalu halus — tanda khas generative blending dari model diffusion.
            </div>
            
            <button className="btn-lab btn-complete-inspection" onClick={handleCompleteInspection}>
              <i className="fa-solid fa-circle-check mr-1"></i> Selesaikan Inspeksi Artefak
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}