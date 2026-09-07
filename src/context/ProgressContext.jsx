import React, { createContext, useContext, useState, useEffect } from 'react';

// Data Silabus & Badge Data (6 Modul Utama x 4 Langkah Penyelesaian Unik + Kuis Evaluasi dari Dokumen Resmi Melek AI)
export const MODULES = [
  {
    id: 1,
    tag: "Level 1",
    title: 'Kenalan dengan "Otak" Buatan',
    topics: "Turing Test (1950), Dartmouth 1956, Transformer (Vaswani 2017), Prediksi Token, & Halusinasi AI.",
    badge: "Pionir AI",
    icon: "fa-brain",
    iconBg: "linear-gradient(135deg, #2563EB, #1D4ED8)",
    quiz: {
      q: "Apa inovasi utama arsitektur Transformer (Vaswani dkk., 2017) yang membuat perkembangan AI melesat tajam?",
      opts: [
        "Mengubah nama Imitation Game menjadi Turing Test.",
        "Memungkinkan AI memproses kata secara berurutan agar hasilnya lebih rapi.",
        "Memungkinkan AI memproses banyak data bahasa secara paralel dalam waktu singkat lewat mekanisme self-attention.",
        "Memberikan AI kemampuan untuk memiliki perasaan dan kesadaran sendiri."
      ],
      ans: 2,
      explanation: "Transformer membuang pemrosesan berurutan (seperti pada RNN) dan menggantinya dengan self-attention, sehingga seluruh kalimat bisa diproses bersamaan secara paralel — jauh lebih cepat dan efisien (Vaswani dkk., 2017)."
    },
    steps: [
      {
        id: "1-1",
        type: "dialogue",
        stepNum: 1,
        title: "Percakapan Interaktif: Dari Turing ke Transformer",
        tag: "Langkah 1 • Sejarah & Arsitektur AI",
        reading: "Pada 1950, Alan Turing mengusulkan <b>Imitation Game (Turing Test)</b> untuk menguji kecerdasan mesin. Lompatan besar terjadi pada 2017 saat Vaswani dkk. merilis arsitektur <b>Transformer</b> berbasis <i>self-attention</i> yang memproses bahasa secara paralel.",
        keyTakeaway: "Transformer adalah fondasi teknis LLM modern seperti ChatGPT, Claude, dan Gemini."
      },
      {
        id: "1-2",
        type: "matching",
        stepNum: 2,
        title: "Matching Game: Istilah & Konsep Kunci AI",
        tag: "Langkah 2 • Pasangan Konsep Ilmiah",
        pairs: [
          { left: "Transformer (2017)", right: "Self-Attention Paralel" },
          { left: "Turing Test (1950)", right: "Imitation Game Teks" },
          { left: "Halusinasi AI", right: "Fakta Palsu Meyakinkan" },
          { left: "LLM Modern", right: "Prediksi Probabilitas Kata" }
        ]
      },
      {
        id: "1-3",
        type: "tebakgambar1",
        stepNum: 3,
        title: "Tebak Gambar: Prediksi Probabilitas Token",
        tag: "Langkah 3 • Logika Probabilitas",
        clueIcons: ["🧠", "📊", "🎲"],
        clueText: "Otak AI + Diagram Grafik Statistik + Dadu Probabilitas",
        q: "Bagaimanakah sebenarnya cara kerja model bahasa besar (LLM) seperti ChatGPT?",
        opts: [
          "AI berpikir menggunakan kesadaran batin dan perasaan.",
          "AI bekerja memprediksi token kata berikutnya berdasarkan probabilitas statistik data latih.",
          "AI adalah entitas serba tahu yang tak pernah salah."
        ],
        ans: 1
      },
      {
        id: "1-4",
        type: "bughunter",
        stepNum: 4,
        title: "Detektif Halusinasi: Kasus Halusinasi Hukum",
        tag: "Langkah 4 • Detektif Halusinasi",
        caseTitle: "Audit Putusan Hukum AI",
        caseDesc: "Berdasarkan Pasal 999 UU Literasi Digital 1945, seluruh sistem AI wajib diserahkan kepada Kementerian Kebudayaan Kuno dengan sanksi pidana."
      }
    ]
  },
  {
    id: 2,
    tag: "Level 2",
    title: "Kompas Etika, Keamanan & Privasi",
    topics: "UNESCO Ethics 2021, SE Menkominfo No. 9/2023, Bias Gender Shades (Buolamwini), Word2Vec, & C2PA.",
    badge: "Penjaga Etika",
    icon: "fa-shield-halved",
    iconBg: "linear-gradient(135deg, #0EA5E9, #0284C7)",
    quiz: {
      q: "Perbedaan mendasar pendekatan C2PA dibanding deteksi forensik terhadap konten sintetis (deepfake) adalah...",
      opts: [
        "C2PA bekerja reaktif setelah gambar viral, sedangkan forensik bekerja proaktif sejak awal.",
        "C2PA menyematkan metadata asal-usul sejak media dibuat (proaktif), sedangkan forensik menganalisis kejanggalan piksel setelah tersebar (reaktif).",
        "Keduanya persis sama, hanya beda nama merek.",
        "C2PA hanya bisa dipakai untuk video, bukan gambar."
      ],
      ans: 1,
      explanation: "C2PA bersifat proaktif dengan menyematkan metadata asal-usul (label nutrisi) sejak awal, sedangkan forensik digital menganalisis artefak piksel setelah media beredar (reaktif)."
    },
    steps: [
      {
        id: "2-1",
        type: "swipebin",
        stepNum: 1,
        title: "Data Privacy Swipe: Lindungi Data Pribadi",
        tag: "Langkah 1 • Pemilahan Privasi Data",
        reading: "SE Menkominfo No. 9/2023 dan UU PDP menegaskan larangan memasukkan NIK, password, nomor rekening, dan rekam medis ke AI publik."
      },
      {
        id: "2-2",
        type: "tebakgambar2",
        stepNum: 2,
        title: "Tebak Gambar: Artefak Visual Deepfake & C2PA",
        tag: "Langkah 2 • Deteksi Media Sintetis",
        clueIcons: ["📸", "🖐️", "👁️"],
        clueText: "Kamera Foto + Tangan Berjari 6 + Pupil Mata Asimetris",
        q: "Manakah ciri utama manipulasi foto sintetis AI yang sering terdeteksi pada forensik visual?",
        opts: [
          "Warna pakaian subjek terlalu cerah.",
          "Anatomi abnormal seperti jari berlebih dan pantulan cahaya pupil mata asimetris.",
          "Latar belakang terlihat sangat indah."
        ],
        ans: 1
      },
      {
        id: "2-3",
        type: "matching",
        stepNum: 3,
        title: "Matching Game: Skandal Bias Algoritma",
        tag: "Langkah 3 • Riset Bias AI",
        pairs: [
          { left: "Gender Shades (2018)", right: "Error 34,7% Kulit Gelap" },
          { left: "Word2Vec Bias (2016)", right: "Stereotip Gender Linguistik" },
          { left: "Koalisi C2PA", right: "Label Nutrisi Provenance Media" },
          { left: "SE Kominfo 9/2023", right: "Pedoman Etika AI Indonesia" }
        ]
      },
      {
        id: "2-4",
        type: "dialogue",
        stepNum: 4,
        title: "Permainan: Asli atau Rekayasa?",
        tag: "Langkah 4 • Audit Bukti C2PA",
        reading: "Dalam sesi 'Asli atau Rekayasa', analis memeriksa apakah sebuah media sintetis dibuat dengan AI atau riil, menggunakan pendekatan bukti asal-usul C2PA."
      }
    ]
  },
  {
    id: 3,
    tag: "Level 3",
    title: "Seni Berbicara dengan Mesin",
    topics: "4 Pilar Prompting (Konteks, Instruksi, Format, Persona), Zero-Shot, Few-Shot, CoT (Wei 2022), & ReAct (Yao 2022).",
    badge: "Master Prompt",
    icon: "fa-terminal",
    iconBg: "linear-gradient(135deg, #6366F1, #4F46E5)",
    quiz: {
      q: "Apa yang membedakan paradigma ReAct (Yao dkk., 2022) dari Chain-of-Thought biasa?",
      opts: [
        "ReAct hanya bisa dipakai untuk menulis karya fiksi.",
        "ReAct menggabungkan penalaran dengan tindakan nyata seperti memanggil alat eksternal (pencarian web/API), bukan sekadar bernalar dalam teks.",
        "ReAct tidak membutuhkan instruksi prompt sama sekali.",
        "ReAct hanya berfungsi secara offline tanpa internet."
      ],
      ans: 1,
      explanation: "ReAct (Synergizing Reasoning and Acting) memungkinkan model AI tidak hanya bernalar langkah demi langkah tetapi juga mengambil tindakan nyata memanggil alat eksternal."
    },
    steps: [
      {
        id: "3-1",
        type: "tileorder",
        stepNum: 1,
        title: "Bengkel Prompt: 4 Pilar Instruksi Presisi",
        tag: "Langkah 1 • Formula 4 Pilar",
        checkpoints: [
          "Persona: Berikan peran keahlian spesifik kepada AI",
          "Konteks: Jelaskan latar belakang dan audiens target",
          "Instruksi: Berikan tugas konkret dengan batasan tegas",
          "Format Output: Tentukan bentuk luaran seperti tabel atau JSON"
        ]
      },
      {
        id: "3-2",
        type: "tebakgambar3",
        stepNum: 2,
        title: "Tebak Gambar: Few-Shot In-Context Prompting",
        tag: "Langkah 2 • Pola Few-Shot",
        clueIcons: ["🎯", "📝", "✨"],
        clueText: "Target Presisi + Contoh Input-Output + Hasil Sempurna",
        q: "Teknik prompting apakah yang menyertakan 2-3 contoh pasangan input-output sebelum meminta AI menjawab kueri sesungguhnya?",
        opts: [
          "Zero-Shot Prompting (Tanpa Contoh)",
          "Few-Shot Prompting (Brown dkk., GPT-3 2020)",
          "Random Sampling Prompting"
        ],
        ans: 1
      },
      {
        id: "3-3",
        type: "tileorder",
        stepNum: 3,
        title: "Chain-of-Thought: Penalaran Bertahap",
        tag: "Langkah 3 • CoT Reasoning",
        checkpoints: [
          "Jabarkan premis dan data masalah secara terurai",
          "Kalkulasikan penalaran langkah demi langkah (Step-by-Step)",
          "Verifikasi konsistensi logika sebelum menarik konklusi"
        ]
      },
      {
        id: "3-4",
        type: "dialogue",
        stepNum: 4,
        title: "ReAct Paradigm: Reasoning + Acting Agent",
        tag: "Langkah 4 • Alur Agen ReAct",
        reading: "Paradigma ReAct (Yao dkk., 2022) menjalankan alur: Thought (Bernalar) ➔ Action (Panggil Search API/Kalkulator) ➔ Observation (Amati Hasil) ➔ Final Answer."
      }
    ]
  },
  {
    id: 4,
    tag: "Level 4",
    title: "AI sebagai Asisten Produktivitas",
    topics: "RAG (Lewis 2020 Meta AI), Memori Parametrik vs Non-Parametrik, UNESCO Guidance 2023, & Tutor Sokratik.",
    badge: "Inovator Produktif",
    icon: "fa-rocket",
    iconBg: "linear-gradient(135deg, #EC4899, #F43F5E)",
    quiz: {
      q: "Mengapa arsitektur Retrieval-Augmented Generation (RAG) sangat efektif mencegah halusinasi AI?",
      opts: [
        "Karena RAG melatih ulang seluruh parameter jaringan saraf setiap ada pertanyaan baru.",
        "Karena AI dipaksa merumuskan jawaban dari dokumen fakta eksternal yang disuntikkan saat itu juga, bukan sekadar menebak dari ingatan internal.",
        "Karena RAG menghapus pertanyaan yang dianggap rumit.",
        "Karena RAG memblokir kemampuan AI menghasilkan teks baru."
      ],
      ans: 1,
      explanation: "RAG (Lewis dkk., 2020 Meta AI) mengambil dokumen relevan dari basis data eksternal (non-parametrik) lalu menyuntikkannya sebagai konteks faktual ke model generatif."
    },
    steps: [
      {
        id: "4-1",
        type: "matching",
        stepNum: 1,
        title: "Simulasi RAG Manusia: Dua Jenis Memori",
        tag: "Langkah 1 • Konsep Inti RAG",
        pairs: [
          { left: "Memori Parametrik", right: "Bobot Tersimpan di Model" },
          { left: "Memori Non-Parametrik", right: "Basis Data Dokumen Eksternal" },
          { left: "Retriever System", right: "Mengambil Dokumen Relevan" },
          { left: "Generator System", right: "Merangkum Jawaban Berbasis Fakta" }
        ]
      },
      {
        id: "4-2",
        type: "tileorder",
        stepNum: 2,
        title: "Rantai Protokol Fact-Checking",
        tag: "Langkah 2 • Verifikasi Fakta",
        checkpoints: [
          "Verifikasi klaim numerik dan sitasi ke sumber resmi primer",
          "Uji konsistensi dengan counter-prompt kritis",
          "Cek DOI dan repositori terakreditasi sebelum mengutip"
        ]
      },
      {
        id: "4-3",
        type: "dialogue",
        stepNum: 3,
        title: "Mitra Sokratik & Zero-Drafting (UNESCO 2023)",
        tag: "Langkah 3 • Integritas Akademik",
        reading: "UNESCO Guidance (2023) menganjurkan AI sebagai 'Tutor Sokratik' (pengkritik celah argumen) dan 'Zero-Drafting' (pemantik ide draf kasar), bukan penulis penuh."
      },
      {
        id: "4-4",
        type: "tebakgambar4",
        stepNum: 4,
        title: "Tebak Gambar: Etika Riset Bebas Plagiarisme",
        tag: "Langkah 4 • Nalar Kritis Akademis",
        clueIcons: ["🔍", "📰", "🛡️"],
        clueText: "Kaca Pembesar + Berita Primer + Perisai Integritas",
        q: "Tindakan wajib pertama setelah menerima rangkuman karya ilmiah dari AI adalah...",
        opts: [
          "Langsung menyalin dan mengumpulkannya ke dosen.",
          "Memverifikasi setiap klaim spesifik dan nomor sitasi ke jurnal sumber primer aslinya.",
          "Menolak membaca materi sama sekali."
        ],
        ans: 1
      }
    ]
  },
  {
    id: 5,
    tag: "Level 5",
    title: "Eksplorasi AI Kreatif",
    topics: "Enam Sumbu Visual Prompt (Ho 2020 Diffusion), Hak Cipta US Copyright Office, EU AI Act Opt-Out, & Lisensi India.",
    badge: "Kreator Beretika",
    icon: "fa-palette",
    iconBg: "linear-gradient(135deg, #10B981, #059669)",
    quiz: {
      q: "Menurut panduan resmi U.S. Copyright Office, syarat mutlak agar karya yang dibantu AI dapat memperoleh perlindungan hak cipta adalah...",
      opts: [
        "Membayar biaya langganan komersial ke penyedia model AI.",
        "Menjadi orang pertama yang mengetikkan prompt tanpa menyentuh hasil gambarnya.",
        "Terdapat unsur kepengarangan manusia (human authorship) berupa modifikasi kreatif yang signifikan dan substantif atas karya tersebut.",
        "Semua karya AI dilarang keras dilindungi dalam kondisi apa pun."
      ],
      ans: 2,
      explanation: "U.S. Copyright Office menegaskan bahwa hanya elemen yang dihasilkan dari kepengarangan manusia (human authorship) yang dapat didaftarkan hak ciptanya."
    },
    steps: [
      {
        id: "5-1",
        type: "tileorder",
        stepNum: 1,
        title: "Sutradara AI: 6 Sumbu Parameter Visual",
        tag: "Langkah 1 • Formula 6 Sumbu",
        checkpoints: [
          "Subjek Utama yang dideskripsikan tanpa ambiguitas",
          "Gaya & Medium Seni (cat air, 35mm film, atau 3D render)",
          "Pencahayaan & Suasana (chiaroscuro, golden hour)",
          "Komposisi & Sudut Kamera (rule of thirds, bird-eye)",
          "Palet Warna (monokromatik sinematik, neon cyberpunk)",
          "Pengubah Kualitas & Ketajaman Detail Rendering"
        ]
      },
      {
        id: "5-2",
        type: "matching",
        stepNum: 2,
        title: "Matching Game: Lanskap Regulasi Hak Cipta AI",
        tag: "Langkah 2 • Hukum & Etika Hak Cipta",
        pairs: [
          { left: "U.S. Copyright Office", right: "Syarat Mutlak Human Authorship" },
          { left: "Uni Eropa (EU AI Act)", right: "Hak Opt-Out bagi Kreator Asli" },
          { left: "India (Kerangka 2025)", right: "One Nation One License Payment" },
          { left: "Diffusion Model (DDPM)", right: "Denoising Noise Bertahap" }
        ]
      },
      {
        id: "5-3",
        type: "tebakgambar5",
        stepNum: 3,
        title: "Tebak Gambar: Seni Difusi Probabilistik",
        tag: "Langkah 3 • Model Difusi Visual",
        clueIcons: ["🎨", "🌆", "🤖"],
        clueText: "Kuas Cat + Kota Masa Depan + Neon Cyberpunk",
        q: "Bagaimana cara kerja model difusi (DDPM Ho dkk., 2020) menghasilkan gambar dari teks?",
        opts: [
          "Mengambil potongan foto berhak cipta orang lain di Google Image.",
          "Menghilangkan noise acak (denoising) secara terarah dan bertahap hingga terbentuk visual utuh.",
          "Menggabungkan screenshot video kamera otomatis."
        ],
        ans: 1
      },
      {
        id: "5-4",
        type: "dialogue",
        stepNum: 4,
        title: "Sidang Mediasi Hak Cipta AI",
        tag: "Langkah 4 • Simulasi Mediasi Hak Cipta",
        reading: "Dalam simulasi sidang mediasi hak cipta, kreator harus membuktikan sejauh mana sentuhan modifikasi manusia (human authorship) telah ditambahkan ke atas karya mentah AI."
      }
    ]
  },
  {
    id: 6,
    tag: "Level 6",
    title: "Bertahan & Berdaya di Era AI",
    topics: "David Autor MIT (2015) Tugas Rutin vs Fleksibel, Paradoks Polanyi 1966 (Tacit Knowledge), & 3 Human Skills.",
    badge: "Cendekia Digital",
    icon: "fa-graduation-cap",
    iconBg: "linear-gradient(135deg, #F59E0B, #D97706)",
    quiz: {
      q: "Menurut konsep Paradoks Polanyi (1966) yang diulas ekonom David Autor (2015), mengapa AI tidak bisa sepenuhnya menggantikan keahlian manusia?",
      opts: [
        "Karena daya komputasi awan terlalu mahal bagi industri.",
        "Karena banyak pengetahuan dan intuisi manusia bersifat tacit (tersirat) — 'kita tahu lebih banyak dari yang bisa kita katakan' — sehingga sulit diformalkan ke aturan eksplisit.",
        "Karena hukum perburuhan melarang penggunaan mesin.",
        "Karena AI selalu gagal dalam tugas rutin."
      ],
      ans: 1,
      explanation: "Paradoks Polanyi menjelaskan bahwa tacit knowledge manusia (seperti empati, intuisi situasi, pertimbangan etis) tidak dapat diterjemahkan menjadi aturan eksplisit bagi algoritma statistik."
    },
    steps: [
      {
        id: "6-1",
        type: "matching",
        stepNum: 1,
        title: "Permainan: Manusia vs Mesin (Sortir Polanyi)",
        tag: "Langkah 1 • Paradoks Polanyi Sort",
        pairs: [
          { left: "Hitung Slip Gaji & Data Entry", right: "Otomatisasi Penuh (Rutin Berpola)" },
          { left: "Draf Awal Kode & Ringkasan", right: "Kolaborasi Manusia-AI (Augmentasi)" },
          { left: "Vonis Hakim & Konseling Duka", right: "Wajib Manusia (Empati & Moralitas)" },
          { left: "Intuisi Situasional Tim", right: "Tacit Knowledge Tak Terprogram" }
        ]
      },
      {
        id: "6-2",
        type: "tileorder",
        stepNum: 2,
        title: "Tiga Pilar Keterampilan Human-Centric WEF",
        tag: "Langkah 2 • Keterampilan Human-Centric",
        checkpoints: [
          "Kecerdasan Emosional (EQ) & Manajemen Relasi Autentik",
          "Ketajaman Kritis & Pengujian Ground Truth Fakta",
          "Penilaian Moral & Pertimbangan Etika Terapan"
        ]
      },
      {
        id: "6-3",
        type: "tebakgambar6",
        stepNum: 3,
        title: "Tebak Gambar: Komoditas Kemanusiaan Paling Berharga",
        tag: "Langkah 3 • Nilai Kemanusiaan",
        clueIcons: ["❤️", "🤝", "🧠"],
        clueText: "Hati Empati + Jabat Tangan Integritas + Otak Kritis",
        q: "Ketika tugas rutin makin mudah diselesaikan algoritma dalam hitungan detik, keterampilan apakah yang nilai pasarnya melonjak paling tinggi?",
        opts: [
          "Kecepatan mengetik dan menyalin dokumen secara berulang.",
          "Keahlian murni humanistik: Empati Autentik, Pemikiran Kritis Ground Truth, dan Pertimbangan Nurani Moral.",
          "Kemampuan menghafal data statistik lama."
        ],
        ans: 1
      },
      {
        id: "6-4",
        type: "dialogue",
        stepNum: 4,
        title: "Manifesto Pilot AI: Warga Digital Berdaulat",
        tag: "Langkah 4 • Ikrar Cendekia Digital",
        reading: "Semakin canggih teknologi kecerdasan buatan, semakin krusial peran manusia sebagai 'pilot' yang menentukan nilai, arah, dan etika demi kemaslahatan peradaban."
      }
    ]
  }
];

export const BADGE_DATA = [
  { id:1, icon:'fa-award', bg:'linear-gradient(135deg, #F59E0B, #D97706)', name:'Pionir AI', req:'Asesmen Radar & Fondasi AI', desc:'Lencana pembuka atas keberhasilan menyelesaikan asesmen awal dan memahami prinsip fondasi kecerdasan buatan.' },
  { id:2, icon:'fa-shield-halved', bg:'linear-gradient(135deg, #0EA5E9, #0284C7)', name:'Penjaga Etika', req:'Deteksi Deepfake & Etika', desc:'Lencana kehormatan atas pemahaman etika data, privasi, serta kecakapan mendeteksi rekayasa deepfake.' },
  { id:3, icon:'fa-feather-pointed', bg:'linear-gradient(135deg, #6366F1, #4F46E5)', name:'Master Prompt', req:'Prompt Safety & Komunikasi', desc:'Lencana keahlian menyusun instruksi prompt yang aman, terstruktur, relevan, serta bebas dari bias.' },
  { id:4, icon:'fa-rocket', bg:'linear-gradient(135deg, #EC4899, #F43F5E)', name:'Inovator Produktif', req:'Asistensi & Workflow Kreatif', desc:'Lencana kreativitas dalam memanfaatkan AI secara efektif untuk efisiensi riset, tugas, dan alur kerja harian.' },
  { id:5, icon:'fa-graduation-cap', bg:'linear-gradient(135deg, #10B981, #059669)', name:'Cendekia Digital', req:'Sertifikasi & Kelulusan Akhir', desc:'Lencana kualifikasi tertinggi atas penyelesaian seluruh kurikulum etika AI dan kelulusan evaluasi akhir.' },
];

const getStorageKey = () => {
  try {
    const s = localStorage.getItem('user_data');
    if (s) {
      const u = JSON.parse(s);
      if (u && u.email) {
        return `litgo_complete_${u.email}`;
      }
    }
  } catch (err) {}
  return 'litgo_complete_v1';
};

const defaultState = {
  radar: [0, 0, 0, 0],
  hasRadar: false,
  doneModules: [],
  badges: [],
};

const loadInitialState = () => {
  const key = getStorageKey();
  const s = localStorage.getItem(key);
  if (s) {
    try {
      const parsed = JSON.parse(s);
      return {
        ...defaultState,
        ...parsed,
        radar: Array.isArray(parsed?.radar) && parsed.radar.length === 4 ? parsed.radar : defaultState.radar,
        hasRadar: Boolean(parsed?.hasRadar),
        doneModules: Array.isArray(parsed?.doneModules) ? parsed.doneModules : [],
        badges: Array.isArray(parsed?.badges) ? parsed.badges : [],
      };
    } catch (err) {
      console.error('Failed to parse ' + key, err);
    }
  }
  return defaultState;
};

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [state, setState] = useState(loadInitialState);

  const [toastMsg, setToastMsg] = useState(null);
  const [toastType, setToastType] = useState('info');
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  const refreshState = () => {
    setState(loadInitialState());
  };

  useEffect(() => {
    refreshState();
  }, []);

  const saveState = (newState) => {
    setState(newState);
    const key = getStorageKey();
    localStorage.setItem(key, JSON.stringify(newState));
  };

  const showToast = (msg, type = 'info') => {
    setToastMsg(msg);
    setToastType(type);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleReset = () => {
    const key = getStorageKey();
    localStorage.removeItem(key);
    localStorage.removeItem('litgo_complete_v1');
    setState(defaultState);
    window.location.reload();
  };

  // Kalkulasi 24 langkah gamifikasi terstruktur
  const allStepIds = MODULES.flatMap((m) => (m.steps ? m.steps.map((s) => s.id) : []));
  const doneCount = state.doneModules
    ? state.doneModules.filter((id) => allStepIds.includes(id)).length
    : 0;

  // Hitung jumlah modul yang telah tuntas seluruh langkahnya (0 - 6 Modul)
  const completedModulesCount = MODULES.filter((mod) => {
    if (mod.steps && mod.steps.length > 0) {
      return mod.steps.every((s) => (state.doneModules || []).includes(s.id));
    }
    return (state.doneModules || []).includes(mod.id);
  }).length;

  const badgeCount = state.badges ? state.badges.length : 0;
  // Total Gems: 100 per langkah + 100 per badge + 50 jika Pre-Test selesai
  const pts = doneCount * 100 + badgeCount * 100 + (state.hasRadar ? 50 : 0);
  // Level progres naik setiap kelipatan 4 langkah (6 modul x 4 langkah = Level 1 sampai 7)
  const lv = Math.max(1, Math.floor(doneCount / 4) + 1);
  // EXP % proporsional terhadap total 24 langkah
  const expPct = Math.min(100, Math.round((doneCount / 24) * 100));

  return (
    <ProgressContext.Provider
      value={{
        state,
        saveState,
        refreshState,
        showToast,
        toastMsg,
        toastType,
        handleReset,
        isConfirmModalOpen,
        setConfirmModalOpen,
        doneCount,
        completedModulesCount,
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