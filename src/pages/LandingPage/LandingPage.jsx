import { useState, useRef } from 'react';
import Navbar from '../../components/Navbar/Navbar'; 
import CertificateModal from '../../components/CertificateModal/CertificateModal';
import AccessibilityPanel from '../../components/AccessibilityPanel';
import { useProgress } from '../../context/ProgressContext';
import './LandingPage.css';

export default function LandingPage() {
  const {
    state,
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
    toastMsg,
    toastType,
    handleReset,
  } = useProgress();

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [userName] = useState(() => {
    try {
      const u = localStorage.getItem('user_data');
      if (u) {
        const parsed = JSON.parse(u);
        if (parsed?.name) return parsed.name;
      }
    } catch {
      // ignore JSON parse error
    }
    return '';
  });

  const carouselTrackRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (carouselTrackRef.current) {
      const scrollAmount = 330;
      carouselTrackRef.current.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
  };

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
                  {isEnglish ? (
                    <>Understand AI, not just <span className="accent">using it</span>, but <span className="accent">evaluating it</span>.</>
                  ) : (
                    <>Paham AI bukan cuma bisa <span className="accent">pakai</span>, tapi bisa <span className="accent">nilai</span>.</>
                  )}
                </h1>
                <p className="hero-sub">
                  {isEnglish
                    ? 'Lit-GO trains critical awareness of artificial intelligence through real simulations: identify hallucinations, detect deepfakes, and write safe prompts, all running client-side in your browser.'
                    : 'Lit-GO melatih kepekaan kritis terhadap kecerdasan buatan lewat simulasi nyata: kenali halusinasi, deteksi deepfake, dan susun prompt yang aman, semua berjalan langsung di browser kamu tanpa server.'}
                </p>
                <div className="hero-actions">
                  <button
                    className="btn-primary"
                    onClick={() => document.getElementById('section-labs')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {isEnglish ? 'Explore Sandbox Lab ↓' : 'Jelajahi Sandbox Lab ↓'}
                  </button>
                  <button
                    className="btn-secondary-ghost"
                    onClick={() => document.getElementById('section-modules')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {isEnglish ? 'View Syllabus' : 'Lihat Silabus'}
                  </button>
                </div>
                <div className="hero-stats">
                  <div>
                    <div className="stat-num">98%</div>
                    <div className="stat-label">{isEnglish ? 'respondents interested in this platform' : 'responden tertarik pakai platform ini'}</div>
                  </div>
                  <div>
                    <div className="stat-num">6</div>
                    <div className="stat-label">{isEnglish ? 'modules + interactive labs' : 'modul + lab interaktif'}</div>
                  </div>
                  <div>
                    <div className="stat-num">100%</div>
                    <div className="stat-label">{isEnglish ? 'client-side, no database' : 'client-side, tanpa database'}</div>
                  </div>
                </div>
              </div>

              {/* Radar Card Showcase (Kosong / Strip jika belum login & mengisi Pre-test) */}
              <div className="radar-preview">
                <div className="radar-preview-head">
                  <h3>AI Readiness Radar</h3>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                    PRE&#8209;TEST
                  </span>
                </div>
                <div className="mascot-slot">[ ruang maskot — diisi kemudian ]</div>
                <div className="pillar-row">
                  <span className="pillar-name">{isEnglish ? 'Foundational Knowledge' : 'Pemahaman Dasar'}</span>
                  <div className="pillar-bar-track">
                    <div className="pillar-bar-fill" id="lp-p1" style={{ width: `${hasRadar ? radar[0] : 0}%`, background: 'var(--indigo)' }}></div>
                  </div>
                  <span className="pillar-val" id="lp-p1-val">{hasRadar ? `${radar[0]}%` : '—'}</span>
                </div>
                <div className="pillar-row">
                  <span className="pillar-name">{isEnglish ? 'Ethics & Security' : 'Etika & Keamanan'}</span>
                  <div className="pillar-bar-track">
                    <div className="pillar-bar-fill" id="lp-p2" style={{ width: `${hasRadar ? radar[1] : 0}%`, background: 'var(--teal)' }}></div>
                  </div>
                  <span className="pillar-val" id="lp-p2-val">{hasRadar ? `${radar[1]}%` : '—'}</span>
                </div>
                <div className="pillar-row">
                  <span className="pillar-name">{isEnglish ? 'Prompt Engineering' : 'Prompting'}</span>
                  <div className="pillar-bar-track">
                    <div className="pillar-bar-fill" id="lp-p3" style={{ width: `${hasRadar ? radar[2] : 0}%`, background: 'var(--amber)' }}></div>
                  </div>
                  <span className="pillar-val" id="lp-p3-val">{hasRadar ? `${radar[2]}%` : '—'}</span>
                </div>
                <div className="pillar-row">
                  <span className="pillar-name">{isEnglish ? 'Critical Thinking' : 'Critical Thinking'}</span>
                  <div className="pillar-bar-track">
                    <div className="pillar-bar-fill" id="lp-p4" style={{ width: `${hasRadar ? radar[3] : 0}%`, background: 'var(--emerald)' }}></div>
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
              <div className="section-title">
                {isEnglish ? 'Five labs, one new habit: think before trusting.' : 'Lima lab, satu kebiasaan baru: berpikir sebelum percaya.'}
              </div>
              <div className="section-desc">
                {isEnglish
                  ? 'Not memorization quizzes, each lab simulates real-world scenarios to help you assess AI output critically.'
                  : 'Bukan kuis hafalan, tiap lab mensimulasikan situasi nyata yang membuatmu berlatih menilai output AI secara kritis.'}
              </div>
            </div>
            <div className="bento">
              <div className="bento-item b1">
                <div className="lab-icon" style={{ background: 'rgba(59,130,246,0.1)', color: 'var(--indigo)' }}><i className="fa-solid fa-quote-left"></i></div>
                <div className="lab-title">Bias Breaker</div>
                <div className="lab-desc">
                  {isEnglish
                    ? 'Text-highlighting sandbox, click suspicious phrases. Real-time Fact Score highlights accurate claims (green) and hallucinations (red).'
                    : 'Text-highlighting sandbox, klik kalimat yang kamu curigai keliru. Sistem menghitung Fact Score real-time dengan penanda hijau (benar) dan merah (halusinasi), melatihmu membaca AI dengan skeptis yang sehat.'}
                </div>
                <span className="lab-tag">{isEnglish ? 'AI Foundations' : 'Fondasi AI'}</span>
              </div>
              <div className="bento-item b2">
                <div className="lab-icon" style={{ background: 'rgba(245,158,11,0.12)', color: 'var(--amber)' }}><i className="fa-solid fa-eye"></i></div>
                <div className="lab-title">Deepfake Detective</div>
                <div className="lab-desc">
                  {isEnglish
                    ? 'Magnifying lens to inspect AI manipulation artifacts: uncanny lighting, finger anatomy, over-smoothed skin textures.'
                    : 'Magnifying glass dengan zoom untuk menyorot artefak rekayasa AI: pencahayaan janggal, anatomi jari, tekstur kulit terlalu halus.'}
                </div>
                <span className="lab-tag">{isEnglish ? 'Deepfake Detection' : 'Deteksi Deepfake'}</span>
              </div>
              <div className="bento-item b3">
                <div className="lab-icon" style={{ background: 'rgba(16,185,129,0.12)', color: 'var(--emerald)' }}><i className="fa-solid fa-scale-balanced"></i></div>
                <div className="lab-title">Ethical Dilemma</div>
                <div className="lab-desc">
                  {isEnglish
                    ? 'Branching case studies, choices impact Copyright Risk, Data Privacy, and Academic Integrity.'
                    : 'Studi kasus bercabang, tiap keputusan menggeser tiga indikator: Risiko Hak Cipta, Privasi Data, dan Integritas Akademik.'}
                </div>
                <span className="lab-tag">{isEnglish ? 'Ethics Study' : 'Studi Etika'}</span>
              </div>
              <div className="bento-item b4">
                <div className="lab-icon" style={{ background: 'rgba(20,184,166,0.12)', color: 'var(--teal)' }}><i className="fa-solid fa-code"></i></div>
                <div className="lab-title">Live Prompt Safety Lab</div>
                <div className="lab-desc">
                  {isEnglish
                    ? 'Split-screen analyzer highlighting risky keywords (red) vs clear context (green) with safety score.'
                    : 'Split-screen analyzer mewarnai kata berisiko (merah) dan konteks jelas (hijau), menghitung Safety & Quality Score.'}
                </div>
                <span className="lab-tag">Prompt Safety</span>
              </div>
              <div className="bento-item b5">
                <div className="lab-icon" style={{ background: 'rgba(30,41,59,0.07)', color: 'var(--navy)' }}><i className="fa-solid fa-chart-pie"></i></div>
                <div className="lab-title">AI Readiness Radar</div>
                <div className="lab-desc">
                  {isEnglish
                    ? '8-question pre & post assessment visualized on a 4-pillar radar chart to make progress visible.'
                    : 'Asesmen 8 pertanyaan di awal dan akhir belajar, divisualisasikan sebagai grafik radar 4 pilar agar progres terlihat nyata.'}
                </div>
                <span className="lab-tag">Pre &amp; Post Test</span>
              </div>
            </div>
          </div>
        </section>

        {/* Modules Timeline Section */}
        <section className="section-tight" id="section-modules">
          <div className="wrap">
            <div className="section-head">
              <div className="section-tag">{isEnglish ? 'Syllabus' : 'Silabus'}</div>
              <div className="section-title">
                {isEnglish ? 'Six modules, from foundations to thriving in the AI era.' : 'Enam modul, dari dasar sampai bertahan di era AI.'}
              </div>
              <div className="section-desc">
                {isEnglish ? 'Sequential learning path, each module unlocks relevant sandbox labs upon completion.' : 'Alur belajar berurutan, tiap modul membuka lab yang relevan begitu materinya selesai.'}
              </div>
            </div>
            <div className="module-carousel-container">
              <button className="carousel-arrow prev" onClick={() => scrollCarousel(-1)} title="Sebelumnya">
                <i className="fa-solid fa-chevron-left"></i>
              </button>

              <div className="module-carousel-track" ref={carouselTrackRef} id="landing-modules-track">
                {/* Modul 1 */}
                <div className={`mod-carousel-card mod-card-theme-1 info-only`}>
                  <div className="mod-card-level">1</div>
                  <div className="mod-card-icon" style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' }}>
                    <i className="fa-solid fa-brain"></i>
                  </div>
                  <div className="mod-card-title">{isEnglish ? 'Understanding AI "Brain"' : 'Kenalan dengan "Otak" AI'}</div>
                  <div className="mod-card-desc">{isEnglish ? '4 steps: interactive story, matching game, Tebak Gambar AI, bug hunter.' : '4 Langkah: story interaktif, card matching, Tebak Gambar AI, bug hunter.'}</div>
                </div>

                {/* Modul 2 */}
                <div className={`mod-carousel-card mod-card-theme-2 info-only`}>
                  <div className="mod-card-level">2</div>
                  <div className="mod-card-icon" style={{ background: 'linear-gradient(135deg, #0EA5E9, #0284C7)' }}>
                    <i className="fa-solid fa-shield-halved"></i>
                  </div>
                  <div className="mod-card-title">{isEnglish ? 'Ethics & Privacy Compass' : 'Kompas Etika & Privasi'}</div>
                  <div className="mod-card-desc">{isEnglish ? '4 steps: data swipe shredder, Tebak Gambar Deepfake, RPG choice tree, watermark studio.' : '4 Langkah: data swipe bin, Tebak Gambar Deepfake, RPG choice, watermark studio.'}</div>
                </div>

                {/* Modul 3 */}
                <div className={`mod-carousel-card mod-card-theme-3 info-only`}>
                  <div className="mod-card-level">3</div>
                  <div className="mod-card-icon" style={{ background: 'linear-gradient(135deg, #6366F1, #4F46E5)' }}>
                    <i className="fa-solid fa-terminal"></i>
                  </div>
                  <div className="mod-card-title">{isEnglish ? 'Art of Talking to Machines' : 'Seni Berbicara dengan Mesin'}</div>
                  <div className="mod-card-desc">{isEnglish ? '4 steps: 4-block puzzle, Tebak Gambar Prompting, terminal auditor, prompt repair.' : '4 Langkah: 4-block puzzle, Tebak Gambar Prompting, terminal auditor, prompt repair.'}</div>
                </div>

                {/* Modul 4 */}
                <div className={`mod-carousel-card mod-card-theme-4 info-only`}>
                  <div className="mod-card-level">4</div>
                  <div className="mod-card-icon" style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)' }}>
                    <i className="fa-solid fa-microscope"></i>
                  </div>
                  <div className="mod-card-title">{isEnglish ? 'AI Detective in Daily Life' : 'Detektif AI di Kehidupan'}</div>
                  <div className="mod-card-desc">{isEnglish ? '4 steps: 3-column sort, Tebak Gambar Bot, timeline auditor, claim verification.' : '4 Langkah: 3-column sort, Tebak Gambar Bot, timeline auditor, klaim verifikasi.'}</div>
                </div>

                {/* Modul 5 */}
                <div className={`mod-carousel-card mod-card-theme-5 info-only`}>
                  <div className="mod-card-level">5</div>
                  <div className="mod-card-icon" style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>
                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                  </div>
                  <div className="mod-card-title">{isEnglish ? 'Work Smarter with AI' : 'Bekerja Cerdas Bersama AI'}</div>
                  <div className="mod-card-desc">{isEnglish ? '4 steps: flashcard tool, Tebak Gambar Workflow, human auditor, SOP builder.' : '4 Langkah: flashcard tool, Tebak Gambar Workflow, human auditor, SOP builder.'}</div>
                </div>

                {/* Modul 6 */}
                <div className={`mod-carousel-card mod-card-theme-6 info-only`}>
                  <div className="mod-card-level">6</div>
                  <div className="mod-card-icon" style={{ background: 'linear-gradient(135deg, #EC4899, #BE185D)' }}>
                    <i className="fa-solid fa-compass"></i>
                  </div>
                  <div className="mod-card-title">{isEnglish ? 'Future & Survival in AI Era' : 'Masa Depan & Bertahan di Era AI'}</div>
                  <div className="mod-card-desc">{isEnglish ? '4 steps: matrix sort, Tebak Gambar Job, manifesto canvas, final challenge.' : '4 Langkah: matrix sort, Tebak Gambar Job, manifesto canvas, final challenge.'}</div>
                </div>
              </div>

              <button className="carousel-arrow next" onClick={() => scrollCarousel(1)} title="Selanjutnya">
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </section>

        {/* Gamification & Badges Showcase */}
        <section className="section" id="section-gamifikasi">
          <div className="wrap">
            <div className="section-head">
              <div className="section-tag">{isEnglish ? 'Achievement Badges' : 'Lencana Pencapaian'}</div>
              <div className="section-title">
                {isEnglish ? 'Collect five badges, print one certificate.' : 'Kumpulkan lima badge, cetak satu sertifikat.'}
              </div>
              <div className="section-desc">
                {isEnglish
                  ? 'Each badge represents mastery of a specific skill, complete with unlock criteria and direct evaluation.'
                  : 'Tiap badge mewakili penguasaan satu kecakapan spesifik, lengkap dengan syarat perolehan dan evaluasi langsung.'}
              </div>
            </div>

            <div className="badge-strip">
              <div className="badge-card">
                <div className="badge-emoji" style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                  <i className="fa-solid fa-award"></i>
                </div>
                <div className="badge-name">{isEnglish ? 'AI Pioneer' : 'Pionir AI'}</div>
                <div className="badge-req">{isEnglish ? 'Radar & AI Foundations' : 'Asesmen Radar & Fondasi AI'}</div>
                <div className="badge-desc">{isEnglish ? 'Introductory badge for completing initial assessment and foundational concepts.' : 'Lencana pembuka atas keberhasilan menyelesaikan asesmen awal dan memahami prinsip fondasi.'}</div>
              </div>
              <div className="badge-card">
                <div className="badge-emoji" style={{ background: 'linear-gradient(135deg, #0EA5E9, #0284C7)', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                  <i className="fa-solid fa-shield-halved"></i>
                </div>
                <div className="badge-name">{isEnglish ? 'Ethics Guardian' : 'Penjaga Etika'}</div>
                <div className="badge-req">{isEnglish ? 'Deepfake & Ethics' : 'Deteksi Deepfake & Etika'}</div>
                <div className="badge-desc">{isEnglish ? 'Honor badge for data ethics, privacy, and deepfake detection skills.' : 'Lencana kehormatan atas pemahaman etika data, privasi, serta kecakapan mendeteksi deepfake.'}</div>
              </div>
              <div className="badge-card">
                <div className="badge-emoji" style={{ background: 'linear-gradient(135deg, #6366F1, #4F46E5)', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                  <i className="fa-solid fa-feather-pointed"></i>
                </div>
                <div className="badge-name">{isEnglish ? 'Prompt Master' : 'Master Prompt'}</div>
                <div className="badge-req">{isEnglish ? 'Prompt Safety & Structure' : 'Prompt Safety & Komunikasi'}</div>
                <div className="badge-desc">{isEnglish ? 'Badge for crafting safe, structured, relevant, and bias-free prompts.' : 'Lencana keahlian menyusun instruksi prompt yang aman, terstruktur, relevan, serta bebas dari bias.'}</div>
              </div>
              <div className="badge-card">
                <div className="badge-emoji" style={{ background: 'linear-gradient(135deg, #EC4899, #F43F5E)', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                  <i className="fa-solid fa-rocket"></i>
                </div>
                <div className="badge-name">{isEnglish ? 'Productive Innovator' : 'Inovator Produktif'}</div>
                <div className="badge-req">{isEnglish ? 'Assistance & Workflow' : 'Asistensi & Workflow Kreatif'}</div>
                <div className="badge-desc">{isEnglish ? 'Badge for leveraging AI effectively in daily research and workflow.' : 'Lencana kreativitas dalam memanfaatkan AI secara efektif untuk efisiensi riset, tugas, dan alur kerja harian.'}</div>
              </div>
              <div className="badge-card">
                <div className="badge-emoji" style={{ background: 'linear-gradient(135deg, #10B981, #059669)', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                  <i className="fa-solid fa-graduation-cap"></i>
                </div>
                <div className="badge-name">{isEnglish ? 'Digital Scholar' : 'Cendekia Digital'}</div>
                <div className="badge-req">{isEnglish ? 'Certification & Graduation' : 'Sertifikasi & Kelulusan Akhir'}</div>
                <div className="badge-desc">{isEnglish ? 'Highest qualification badge for completing full AI ethics curriculum.' : 'Lencana kualifikasi tertinggi atas penyelesaian seluruh kurikulum etika AI dan kelulusan evaluasi akhir.'}</div>
              </div>
            </div>

            {/* Certificate Section & Humanized Famous Quote */}
            <div className="cert-section">
              <div>
                <div className="section-tag">{isEnglish ? 'Recognition & Certificate' : 'Apresiasi & Sertifikasi'}</div>
                <div className="section-title" style={{ fontSize: '1.42rem', marginTop: '8px', lineHeight: 1.4, fontStyle: 'italic', fontWeight: 700 }}>
                  {isEnglish
                    ? '"The measure of intelligence is the ability to change."'
                    : '"Ukuran sejati kecerdasan adalah kemampuan untuk beradaptasi dan berpikir kritis."'}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--indigo)', marginTop: '4px', letterSpacing: '0.02em' }}>
                  — Stephen Hawking
                </div>
                <p className="section-desc" style={{ marginTop: '16px' }}>
                  {isEnglish
                    ? 'Showcase your accomplishments upon mastering the comprehensive AI literacy & ethics curriculum. Your official digital certificate can be previewed and printed directly to high-quality PDF in your browser.'
                    : 'Tunjukkan pencapaianmu setelah menguasai seluruh modul etika dan literasi AI. Sertifikat kelulusan digital resmi kamu dapat dipratinjau dan dicetak langsung ke PDF berkualitas tinggi dari browsermu.'}
                </p>
                <div style={{ marginTop: '20px' }}>
                  <button className="btn-cert-preview" onClick={() => setIsCertModalOpen(true)}>
                    <i className="fa-solid fa-certificate"></i>
                    {isEnglish ? 'Preview & Print Certificate' : 'Pratinjau & Cetak Sertifikat'}
                  </button>
                </div>
              </div>

              {/* Prestigious Official Certificate Mock Card */}
              <div 
                className="cert-mock" 
                onClick={() => setIsCertModalOpen(true)}
                title={isEnglish ? 'Click to preview full certificate' : 'Klik untuk melihat sertifikat lengkap'}
              >
                <div className="cert-mock-inner">
                  <span className="cert-mock-corner top-left">✦</span>
                  <span className="cert-mock-corner top-right">✦</span>
                  <span className="cert-mock-corner bottom-left">✦</span>
                  <span className="cert-mock-corner bottom-right">✦</span>

                  <div className="cert-mock-header">
                    <div className="cert-mock-institution">
                      <i className="fa-solid fa-shield-halved"></i>
                      <span>{isEnglish ? 'LIT-GO INDONESIA • NATIONAL AI LITERACY' : 'LIT-GO INDONESIA • LITERASI AI NASIONAL'}</span>
                    </div>
                    <div className="cert-mock-title">
                      {isEnglish ? 'CERTIFICATE OF EXCELLENCE' : 'SERTIFIKAT KELULUSAN'}
                    </div>
                    <div className="cert-mock-sub">
                      {isEnglish ? 'ARTIFICIAL INTELLIGENCE & DIGITAL ETHICS' : 'KECERDASAN BUATAN & ETIKA DIGITAL'}
                    </div>
                  </div>

                  <div className="cert-mock-body">
                    <div className="cert-mock-given">
                      {isEnglish ? 'Proudly presented to:' : 'Diberikan dengan bangga kepada:'}
                    </div>
                    <div className="cert-mock-name">
                      {userName || (isEnglish ? 'Distinguished Learner' : 'Peserta Didik Lit-GO')}
                    </div>
                    <div className="cert-mock-desc">
                      {isEnglish
                        ? 'For outstanding dedication in successfully completing the comprehensive AI Literacy Curriculum on Lit-GO.'
                        : 'Atas dedikasi luar biasa dalam menyelesaikan kurikulum komprehensif Literasi Kecerdasan Buatan pada Lit-GO.'}
                    </div>
                  </div>

                  <div className="cert-mock-badges">
                    <span className="cert-mock-badge-item" style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)' }} title="Pionir AI">
                      <i className="fa-solid fa-award"></i>
                    </span>
                    <span className="cert-mock-badge-item" style={{ background: 'linear-gradient(135deg, #0EA5E9, #0284C7)' }} title="Penjaga Etika">
                      <i className="fa-solid fa-shield-halved"></i>
                    </span>
                    <span className="cert-mock-badge-item" style={{ background: 'linear-gradient(135deg, #6366F1, #4F46E5)' }} title="Master Prompt">
                      <i className="fa-solid fa-feather-pointed"></i>
                    </span>
                    <span className="cert-mock-badge-item" style={{ background: 'linear-gradient(135deg, #EC4899, #F43F5E)' }} title="Inovator Produktif">
                      <i className="fa-solid fa-rocket"></i>
                    </span>
                    <span className="cert-mock-badge-item" style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }} title="Cendekia Digital">
                      <i className="fa-solid fa-graduation-cap"></i>
                    </span>
                  </div>

                  <div className="cert-mock-footer">
                    <div className="cert-mock-id">
                      <div>ID: LITGO-2026-CERT</div>
                      <div style={{ color: '#059669', fontWeight: 600 }}>
                        <i className="fa-solid fa-circle-check"></i> {isEnglish ? 'Verified' : 'Terverifikasi'}
                      </div>
                    </div>

                    <div className="cert-mock-seal">
                      <i className="fa-solid fa-award"></i>
                      <span>LIT-GO</span>
                    </div>

                    <div className="cert-mock-sig">
                      <div className="cert-mock-sig-draw">Dr. Hendra Gunawan</div>
                      <div className="cert-mock-sig-name">{isEnglish ? 'AI Literacy Council' : 'Dewan Literasi AI'}</div>
                    </div>
                  </div>
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
                  <div className="a11y-title">
                    {isEnglish ? 'Readable by everyone, not just a few.' : 'Dibaca semua orang, bukan cuma sebagian.'}
                  </div>
                  <div className="a11y-desc">
                    {isEnglish
                      ? 'Floating accessibility panel accompanies you across all pages, without leaving the content you are reading. Settings are automatically synchronized across the entire platform.'
                      : 'Floating panel aksesibilitas menyertai kamu di seluruh halaman, tanpa perlu keluar dari materi yang sedang dibaca. Pengaturan tersinkronisasi otomatis di seluruh platform.'}
                  </div>
                </div>
                <div className="a11y-toggle-list">
                  {/* Font size slider */}
                  <div className="a11y-toggle" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className="a11y-toggle-label">
                        <div className="a11y-icon-chip">Aa</div>
                        {isEnglish ? 'Text Size' : 'Ukuran Teks'}
                      </div>
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
                        onChange={(e) => handleFontSize(e.target.value)}
                        className="a11y-size-slider"
                        style={{ flex: 1, accentColor: 'var(--teal)', cursor: 'pointer' }}
                      />
                      <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>20px</span>
                    </div>
                  </div>

                  {/* Dyslexia toggle */}
                  <div className="a11y-toggle">
                    <div className="a11y-toggle-label">
                      <div className="a11y-icon-chip"><i className="fa-solid fa-wand-magic-sparkles"></i></div>
                      {isEnglish ? 'Dyslexia-Friendly Font' : 'Font Ramah Disleksia'}
                    </div>
                    <button className={`switch-toggle a11y-switch-dyslexia ${isDyslexic ? 'on' : ''}`} onClick={toggleDyslexia}></button>
                  </div>

                  {/* High Contrast toggle */}
                  <div className="a11y-toggle">
                    <div className="a11y-toggle-label">
                      <div className="a11y-icon-chip"><i className="fa-solid fa-circle-half-stroke"></i></div>
                      {isEnglish ? 'High Contrast Mode' : 'Kontras Tinggi'}
                    </div>
                    <button className={`switch-toggle a11y-switch-contrast ${isContrast ? 'on' : ''}`} onClick={toggleContrast}></button>
                  </div>

                  {/* TTS toggle */}
                  <div className="a11y-toggle">
                    <div className="a11y-toggle-label">
                      <div className="a11y-icon-chip"><i className="fa-solid fa-volume-high"></i></div>
                      {isEnglish ? 'Text-to-Speech (TTS)' : 'Text-to-Speech'}
                    </div>
                    <button className={`switch-toggle a11y-switch-tts ${isSpeaking ? 'on' : ''}`} onClick={toggleTTS}></button>
                  </div>

                  {/* Language toggle */}
                  <div className="a11y-toggle">
                    <div className="a11y-toggle-label">
                      <div className="a11y-icon-chip"><i className="fa-solid fa-globe"></i></div>
                      {isEnglish ? 'English Language' : 'Bahasa Inggris'}
                    </div>
                    <button className={`switch-toggle a11y-switch-lang ${isEnglish ? 'on' : ''}`} onClick={toggleLanguage}></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Accessibility Panel FAB everywhere on Landing Page */}
      <AccessibilityPanel />

      {/* Official Certificate Preview Modal */}
      <CertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        recipientName={userName}
      />

      {/* Footer */}
      <footer>
        <div className="wrap footer-container">
          <div className="footer-grid">
            <div className="footer-brand-col">
              <div className="logo" style={{ marginBottom: '12px' }}>
                <div className="logo-mark">L</div>
                Lit - GO
              </div>
              <p className="footer-desc">
                {isEnglish
                  ? 'Interactive, client-side, inclusive AI & ethics digital literacy platform.'
                  : 'Platform edukasi literasi kecerdasan buatan & etika digital yang interaktif, client-side, dan inklusif.'}
              </p>
            </div>

            <div className="footer-nav-col">
              <div className="footer-col-title">{isEnglish ? 'Learning Curriculum' : 'Kurikulum Belajar'}</div>
              <ul className="footer-links">
                <li>{isEnglish ? '1. Understanding AI Brain' : '1. Kenalan Otak AI'}</li>
                <li>{isEnglish ? '2. Ethics & Privacy' : '2. Kompas Etika'}</li>
                <li>{isEnglish ? '3. Prompt Engineering' : '3. Seni Berbicara'}</li>
                <li>{isEnglish ? '4. AI Detective' : '4. Detektif AI'}</li>
                <li>{isEnglish ? '5. Work Smarter' : '5. Kerja Cerdas'}</li>
                <li>{isEnglish ? '6. Future in AI Era' : '6. Masa Depan AI'}</li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <div className="footer-col-title">{isEnglish ? 'Interactive Sandbox' : 'Sandbox Interaktif'}</div>
              <ul className="footer-links">
                <li>Bias Breaker</li>
                <li>Deepfake Detective</li>
                <li>Ethical Dilemma</li>
                <li>Prompt Safety Lab</li>
                <li>AI Readiness Radar</li>
                <li>{isEnglish ? 'Certificates & E-Badges' : 'Sertifikat & E-Badge'}</li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <div className="footer-col-title">{isEnglish ? 'Inclusive Accessibility' : 'Aksesibilitas Inklusif'}</div>
              <ul className="footer-links">
                <li>{isEnglish ? 'Text Size (16–20px)' : 'Ukuran Teks (16–20px)'}</li>
                <li>{isEnglish ? 'Dyslexia-Friendly Font' : 'Font Ramah Disleksia'}</li>
                <li>{isEnglish ? 'High Contrast Mode' : 'Mode Kontras Tinggi'}</li>
                <li>{isEnglish ? 'Text-to-Speech (TTS)' : 'Text-to-Speech (TTS)'}</li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <div className="footer-col-title">{isEnglish ? 'Technology & Privacy' : 'Teknologi & Privasi'}</div>
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

      {/* Reset Confirmation Modal */}
      {isResetModalOpen && (
        <div className="modal-overlay" id="modal-confirm">
          <div className="modal-box" style={{ maxWidth: '420px', textAlign: 'center' }}>
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '1.3rem',
                color: 'var(--red)',
              }}
            >
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <div className="modal-title" style={{ justifyContent: 'center', marginBottom: '8px' }}>
              {isEnglish ? 'Confirm Data Reset' : 'Konfirmasi Reset Data'}
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
              {isEnglish
                ? 'All progress, badges, and scores will be permanently deleted from your browser. Are you sure?'
                : 'Seluruh progres, badge, dan skor akan dihapus permanen dari browser kamu. Apakah kamu yakin?'}
            </p>
            <div className="modal-footer" style={{ justifyContent: 'center' }}>
              <button className="btn-modal-cancel" onClick={() => setIsResetModalOpen(false)}>
                {isEnglish ? 'Cancel' : 'Batal'}
              </button>
              <button className="btn-modal-danger" onClick={handleReset}>
                {isEnglish ? 'Yes, Reset Now' : 'Ya, Reset Sekarang'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}