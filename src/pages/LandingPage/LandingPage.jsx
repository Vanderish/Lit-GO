import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar'; 
import './LandingPage.css';

export default function LandingPage() {
  const [state, setState] = useState({ radar: [0, 0, 0, 0], hasRadar: false, doneModules: [], badges: [] });
  const [toastMsg, setToastMsg] = useState(null);
  const [toastType, setToastType] = useState('info');
  
  // Accessibility controls state
  const [fontSize, setFontSizeState] = useState(16);
  const [isDyslexic, setIsDyslexic] = useState(false);
  const [isContrast, setIsContrast] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const carouselTrackRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadState();
    setIsDyslexic(document.body.classList.contains('font-dyslexic'));
    setIsContrast(document.body.classList.contains('high-contrast'));
  }, []);

  const loadState = () => {
    const s = localStorage.getItem('litgo_complete_v1');
    if (s) {
      try {
        setState(JSON.parse(s));
      } catch (e) {}
    }
  };

  const showToast = (msg, type = 'info') => {
    setToastMsg(msg);
    setToastType(type);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const openLabFromLanding = (labName) => {
    sessionStorage.setItem('open_sandbox_tab', labName);
    navigate('/dashboard#hub-sandbox');
  };

  const openRadarFromLanding = () => {
    sessionStorage.setItem('open_radar_modal', 'true');
    navigate('/dashboard#hub-radar');
  };

  const openModuleFromLanding = (modId) => {
    sessionStorage.setItem('open_module_id', modId.toString());
    navigate('/dashboard#hub-modules');
  };

  const scrollCarousel = (direction) => {
    if (carouselTrackRef.current) {
      const scrollAmount = 330;
      carouselTrackRef.current.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
  };

  const handleFontSizeValue = (val) => {
    let num = parseInt(val, 10) || 16;
    let size = 16;
    if (num >= 19) size = 20;
    else if (num >= 17) size = 18;
    else size = 16;

    setFontSizeState(size);
    document.documentElement.style.fontSize = size + 'px';
    document.body.style.fontSize = size + 'px';
    const label = size === 16 ? '16px (Normal)' : size === 18 ? '18px (Sedang)' : '20px (Besar)';
    showToast('Ukuran teks: ' + label, 'info');
  };

  const toggleDyslexia = () => {
    const next = !isDyslexic;
    setIsDyslexic(next);
    if (next) document.body.classList.add('font-dyslexic');
    else document.body.classList.remove('font-dyslexic');
    showToast(next ? 'Font ramah disleksia diaktifkan' : 'Font ramah disleksia dinonaktifkan', 'info');
  };

  const toggleContrast = () => {
    const next = !isContrast;
    setIsContrast(next);
    if (next) document.body.classList.add('high-contrast');
    else document.body.classList.remove('high-contrast');
    showToast(next ? 'Mode kontras tinggi diaktifkan' : 'Mode kontras tinggi dinonaktifkan', 'info');
  };

  const toggleTTS = () => {
    if (!('speechSynthesis' in window)) {
      showToast('Fitur Text-to-Speech tidak didukung browser kamu.', 'error');
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
      showToast('Membacakan ringkasan platform...', 'info');
    } else {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      showToast('Text-to-Speech dihentikan.', 'info');
    }
  };

  const doneModules = state.doneModules || [];
  const radar = state.radar || [0, 0, 0, 0];
  const hasRadar = state.hasRadar || false;

  return (
    <>
      {/* Background Layer */}
      <div className="bg-grid"></div>
      <div className="bg-glow"></div>
      <div className="bg-glow2"></div>

      {/* Navigation dari komponen terpisah */}
      <Navbar />

      {/* Toast Notification */}
      {toastMsg && (
        <div id="toast-container" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="toast" style={{ opacity: 1 }}>
            <span className="toast-icon">
              {toastType === 'success' ? <i className="fa-solid fa-circle-check text-emerald"></i> :
               toastType === 'amber' ? <i className="fa-solid fa-award text-amber"></i> :
               toastType === 'error' ? <i className="fa-solid fa-triangle-exclamation text-red"></i> :
               <i className="fa-solid fa-circle-info text-indigo"></i>}
            </span>
            <span>{toastMsg}</span>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main>
        {/* Hero Section */}
        <header className="hero">
          <div className="wrap">
            <div className="hero-grid">
              <div>
                <h1 className="hero-title">
                  Paham AI bukan cuma bisa <span className="accent">pakai</span>, tapi bisa <span className="accent">nilai</span>.
                </h1>
                <p className="hero-sub">
                  Lit-GO melatih kepekaan kritis terhadap kecerdasan buatan lewat simulasi nyata: kenali halusinasi, deteksi deepfake, dan susun prompt yang aman — semua berjalan langsung di browser kamu, tanpa server.
                </p>
                <div className="hero-actions">
                  <button className="btn-primary" onClick={() => openLabFromLanding('hallucination')}>
                    Coba Sandbox Lab &nbsp;→
                  </button>
                  <button
                    className="btn-secondary-ghost"
                    onClick={() => document.getElementById('section-modules')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Lihat Silabus
                  </button>
                </div>
                <div className="hero-stats">
                  <div>
                    <div className="stat-num">98%</div>
                    <div className="stat-label">responden tertarik pakai platform ini</div>
                  </div>
                  <div>
                    <div className="stat-num">6</div>
                    <div className="stat-label">modul + lab interaktif</div>
                  </div>
                  <div>
                    <div className="stat-num">100%</div>
                    <div className="stat-label">client-side, tanpa database</div>
                  </div>
                </div>
              </div>

              {/* Radar Card Preview */}
              <div className="radar-preview">
                <div className="radar-preview-head">
                  <h3>AI Readiness Radar</h3>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                    PRE&#8209;TEST
                  </span>
                </div>
                <div className="mascot-slot">[ ruang maskot — diisi kemudian ]</div>
                <div className="pillar-row">
                  <span className="pillar-name">Pemahaman Dasar</span>
                  <div className="pillar-bar-track">
                    <div className="pillar-bar-fill" id="lp-p1" style={{ width: `${radar[0]}%`, background: 'var(--indigo)' }}></div>
                  </div>
                  <span className="pillar-val" id="lp-p1-val">{hasRadar ? `${radar[0]}%` : '—'}</span>
                </div>
                <div className="pillar-row">
                  <span className="pillar-name">Etika & Keamanan</span>
                  <div className="pillar-bar-track">
                    <div className="pillar-bar-fill" id="lp-p2" style={{ width: `${radar[1]}%`, background: 'var(--teal)' }}></div>
                  </div>
                  <span className="pillar-val" id="lp-p2-val">{hasRadar ? `${radar[1]}%` : '—'}</span>
                </div>
                <div className="pillar-row">
                  <span className="pillar-name">Prompting</span>
                  <div className="pillar-bar-track">
                    <div className="pillar-bar-fill" id="lp-p3" style={{ width: `${radar[2]}%`, background: 'var(--amber)' }}></div>
                  </div>
                  <span className="pillar-val" id="lp-p3-val">{hasRadar ? `${radar[2]}%` : '—'}</span>
                </div>
                <div className="pillar-row">
                  <span className="pillar-name">Critical Thinking</span>
                  <div className="pillar-bar-track">
                    <div className="pillar-bar-fill" id="lp-p4" style={{ width: `${radar[3]}%`, background: 'var(--emerald)' }}></div>
                  </div>
                  <span className="pillar-val" id="lp-p4-val">{hasRadar ? `${radar[3]}%` : '—'}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Bento Sandbox Hub Showcase */}
        <section className="section" id="section-labs">
          <div className="wrap">
            <div className="section-head">
              <div className="section-tag">Sandbox Hub</div>
              <div className="section-title">Lima lab, satu kebiasaan baru: berpikir sebelum percaya.</div>
              <div className="section-desc">Bukan kuis hafalan — tiap lab mensimulasikan situasi nyata yang bikin kamu berlatih menilai output AI dengan mata kritis.</div>
            </div>
            <div className="bento">
              <div className="bento-item b1" onClick={() => openLabFromLanding('hallucination')}>
                <div className="lab-icon" style={{ background: 'rgba(59,130,246,0.1)', color: 'var(--indigo)' }}><i className="fa-solid fa-bug"></i></div>
                <div className="lab-title">Hallucination & Bias Breaker</div>
                <div className="lab-desc">Text-highlighting sandbox — klik kalimat yang kamu curigai keliru. Sistem menghitung Fact Score real-time dengan penanda hijau (benar) dan merah (halusinasi), melatihmu membaca AI dengan skeptis yang sehat.</div>
                <span className="lab-tag">Fondasi AI</span>
              </div>
              <div className="bento-item b2" onClick={() => openLabFromLanding('deepfake')}>
                <div className="lab-icon" style={{ background: 'rgba(245,158,11,0.12)', color: 'var(--amber)' }}><i className="fa-solid fa-magnifying-glass"></i></div>
                <div className="lab-title">Deepfake Detective</div>
                <div className="lab-desc">Magnifying glass dengan zoom untuk menyorot artefak rekayasa AI: pencahayaan janggal, anatomi jari, tekstur kulit terlalu halus.</div>
                <span className="lab-tag">Deteksi Deepfake</span>
              </div>
              <div className="bento-item b3" onClick={() => openLabFromLanding('dilemma')}>
                <div className="lab-icon" style={{ background: 'rgba(16,185,129,0.12)', color: 'var(--emerald)' }}><i className="fa-solid fa-scale-balanced"></i></div>
                <div className="lab-title">AI Ethical Dilemma</div>
                <div className="lab-desc">Studi kasus bercabang — tiap keputusan menggeser tiga indikator: Risiko Hak Cipta, Privasi Data, dan Integritas Akademik.</div>
                <span className="lab-tag">Studi Etika</span>
              </div>
              <div className="bento-item b4" onClick={() => openLabFromLanding('prompt')}>
                <div className="lab-icon" style={{ background: 'rgba(20,184,166,0.12)', color: 'var(--teal)' }}><i className="fa-solid fa-terminal"></i></div>
                <div className="lab-title">Live Prompt Safety Lab</div>
                <div className="lab-desc">Split-screen analyzer mewarnai kata berisiko (merah) dan konteks jelas (hijau), menghitung Safety & Quality Score.</div>
                <span className="lab-tag">Prompt Safety</span>
              </div>
              <div className="bento-item b5" onClick={openRadarFromLanding}>
                <div className="lab-icon" style={{ background: 'rgba(30,41,59,0.07)', color: 'var(--navy)' }}><i className="fa-solid fa-chart-line"></i></div>
                <div className="lab-title">AI Readiness Radar</div>
                <div className="lab-desc">Asesmen 8 pertanyaan di awal dan akhir belajar, divisualisasikan sebagai grafik radar 4 pilar — supaya progres terlihat, bukan cuma dirasakan.</div>
                <span className="lab-tag">Pre &amp; Post Test</span>
              </div>
            </div>
          </div>
        </section>

        {/* Modules Timeline Section */}
        <section className="section-tight" id="section-modules">
          <div className="wrap">
            <div className="section-head">
              <div className="section-tag">Silabus</div>
              <div className="section-title">Enam modul, dari dasar sampai bertahan di era AI.</div>
              <div className="section-desc">Alur belajar berurutan — tiap modul membuka lab yang relevan begitu materinya selesai.</div>
            </div>
            <div className="module-carousel-container">
              <button className="carousel-arrow prev" onClick={() => scrollCarousel(-1)} title="Sebelumnya">
                <i className="fa-solid fa-chevron-left"></i>
              </button>

              <div className="module-carousel-track" ref={carouselTrackRef} id="landing-modules-track">
                {/* Modul 1 */}
                <div className={`mod-carousel-card mod-card-theme-1 info-only ${doneModules.includes(1) ? 'done-card' : ''}`} onClick={() => openModuleFromLanding(1)}>
                  <div className="mod-card-level">1</div>
                  <div className="mod-card-icon" style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' }}>
                    <i className="fa-solid fa-brain"></i>
                  </div>
                  <div className="mod-card-title">Kenalan dengan "Otak" AI</div>
                  <div className="mod-card-desc">Definisi AI, sejarah singkat, mitos vs fakta, keterbatasan &amp; halusinasi.</div>
                  <div className="mod-card-footer">
                    <div className="mod-info-tag"><i className="fa-solid fa-book-open mr-1"></i> Modul Silabus</div>
                  </div>
                </div>

                {/* Modul 2 */}
                <div className={`mod-carousel-card mod-card-theme-2 info-only ${doneModules.includes(2) ? 'done-card' : ''}`} onClick={() => openModuleFromLanding(2)}>
                  <div className="mod-card-level">2</div>
                  <div className="mod-card-icon" style={{ background: 'linear-gradient(135deg, #0EA5E9, #0284C7)' }}>
                    <i className="fa-solid fa-shield-halved"></i>
                  </div>
                  <div className="mod-card-title">Kompas Etika &amp; Privasi</div>
                  <div className="mod-card-desc">Hak cipta, plagiarisme, bahaya data pribadi, bias AI &amp; deepfake.</div>
                  <div className="mod-card-footer">
                    <div className="mod-info-tag"><i className="fa-solid fa-book-open mr-1"></i> Modul Silabus</div>
                  </div>
                </div>

                {/* Modul 3 */}
                <div className={`mod-carousel-card mod-card-theme-3 info-only ${doneModules.includes(3) ? 'done-card' : ''}`} onClick={() => openModuleFromLanding(3)}>
                  <div className="mod-card-level">3</div>
                  <div className="mod-card-icon" style={{ background: 'linear-gradient(135deg, #6366F1, #4F46E5)' }}>
                    <i className="fa-solid fa-terminal"></i>
                  </div>
                  <div className="mod-card-title">Seni Berbicara dengan Mesin</div>
                  <div className="mod-card-desc">Anatomi prompt: konteks, instruksi, format, persona &amp; few-shot.</div>
                  <div className="mod-card-footer">
                    <div className="mod-info-tag"><i className="fa-solid fa-book-open mr-1"></i> Modul Silabus</div>
                  </div>
                </div>

                {/* Modul 4 */}
                <div className={`mod-carousel-card mod-card-theme-4 info-only ${doneModules.includes(4) ? 'done-card' : ''}`} onClick={() => openModuleFromLanding(4)}>
                  <div className="mod-card-level">4</div>
                  <div className="mod-card-icon" style={{ background: 'linear-gradient(135deg, #EC4899, #F43F5E)' }}>
                    <i className="fa-solid fa-rocket"></i>
                  </div>
                  <div className="mod-card-title">Asisten Produktivitas AI</div>
                  <div className="mod-card-desc">Riset anti-hoaks, AI sebagai tutor pribadi, &amp; email profesional.</div>
                  <div className="mod-card-footer">
                    <div className="mod-info-tag"><i className="fa-solid fa-book-open mr-1"></i> Modul Silabus</div>
                  </div>
                </div>

                {/* Modul 5 */}
                <div className={`mod-carousel-card mod-card-theme-5 info-only ${doneModules.includes(5) ? 'done-card' : ''}`} onClick={() => openModuleFromLanding(5)}>
                  <div className="mod-card-level">5</div>
                  <div className="mod-card-icon" style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>
                    <i className="fa-solid fa-palette"></i>
                  </div>
                  <div className="mod-card-title">Eksplorasi AI Kreatif</div>
                  <div className="mod-card-desc">Etika text-to-image/video, hak cipta karya visual, &amp; visual prompt.</div>
                  <div className="mod-card-footer">
                    <div className="mod-info-tag"><i className="fa-solid fa-book-open mr-1"></i> Modul Silabus</div>
                  </div>
                </div>

                {/* Modul 6 */}
                <div className={`mod-carousel-card mod-card-theme-6 info-only ${doneModules.includes(6) ? 'done-card' : ''}`} onClick={() => openModuleFromLanding(6)}>
                  <div className="mod-card-level">6</div>
                  <div className="mod-card-icon" style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)' }}>
                    <i className="fa-solid fa-graduation-cap"></i>
                  </div>
                  <div className="mod-card-title">Bertahan di Era AI</div>
                  <div className="mod-card-desc">Keterampilan tak tergantikan — empati, critical thinking &amp; karier.</div>
                  <div className="mod-card-footer">
                    <div className="mod-info-tag"><i className="fa-solid fa-book-open mr-1"></i> Modul Silabus</div>
                  </div>
                </div>
              </div>

              <button className="carousel-arrow next" onClick={() => scrollCarousel(1)} title="Berikutnya">
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </section>

        {/* Gamification / Rewards Showcase */}
        <section className="section" id="section-gamifikasi">
          <div className="wrap">
            <div className="section-head">
              <div className="section-tag">Reward System</div>
              <div className="section-title">Kumpulkan lima badge, cetak satu sertifikat.</div>
              <div className="section-desc">Lulus kuis minimum 80% membuka E-Badge yang tersimpan di perangkatmu.</div>
            </div>
            <div className="badge-strip">
              <div className="badge-card">
                <div className="badge-emoji" style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                  <i className="fa-solid fa-award"></i>
                </div>
                <div className="badge-name">Pionir AI</div>
                <div className="badge-req">Asesmen Radar &amp; Fondasi AI</div>
                <div className="badge-desc">Lencana pembuka atas keberhasilan menyelesaikan asesmen awal dan memahami prinsip fondasi kecerdasan buatan.</div>
              </div>
              <div className="badge-card">
                <div className="badge-emoji" style={{ background: 'linear-gradient(135deg, #0EA5E9, #0284C7)', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                  <i className="fa-solid fa-shield-halved"></i>
                </div>
                <div className="badge-name">Penjaga Etika</div>
                <div className="badge-req">Deteksi Deepfake &amp; Etika</div>
                <div className="badge-desc">Lencana kehormatan atas pemahaman etika data, privasi, serta kecakapan mendeteksi rekayasa deepfake.</div>
              </div>
              <div className="badge-card">
                <div className="badge-emoji" style={{ background: 'linear-gradient(135deg, #6366F1, #4F46E5)', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                  <i className="fa-solid fa-feather-pointed"></i>
                </div>
                <div className="badge-name">Master Prompt</div>
                <div className="badge-req">Prompt Safety &amp; Komunikasi</div>
                <div className="badge-desc">Lencana keahlian menyusun instruksi prompt yang aman, terstruktur, relevan, serta bebas dari bias.</div>
              </div>
              <div className="badge-card">
                <div className="badge-emoji" style={{ background: 'linear-gradient(135deg, #EC4899, #F43F5E)', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                  <i className="fa-solid fa-rocket"></i>
                </div>
                <div className="badge-name">Inovator Produktif</div>
                <div className="badge-req">Asistensi &amp; Workflow Kreatif</div>
                <div className="badge-desc">Lencana kreativitas dalam memanfaatkan AI secara efektif untuk efisiensi riset, tugas, dan alur kerja harian.</div>
              </div>
              <div className="badge-card">
                <div className="badge-emoji" style={{ background: 'linear-gradient(135deg, #10B981, #059669)', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                  <i className="fa-solid fa-graduation-cap"></i>
                </div>
                <div className="badge-name">Cendekia Digital</div>
                <div className="badge-req">Sertifikasi &amp; Kelulusan Akhir</div>
                <div className="badge-desc">Lencana kualifikasi tertinggi atas penyelesaian seluruh kurikulum etika AI dan kelulusan evaluasi akhir.</div>
              </div>
            </div>
            <div className="cert-section" style={{ marginTop: '36px' }}>
              <div>
                <div className="section-tag">Sertifikat Instan</div>
                <div className="section-title" style={{ fontSize: '1.5rem', marginTop: '8px' }}>Semua badge terkumpul? Nama kamu, langsung jadi PDF.</div>
                <p className="section-desc">Engine html2canvas &amp; jsPDF merender template sertifikat menjadi PDF sepenuhnya di browser — tanpa upload, tanpa server.</p>
                <button className="btn-primary" style={{ marginTop: '20px' }} onClick={() => navigate('/dashboard#hub-rewards')}>
                  Lihat Koleksi Badge Saya
                </button>
              </div>
              <div className="cert-mock">
                <div className="cert-label">Sertifikat Kelulusan</div>
                <div className="cert-name">Nama Peserta</div>
                <div className="cert-sub">telah menyelesaikan seluruh modul Lit-GO</div>
                <div className="cert-badges">
                  <span><i className="fa-solid fa-medal"></i></span>
                  <span><i className="fa-solid fa-shield-halved"></i></span>
                  <span><i className="fa-solid fa-pen-nib"></i></span>
                  <span><i className="fa-solid fa-rocket"></i></span>
                  <span><i className="fa-solid fa-graduation-cap"></i></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Accessibility Showcase Section */}
        <section className="section" id="section-akses">
          <div className="wrap">
            <div className="a11y-section">
              <div className="a11y-grid">
                <div>
                  <div className="a11y-title">Dibaca semua orang, bukan cuma sebagian.</div>
                  <div className="a11y-desc">Floating panel aksesibilitas menyertai kamu di seluruh halaman — tanpa perlu keluar dari materi yang sedang dibaca.</div>
                </div>
                <div className="a11y-toggle-list">
                  <div className="a11y-toggle" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className="a11y-toggle-label"><div className="a11y-icon-chip">Aa</div>Ukuran Teks</div>
                      <span className="a11y-size-val" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--teal)' }}>
                        {fontSize}px
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '2px 4px 0' }}>
                      <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>16px</span>
                      <input
                        type="range"
                        min="16"
                        max="20"
                        step="2"
                        value={fontSize}
                        onChange={(e) => handleFontSizeValue(e.target.value)}
                        className="a11y-size-slider"
                        style={{ flex: 1, accentColor: 'var(--teal)', cursor: 'pointer' }}
                      />
                      <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>20px</span>
                    </div>
                  </div>
                  <div className="a11y-toggle">
                    <div className="a11y-toggle-label"><div className="a11y-icon-chip"><i className="fa-solid fa-wand-magic-sparkles"></i></div>Font Ramah Disleksia</div>
                    <button className={`switch-toggle a11y-switch-dyslexia ${isDyslexic ? 'on' : ''}`} onClick={toggleDyslexia}></button>
                  </div>
                  <div className="a11y-toggle">
                    <div className="a11y-toggle-label"><div className="a11y-icon-chip"><i className="fa-solid fa-circle-half-stroke"></i></div>Kontras Tinggi</div>
                    <button className={`switch-toggle a11y-switch-contrast ${isContrast ? 'on' : ''}`} onClick={toggleContrast}></button>
                  </div>
                  <div className="a11y-toggle">
                    <div className="a11y-toggle-label"><div className="a11y-icon-chip"><i className="fa-solid fa-volume-high"></i></div>Text-to-Speech</div>
                    <button className={`switch-toggle a11y-switch-tts ${isSpeaking ? 'on' : ''}`} onClick={toggleTTS}></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture Flow Section */}
        <section className="section-tight">
          <div className="wrap">
            <div className="section-head">
              <div className="section-tag">Arsitektur</div>
              <div className="section-title">Ringan sejak dari fondasi.</div>
              <div className="section-desc">Progres, skor, dan badge tersimpan di localStorage — tidak ada data yang meninggalkan perangkatmu.</div>
            </div>
            <div className="flow-strip">
              <div className="flow-node"><b>data.json</b> · silabus & bank kuis</div><span className="flow-arrow">→</span>
              <div className="flow-node"><b>Next.js SSG</b> · render statis</div><span className="flow-arrow">→</span>
              <div className="flow-node"><b>localStorage</b> · progres & badge</div><span className="flow-arrow">→</span>
              <div className="flow-node"><b>html2canvas + jsPDF</b> · sertifikat</div><span className="flow-arrow">→</span>
              <div className="flow-node"><b>Vercel / Netlify</b> · deploy</div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="wrap footer-container">
          <div className="footer-grid">
            <div className="footer-brand-col">
              <div className="footer-logo">
                <span className="footer-logo-text">Lit<span>-GO</span></span>
              </div>
              <p className="footer-mission">
                Platform Edukasi Inklusif Literasi &amp; Etika Kecerdasan Buatan (AI) untuk Komunitas Digital Indonesia.
              </p>
            </div>

            <div className="footer-nav-col">
              <div className="footer-col-title">Navigasi Platform</div>
              <ul className="footer-links">
                <li><a href="/">Halaman Utama</a></li>
                <li><a href="/dashboard#hub-radar">Radar Asesmen Mandiri</a></li>
                <li><a href="/dashboard#hub-modules">Modul Learning Path</a></li>
                <li><a href="/dashboard#hub-sandbox">Lab Interaktif AI</a></li>
                <li><a href="/dashboard#hub-rewards">Sertifikat &amp; E-Badge</a></li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <div className="footer-col-title">Aksesibilitas Inklusif</div>
              <ul className="footer-links">
                <li><a href="#section-akses" onClick={() => handleFontSizeValue(18)}>Ukuran Teks (16-20px)</a></li>
                <li><a href="#section-akses" onClick={toggleDyslexia}>Font Ramah Disleksia</a></li>
                <li><a href="#section-akses" onClick={toggleContrast}>Mode Kontras Tinggi</a></li>
                <li><a href="#section-akses" onClick={toggleTTS}>Text-to-Speech (TTS)</a></li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <div className="footer-col-title">Teknologi &amp; Privasi</div>
              <ul className="footer-links">
                <li>100% Client-Side</li>
                <li>HTML5 LocalStorage</li>
                <li>Zero Data Leak</li>
                <li>Static Web (SSG)</li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <div className="footer-copy">
              © 2026 <strong>Lit-GO</strong> — Building Smarter Communities Through Digital Learning.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}