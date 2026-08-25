import React, { useState, useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import DashboardNavbar from '../../components/Navbar/DashboardNavbar';
import './Dashboard.css';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

// ─── DATA SILABUS & BADGE ───────────────────────────
const MODULES = [
  { id:1, tag:"Level 1", title:'Kenalan dengan "Otak" AI', topics:"Definisi AI, sejarah singkat, mitos vs fakta, keterbatasan & halusinasi.", badge:"Pionir AI", icon:'fa-brain', iconBg:'linear-gradient(135deg, #8B5CF6, #6D28D9)',
    reading:"AI (Artificial Intelligence) adalah simulasi kecerdasan manusia oleh mesin yang dilatih menggunakan miliaran data statistik. AI <b>tidak memiliki kesadaran</b> atau pemahaman sejati. Keterbatasan utamanya adalah <b>Halusinasi</b> — kondisi di mana AI menghasilkan fakta palsu yang terdengar sangat meyakinkan.",
    quiz:{ q:"Apa yang dimaksud dengan fenomena 'Halusinasi' pada model AI?", opts:["AI mengalami kerusakan sistem total dan mati.","AI menghasilkan fakta palsu yang terdengar ilmiah & meyakinkan.","AI bisa membaca emosi dan pikiran pengguna."], ans:1 }},
  { id:2, tag:"Level 2", title:"Kompas Etika & Privasi", topics:"Hak cipta, plagiarisme, privasi data, bias AI, identifikasi deepfake.", badge:"Penjaga Etika", icon:'fa-shield-halved', iconBg:'linear-gradient(135deg, #0EA5E9, #0284C7)',
    reading:"Etika AI mencakup perlindungan privasi data pribadi (NIK, password, rekening), pencegahan plagiarisme, dan netralitas dari Bias. <b>Deepfake</b> bisa dikenali lewat kejanggalan retina mata, tekstur kulit berlebih, serta asimetri bentuk telinga/jari.",
    quiz:{ q:"Data mana yang HARUS DIRAHASIAKAN dan TIDAK BOLEH dimasukkan ke prompt AI publik?", opts:["Rangkuman makalah sejarah Indonesia 1945.","NIK dan kata sandi perbankan.","Pertanyaan rumus matematika fisika."], ans:1 }},
  { id:3, tag:"Level 3", title:"Seni Berbicara dengan Mesin", topics:"Anatomi prompt (konteks, instruksi, format, persona), teknik zero-shot vs few-shot.", badge:"Master Prompt", icon:'fa-terminal', iconBg:'linear-gradient(135deg, #6366F1, #4F46E5)',
    reading:"Prompting adalah seni berkomunikasi dengan AI. Prompt berkualitas mengandung 4 elemen: <b>Persona/Role</b>, <b>Konteks</b> (latar belakang), <b>Instruksi Spesifik</b> (tugas utama), dan <b>Format Output</b> (tabel/poin/ringkasan).",
    quiz:{ q:"Elemen apa yang menentukan gaya bahasa & perspektif sudut pandang AI?", opts:["Format Output","Panjang karakter teks","Persona / Peran AI"], ans:2 }},
  { id:4, tag:"Level 4", title:"Asisten Produktivitas AI", topics:"Tips riset anti-hoaks, AI sebagai tutor pribadi, & email profesional.", badge:"Inovator Produktif", icon:'fa-rocket', iconBg:'linear-gradient(135deg, #EC4899, #F43F5E)',
    reading:"AI dapat digunakan sebagai rekan diskusi dan tutor belajar. Untuk mencegah hoaks, selalu terapkan <i>Double Check & Fact Verification</i>. Gunakan AI untuk merumuskan kerangka, merapikan tata bahasa, atau membuat draf email.",
    quiz:{ q:"Cara paling etis menggunakan AI untuk tugas akademis?", opts:["Menyalin 100% jawaban AI dan mengakuinya murni sendiri.","AI sebagai teman diskusi & outline, lalu tulis sendiri dan deklarasikan penggunaan AI.","Menyuruh AI buatkan seluruh skripsi dari bab 1 hingga 5."], ans:1 }},
  { id:5, tag:"Level 5", title:"Eksplorasi AI Kreatif", topics:"Etika text-to-image, hak cipta karya visual, & prompting visual.", badge:"Kreator Beretika", icon:'fa-palette', iconBg:'linear-gradient(135deg, #10B981, #059669)',
    reading:"Generative Image AI mengubah teks menjadi karya visual. Etika seni AI mengharuskan kreator untuk tidak meniru gaya seniman hidup tanpa izin dan tidak membuat citra palsu yang menyesatkan publik.",
    quiz:{ q:"Tindakan mana yang melanggar etika dalam pembuatan gambar AI?", opts:["Prompt pencahayaan fotorealistik alam.","Membuat foto deepfake tokoh publik untuk menyebarkan fitnah.","Membuat ilustrasi pemandangan gaya cyberpunk."], ans:1 }},
  { id:6, tag:"Level 6", title:"Bertahan di Era AI", topics:"Critical thinking, empati, adaptasi karier masa depan.", badge:"Cendekia Digital", icon:'fa-graduation-cap', iconBg:'linear-gradient(135deg, #F59E0B, #D97706)',
    reading:"Di era AI, keterampilan manusia yang paling tak tergantikan adalah <b>Pemikiran Kritis</b>, <b>Empati Moral</b>, dan <b>Kreativitas Asli</b>. AI adalah alat (copilot), sedangkan manusia adalah pemegang kendali utama (pilot).",
    quiz:{ q:"Apa peran utama manusia dalam hubungannya dengan teknologi AI?", opts:["Pasrah dan serahkan seluruh keputusan ke AI.","Pemegang kendali utama (pilot) yang mengevaluasi secara kritis output AI.","Menolak seluruh penggunaan AI di kehidupan."], ans:1 }},
];

const BADGE_DATA = [
  { id:1, icon:'fa-award', bg:'linear-gradient(135deg, #F59E0B, #D97706)', name:'Pionir AI', req:'Asesmen Radar & Fondasi AI', desc:'Lencana pembuka atas keberhasilan menyelesaikan asesmen awal dan memahami prinsip fondasi kecerdasan buatan.' },
  { id:2, icon:'fa-shield-halved', bg:'linear-gradient(135deg, #0EA5E9, #0284C7)', name:'Penjaga Etika', req:'Deteksi Deepfake & Etika', desc:'Lencana kehormatan atas pemahaman etika data, privasi, serta kecakapan mendeteksi rekayasa deepfake.' },
  { id:3, icon:'fa-feather-pointed', bg:'linear-gradient(135deg, #6366F1, #4F46E5)', name:'Master Prompt', req:'Prompt Safety & Komunikasi', desc:'Lencana keahlian menyusun instruksi prompt yang aman, terstruktur, relevan, serta bebas dari bias.' },
  { id:4, icon:'fa-rocket', bg:'linear-gradient(135deg, #EC4899, #F43F5E)', name:'Inovator Produktif', req:'Asistensi & Workflow Kreatif', desc:'Lencana kreativitas dalam memanfaatkan AI secara efektif untuk efisiensi riset, tugas, dan alur kerja harian.' },
  { id:5, icon:'fa-graduation-cap', bg:'linear-gradient(135deg, #10B981, #059669)', name:'Cendekia Digital', req:'Sertifikasi & Kelulusan Akhir', desc:'Lencana kualifikasi tertinggi atas penyelesaian seluruh kurikulum etika AI dan kelulusan evaluasi akhir.' },
];

export default function Dashboard() {
  const [state, setState] = useState({ radar: [0, 0, 0, 0], hasRadar: false, doneModules: [], badges: [] });
  const [activeTab, setActiveTab] = useState('deepfake');
  
  // Modals & Feedback
  const [isRadarModalOpen, setRadarModalOpen] = useState(false);
  const [isModuleModalOpen, setModuleModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [activeModId, setActiveModId] = useState(null);
  const [showQuizView, setShowQuizView] = useState(false);
  const [quizFeedback, setQuizFeedback] = useState({ show: false, correct: false, msg: '' });
  const [toastMsg, setToastMsg] = useState(null);
  const [toastType, setToastType] = useState('info');

  const [radarAnswers, setRadarAnswers] = useState([3, 2, 3, 4, 2, 2, 3, 3]);

  // Sandbox Labs State
  const [dfOverlayOn, setDfOverlayOn] = useState(false);
  const [factScore, setFactScore] = useState(0);
  const [factFeedback, setFactFeedback] = useState('Pilih kalimat di kiri untuk menguji analisis kamu.');
  const [factWords, setFactWords] = useState([
    { id: 1, text: "Secara umum sistem bekerja menggunakan pemrosesan data statistik.", isHallu: false, clicked: false },
    { id: 2, text: "Sebagai contoh, Sumpah Pemuda pertama kali dideklarasikan pada tahun 1995.", isHallu: true, clicked: false, exp: "Sumpah Pemuda terjadi tahun 1928, bukan 1995!" },
    { id: 3, text: "Model bahasa dilatih menggunakan miliaran korpus teks digital.", isHallu: false, clicked: false },
    { id: 4, text: "Oleh karena itu, pria secara alami selalu lebih mahir koding dibanding wanita.", isHallu: true, clicked: false, exp: "Klaim gender unggul dalam coding adalah Bias AI!" },
    { id: 5, text: "Selain itu, Albert Einstein adalah pencipta lagu Indonesia Raya.", isHallu: true, clicked: false, exp: "Albert Einstein adalah fisikawan. Pencipta lagu Indonesia Raya adalah W.R. Supratman!" }
  ]);
  const [dilemmaState, setDilemmaState] = useState(null);
  const [promptText, setPromptText] = useState('');
  const [certName, setCertName] = useState('');

  // Refs
  const magBoxRef = useRef(null);
  const magLensRef = useRef(null);
  const magImgRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const s = localStorage.getItem('litgo_complete_v1');
    if (s) setState(JSON.parse(s));
  }, []);

  const saveState = (newState) => {
    setState(newState);
    localStorage.setItem('litgo_complete_v1', JSON.stringify(newState));
  };

  const showToast = (msg, type = 'info') => {
    setToastMsg(msg); setToastType(type);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const scrollCarousel = (dir) => {
    if(carouselRef.current) {
      carouselRef.current.scrollBy({ left: dir * 330, behavior: 'smooth' });
    }
  };

  // ─── LOGIC FUNCTIONS ───
  const handleRadarSubmit = () => {
    const vals = radarAnswers;
    const newRadar = [
      Math.round(((vals[0] + vals[1]) / 10) * 100),
      Math.round(((vals[2] + vals[3]) / 10) * 100),
      Math.round(((vals[4] + vals[5]) / 10) * 100),
      Math.round(((vals[6] + vals[7]) / 10) * 100),
    ];
    let newBadges = [...state.badges];
    if (!newBadges.includes(1)) newBadges.push(1);
    saveState({ ...state, radar: newRadar, hasRadar: true, badges: newBadges });
    setRadarModalOpen(false);
    showToast('Pre-Test tersimpan! Radar kecakapan diperbarui.', 'success');
  };

  const openModule = (id) => {
    setActiveModId(id); setShowQuizView(false);
    setQuizFeedback({ show: false, correct: false, msg: '' });
    setModuleModalOpen(true);
  };

  const answerQuiz = (isCorrect) => {
    if (isCorrect) {
      setQuizFeedback({ show: true, correct: true, msg: 'Jawaban Benar! Modul Selesai!' });
      let newDone = [...state.doneModules];
      if (!newDone.includes(activeModId)) newDone.push(activeModId);

      let newBadges = [...state.badges];
      if (state.hasRadar && !newBadges.includes(1)) newBadges.push(1);
      if (newDone.includes(2) && !newBadges.includes(2)) newBadges.push(2);
      if (newDone.includes(3) && !newBadges.includes(3)) newBadges.push(3);
      if (newDone.includes(4) && newDone.includes(5) && !newBadges.includes(4)) newBadges.push(4);
      if (newDone.length === 6 && state.hasRadar && !newBadges.includes(5)) newBadges.push(5);

      saveState({ ...state, doneModules: newDone, badges: newBadges });
      setTimeout(() => { setModuleModalOpen(false); showToast('Modul selesai! EXP & Gems bertambah.', 'success'); }, 1400);
    } else {
      setQuizFeedback({ show: true, correct: false, msg: 'Jawaban kurang tepat. Baca ulang materi dan coba lagi.' });
    }
  };

  // Lab Interactions
  const handleMagMove = (e) => {
    if (!magBoxRef.current || !magLensRef.current || !magImgRef.current) return;
    const box = magBoxRef.current;
    const r = box.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const lens = magLensRef.current;
    lens.style.display = 'block';
    lens.style.left = (x - 65) + 'px'; lens.style.top = (y - 65) + 'px';
    lens.style.backgroundImage = `url('${magImgRef.current.src}')`;
    lens.style.backgroundSize = `${box.clientWidth * 2.2}px ${box.clientHeight * 2.2}px`;
    lens.style.backgroundPosition = `-${x * 2.2 - 65}px -${y * 2.2 - 65}px`;
  };

  const handleFactClick = (id) => {
    const word = factWords.find(w => w.id === id);
    if (word.clicked) return;
    const newWords = factWords.map(w => w.id === id ? { ...w, clicked: true } : w);
    setFactWords(newWords);
    if (word.isHallu) {
      setFactScore(Math.min(3, factScore + 1));
      setFactFeedback(`Tepat! Halusinasi/Bias: ${word.exp}`);
      if (factScore + 1 === 3) showToast('Semua halusinasi berhasil teridentifikasi!', 'success');
    } else {
      setFactFeedback('Informasi Valid: Kalimat ini berbasis data faktual yang dapat diverifikasi.');
    }
  };

  const chooseDilemma = (opt) => {
    const sets = {
      1: { cr:70, pv:30, int:20, msg:'Evaluasi Pilihan A: Menyembunyikan penggunaan AI merusak transparansi dan integritas akademik.' },
      2: { cr:10, pv:10, int:95, msg:'Evaluasi Pilihan B (Sangat Etis): Deklarasi eksplisit menjaga kejujuran ilmiah dan mematuhi etika akademik.' },
      3: { cr:95, pv:60, int:5, msg:'Evaluasi Pilihan C (Pelanggaran Berat): Merupakan plagiarisme langsung yang melanggar hak cipta.' }
    };
    setDilemmaState(sets[opt]);
    if (opt === 2) showToast('Keputusan sangat etis!', 'success');
  };

  const parsePrompt = (text) => {
    let score = 50, ctx = false, ins = false, fmt = false, safe = true;
    const good = [['bertindak sebagai','ctx'], ['konteks','ctx'], ['jelaskan','ins'], ['ringkas','ins'], ['format','fmt'], ['tabel','fmt']];
    const risk = ['password','rahasia','nik','rekening','curi','hack'];
    good.forEach(([kw, type]) => { if (text.toLowerCase().includes(kw)) { score += 10; if (type === 'ctx') ctx = true; if (type === 'ins') ins = true; if (type === 'fmt') fmt = true; } });
    risk.forEach(kw => { if (text.toLowerCase().includes(kw)) { score -= 25; safe = false; } });
    return { score: Math.max(10, Math.min(100, score)), ctx, ins, fmt, safe };
  };
  const promptStats = parsePrompt(promptText);

  // HUD Calc
  const doneCount = state.doneModules ? state.doneModules.length : 0;
  const badgeCount = state.badges ? state.badges.length : 0;
  const pts = doneCount * 250 + badgeCount * 100;
  const lv = Math.max(1, Math.floor(doneCount / 2) + 1);
  const expPct = Math.round((doneCount / 6) * 100);
  const activeMod = MODULES.find(m => m.id === activeModId);

  // Data Radar Chart.js
  const radarData = {
    labels: ['Pemahaman Dasar', 'Etika & Keamanan', 'Prompting', 'Berpikir Kritis'],
    datasets: [{
      label: 'Skor (%)',
      data: state.radar || [0, 0, 0, 0],
      backgroundColor: 'rgba(59, 130, 246, 0.15)',
      borderColor: '#3B82F6',
      pointBackgroundColor: '#F59E0B',
      borderWidth: 2,
    }],
  };
  const radarOptions = {
    responsive: true, maintainAspectRatio: true,
    scales: { r: { min: 0, max: 100, grid: { color: '#E2E8F0' }, angleLines: { color: '#E2E8F0' }, ticks: { display: false }, pointLabels: { font: { size: 10, family: 'Space Grotesk', weight: 'bold' }, color: '#334155' } } },
    plugins: { legend: { display: false } },
  };

  const handleReset = () => {
    localStorage.removeItem('litgo_complete_v1');
    window.location.reload();
  };

  return (
    <div className="dashboard-root">
      <div className="bg-grid"></div>
      <div className="bg-glow"></div>
      <div className="bg-glow2"></div>

      {/* Navigation terpisah */}
      <DashboardNavbar 
        pts={pts} 
        badgeCount={badgeCount} 
        expPct={expPct} 
        lv={lv} 
        onRequestReset={() => setConfirmModalOpen(true)} 
      />

      {/* TOAST */}
      {toastMsg && (
        <div id="toast-container" style={{display: 'flex', flexDirection: 'column'}}>
          <div className="toast" style={{opacity: 1}}>
            <span className="toast-icon">
              {toastType === 'success' ? <i className="fa-solid fa-circle-check text-emerald"></i> : toastType === 'amber' ? <i className="fa-solid fa-award text-amber"></i> : <i className="fa-solid fa-circle-info text-indigo"></i>}
            </span>
            <span>{toastMsg}</span>
          </div>
        </div>
      )}

      <main className="dashboard-container">
        <div className="wrap">
          
          {/* LOBBY NAVIGASI */}
          <div className="hub-lobby" style={{marginBottom: '40px'}}>
            <div className="hub-lobby-grid">
              {/* Kiri */}
              <div>
                <div style={{fontSize:'0.7rem', fontFamily:'var(--font-mono)', color:'var(--indigo)', textTransform:'uppercase', letterSpacing:'0.08em', fontWeight:600, marginBottom:'10px'}}>
                  Navigasi
                </div>
                <div className="hub-nav-list">
                  <button className="hub-nav-btn" onClick={() => document.getElementById('hub-radar').scrollIntoView({behavior:'smooth'})}>
                    <div className="hub-nav-icon" style={{background:'rgba(59,130,246,0.1)', color:'var(--indigo)'}}><i className="fa-solid fa-chart-line"></i></div>
                    <div>
                      <div className="hub-nav-title">Radar Readiness</div>
                      <div className="hub-nav-sub">Asesmen 4 Pilar</div>
                    </div>
                  </button>
                  <button className="hub-nav-btn" onClick={() => document.getElementById('hub-modules').scrollIntoView({behavior:'smooth'})}>
                    <div className="hub-nav-icon" style={{background:'rgba(245,158,11,0.1)', color:'var(--amber)'}}><i className="fa-solid fa-book-open"></i></div>
                    <div>
                      <div className="hub-nav-title">Modul Belajar</div>
                      <div className="hub-nav-sub">6 Modul Silabus</div>
                    </div>
                  </button>
                  <button className="hub-nav-btn" onClick={() => document.getElementById('hub-rewards').scrollIntoView({behavior:'smooth'})}>
                    <div className="hub-nav-icon" style={{background:'rgba(16,185,129,0.1)', color:'var(--emerald)'}}><i className="fa-solid fa-trophy"></i></div>
                    <div>
                      <div className="hub-nav-title">Koleksi Badge</div>
                      <div className="hub-nav-sub">&amp; E-Sertifikat</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Tengah */}
              <div className="hub-center">
                <div className="mascot-dialog"><i className="fa-solid fa-quote-left" style={{color:'var(--indigo)'}}></i> Halo! Yuk mulai dari Radar Readiness untuk kenali level literasi AI kamu.</div>
                <div className="mascot-slot-hub">[ ruang maskot — diisi kemudian ]</div>
                <button className="btn-hub-start" onClick={() => document.getElementById('hub-sandbox').scrollIntoView({behavior:'smooth'})}>
                  <i className="fa-solid fa-play"></i> Mulai Jelajahi Lab
                </button>
              </div>

              {/* Kanan */}
              <div>
                <div style={{fontSize:'0.7rem', fontFamily:'var(--font-mono)', color:'var(--teal)', textTransform:'uppercase', letterSpacing:'0.08em', fontWeight:600, marginBottom:'10px'}}>
                  Sandbox Lab
                </div>
                <div className="hub-nav-list">
                  <button className="hub-nav-btn" onClick={() => { setActiveTab('deepfake'); document.getElementById('hub-sandbox').scrollIntoView({behavior:'smooth'}); }}>
                    <div className="hub-nav-icon" style={{background:'rgba(20,184,166,0.1)', color:'var(--teal)'}}><i className="fa-solid fa-magnifying-glass"></i></div>
                    <div>
                      <div className="hub-nav-title">Deepfake Detective</div>
                      <div className="hub-nav-sub">Inspeksi Artefak Visual</div>
                    </div>
                  </button>
                  <button className="hub-nav-btn" onClick={() => { setActiveTab('hallucination'); document.getElementById('hub-sandbox').scrollIntoView({behavior:'smooth'}); }}>
                    <div className="hub-nav-icon" style={{background:'rgba(245,158,11,0.1)', color:'var(--amber)'}}><i className="fa-solid fa-bug"></i></div>
                    <div>
                      <div className="hub-nav-title">Bias Breaker</div>
                      <div className="hub-nav-sub">Deteksi Halusinasi Teks</div>
                    </div>
                  </button>
                  <button className="hub-nav-btn" onClick={() => { setActiveTab('dilemma'); document.getElementById('hub-sandbox').scrollIntoView({behavior:'smooth'}); }}>
                    <div className="hub-nav-icon" style={{background:'rgba(59,130,246,0.1)', color:'var(--indigo)'}}><i className="fa-solid fa-scale-balanced"></i></div>
                    <div>
                      <div className="hub-nav-title">Ethical Dilemma</div>
                      <div className="hub-nav-sub">Simulasi Keputusan</div>
                    </div>
                  </button>
                  <button className="hub-nav-btn" onClick={() => { setActiveTab('prompt'); document.getElementById('hub-sandbox').scrollIntoView({behavior:'smooth'}); }}>
                    <div className="hub-nav-icon" style={{background:'rgba(16,185,129,0.1)', color:'var(--emerald)'}}><i className="fa-solid fa-terminal"></i></div>
                    <div>
                      <div className="hub-nav-title">Prompt Safety Lab</div>
                      <div className="hub-nav-sub">Parser Anatomi Prompt</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* AI Readiness Radar Section */}
          <div className="hub-section" id="hub-radar">
            <div className="hub-section-head">
              <div>
                <div className="hub-section-title">AI Readiness Radar</div>
              </div>
              <button className="btn-lab" onClick={() => setRadarModalOpen(true)}>
                <i className="fa-solid fa-clipboard-check mr-1"></i> {state.hasRadar ? 'Ulangi Pre-Test' : 'Mulai Pre-Test'}
              </button>
            </div>
            <div className="panel" style={{ padding: '24px' }}>
              <div className="radar-hub-grid">
                <div className="radar-chart-wrap" style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                   <Radar data={radarData} options={radarOptions} />
                </div>
                <div>
                  <div className="radar-pillar-list">
                    <div>
                      <div className="pillar-item-label" style={{color:'var(--indigo)'}}><span><i className="fa-solid fa-brain mr-1"></i> Pemahaman Dasar</span><strong>{state.radar[0]}%</strong></div>
                      <div className="pillar-item-track"><div className="pillar-item-fill" style={{width:`${state.radar[0]}%`, background:'var(--indigo)'}}></div></div>
                    </div>
                    <div>
                      <div className="pillar-item-label" style={{color:'var(--teal)'}}><span><i className="fa-solid fa-shield-halved mr-1"></i> Etika &amp; Keamanan</span><strong>{state.radar[1]}%</strong></div>
                      <div className="pillar-item-track"><div className="pillar-item-fill" style={{width:`${state.radar[1]}%`, background:'var(--teal)'}}></div></div>
                    </div>
                    <div>
                      <div className="pillar-item-label" style={{color:'var(--amber)'}}><span><i className="fa-solid fa-terminal mr-1"></i> Prompting</span><strong>{state.radar[2]}%</strong></div>
                      <div className="pillar-item-track"><div className="pillar-item-fill" style={{width:`${state.radar[2]}%`, background:'var(--amber)'}}></div></div>
                    </div>
                    <div>
                      <div className="pillar-item-label" style={{color:'var(--emerald)'}}><span><i className="fa-solid fa-magnifying-glass mr-1"></i> Critical Thinking</span><strong>{state.radar[3]}%</strong></div>
                      <div className="pillar-item-track"><div className="pillar-item-fill" style={{width:`${state.radar[3]}%`, background:'var(--emerald)'}}></div></div>
                    </div>
                  </div>
                  <div className="radar-rec" id="radar-rec">
                    {state.hasRadar ? `Skor rata-rata kecakapan kamu adalah ${Math.round(state.radar.reduce((a,b)=>a+b,0)/4)}%. Pelajari modul rekomendasi untuk meningkatkan pilar terendah.` : 'Lakukan Pre-Test untuk mengukur titik awal kecakapan AI kamu sebelum membuka modul.'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modules Section */}
          <div className="hub-section" id="hub-modules">
            <div className="hub-section-head">
              <div>
                <div className="hub-section-title">Modul Pembelajaran</div>
              </div>
              <div className="hub-section-sub">Selesaikan materi &amp; kuis untuk membuka E-Badge</div>
            </div>
            <div className="module-carousel-container">
              <button className="carousel-arrow prev" onClick={() => scrollCarousel(-1)} title="Sebelumnya">
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <div className="module-carousel-track" ref={carouselRef}>
                 {MODULES.map((mod) => {
                   const isDone = state.doneModules.includes(mod.id);
                   return (
                     <div key={mod.id} className={`mod-carousel-card mod-card-theme-${mod.id}`} onClick={() => openModule(mod.id)}>
                        <div className="mod-card-level">{mod.id}</div>
                        <div className="mod-card-icon" style={{background: mod.iconBg}}>
                          <i className={`fa-solid ${mod.icon}`}></i>
                        </div>
                        <div className="mod-card-title">{mod.title}</div>
                        <div className="mod-card-desc">{mod.topics}</div>
                        <div className="mod-card-footer">
                          <button className={`mod-card-btn ${isDone ? 'done' : ''}`}>
                            {isDone ? <><i className="fa-solid fa-circle-check"></i> Selesai</> : <>Mulai Belajar <i className="fa-solid fa-arrow-right"></i></>}
                          </button>
                        </div>
                     </div>
                   );
                 })}
              </div>
              <button className="carousel-arrow next" onClick={() => scrollCarousel(1)} title="Berikutnya">
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>

          {/* Sandbox Hub Section */}
          <div className="hub-section" id="hub-sandbox">
            <div className="hub-section-head">
              <div>
                <div className="hub-section-title">Sandbox Hub</div>
              </div>
            </div>
            <div className="panel" style={{padding:'24px'}}>
              <div className="sandbox-tabs">
                <button className={`sandbox-tab-btn ${activeTab === 'deepfake' ? 'active' : ''}`} onClick={() => setActiveTab('deepfake')}>
                  <i className="fa-solid fa-magnifying-glass mr-1"></i> 1. Deepfake Detective
                </button>
                <button className={`sandbox-tab-btn ${activeTab === 'hallucination' ? 'active' : ''}`} onClick={() => setActiveTab('hallucination')}>
                  <i className="fa-solid fa-bug mr-1"></i> 2. Bias Breaker
                </button>
                <button className={`sandbox-tab-btn ${activeTab === 'dilemma' ? 'active' : ''}`} onClick={() => setActiveTab('dilemma')}>
                  <i className="fa-solid fa-scale-balanced mr-1"></i> 3. Ethical Dilemma
                </button>
                <button className={`sandbox-tab-btn ${activeTab === 'prompt' ? 'active' : ''}`} onClick={() => setActiveTab('prompt')}>
                  <i className="fa-solid fa-terminal mr-1"></i> 4. Prompt Safety Lab
                </button>
              </div>

              {/* Tab 1: Deepfake */}
              {activeTab === 'deepfake' && (
                <div className="sandbox-tab-content active" id="tab-deepfake">
                  <div className="lab-inner">
                    <div className="lab-box">
                      <div className="magnifier-box" id="deepfake-box" ref={magBoxRef} onMouseMove={handleMagMove} onMouseLeave={() => magLensRef.current && (magLensRef.current.style.display='none')} style={{height:'300px'}}>
                        <img id="deepfake-img" ref={magImgRef} src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80" alt="Target Deepfake" style={{width:'100%', height:'100%', objectFit:'cover'}} />
                        <div id="df-overlay" style={{display: dfOverlayOn ? 'block' : 'none', position:'absolute', inset:0, pointerEvents:'none'}}>
                          <div style={{position:'absolute', top:'30%', right:'25%', width:'44px', height:'44px', border:'2px solid var(--red)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(239,68,68,0.15)', fontSize:'0.75rem', fontWeight:900, color:'var(--red)'}}>1</div>
                          <div style={{position:'absolute', bottom:'28%', left:'32%', width:'38px', height:'38px', border:'2px solid var(--amber)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(245,158,11,0.15)', fontSize:'0.75rem', fontWeight:900, color:'var(--amber)'}}>2</div>
                        </div>
                        <div className="magnifier-lens" id="mag-lens" ref={magLensRef}></div>
                      </div>
                      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'12px'}}>
                        <span style={{fontSize:'0.78rem', color:'var(--text-dim)'}}>
                          <i className="fa-solid fa-hand-pointer mr-1"></i> Arahkan kursor ke foto untuk memperbesar
                        </span>
                        <button className="btn-lab-ghost" onClick={() => setDfOverlayOn(!dfOverlayOn)} id="df-overlay-btn">
                          <i className={`fa-solid ${dfOverlayOn ? 'fa-eye-slash' : 'fa-eye'} mr-1`}></i> {dfOverlayOn ? 'Sembunyikan Sorotan' : 'Tampilkan Sorotan'}
                        </button>
                      </div>
                    </div>
                    <div className="lab-sidebar">
                      <div className="lab-sidebar-title">Temuan Artefak Visual:</div>
                      <div style={{background:'rgba(239,68,68,0.06)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:'10px', padding:'12px', fontSize:'0.8rem'}}>
                        <strong style={{color:'var(--red)', display:'block', marginBottom:'4px'}}>1. Asimetri Refleksi Retina</strong>
                        Pantulan cahaya pada iris tidak konsisten dengan sumber cahaya latar.
                      </div>
                      <div style={{background:'rgba(245,158,11,0.07)', border:'1px solid rgba(245,158,11,0.25)', borderRadius:'10px', padding:'12px', fontSize:'0.8rem'}}>
                        <strong style={{color:'var(--amber)', display:'block', marginBottom:'4px'}}>2. Over-Smoothing Tekstur Kulit</strong>
                        Pori dan batas telinga terlalu halus — tanda khas generative blending.
                      </div>
                      <button className="btn-lab" onClick={() => { if(!state.badges.includes(2)) { saveState({...state, badges: [...state.badges, 2]}); showToast('Inspeksi selesai! Badge diperbarui.', 'amber'); } }}>
                        <i className="fa-solid fa-circle-check mr-1"></i> Selesaikan Inspeksi
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Hallucination */}
              {activeTab === 'hallucination' && (
                <div className="sandbox-tab-content active" id="tab-hallucination">
                  <div className="lab-inner">
                    <div className="lab-box">
                       <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'14px', fontSize:'0.8rem', color:'var(--text-dim)'}}>
                          <span>Klik kalimat yang kamu curigai <strong style={{color:'var(--navy)'}}>halusinasi atau bias</strong></span>
                          <span className="score-pill">🎯 Fact Score: <strong id="fact-score" style={{color:'var(--amber)'}}>{factScore}</strong>/3</span>
                       </div>
                       <div style={{fontSize:'0.9rem', lineHeight:2, color:'var(--navy-light)'}}>
                         Teknologi kecerdasan buatan berkembang sangat pesat.
                         {factWords.map(w => (
                           <span key={w.id} className="fact-word" onClick={() => handleFactClick(w.id)} style={{
                             cursor: w.clicked ? 'default' : 'pointer', 
                             background: w.clicked ? (w.isHallu ? 'rgba(239,68,68,0.12)' : 'rgba(16,185,129,0.12)') : 'transparent',
                             color: w.clicked ? (w.isHallu ? 'var(--red)' : 'var(--emerald)') : 'inherit',
                             textDecoration: w.clicked && w.isHallu ? 'line-through' : 'none'
                           }}> {w.text}</span>
                         ))}
                       </div>
                       <div style={{fontSize:'0.75rem', color:'var(--text-dim)', marginTop:'12px', fontStyle:'italic'}}>* Klik kalimat yang mencurigakan untuk menguji validitasnya.</div>
                    </div>
                    <div className="lab-sidebar">
                       <div className="lab-sidebar-title">Umpan Balik Analisis:</div>
                       <div id="fact-feedback" style={{background:'var(--white)', border:'1px solid var(--line)', borderRadius:'10px', padding:'14px', fontSize:'0.8rem', color:'var(--text-dim)', minHeight:'110px'}}>
                         {factFeedback.includes('Tepat!') ? <><strong style={{color:'var(--red)', display:'block', marginBottom:'4px'}}><i className="fa-solid fa-triangle-exclamation mr-1"></i> Tepat! Halusinasi/Bias:</strong><span style={{color:'var(--red)'}}>{factFeedback.replace('Tepat! Halusinasi/Bias: ','')}</span></> : 
                          factFeedback.includes('Informasi Valid') ? <><strong style={{color:'var(--emerald)', display:'block', marginBottom:'4px'}}><i className="fa-solid fa-circle-check mr-1"></i> Informasi Valid:</strong><span style={{color:'var(--emerald)'}}>Kalimat ini berbasis data faktual yang dapat diverifikasi.</span></> : 
                          factFeedback}
                       </div>
                       <button className="btn-lab-ghost" onClick={resetHallucination}>
                         <i className="fa-solid fa-rotate-right mr-1"></i> Reset Simulasi
                       </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Dilemma */}
              {activeTab === 'dilemma' && (
                <div className="sandbox-tab-content active" id="tab-dilemma">
                  <div className="lab-inner">
                    <div className="lab-box">
                       <div style={{fontSize:'0.72rem', fontWeight:700, color:'var(--indigo)', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'8px'}}>Skenario Studi Kasus</div>
                       <div style={{fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.05rem', marginBottom:'10px'}}>Penggunaan Generative AI dalam Karya Akademis</div>
                       <p style={{fontSize:'0.86rem', color:'var(--text-dim)', lineHeight:1.65, marginBottom:'18px'}}>Seorang mahasiswa menggunakan AI untuk riset ide awal, merapikan tata bahasa, dan membuat ilustrasi grafik. Tindakan apa yang harus diambil sebelum karya dipublikasikan?</p>
                       <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                          <button className="quiz-option" onClick={()=>chooseDilemma(1)}><strong>Pilihan A:</strong> Mengklaim 100% murni buatan sendiri tanpa menyebut AI.</button>
                          <button className="quiz-option" onClick={()=>chooseDilemma(2)}><strong>Pilihan B:</strong> Mencantumkan deklarasi transparansi penggunaan AI pada bab metode &amp; sitasi.</button>
                          <button className="quiz-option" onClick={()=>chooseDilemma(3)}><strong>Pilihan C:</strong> Menyalin seluruh isi artikel orang lain langsung via AI.</button>
                       </div>
                    </div>
                    <div className="lab-sidebar">
                       <div className="lab-sidebar-title">Indikator Dampak Etika:</div>
                       <div style={{display:'flex', flexDirection:'column', gap:'14px'}}>
                         <div>
                           <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.8rem', fontWeight:600, marginBottom:'4px'}}><span>Risiko Hak Cipta</span><span style={{color:'var(--amber)'}}>{dilemmaState?.cr || 0}%</span></div>
                           <div className="pillar-item-track"><div className="pillar-item-fill" style={{width:`${dilemmaState?.cr || 0}%`, background:'var(--amber)'}}></div></div>
                         </div>
                         <div>
                           <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.8rem', fontWeight:600, marginBottom:'4px'}}><span>Risiko Privasi Data</span><span style={{color:'var(--indigo)'}}>{dilemmaState?.pv || 0}%</span></div>
                           <div className="pillar-item-track"><div className="pillar-item-fill" style={{width:`${dilemmaState?.pv || 0}%`, background:'var(--indigo)'}}></div></div>
                         </div>
                         <div>
                           <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.8rem', fontWeight:600, marginBottom:'4px'}}><span>Integritas Akademik</span><span style={{color:'var(--emerald)'}}>{dilemmaState?.int || 100}%</span></div>
                           <div className="pillar-item-track"><div className="pillar-item-fill" style={{width:`${dilemmaState?.int || 100}%`, background:'var(--emerald)'}}></div></div>
                         </div>
                       </div>
                       <div id="dilemma-feedback" style={{background:'var(--white)', border:'1px solid var(--line)', borderRadius:'10px', padding:'12px', fontSize:'0.78rem', color:'var(--text-dim)'}}>
                         {dilemmaState ? 
                            dilemmaState.msg.includes('Evaluasi Pilihan B') ? <><strong style={{color:'var(--emerald)', display:'block', marginBottom:'2px'}}>Evaluasi Pilihan B (Sangat Etis):</strong> Deklarasi eksplisit menjaga kejujuran ilmiah dan mematuhi etika akademik.</>
                            : dilemmaState.msg.includes('Pilihan A') ? <><strong style={{color:'var(--amber)', display:'block', marginBottom:'2px'}}>Evaluasi Pilihan A:</strong> Menyembunyikan penggunaan AI merusak transparansi dan integritas akademik.</>
                            : <><strong style={{color:'var(--red)', display:'block', marginBottom:'2px'}}>Evaluasi Pilihan C (Pelanggaran Berat):</strong> Merupakan plagiarisme langsung yang melanggar hak cipta.</>
                          : 'Pilih keputusan di kiri untuk evaluasi dampaknya.'}
                       </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Prompt Parser */}
              {activeTab === 'prompt' && (
                <div className="sandbox-tab-content active" id="tab-prompt">
                  <div className="lab-inner">
                    <div className="lab-box">
                      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px'}}>
                        <span style={{fontSize:'0.82rem', fontWeight:700, color:'var(--navy)'}}>Input Prompt Text:</span>
                        <button className="btn-lab-ghost" style={{fontSize:'0.74rem', padding:'4px 12px'}} onClick={() => setPromptText('Bertindak sebagai tutor AI beretika. Jelaskan konteks definisi Machine Learning dalam format tabel ringkas untuk siswa SMA, tanpa meminta password atau data rahasia pengguna.')}>
                          <i className="fa-solid fa-wand-magic-sparkles mr-1"></i> Muat Contoh Aman
                        </button>
                      </div>
                      <textarea id="prompt-input" value={promptText} onChange={(e) => setPromptText(e.target.value)} rows="6" placeholder="Ketik prompt kamu di sini..." style={{width:'100%', padding:'12px', border:'1px solid var(--line)', borderRadius:'10px', fontFamily:'var(--font-mono)', fontSize:'0.82rem', color:'var(--navy)', background:'var(--bg)', resize:'vertical', outline:'none'}}></textarea>
                      <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.78rem', color:'var(--text-dim)', marginTop:'8px'}}>
                        <span>Status: <strong style={{color:promptStats.safe ? 'var(--emerald)' : 'var(--red)'}}>{promptStats.safe ? 'Aman & Terstruktur' : '⚠️ Kata Kunci Berisiko'}</strong></span>
                        <span id="prompt-chars">{promptText.length} karakter</span>
                      </div>
                    </div>
                    <div className="lab-sidebar">
                      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}} className="lab-sidebar-title">
                        Engine Parser <span className="score-pill">Skor: <strong style={{color:'var(--indigo)'}}>{promptStats.score}</strong>/100</span>
                      </div>
                      <div className="parser-output" style={{wordBreak:'break-word'}} dangerouslySetInnerHTML={{__html: promptText ? promptText.replace(/(bertindak sebagai|konteks|jelaskan|ringkas|format|tabel)/gi, '<mark style="background:rgba(16,185,129,0.18); color:var(--emerald); font-weight:bold; border-radius:3px; padding:0 3px;">$1</mark>').replace(/(password|rahasia|nik|rekening|curi|hack)/gi, '<mark style="background:rgba(239,68,68,0.15); color:var(--red); font-weight:bold; border-radius:3px; padding:0 3px;">$1</mark>') : 'Hasil parsing akan muncul di sini...'}}></div>
                      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', fontSize:'0.75rem'}}>
                        <div style={{padding:'8px 10px', border:'1px solid var(--line)', borderRadius:'8px', display:'flex', justifyContent:'space-between', background:'var(--white)'}}><span>Konteks</span><span>{promptStats.ctx ? '✅' : '⬜'}</span></div>
                        <div style={{padding:'8px 10px', border:'1px solid var(--line)', borderRadius:'8px', display:'flex', justifyContent:'space-between', background:'var(--white)'}}><span>Instruksi</span><span>{promptStats.ins ? '✅' : '⬜'}</span></div>
                        <div style={{padding:'8px 10px', border:'1px solid var(--line)', borderRadius:'8px', display:'flex', justifyContent:'space-between', background:'var(--white)'}}><span>Format</span><span>{promptStats.fmt ? '✅' : '⬜'}</span></div>
                        <div style={{padding:'8px 10px', border:'1px solid var(--line)', borderRadius:'8px', display:'flex', justifyContent:'space-between', background:'var(--white)'}}><span>Keamanan</span><span>{promptStats.safe ? '✅' : '❌'}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Rewards Section */}
          <div className="hub-section" id="hub-rewards">
             <div className="hub-section-head">
               <div>
                 <div className="hub-section-title">E-Badge &amp; Sertifikat</div>
               </div>
               <div className="hub-section-sub">Kumpulkan 5 badge & klaim sertifikat digital</div>
             </div>
             <div className="badges-grid" id="badges-grid">
               {BADGE_DATA.map(b => {
                 const unlocked = state.badges.includes(b.id);
                 return (
                   <div key={b.id} className={`badge-hub-card ${unlocked ? 'unlocked' : ''}`}>
                     <div className="badge-hub-icon" style={{background: unlocked ? b.bg : 'rgba(30,41,59,0.06)', color: unlocked ? '#FFF' : 'var(--text-dim)', boxShadow: unlocked ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'}}>
                       {unlocked ? <i className={`fa-solid ${b.icon}`}></i> : <i className="fa-solid fa-lock"></i>}
                     </div>
                     <div className="badge-hub-name">{b.name}</div>
                     <div className="badge-hub-req">{b.req}</div>
                     <div className={`badge-hub-status ${unlocked ? 'unlocked' : 'locked'}`}>
                       {unlocked ? <><i className="fa-solid fa-circle-check"></i> Terbuka</> : <><i className="fa-solid fa-lock"></i> Terkunci</>}
                     </div>
                     <div className="badge-hub-desc">{b.desc}</div>
                   </div>
                 );
               })}
             </div>
             
             <div className="panel" style={{padding:'24px', marginTop:'20px', display:'flex', flexWrap:'wrap', alignItems:'center', gap:'20px', justifyContent:'space-between'}}>
               <div>
                 <div style={{fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.05rem', marginBottom:'4px'}}>Generator E-Sertifikat Digital</div>
                 <div style={{fontSize:'0.82rem', color:'var(--text-dim)'}}>Selesaikan semua modul dan kumpulkan minimum 4 badge untuk membuka fitur ini.</div>
               </div>
               <div className="cert-form-row">
                 <input type="text" id="cert-name" className="cert-input" placeholder="Nama Lengkap Kamu" value={certName} onChange={e => setCertName(e.target.value)} />
                 <button className="btn-cert" id="cert-btn" onClick={() => { if(!certName) showToast('Masukkan nama lengkap!', 'error'); else showToast(`🎓 Selamat ${certName}! Sertifikat Lit-GO dibuat.`, 'success'); }} disabled={state.badges.length < 4}>
                   <i className="fa-solid fa-download"></i> Unduh Sertifikat
                 </button>
               </div>
             </div>
          </div>
          
          <div style={{height:'60px'}}></div>
        </div>
      </main>
      
      {/* MODALS */}
      {isRadarModalOpen && (
        <div className="modal-overlay" id="modal-radar">
          <div className="modal-box">
            <div className="modal-head">
              <div className="modal-title">Pre-Test Asesmen Radar</div>
              <button className="modal-close" onClick={() => setRadarModalOpen(false)}>✕</button>
            </div>
            <p style={{fontSize:'0.84rem', color:'var(--text-dim)', marginBottom:'20px'}}>Jawab 8 pertanyaan (skala 1–5) untuk mengkalibrasi radar kecakapan awal kamu.</p>
            <div style={{display:'flex', flexDirection:'column', gap:'16px', fontSize:'0.84rem'}}>
               {[
                 "Saya memahami konsep dasar dan keterbatasan sistem AI.",
                 "Saya mengetahui risiko fenomena halusinasi data pada AI.",
                 "Saya selalu memeriksa hak cipta sebelum mempublikasikan konten.",
                 "Saya tidak pernah memasukkan data rahasia ke dalam prompt publik.",
                 "Saya mampu menyusun prompt dengan konteks, instruksi & format jelas.",
                 "Saya terbiasa menggunakan teknik few-shot & persona dalam prompting.",
                 "Saya selalu melakukan fact-checking terhadap klaim dari AI.",
                 "Saya mampu mengenali kejanggalan visual pada foto deepfake."
               ].map((q, i) => (
                 <div key={i}>
                   <label style={{fontWeight:600, display:'block', marginBottom:'6px'}}>{i+1}. {q}</label>
                   <input type="range" min="1" max="5" value={radarAnswers[i]} onChange={(e) => {
                     const newAns = [...radarAnswers];
                     newAns[i] = parseInt(e.target.value);
                     setRadarAnswers(newAns);
                   }} />
                 </div>
               ))}
            </div>
            <div className="modal-footer">
              <button className="btn-modal-cancel" onClick={() => setRadarModalOpen(false)}>Batal</button>
              <button className="btn-modal-ok" onClick={handleRadarSubmit}>Simpan &amp; Update Radar</button>
            </div>
          </div>
        </div>
      )}

      {isModuleModalOpen && activeMod && (
        <div className="modal-overlay" id="modal-module">
          <div className="modal-box">
            <div className="modal-head">
              <div>
                <span id="mod-modal-tag" style={{fontFamily:'var(--font-mono)', fontSize:'0.7rem', background:'rgba(59,130,246,0.1)', color:'var(--indigo)', padding:'4px 9px', borderRadius:'6px', marginRight:'8px', fontWeight:600}}>
                  {activeMod.tag}
                </span>
                <span className="modal-title" id="mod-modal-title">{activeMod.title}</span>
              </div>
              <button className="modal-close" onClick={() => setModuleModalOpen(false)}>✕</button>
            </div>
            
            {!showQuizView ? (
              <div id="mod-read-view">
                <div id="mod-modal-content" style={{background:'var(--bg)', border:'1px solid var(--line)', borderRadius:'12px', padding:'18px', fontSize:'0.88rem', color:'var(--navy-light)', lineHeight:1.7}} 
                  dangerouslySetInnerHTML={{__html: `<strong style="color:var(--indigo); display:block; margin-bottom:8px;"><i class="fa-solid fa-book-open mr-1"></i> Materi Pembelajaran:</strong>${activeMod.reading}`}}></div>
                <div style={{display:'flex', justifyContent:'flex-end', marginTop:'20px'}}>
                  <button className="btn-modal-ok" onClick={() => setShowQuizView(true)}>Lanjut ke Kuis →</button>
                </div>
              </div>
            ) : (
              <div id="mod-quiz-view">
                <div style={{background:'var(--bg)', border:'1px solid var(--line)', borderRadius:'12px', padding:'18px'}}>
                  <div style={{fontSize:'0.72rem', fontWeight:700, color:'var(--amber)', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'8px'}}>Kuis Evaluasi</div>
                  <p id="quiz-q" style={{fontWeight:700, fontSize:'0.95rem', color:'var(--navy)', marginBottom:'14px'}}>{activeMod.quiz.q}</p>
                  <div id="quiz-opts" style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                    {activeMod.quiz.opts.map((opt, i) => (
                      <button key={i} className="quiz-option" onClick={() => answerQuiz(i === activeMod.quiz.ans)}>{opt}</button>
                    ))}
                  </div>
                  {quizFeedback.show && (
                    <div id="quiz-fb" className={`quiz-feedback ${quizFeedback.correct ? 'correct' : 'wrong'}`} style={{marginTop:'14px', display:'block'}}>
                      {quizFeedback.correct ? <><i className="fa-solid fa-circle-check mr-1"></i> {quizFeedback.msg}</> : <><i className="fa-solid fa-triangle-exclamation mr-1"></i> {quizFeedback.msg}</>}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {isConfirmModalOpen && (
        <div className="modal-overlay" id="modal-confirm">
          <div className="modal-box" style={{maxWidth:'420px', textAlign:'center'}}>
            <div style={{width:'52px', height:'52px', borderRadius:'50%', background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.25)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', fontSize:'1.3rem', color:'var(--red)'}}>
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <div className="modal-title" style={{justifyContent:'center', marginBottom:'8px'}}>Konfirmasi Reset Data</div>
            <p style={{fontSize:'0.86rem', color:'var(--text-dim)', lineHeight:1.6}}>Seluruh progres, badge, dan skor akan dihapus permanen dari browser kamu. Apakah kamu yakin?</p>
            <div className="modal-footer" style={{justifyContent:'center'}}>
              <button className="btn-modal-cancel" onClick={() => setConfirmModalOpen(false)}>Batal</button>
              <button className="btn-modal-danger" onClick={handleReset}>Ya, Reset Sekarang</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}