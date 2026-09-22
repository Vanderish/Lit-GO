import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import './DeepfakeDetectivePage.css';

// Dataset Kasus Gambar Terkurasi dengan Fixed Hotspots & Answer Key
const CURATED_CASES = [
  {
    id: 'case-portrait',
    caseNum: 1,
    title: 'Potret Sintetis (Wajah AI)',
    subTitle: 'Deteksi Refleksi Asimetri Iris & Over-Smoothing Tekstur Kulit',
    imgUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    modelTag: 'StyleGAN3 / Diffusion Portrait',
    confidenceScore: 92,
    artifacts: [
      {
        id: 1,
        title: 'Retinal Reflection Asymmetry',
        tag: 'Inkonsistensi Fotometrik',
        severity: 'red',
        severityLabel: 'High Risk',
        icon: 'fa-solid fa-eye',
        topPercent: 39,
        leftPercent: 41,
        desc: 'Pantulan sumber cahaya (catchlight) pada pupil kiri dan kanan tidak konsisten dengan arah lampu studio.',
        statement: 'Titik pantulan cahaya pada kornea mata kiri dan kanan memiliki bentuk geometris yang berlainan, mengindikasikan bahwa gambar dihasilkan oleh model sintesis generatif tanpa konsistensi vektor cahaya 3D.'
      },
      {
        id: 2,
        title: 'Skin Texture Over-Smoothing',
        tag: 'Distorsi Difusi',
        severity: 'amber',
        severityLabel: 'Medium Risk',
        icon: 'fa-solid fa-face-smile',
        topPercent: 57,
        leftPercent: 61,
        desc: 'Pori-pori dan batas kontur pipi terlalu mulus — ciri khas hilangnya mikro-frekuensi pada sintesis generatif.',
        statement: 'Gradien tekstur mikro pada pipi dan cuping telinga mengalami degradasi frekuensi spasial tinggi (over-smoothing), pola umum akibat filter denoiser model difusi.'
      },
    ]
  },
  {
    id: 'case-character',
    caseNum: 2,
    title: 'Karakter & Batas Rambut AI',
    subTitle: 'Deteksi Morfologi Helai Rambut & Distorsi Garis Latar',
    imgUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    modelTag: 'Midjourney v6.1 Synthesized',
    confidenceScore: 89,
    artifacts: [
      {
        id: 1,
        title: 'Ear Boundary & Hair Blending Glitch',
        tag: 'Artifact Blending',
        severity: 'red',
        severityLabel: 'High Risk',
        icon: 'fa-solid fa-ear-listen',
        topPercent: 46,
        leftPercent: 23,
        desc: 'Helai rambut menyatu secara tidak alami ke dalam kontur daun telinga tanpa pemisahan kedalaman (depth layering).',
        statement: 'Terdeteksi anomali boundary segmentasi pada batas telinga kiri, di mana tekstur rambut menyatu dengan kartilago telinga tanpa adanya oklusi kedalaman fisik yang realistis.'
      },
      {
        id: 2,
        title: 'Background Geometric Warp',
        tag: 'Distorsi Spasial',
        severity: 'amber',
        severityLabel: 'Medium Risk',
        icon: 'fa-solid fa-vector-square',
        topPercent: 26,
        leftPercent: 79,
        desc: 'Pola garis lurus pada latar belakang terdistorsi melengkung di sekitar siluet bahu subjek.',
        statement: 'Struktur vertikal pada latar belakang mengalami pembengkokan lokal (spatial warping) akibat proses rekonstruksi latent space di sekitar siluet subjek.'
      },
    ]
  },
  {
    id: 'case-fabric',
    caseNum: 3,
    title: 'Tekstil & Pencahayaan Spekular AI',
    subTitle: 'Deteksi Pola Kerah Baju & Gradien Refleksi Dahi',
    imgUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    modelTag: 'FLUX.1 Schnell Synthesized',
    confidenceScore: 94,
    artifacts: [
      {
        id: 1,
        title: 'Collar & Fabric Symmetry Disruption',
        tag: 'Geometri Tekstil',
        severity: 'red',
        severityLabel: 'High Risk',
        icon: 'fa-solid fa-shirt',
        topPercent: 79,
        leftPercent: 46,
        desc: 'Jahitan kerah baju dan tekstur kancing menghilang secara tiba-tiba ke dalam pola lipatan kain sintetis.',
        statement: 'Simetri garis jahitan kerah pakaian terputus secara tidak wajar pada area lipatan leher, menunjukkan ketidakmampuan AI merekonstruksi struktur tenun pakaian secara kontinu.'
      },
      {
        id: 2,
        title: 'Specular Highlights Gradient Loss',
        tag: 'Gradien Spekular',
        severity: 'amber',
        severityLabel: 'Medium Risk',
        icon: 'fa-solid fa-sun',
        topPercent: 26,
        leftPercent: 53,
        desc: 'Gradasi pencahayaan di dahi menunjukkan hilangnya transisi spekular alami yang lazim ada pada optik kamera riil.',
        statement: 'Transisi antara area terang (highlight) dan bayangan (shadow) pada dahi memiliki batas difus yang tidak sinkron dengan karakteristik kurva respons sensor optik kamera digital.'
      },
    ]
  }
];

export default function DeepfakeDetectivePage() {
  const navigate = useNavigate();
  const { state, saveState, logActivity, showToast } = useProgress();
  
  // State untuk dataset kasus aktif
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [foundArtifacts, setFoundArtifacts] = useState([]);
  const [isHintActive, setIsHintActive] = useState(false);
  
  // State tool yang aktif (pointer, magnify, scan)
  const [activeTool, setActiveTool] = useState('pointer');

  // State untuk Mode Latihan Bebas (Upload Gambar Kustom)
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [detectionResult, setDetectionResult] = useState(null);
  const [customMarkers, setCustomMarkers] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const magBoxRef = useRef(null);
  const magLensRef = useRef(null);
  const magImgRef = useRef(null);
  const fileInputRef = useRef(null);
  const detectionSectionRef = useRef(null);

  const currentCase = CURATED_CASES[activeCaseIndex];

  // Ganti Kasus Dataset Bawaan
  const selectCase = (idx) => {
    setIsCustomMode(false);
    setUploadedImage(null);
    setUploadedFileName('');
    setActiveCaseIndex(idx);
    setFoundArtifacts([]);
    setDetectionResult(null);
    showToast(`Beralih ke Kasus #${idx + 1}: ${CURATED_CASES[idx].title}`, 'indigo');
  };

  const handleRandomCase = () => {
    const nextIdx = (activeCaseIndex + 1) % CURATED_CASES.length;
    selectCase(nextIdx);
  };

  const handleMagMove = (e) => {
    if (!magBoxRef.current || !magLensRef.current || !magImgRef.current) return;
    const lens = magLensRef.current;
    
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

  const changeTool = (tool) => {
    setActiveTool(tool);
    if (magLensRef.current && tool !== 'magnify') {
      magLensRef.current.style.display = 'none';
    }
  };

  const handleArtifactClick = (id) => {
    if (!foundArtifacts.includes(id)) {
      const updated = [...foundArtifacts, id];
      setFoundArtifacts(updated);
      showToast(`Artefak visual #${id} berhasil diidentifikasi!`, 'success');

      // Jika semua artefak pada kasus ini ditemukan, otomatis trigger generate laporan deteksi kasus
      if (updated.length === currentCase.artifacts.length) {
        generateCaseReport(currentCase);
      }
    }
  };

  const handleShowHint = () => {
    if (foundArtifacts.length === currentCase.artifacts.length) return;
    setIsHintActive(true);
    setTimeout(() => {
      setIsHintActive(false);
    }, 1200);
  };

  // Generate Report untuk Kasus Tetap
  const generateCaseReport = (caseItem) => {
    const resultData = {
      confidenceScore: caseItem.confidenceScore,
      verdictTitle: `Indikasi Kuat Rekayasa AI (${caseItem.title})`,
      verdictSeverity: 'high',
      analyzedAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      fileName: `kasus_0${caseItem.caseNum}_dataset.png`,
      summary: `Hasil analisis forensik visual pada ${caseItem.title} mengonfirmasi adanya inkonsistensi struktur pixel pada 2 area target: ${caseItem.subTitle}.`,
      statements: caseItem.artifacts.map((art) => ({
        id: `stmt-${art.id}`,
        title: art.title,
        badge: art.tag,
        severity: art.severity,
        icon: art.icon,
        statement: art.statement,
      })),
      recommendation: `Untuk memverifikasi foto seperti ini di dunia nyata, lakukan pengecekan konsistensi arah cahaya, analisis tekstur pori kulit (C2PA standard), dan bandingkan dengan pencarian gambar terbalik (Reverse Image Search).`
    };
    setDetectionResult(resultData);
  };

  // Proses file gambar untuk Mode Latihan Bebas
  const processImageFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Harap unggah file gambar yang valid (JPG, PNG, WEBP).', 'red');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imgDataUrl = e.target.result;
      setIsCustomMode(true);
      setUploadedImage(imgDataUrl);
      setUploadedFileName(file.name);
      setCustomMarkers([]);
      runSimulatedForensicAnalysis(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  // Simulasi analisis forensik edukatif untuk gambar kustom
  const runSimulatedForensicAnalysis = (fileName) => {
    setIsScanning(true);
    setScanProgress(15);
    setDetectionResult(null);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 25;
      });
    }, 180);

    setTimeout(() => {
      clearInterval(interval);
      setScanProgress(100);

      const confidence = Math.floor(Math.random() * 12) + 84; // 84% - 95%
      
      const resultData = {
        confidenceScore: confidence,
        verdictTitle: 'Simulasi Forensik Edukatif (Latihan Bebas)',
        verdictSeverity: 'high',
        analyzedAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        fileName: fileName || 'gambar_latihan.png',
        summary: `[SIMULASI EDUKASI] Setelah mensimulasikan pemindaian matriks spasial dan respons spektral pada file "${fileName}", sistem menampilkan anomali tipikal sintesis generatif untuk bahan latihan analisis visual.`,
        statements: [
          {
            id: 'stmt-light',
            title: 'Simulasi Inkonsistensi Fotometrik',
            badge: 'Pencahayaan Mikro',
            severity: 'red',
            icon: 'fa-solid fa-eye',
            statement: 'Vektor pencahayaan mikro pada batas tepi subjek menunjukkan variasi intensitas yang tidak seragam dengan arah pencahayaan global.'
          },
          {
            id: 'stmt-texture',
            title: 'Simulasi Reduksi Frekuensi Spasial',
            badge: 'Tekstur Permukaan',
            severity: 'amber',
            icon: 'fa-solid fa-wand-magic-sparkles',
            statement: 'Area transisi gradasi warna memiliki pola smoothing yang menyerupai output rekonstruksi model difusi generatif.'
          },
          {
            id: 'stmt-spectral',
            title: 'Simulasi Analisis Tepi Spektral',
            badge: 'Edge Coherence',
            severity: 'indigo',
            icon: 'fa-solid fa-temperature-half',
            statement: 'Filter spektral mendeteksi diskontinuitas pada area oklusi siluet terhadap kontur latar belakang.'
          }
        ],
        recommendation: 'Catatan: Hasil analisis ini bersifat simulatif untuk keperluan latihan literasi digital. Untuk pembuktian hukum, gunakan tools forensik bersertifikasi dan metadata C2PA / Content Credentials.'
      };

      setDetectionResult(resultData);
      setIsScanning(false);
      showToast('Simulasi analisis forensik selesai! Periksa pernyataan di bawah.', 'success');

      setTimeout(() => {
        detectionSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }, 1200);
  };

  const handleImageClick = (e) => {
    if (!isCustomMode || !magBoxRef.current) return;
    if (activeTool === 'magnify') return;

    if (customMarkers.length >= 5) {
      showToast('Batas maksimal 5 pin inspeksi tercapai.', 'amber');
      return;
    }

    const box = magBoxRef.current;
    const rect = box.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    const newMarker = {
      id: Date.now(),
      x,
      y,
      label: `Pin #${customMarkers.length + 1} (${x}%, ${y}%)`,
    };

    setCustomMarkers((prev) => [...prev, newMarker]);
    showToast(`Pin inspeksi #${customMarkers.length + 1} berhasil ditambahkan!`, 'indigo');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleResetToCurated = () => {
    setIsCustomMode(false);
    setUploadedImage(null);
    setUploadedFileName('');
    setCustomMarkers([]);
    setFoundArtifacts([]);
    setDetectionResult(null);
    showToast('Kembali ke Kasus Terkurasi (Fixed Answer Key).', 'indigo');
  };

  const handleCopyReport = () => {
    if (!detectionResult) return;
    const textReport = `[LAPORAN DETEKSI FORENSIK DEEPFAKE - LIT-GO]\n`
      + `Status: ${detectionResult.verdictTitle}\n`
      + `Tingkat Keyakinan: ${detectionResult.confidenceScore}%\n`
      + `File: ${detectionResult.fileName}\n`
      + `Waktu Analisis: ${detectionResult.analyzedAt}\n\n`
      + `Ringkasan Temuan:\n${detectionResult.summary}\n\n`
      + `Pernyataan Anomali Terdeteksi:\n`
      + detectionResult.statements.map((s, i) => `${i + 1}. ${s.title} (${s.badge}): ${s.statement}`).join('\n')
      + `\n\nRekomendasi:\n${detectionResult.recommendation}`;

    navigator.clipboard.writeText(textReport);
    showToast('Laporan deteksi berhasil disalin ke clipboard!', 'success');
  };

  const handleCompleteInspection = () => {
    const isReady = isCustomMode ? customMarkers.length > 0 : foundArtifacts.length === currentCase.artifacts.length;
    if (!isReady) return;

    if (!isCustomMode) {
      let newBadges = [...(state.badges || [])];
      let newDone = [...(state.doneModules || [])];
      if (!newBadges.includes(1)) newBadges.push(1);
      if (!newDone.includes('sb-1')) newDone.push('sb-1');

      saveState({
        ...state,
        badges: newBadges,
        doneModules: newDone,
        gems: (state.gems || 0) + 150,
      });

      logActivity(`Menuntaskan Investigasi Deepfake Lab: ${currentCase.title} 🔍`, 'fa-solid fa-eye', 'teal');
      showToast('Investigasi Berhasil! +150 Gems & E-Badge Detective Terbuka.', 'success');
    } else {
      logActivity(`Melakukan Audit Forensik Gambar Kustom pada Deepfake Lab 🔬`, 'fa-solid fa-microchip', 'teal');
      showToast('Latihan investigasi gambar kustom berhasil diselesaikan!', 'success');
    }
  };

  const currentImageSrc = isCustomMode ? uploadedImage : currentCase.imgUrl;
  const currentConfidence = detectionResult 
    ? `${detectionResult.confidenceScore}% AI Generated` 
    : isCustomMode 
      ? '88% AI Generated' 
      : `${currentCase.confidenceScore}% AI Generated`;

  return (
    <div className="page-wrap wrap">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/png, image/jpeg, image/webp, image/jpg"
        style={{ display: 'none' }}
      />

      {/* Case Selector Bar (Fixed Answer Key Datasets) */}
      <div className="case-selector-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <i className="fa-solid fa-images mr-1 text-indigo"></i> Kasus Terkurasi (Fixed Key):
          </span>
          {CURATED_CASES.map((c, idx) => (
            <button
              key={c.id}
              type="button"
              className={`case-pill-btn ${!isCustomMode && activeCaseIndex === idx ? 'active' : ''}`}
              onClick={() => selectCase(idx)}
            >
              Kasus #{idx + 1}: {c.title.split('(')[0].trim()}
            </button>
          ))}
          {isCustomMode && (
            <button
              type="button"
              className="case-pill-btn active"
              style={{ background: 'rgba(217, 119, 6, 0.1)', borderColor: '#D97706', color: '#B45309' }}
            >
              <i className="fa-solid fa-cloud mr-1"></i> Gambar Kustom Anda
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* GRID LAB INSPEKSI GAMBAR (KIRI) + SIDEBAR INFO (KANAN)                    */}
      {/* ========================================================================= */}
      <div className="detective-layout-grid">
        
        {/* KOLOM KIRI: Panel Area Gambar Forensik */}
        <div className="panel image-panel">
          <div className="forensic-toolbar">
            <div className="toolbar-left">
              {/* Tool Pointer */}
              <button 
                className={`tool-btn ${activeTool === 'pointer' ? 'active' : ''}`}
                onClick={() => changeTool('pointer')}
                title="Kursor Default / Tandai Titik Inspeksi"
              >
                <i className="fa-solid fa-arrow-pointer"></i>
              </button>
              
              {/* Tool Magnifier */}
              <button 
                className={`tool-btn ${activeTool === 'magnify' ? 'active' : ''}`}
                onClick={() => changeTool('magnify')}
                title="Kanta Pembesar Forensik (Zoom 2.2x)"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
              
              {/* Tool Scan Filter */}
              <button 
                className={`tool-btn ${activeTool === 'scan' ? 'active' : ''}`}
                onClick={() => changeTool('scan')}
                title="Filter Analisis Spektral & Heatmap Piksel"
              >
                <i className="fa-solid fa-temperature-half"></i>
              </button>

              <div className="toolbar-divider"></div>

              {/* Status Mode Badge */}
              <span style={{ fontSize: '0.76rem', fontWeight: 700, color: isCustomMode ? '#D97706' : 'var(--indigo)' }}>
                {isCustomMode ? '🛠️ Mode Latihan Bebas' : `🎯 Kasus #${currentCase.caseNum}: ${currentCase.modelTag}`}
              </span>
            </div>

            <div className="toolbar-right">
              <span className="confidence-label">CONFIDENCE SCORE:</span>
              <span className={`confidence-badge ${isScanning ? 'scanning' : ''}`}>
                <i className={`fa-solid ${isScanning ? 'fa-spinner fa-spin' : 'fa-triangle-exclamation'} mr-1`}></i> 
                {isScanning ? `Scanning ${scanProgress}%` : currentConfidence}
              </span>
            </div>
          </div>

          <div className="lab-box">
            <div 
              className={`lab-canvas-container ${isDragging ? 'drag-over' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div
                className={`magnifier-box ${activeTool === 'scan' ? 'mode-scan-filter' : ''}`}
                ref={magBoxRef}
                onMouseMove={handleMagMove}
                onMouseLeave={() => magLensRef.current && (magLensRef.current.style.display = 'none')}
                onClick={handleImageClick}
                style={{ cursor: activeTool === 'magnify' ? 'crosshair' : activeTool === 'scan' ? 'cell' : 'pointer' }}
              >
                <img
                  ref={magImgRef}
                  src={currentImageSrc}
                  alt="Target Deepfake"
                  className="magnifier-img"
                />

                {/* Scanning Laser Bar */}
                {isScanning && (
                  <div className="forensic-scanner-overlay">
                    <div className="scanner-laser-beam"></div>
                    <div className="scanner-grid-matrix"></div>
                    <div className="scanner-status-tag">
                      <i className="fa-solid fa-microchip fa-spin mr-2"></i>
                      MEMINDAI MATRIKS PIKSEL ({scanProgress}%)
                    </div>
                  </div>
                )}

                {/* HUD Grid Forensik */}
                {activeTool === 'scan' && !isScanning && (
                  <div className="forensic-scan-hud">
                    <div className="hud-corner top-left"></div>
                    <div className="hud-corner top-right"></div>
                    <div className="hud-corner bottom-left"></div>
                    <div className="hud-corner bottom-right"></div>
                    <div className="hud-scan-badge">
                      <i className="fa-solid fa-wave-square mr-1"></i> SPECTRUM FREQUENCY FILTER ON
                    </div>
                  </div>
                )}
                
                {/* Hotspot Khusus Kasus Terkurasi (Fixed Key) */}
                {!isCustomMode && currentCase.artifacts.map((art) => {
                  const isFound = foundArtifacts.includes(art.id);
                  return (
                    <div 
                      key={art.id}
                      className={`df-hotspot ${isHintActive && !isFound ? 'hint-glow' : ''} ${isFound ? 'found' : ''}`}
                      style={{
                        top: `${art.topPercent}%`,
                        left: `${art.leftPercent}%`,
                        width: '64px',
                        height: '64px',
                      }}
                      onClick={(e) => { e.stopPropagation(); handleArtifactClick(art.id); }}
                      title={`Klik untuk inspeksi: ${art.title}`}
                    ></div>
                  );
                })}

                {/* Pin Dinamis untuk Mode Latihan Bebas */}
                {isCustomMode && customMarkers.map((marker, index) => (
                  <div
                    key={marker.id}
                    className="custom-forensic-pin reveal-anim"
                    style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                    title={marker.label}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="pin-index">{index + 1}</span>
                    <div className="pin-sonar"></div>
                  </div>
                ))}

                {/* Magnifier Lens */}
                <div className="magnifier-lens" ref={magLensRef}></div>
              </div>
            </div>
            
            {/* Lab Bar Footer Controls */}
            <div className="lab-controls">
              <span className="lab-hint">
                <i className="fa-solid fa-crosshairs mr-1"></i> 
                {isCustomMode ? (
                  <>Latihan Bebas: <strong>{uploadedFileName || 'Gambar Kustom'}</strong> • Klik canvas untuk menambah pin investigasi ({customMarkers.length}/5)</>
                ) : (
                  <>Kasus #{currentCase.caseNum}: Temukan <strong>{currentCase.artifacts.length} area anomali</strong> pada gambar dengan mengklik titik yang mencurigakan.</>
                )}
              </span>

              <div className="lab-action-buttons">
                {!isCustomMode ? (
                  <button 
                    className="btn-lab-ghost" 
                    onClick={handleShowHint} 
                    disabled={foundArtifacts.length === currentCase.artifacts.length}
                  >
                    <i className="fa-solid fa-lightbulb mr-1"></i> Minta Petunjuk
                  </button>
                ) : (
                  <button 
                    className="btn-lab-ghost" 
                    onClick={() => runSimulatedForensicAnalysis(uploadedFileName)}
                    disabled={isScanning}
                  >
                    <i className="fa-solid fa-arrows-rotate mr-1"></i> Pindai Ulang
                  </button>
                )}
              </div>
            </div>

            {/* Banner Disclaimer Edukasi Khusus Mode Latihan Bebas */}
            {isCustomMode && (
              <div className="educational-disclaimer-banner">
                <div className="disclaimer-icon">
                  <i className="fa-solid fa-circle-info"></i>
                </div>
                <div className="disclaimer-content">
                  <strong>Catatan Edukasi &amp; Transparansi:</strong>
                  <p>
                    Fitur unggah gambar ini adalah <strong>simulator latihan forensik edukatif</strong> berbasis peramban (client-side). Hasil deteksi dan skor keyakinan disimulasikan untuk mengajarkan prinsip investigasi visual, bukan model AI server-side industri.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* KOLOM KANAN: Title/Header + Sidebar Panel Status */}
        <div className="sidebar-column">
          <div className="detective-header">
            <div className="sandbox-label">SANDBOX LAB 01</div>
            <h1 className="hub-section-title detective-title">Deepfake Detective</h1>
            <p className="hub-section-sub">Inspeksi Artefak Visual &amp; Kejanggalan Rekayasa Gambar AI Generatif</p>
          </div>

          <div className="panel lab-sidebar-panel">
            {isCustomMode ? (
              /* SIDEBAR MODE LATIHAN BEBAS */
              <div className="uploaded-sidebar-summary">
                <div className="lab-sidebar-title-row">
                  <span className="lab-sidebar-title">
                    <i className="fa-solid fa-screwdriver-wrench text-amber mr-2"></i>
                    Status Latihan Bebas
                  </span>
                  <span className="badge-count" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#D97706' }}>
                    Simulasi Edukasi
                  </span>
                </div>

                <div className="file-info-card">
                  <div className="file-icon-box">
                    <i className="fa-solid fa-file-image"></i>
                  </div>
                  <div className="file-details">
                    <strong className="file-name" title={uploadedFileName}>{uploadedFileName || 'gambar_kustom.png'}</strong>
                    <span className="file-sub">File dimuat ke Simulator Forensik</span>
                  </div>
                </div>

                <div className="forensic-quick-stats">
                  <div className="quick-stat-item">
                    <span className="stat-label">Pin Penandaan</span>
                    <strong className="stat-val text-indigo">{customMarkers.length} / 5 Area</strong>
                  </div>
                  <div className="quick-stat-item">
                    <span className="stat-label">Confidence AI</span>
                    <strong className="stat-val text-red">{detectionResult ? `${detectionResult.confidenceScore}%` : '88%'}</strong>
                  </div>
                </div>

                <div className="inspector-guide-box">
                  <div className="guide-title">
                    <i className="fa-solid fa-lightbulb text-amber mr-1"></i> Panduan Latihan:
                  </div>
                  <p>Gunakan <strong>Kanta Pembesar</strong> untuk memeriksa anomali iris &amp; rambut, serta <strong>Filter Spektral</strong> untuk distorsi frekuensi. Hasil telaah lengkap tersaji di bawah canvas.</p>
                </div>

                <button 
                  className="btn-lab btn-complete-inspection ready"
                  onClick={handleCompleteInspection}
                >
                  <i className="fa-solid fa-clipboard-check mr-1"></i> Selesaikan Latihan Bebas
                </button>

                <button 
                  className="btn-lab-ghost"
                  onClick={handleResetToCurated}
                  style={{ width: '100%', marginTop: '8px' }}
                >
                  <i className="fa-solid fa-arrow-left mr-1"></i> Kembali ke Kasus Terkurasi
                </button>
              </div>
            ) : (
              /* SIDEBAR KASUS TERKURASI (FIXED KEY) */
              <>
                <div className="lab-sidebar-title-row">
                  <span className="lab-sidebar-title">Target Artefak Visual</span>
                  <span className="badge-count">
                    {foundArtifacts.length} / {currentCase.artifacts.length} Ditemukan
                  </span>
                </div>
                
                <div className="artifacts-list">
                  {currentCase.artifacts.map((art) => {
                    const isFound = foundArtifacts.includes(art.id);
                    return isFound ? (
                      <div key={art.id} className="artifact-card artifact-red reveal-anim">
                        <div className="artifact-head">
                          <strong className="artifact-title text-red">
                            <i className={`${art.icon} mr-1`}></i> {art.title}
                          </strong>
                          <span className={`severity-badge ${art.severity}`}>{art.severityLabel}</span>
                        </div>
                        <p>{art.desc}</p>
                      </div>
                    ) : (
                      <div key={art.id} className="artifact-card locked-card">
                        <i className="fa-solid fa-lock mr-2"></i> Area Anomali #{art.id} Belum Ditemukan
                      </div>
                    );
                  })}

                  {foundArtifacts.length === currentCase.artifacts.length && (
                    <div className="success-check-card reveal-anim">
                      <i className="fa-regular fa-circle-check"></i>
                      <span>Semua target anomali Kasus #{currentCase.caseNum} berhasil teridentifikasi secara presisi!</span>
                    </div>
                  )}
                </div>

                {/* Banner Call to Action Latihan Bebas */}
                <div className="upload-prompt-card">
                  <div className="upload-prompt-icon">
                    <i className="fa-solid fa-cloud-arrow-up"></i>
                  </div>
                  <div className="upload-prompt-text">
                    <strong>Ingin uji gambar sendiri?</strong>
                    <p>Unggah file Anda ke <em>Mode Latihan Bebas</em> untuk simulasi inspeksi spektral interaktif.</p>
                  </div>
                  <button className="btn-upload-inline" onClick={() => fileInputRef.current?.click()}>
                    Uji Gambar Kustom
                  </button>
                </div>
                
                <button 
                  className={`btn-lab btn-complete-inspection ${foundArtifacts.length === currentCase.artifacts.length ? 'ready' : ''}`}
                  onClick={handleCompleteInspection}
                  disabled={foundArtifacts.length < currentCase.artifacts.length}
                >
                  <i className={`fa-solid ${foundArtifacts.length === currentCase.artifacts.length ? 'fa-clipboard-check' : 'fa-lock'} mr-1`}></i> 
                  {foundArtifacts.length === currentCase.artifacts.length ? 'Selesaikan Investigasi (+150 Gems)' : `Temukan Semua (${foundArtifacts.length}/${currentCase.artifacts.length})`}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BAGIAN BAWAH: PERNYATAAN HASIL DETEKSI FORENSIK GAMBAR                    */}
      {/* ========================================================================= */}
      {detectionResult && (
        <div className="full-width-detection-section reveal-anim" ref={detectionSectionRef}>
          <div className="panel detection-report-panel">
            
            {/* Header Laporan */}
            <div className="detection-report-header">
              <div className="report-header-left">
                <div className="report-badge">
                  <i className="fa-solid fa-shield-halved mr-1"></i>
                  {isCustomMode ? 'Laporan Simulasi Forensik Edukatif' : `Laporan Kasus #${currentCase.caseNum} (Fixed Key)`}
                </div>
                <h2 className="report-title">{detectionResult.verdictTitle}</h2>
                <div className="report-meta">
                  <span><i className="fa-regular fa-clock mr-1"></i> {detectionResult.analyzedAt}</span>
                  <span>•</span>
                  <span><i className="fa-regular fa-file-image mr-1"></i> {detectionResult.fileName}</span>
                  <span>•</span>
                  <span className="text-emerald"><i className="fa-solid fa-circle-check mr-1"></i> Forensic Rules v2.4</span>
                </div>
              </div>

              <div className="report-header-right">
                <div className="confidence-score-box">
                  <span className="score-caption">Skor Keyakinan Rekayasa</span>
                  <div className="score-main">
                    <strong className="score-num">{detectionResult.confidenceScore}%</strong>
                    <span className="score-tag">Sintetis / AI</span>
                  </div>
                  <div className="score-meter-bar">
                    <div className="meter-fill" style={{ width: `${detectionResult.confidenceScore}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ringkasan Kesimpulan */}
            <div className="detection-summary-box">
              <div className="summary-icon">
                <i className="fa-solid fa-microchip"></i>
              </div>
              <div className="summary-text">
                <strong>Ringkasan Forensik:</strong>
                <p>{detectionResult.summary}</p>
              </div>
            </div>

            {/* Daftar Kartu Pernyataan Deteksi */}
            <div className="statement-cards-section">
              <h3 className="section-label">
                <i className="fa-solid fa-list-check text-indigo mr-2"></i>
                Pernyataan Indikator &amp; Temuan Anomali:
              </h3>

              <div className="statements-grid">
                {detectionResult.statements.map((stmt) => (
                  <div key={stmt.id} className={`statement-card card-${stmt.severity}`}>
                    <div className="card-top-row">
                      <span className={`stmt-badge badge-${stmt.severity}`}>{stmt.badge}</span>
                      <i className={`${stmt.icon} stmt-type-icon`}></i>
                    </div>
                    <h4 className="card-title">{stmt.title}</h4>
                    <p className="card-statement">{stmt.statement}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Kotak Rekomendasi & Tindakan Pengguna */}
            <div className="bottom-rec-box">
              <div className="rec-box-head">
                <i className="fa-solid fa-shield-cat text-teal mr-2"></i>
                Rekomendasi Verifikasi &amp; Mitigasi:
              </div>
              <p>{detectionResult.recommendation}</p>
            </div>

            {/* Toolbar Aksi Laporan */}
            <div className="bottom-actions-toolbar">
              <button className="btn-bottom-action btn-copy" onClick={handleCopyReport}>
                <i className="fa-regular fa-copy mr-2"></i> Salin Ringkasan Laporan
              </button>
              {isCustomMode ? (
                <button className="btn-bottom-action btn-rescan" onClick={() => runSimulatedForensicAnalysis(uploadedFileName)}>
                  <i className="fa-solid fa-arrows-rotate mr-2"></i> Pindai Ulang Simulasi
                </button>
              ) : (
                <button className="btn-bottom-action btn-rescan" onClick={handleRandomCase}>
                  <i className="fa-solid fa-shuffle mr-2"></i> Beralih ke Kasus Lain
                </button>
              )}
              <button className="btn-bottom-action btn-change" onClick={() => fileInputRef.current?.click()}>
                <i className="fa-solid fa-arrow-up-from-bracket mr-2"></i> Mode Latihan Bebas (Upload)
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}