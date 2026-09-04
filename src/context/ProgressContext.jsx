import React, { createContext, useContext, useState, useEffect } from 'react';

// Data Silabus & Badge Data (Tanpa teks reading yang panjang)
export const MODULES = [
  { id:1, tag:"Level 1", title:'Kenalan dengan "Otak" AI', topics:"Definisi AI, sejarah singkat, mitos vs fakta, keterbatasan & halusinasi.", badge:"Pionir AI", icon:'fa-brain', iconBg:'linear-gradient(135deg, #8B5CF6, #6D28D9)',
    quiz:{ q:"Apa yang dimaksud dengan fenomena 'Halusinasi' pada model AI?", opts:["AI mengalami kerusakan sistem total dan mati.","AI menghasilkan fakta palsu yang terdengar ilmiah & meyakinkan.","AI bisa membaca emosi dan pikiran pengguna."], ans:1 }},
  { id:2, tag:"Level 2", title:"Kompas Etika & Privasi", topics:"Hak cipta, plagiarisme, privasi data, bias AI, identifikasi deepfake.", badge:"Penjaga Etika", icon:'fa-shield-halved', iconBg:'linear-gradient(135deg, #0EA5E9, #0284C7)',
    quiz:{ q:"Data mana yang HARUS DIRAHASIAKAN dan TIDAK BOLEH dimasukkan ke prompt AI publik?", opts:["Rangkuman makalah sejarah Indonesia 1945.","NIK dan kata sandi perbankan.","Pertanyaan rumus matematika fisika."], ans:1 }},
  { id:3, tag:"Level 3", title:"Seni Berbicara dengan Mesin", topics:"Anatomi prompt (konteks, instruksi, format, persona), teknik zero-shot vs few-shot.", badge:"Master Prompt", icon:'fa-terminal', iconBg:'linear-gradient(135deg, #6366F1, #4F46E5)',
    quiz:{ q:"Elemen apa yang menentukan gaya bahasa & perspektif sudut pandang AI?", opts:["Format Output","Panjang karakter teks","Persona / Peran AI"], ans:2 }},
  { id:4, tag:"Level 4", title:"Asisten Produktivitas AI", topics:"Tips riset anti-hoaks, AI sebagai tutor pribadi, & email profesional.", badge:"Inovator Produktif", icon:'fa-rocket', iconBg:'linear-gradient(135deg, #EC4899, #F43F5E)',
    quiz:{ q:"Cara paling etis menggunakan AI untuk tugas akademis?", opts:["Menyalin 100% jawaban AI dan mengakuinya murni sendiri.","AI sebagai teman diskusi & outline, lalu tulis sendiri dan deklarasikan penggunaan AI.","Menyuruh AI buatkan seluruh skripsi dari bab 1 hingga 5."], ans:1 }},
  { id:5, tag:"Level 5", title:"Eksplorasi AI Kreatif", topics:"Etika text-to-image, hak cipta karya visual, & prompting visual.", badge:"Kreator Beretika", icon:'fa-palette', iconBg:'linear-gradient(135deg, #10B981, #059669)',
    quiz:{ q:"Tindakan mana yang melanggar etika dalam pembuatan gambar AI?", opts:["Prompt pencahayaan fotorealistik alam.","Membuat foto deepfake tokoh publik untuk menyebarkan fitnah.","Membuat ilustrasi pemandangan gaya cyberpunk."], ans:1 }},
  { id:6, tag:"Level 6", title:"Bertahan di Era AI", topics:"Critical thinking, empati, adaptasi karier masa depan.", badge:"Cendekia Digital", icon:'fa-graduation-cap', iconBg:'linear-gradient(135deg, #F59E0B, #D97706)',
    quiz:{ q:"Apa peran utama manusia dalam hubungannya dengan teknologi AI?", opts:["Pasrah dan serahkan seluruh keputusan ke AI.","Pemegang kendali utama (pilot) yang mengevaluasi secara kritis output AI.","Menolak seluruh penggunaan AI di kehidupan."], ans:1 }},
];

export const BADGE_DATA = [
  { id:1, icon:'fa-award', bg:'linear-gradient(135deg, #F59E0B, #D97706)', name:'Pionir AI', req:'Asesmen Radar & Fondasi AI', desc:'Lencana pembuka atas keberhasilan menyelesaikan asesmen awal dan memahami prinsip fondasi kecerdasan buatan.' },
  { id:2, icon:'fa-shield-halved', bg:'linear-gradient(135deg, #0EA5E9, #0284C7)', name:'Penjaga Etika', req:'Deteksi Deepfake & Etika', desc:'Lencana kehormatan atas pemahaman etika data, privasi, serta kecakapan mendeteksi rekayasa deepfake.' },
  { id:3, icon:'fa-feather-pointed', bg:'linear-gradient(135deg, #6366F1, #4F46E5)', name:'Master Prompt', req:'Prompt Safety & Komunikasi', desc:'Lencana keahlian menyusun instruksi prompt yang aman, terstruktur, relevan, serta bebas dari bias.' },
  { id:4, icon:'fa-rocket', bg:'linear-gradient(135deg, #EC4899, #F43F5E)', name:'Inovator Produktif', req:'Asistensi & Workflow Kreatif', desc:'Lencana kreativitas dalam memanfaatkan AI secara efektif untuk efisiensi riset, tugas, dan alur kerja harian.' },
  { id:5, icon:'fa-graduation-cap', bg:'linear-gradient(135deg, #10B981, #059669)', name:'Cendekia Digital', req:'Sertifikasi & Kelulusan Akhir', desc:'Lencana kualifikasi tertinggi atas penyelesaian seluruh kurikulum etika AI dan kelulusan evaluasi akhir.' },
];

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [state, setState] = useState({
    radar: [0, 0, 0, 0],
    hasRadar: false,
    doneModules: [],
    badges: [],
  });

  const [toastMsg, setToastMsg] = useState(null);
  const [toastType, setToastType] = useState('info');
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  useEffect(() => {
    const s = localStorage.getItem('litgo_complete_v1');
    if (s) {
      try {
        setState(JSON.parse(s));
      } catch (err) {
        console.error('Failed to parse litgo_complete_v1', err);
      }
    }
  }, []);

  const saveState = (newState) => {
    setState(newState);
    localStorage.setItem('litgo_complete_v1', JSON.stringify(newState));
  };

  const showToast = (msg, type = 'info') => {
    setToastMsg(msg);
    setToastType(type);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleReset = () => {
    localStorage.removeItem('litgo_complete_v1');
    window.location.reload();
  };

  const doneCount = state.doneModules ? state.doneModules.length : 0;
  const badgeCount = state.badges ? state.badges.length : 0;
  const pts = doneCount * 250 + badgeCount * 100;
  const lv = Math.max(1, Math.floor(doneCount / 2) + 1);
  const expPct = Math.round((doneCount / 6) * 100);

  return (
    <ProgressContext.Provider
      value={{
        state,
        saveState,
        showToast,
        toastMsg,
        toastType,
        isConfirmModalOpen,
        setConfirmModalOpen,
        handleReset,
        doneCount,
        badgeCount,
        pts,
        lv,
        expPct,
        MODULES,
        BADGE_DATA,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}