import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import './DeepfakeDetectivePage.css';

export default function DeepfakeDetectivePage() {
  const navigate = useNavigate();
  const { state, saveState, showToast } = useProgress();
  
  const [foundArtifacts, setFoundArtifacts] = useState([]);
  const [isHintActive, setIsHintActive] = useState(false);
  
  // State baru untuk melacak alat yang aktif (pointer, magnify, scan)
  const [activeTool, setActiveTool] = useState('pointer');

  const magBoxRef = useRef(null);
  const magLensRef = useRef(null);
  const magImgRef = useRef(null);

  const handleMagMove = (e) => {
    if (!magBoxRef.current || !magLensRef.current || !magImgRef.current) return;
    const lens = magLensRef.current;
    
    // Cegah kemunculan kanta pembesar jika tool yang aktif bukan 'magnify'
    if (activeTool !== 'magnify') {
      lens.style.display = 'none';
      return;
    }

    const box = magBoxRef.current;
    const r = box.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    
    lens.style.display = 'block';
    lens.style.left = x - 65 + 'px';
    lens.style.top = y - 65 + 'px';
    lens.style.backgroundImage = `url('${magImgRef.current.src}')`;
    lens.style.backgroundSize = `${box.clientWidth * 2.2}px ${box.clientHeight * 2.2}px`;
    lens.style.backgroundPosition = `-${x * 2.2 - 65}px -${y * 2.2 - 65}px`;
  };

  // Pastikan lensa mati saat berpindah tool
  const changeTool = (tool) => {
    setActiveTool(tool);
    if (magLensRef.current && tool !== 'magnify') {
      magLensRef.current.style.display = 'none';
    }
  };

  const handleArtifactClick = (id) => {
    if (!foundArtifacts.includes(id)) {
      setFoundArtifacts((prev) => [...prev, id]);
      showToast(`Artefak visual ${id} berhasil diidentifikasi!`, 'success');
    }
  };

  const handleShowHint = () => {
    if (foundArtifacts.length === 2) return;
    setIsHintActive(true);
    setTimeout(() => {
      setIsHintActive(false);
    }, 1000);
  };

  const handleCompleteInspection = () => {
    let newBadges = [...(state.badges || [])];
    if (!newBadges.includes(2)) {
      newBadges.push(2);
      saveState({ ...state, badges: newBadges });
      showToast('Inspeksi selesai! E-Badge Penjaga Etika berhasil didapatkan.', 'amber');
    } else {
      showToast('Inspeksi selesai! Artefak visual berhasil diidentifikasi.', 'success');
    }
  };

  return (
    <div className="page-wrap wrap">
      <div className="detective-layout-grid">
        
        {/* KOLOM KIRI: Panel Area Gambar */}
        <div className="panel image-panel">
          <div className="forensic-toolbar">
            <div className="toolbar-left">
              {/* Tombol Pointer (Kiri) */}
              <button 
                className={`tool-btn ${activeTool === 'pointer' ? 'active' : ''}`}
                onClick={() => changeTool('pointer')}
                title="Kursor Default"
              >
                <i className="fa-solid fa-arrow-pointer"></i>
              </button>
              
              {/* Tombol Magnifier (Tengah) */}
              <button 
                className={`tool-btn ${activeTool === 'magnify' ? 'active' : ''}`}
                onClick={() => changeTool('magnify')}
                title="Kanta Pembesar"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
              
              {/* Tombol Scan (Kanan) */}
              <button 
                className={`tool-btn ${activeTool === 'scan' ? 'active' : ''}`}
                onClick={() => changeTool('scan')}
                title="Mode Analisis"
              >
                <i className="fa-solid fa-temperature-half"></i>
              </button>
            </div>
            <div className="toolbar-right">
              <span className="confidence-label">CONFIDENCE SCORE:</span>
              <span className="confidence-badge">
                <i className="fa-solid fa-triangle-exclamation mr-1"></i> 87% AI Generated
              </span>
            </div>
          </div>

          <div className="lab-box">
            <div style={{ textAlign: 'center', backgroundColor: '#E2E8F0', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'center' }}>
              <div
                className="magnifier-box"
                ref={magBoxRef}
                onMouseMove={handleMagMove}
                onMouseLeave={() => magLensRef.current && (magLensRef.current.style.display = 'none')}
                // Ubah kursor dinamis sesuai alat yang dipakai
                style={{ cursor: activeTool === 'magnify' ? 'crosshair' : 'default' }}
              >
                <img
                  ref={magImgRef}
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80"
                  alt="Target Deepfake"
                  className="magnifier-img"
                />
                
                <div 
                  className={`df-hotspot hotspot-1 ${isHintActive && !foundArtifacts.includes(1) ? 'hint-glow' : ''} ${foundArtifacts.includes(1) ? 'found' : ''}`}
                  onClick={() => handleArtifactClick(1)}
                  title="Klik area ini"
                ></div>

                <div 
                  className={`df-hotspot hotspot-2 ${isHintActive && !foundArtifacts.includes(2) ? 'hint-glow' : ''} ${foundArtifacts.includes(2) ? 'found' : ''}`}
                  onClick={() => handleArtifactClick(2)}
                  title="Klik area ini"
                ></div>

                <div className="magnifier-lens" ref={magLensRef}></div>
              </div>
            </div>
            
            <div className="lab-controls">
              <span className="lab-hint">
                <i className="fa-solid fa-crosshairs mr-1"></i> Arahkan kursor dan <strong>klik area</strong> yang mencurigakan.
              </span>
              <button 
                className="btn-lab-ghost" 
                onClick={handleShowHint} 
                disabled={foundArtifacts.length === 2}
              >
                <i className="fa-solid fa-lightbulb mr-1"></i> Minta Petunjuk
              </button>
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: Title/Header + Sidebar Panel */}
        <div className="sidebar-column">
          <div className="detective-header">
            <div className="sandbox-label">SANDBOX LAB 01</div>
            <h1 className="hub-section-title detective-title">Deepfake Detective</h1>
            <p className="hub-section-sub">Inspeksi Artefak Visual &amp; Kejanggalan Rekayasa Gambar AI Generatif</p>
          </div>

          <div className="panel lab-sidebar-panel">
            <div className="lab-sidebar-title-row">
              <span className="lab-sidebar-title">Visual Artifact Findings</span>
              <span className="badge-count">2 Issues</span>
            </div>
            
            <div className="artifacts-list">
              {foundArtifacts.includes(1) ? (
                <div className="artifact-card artifact-red reveal-anim">
                  <div className="artifact-head">
                    <strong className="artifact-title text-red">
                      <i className="fa-solid fa-eye mr-1"></i> Retinal Reflection Asymmetry
                    </strong>
                    <span className="severity-badge red">High</span>
                  </div>
                  <p>Light reflections in the left and right pupils are inconsistent with the background light source.</p>
                </div>
              ) : (
                <div className="artifact-card locked-card">
                  <i className="fa-solid fa-lock mr-2"></i> Area Mata Belum Diinspeksi
                </div>
              )}
              
              {foundArtifacts.includes(2) ? (
                <div className="artifact-card artifact-amber reveal-anim">
                  <div className="artifact-head">
                    <strong className="artifact-title text-amber">
                      <i className="fa-solid fa-face-smile mr-1"></i> Skin Texture Over-Smoothing
                    </strong>
                    <span className="severity-badge amber">Medium</span>
                  </div>
                  <p>Pores and ear boundaries are excessively smooth — a signature of generative blending.</p>
                </div>
              ) : (
                <div className="artifact-card locked-card">
                  <i className="fa-solid fa-lock mr-2"></i> Area Tekstur Kulit Belum Diinspeksi
                </div>
              )}

              {foundArtifacts.length === 2 && (
                <div className="success-check-card reveal-anim">
                  <i className="fa-regular fa-circle-check"></i>
                  <span>Background consistency check passed.</span>
                </div>
              )}
            </div>
            
            <button 
              className={`btn-lab btn-complete-inspection ${foundArtifacts.length === 2 ? 'ready' : ''}`}
              onClick={handleCompleteInspection}
              disabled={foundArtifacts.length < 2}
            >
              <i className={`fa-solid ${foundArtifacts.length === 2 ? 'fa-clipboard-check' : 'fa-lock'} mr-1`}></i> 
              {foundArtifacts.length === 2 ? 'Complete Forensic Analysis' : `Temukan Semua (${foundArtifacts.length}/2)`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}