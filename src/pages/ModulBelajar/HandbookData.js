// Data Handbook Interaktif Editorial Blue-and-White untuk Lit-GO
// Sumber Referensi Otoritatif: Dokumen Resmi "Melek AI: Panduan Lengkap Memahami, Menggunakan, dan Bertahan di Era AI"
export const HANDBOOK_MODULES = {
  1: {
    id: 1,
    tag: "Level 1",
    levelNumber: "01",
    title: 'Kenalan dengan "Otak" Buatan',
    subtitle: "Dari Turing Test (1950), Arsitektur Transformer (2017), Probabilitas Token, hingga Fenomena Halusinasi.",
    badge: "Pionir AI",
    readingTime: "5 Menit Baca",
    standardTag: "Turing (1950), Dartmouth (1956), & Vaswani dkk. (NeurIPS 2017)",
    coverImg: "/illustrations/handbook_cover.jpg",
    coverTagline: "Panduan Komprehensif Membedah Logika Probabilitas, Fondasi Transformer, dan Nalar Kritis AI",
    stats: [
      { label: "Mekanisme Inti", value: "Self-Attention Paralel" },
      { label: "Fondasi Model", value: "Transformer (Vaswani 2017)" },
      { label: "Prinsip Validasi", value: "Human-in-the-Loop" }
    ],
    pages: [
      {
        pageNumber: "01",
        title: "Dari Mana AI Bermula? (Turing ke Transformer)",
        tagline: "Perjalanan dari uji percakapan Alan Turing hingga terobosan arsitektur komputasi modern.",
        img: "/illustrations/handbook_brain.jpg",
        imgCaption: "Evolusi AI: Dari Turing Test 1950, Konferensi Dartmouth 1956, hingga terobosan Transformer 2017.",
        contentSections: [
          {
            heading: "Uji Kecerdasan Alan Turing (1950)",
            text: "Gagasan tentang mesin yang bisa 'berpikir' bukan hal baru. Pada tahun 1950, matematikawan Inggris Alan Turing menerbitkan makalah legendaris 'Computing Machinery and Intelligence', yang mengusulkan Imitation Game — kini dikenal sebagai Turing Test. Alih-alih memperdebatkan apakah komputer benar-benar memiliki jiwa, Turing membuat tolok ukur praktis: jika manusia tidak bisa membedakan balasan mesin dari balasan manusia lewat teks percakapan, mesin itu dianggap menunjukkan perilaku cerdas."
          },
          {
            heading: "Kelahiran Istilah AI & Titik Balik Transformer (2017)",
            text: "Istilah 'Artificial Intelligence' dicetuskan dalam proposal konferensi Dartmouth College tahun 1956 oleh John McCarthy, Marvin Minsky, Nathaniel Rochester, dan Claude Shannon. Namun, titik balik terbesar abad ini terjadi pada Juni 2017 saat delapan peneliti Google merilis makalah 'Attention Is All You Need' (Vaswani dkk., NeurIPS 2017). Arsitektur Transformer membuang mekanisme perulangan (recurrent) dan menggantinya dengan self-attention. Hasilnya, AI dapat memproses seluruh kata dalam kalimat secara paralel — melahirkan fondasi ChatGPT, Claude, dan Gemini."
          }
        ],
        callout: {
          type: "important",
          title: "Vaswani dkk. (Google Research, NeurIPS 2017):",
          text: "'We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.' Makalah ini telah dikutip lebih dari 250.000 kali."
        }
      },
      {
        pageNumber: "02",
        title: "Bagaimana AI Sebenarnya 'Berpikir'?",
        tagline: "Membedah realitas teknis model bahasa besar: Mesin statistik, bukan kesadaran sadar.",
        img: "/illustrations/handbook_myth.jpg",
        imgCaption: "Mitos vs Realitas: LLM bekerja memprediksi probabilitas token kata, bukan memahami makna hakiki.",
        comparisons: [
          {
            myth: "AI memiliki kesadaran, perasaan batin, dan kehendak mandiri seperti di film fiksi ilmiah.",
            fact: "Secara teknis, LLM adalah mesin statistik bahasa raksasa yang bertugas menebak token (potongan kata) berikutnya yang paling mungkin muncul berdasarkan pola miliaran data latih.",
            badge: "Mitos Terbantahkan"
          },
          {
            myth: "Semakin lancar dan meyakinkan bahasa AI, maka jawabannya pasti 100% benar secara faktual.",
            fact: "AI dioptimalkan untuk memaksimalkan kelancaran linguistik (fluency), bukan pencarian kebenaran ontologis (ground truth). Kalimat yang sangat fasih tetap bisa keliru total.",
            badge: "Fakta Teknis"
          },
          {
            myth: "AI memahami makna filosofis dan konteks dunia nyata dari kalimat yang diketiknya.",
            fact: "AI hanya memetakan urutan bobot vektor dan probabilitas statistik kata, tanpa memiliki pengalaman hidup (lived experience) ataupun akal budi manusiawi.",
            badge: "Fakta Teknis"
          }
        ],
        quote: "AI tidak memahami apa yang diucapkannya. Ia hanya merangkai kata-kata yang secara statistik paling cocok menyusul kata sebelumnya."
      },
      {
        pageNumber: "03",
        title: "Waspada Fenomena 'Halusinasi' AI",
        tagline: "Kelemahan paling berisiko: Menghasilkan informasi fiktif dengan nada ilmiah meyakinkan.",
        img: "/illustrations/handbook_hallucination.jpg",
        imgCaption: "Audit Forensik: AI dapat mengarang nomor pasal hukum atau judul jurnal ilmiah fiktif.",
        warningBox: {
          title: "Apa Itu Halusinasi AI?",
          desc: "Halusinasi adalah kondisi ketika model AI menghasilkan informasi yang salah, pasal undang-undang yang tidak pernah ada, atau kutipan riset fiktif, namun menyampaikannya dengan gaya bahasa yang sangat percaya diri, diplomatis, dan meyakinkan."
        },
        whyHappens: {
          title: "Audit Kasus Hukum & Medis",
          text: "Studi audit independen mencatat bahwa asisten AI generatif dapat berhalusinasi pada porsi signifikan dari respons berbasis riset hukum dan medis — beberapa kasus melaporkan kesalahan mencapai puluhan persen. Mengapa? Karena AI bertugas 'mengisi kekosongan teks' yang paling masuk akal secara gramatikal, bukan mengecek kebenaran ke dunia nyata."
        },
        protocolSteps: [
          {
            num: "1",
            title: "Lacak ke Sumber Primer Terakreditasi",
            desc: "Selalu cek ulang nomor pasal undang-undang, nama penulis, angka statistik, dan tautan DOI ke repositori resmi atau jurnal primer."
          },
          {
            num: "2",
            title: "Uji Konsistensi (Counter-Prompt)",
            desc: "Tanyakan secara kritis: 'Sebutkan DOI asli atau tautan resmi dari klaim ini. Jika tidak memiliki sumber pasti, akui bahwa kamu tidak tahu.'"
          },
          {
            num: "3",
            title: "Larangan Menggunakan Tanpa Supervisi Ahli",
            desc: "Jangan pernah menggunakan keluaran AI tanpa validasi dokter, pengacara, atau akuntan untuk urusan medis, hukum, dan keuangan bernilai tinggi."
          }
        ]
      },
      {
        pageNumber: "04",
        title: "Manusia sebagai Validator Akhir (Filosofi Pilot)",
        tagline: "Prinsip emas literasi AI: Anda yang memegang kendali penuh penerbangan peradaban.",
        img: "/illustrations/handbook_pilot.jpg",
        imgCaption: "Human-in-the-Loop: AI adalah kopilot canggih, Anda adalah pilot utamanya.",
        pilotAnalogy: {
          title: "Prinsip Human-in-the-Loop",
          quote: "AI adalah KOPILOT yang luar biasa untuk mempercepat kalkulasi dan menumbuhkan ide, namun KAMU ADALAH PILOT UTAMANYA.",
          desc: "Sebagai pilot, kamu bertanggung jawab mutlak atas keselamatan penerbangan, memeriksa instrumen, dan mengambil keputusan akhir. Jangan pernah membiarkan kopilot mengambil alih kemudi ketika kamu tertidur."
        },
        keyPillars: [
          { icon: "fa-scale-balanced", title: "Akuntabilitas Moral", desc: "Tanggung jawab etis dan hukum atas hasil akhir berada sepenuhnya di tangan pengguna manusia." },
          { icon: "fa-magnifying-glass", title: "Nalar Kritis Aktif", desc: "Skeptisisme konstruktif: selalu uji klaim penting ke sumber data primer sebelum mengambil tindakan." },
          { icon: "fa-handshake", title: "Sinergi Produktif", desc: "Posisikan AI untuk melipatgandakan kapabilitas berpikir manusia, bukan menggantikan kepekaan akal budi." }
        ],
        frameworkSeal: "Disusun berlandaskan Alan Turing (1950), Vaswani dkk. (NeurIPS 2017), dan UNESCO AI Competency Framework (2024)."
      }
    ]
  },
  2: {
    id: 2,
    tag: "Level 2",
    levelNumber: "02",
    title: "Kompas Etika, Keamanan & Privasi",
    subtitle: "UNESCO Ethics 2021, SE Menkominfo No. 9/2023, Skandal Bias Gender Shades, & Standar C2PA.",
    badge: "Penjaga Etika",
    readingTime: "5 Menit Baca",
    standardTag: "UNESCO Ethics (2021), SE Kominfo No. 9/2023, & Buolamwini (2018)",
    coverImg: "/illustrations/handbook_ethics.jpg",
    coverTagline: "Pedoman Menavigasi Batasan Moral, Kebocoran Data Pribadi, dan Autentikasi Konten Sintetis",
    stats: [
      { label: "Standar Etika Global", value: "UNESCO 193 Negara (2021)" },
      { label: "Audit Bias Algoritma", value: "Gender Shades (Buolamwini)" },
      { label: "Autentikasi Media", value: "Koalisi C2PA Provenance" }
    ],
    pages: [
      {
        pageNumber: "01",
        title: "Kerangka Etika Global & Regulasi Nasional",
        tagline: "Standar normatif UNESCO 2021 dan Surat Edaran Menkominfo Nomor 9 Tahun 2023.",
        img: "/illustrations/handbook_ethics.jpg",
        imgCaption: "Payung Hukum Etika: Mengikat pengembang dan pengguna untuk menjunjung hak asasi manusia.",
        contentSections: [
          {
            heading: "Rekomendasi Etika AI UNESCO (November 2021)",
            text: "Pada November 2021, UNESCO mengesahkan Rekomendasi tentang Etika Kecerdasan Buatan — standar normatif global pertama yang disepakati oleh 193 negara anggota. Dokumen ini menegaskan prinsip perlindungan martabat manusia, hak asasi manusia, keberlanjutan lingkungan, transparansi, serta pengawasan manusia (human oversight) atas sistem AI."
          },
          {
            heading: "Pedoman Nasional: SE Menkominfo No. 9/2023 & UU PDP",
            text: "Di Indonesia, Kementerian Komunikasi dan Informatika menerbitkan Surat Edaran Menkominfo Nomor 9 Tahun 2023 tentang Etika Kecerdasan Artifisial. Pedoman ini mengarahkan penyelenggara sistem elektronik dan pengguna untuk mematuhi UU Perlindungan Data Pribadi (UU PDP), mencegah kebocoran data sensitif, serta memastikan pemanfaatan AI yang inklusif dan tidak diskriminatif."
          }
        ],
        callout: {
          type: "important",
          title: "Prinsip Utama SE Menkominfo No. 9/2023:",
          text: "Penyelenggara sistem AI wajib menjamin keamanan digital, mencegah penyalahgunaan data pribadi, serta menyediakan mekanisme pertanggungjawaban manusia (human oversight) atas dampak sistemik yang ditimbulkan."
        }
      },
      {
        pageNumber: "02",
        title: "Bias Algoritma: Ketika AI Meniru Prasangka Manusia",
        tagline: "Bukti empiris bagaimana AI menyerap stereotip sosial dan ketidakadilan data.",
        img: "/illustrations/handbook_myth.jpg",
        imgCaption: "Audit Dataset: Model menyerap bias dari data masa lalu yang tidak seimbang.",
        comparisons: [
          {
            myth: "AI adalah sistem matematika netral yang pasti objektif dan bebas dari segala bentuk diskriminasi.",
            fact: "Riset 'Gender Shades' (Buolamwini & Gebru, 2018 MIT) membuktikan sistem klasifikasi wajah komersial memiliki tingkat error 0,8% untuk pria kulit terang, namun melonjak drastis hingga 34,7% pada perempuan berkulit gelap karena dataset latih didominasi 86,2% subjek kulit terang.",
            badge: "Riset Gender Shades"
          },
          {
            myth: "Model bahasa teks hanya memproses tata bahasa murni tanpa membawa stereotip sosial.",
            fact: "Riset Bolukbasi dkk. (NeurIPS 2016) membuktikan embedding Word2Vec menyerap stereotip gender secara matematis, menghasilkan analogi diskriminatif: 'laki-laki : programmer :: perempuan : ibu rumah tangga'.",
            badge: "Riset Word2Vec"
          }
        ],
        quote: "AI belajar dari data yang dibuat manusia. Jika data masa lalu memuat ketidakadilan, AI akan mengamplifikasi ketidakadilan tersebut secara otomatis."
      },
      {
        pageNumber: "03",
        title: "Melawan Deepfake: Forensik Piksel vs Standar C2PA",
        tagline: "Membedah perbedaan mendasar antara pembuktian reaktif dan penandaan proaktif asal-usul.",
        img: "/illustrations/handbook_hallucination.jpg",
        imgCaption: "C2PA Provenance: 'Label nutrisi' kriptografis yang menyertai konten digital sejak dibuat.",
        contentSections: [
          {
            heading: "Deteksi Forensik Digital (Pendekatan Reaktif)",
            text: "Bekerja menganalisis artefak piksel, anomali refleksi cahaya pada pupil mata, tekstur gigi yang menyatu, atau anomali spektrum frekuensi suara setelah media tersebar luas di internet. Kelemahannya: selalu tertinggal satu langkah di belakang teknologi generator sintetis yang kian sempurna."
          },
          {
            heading: "Standar C2PA (Pendekatan Proaktif)",
            text: "Coalition for Content Provenance and Authenticity (C2PA — didukung Adobe, Microsoft, BBC, Arm) menyematkan metadata kriptografis anti-pemalsuan sejak media diambil dengan kamera atau dibuat dengan software. C2PA bekerja seperti 'label nutrisi makanan' yang menunjukkan siapa penciptanya, kamera apa yang digunakan, software apa yang mengeditnya, dan apakah AI generatif terlibat."
          }
        ],
        warningBox: {
          title: "Analogi Label Nutrisi C2PA",
          desc: "Forensik bertanya: 'Apakah gambar ini palsu?' (reaktif). C2PA bertanya: 'Dari mana asal gambar ini, siapa pembuatnya, dan perubahan apa saja yang telah dilakukan?' (proaktif)."
        }
      },
      {
        pageNumber: "04",
        title: "Perlindungan Data Pribadi (PII) & Sanitasi Prompt",
        tagline: "Protokol pencegahan kebocoran data sensitif ke server penyedia AI publik.",
        img: "/illustrations/handbook_ethics.jpg",
        imgCaption: "Zero PII Exposure: Jangan pernah mengetikkan identitas pribadi atau rahasia organisasi.",
        protocolSteps: [
          {
            num: "1",
            title: "Identifikasi & Samarkan PII",
            desc: "Dilarang memasukkan NIK, password, nomor rekening, rekam medis, dan alamat rumah. Gantilah dengan data dummy generik (misal: 'PT ABC', 'Budi 123')."
          },
          {
            num: "2",
            title: "Aktifkan Zero Data Retention",
            desc: "Pada akun organisasi, pastikan opsi 'Opt out of model training' diaktifkan agar riwayat prompt tidak disimpan dan dipakai melatih model publik berikutnya."
          },
          {
            num: "3",
            title: "Aturan Emas Papan Pengumuman",
            desc: "Jika sebuah dokumen tidak aman untuk ditempelkan di papan pengumuman kampus atau kantor umum, jangan pernah menempelkannya ke kotak prompt AI publik."
          }
        ],
        frameworkSeal: "Mengacu pada UNESCO Ethics of AI (2021), SE Menkominfo No. 9/2023, Buolamwini & Gebru (2018), dan Standar C2PA."
      }
    ]
  },
  3: {
    id: 3,
    tag: "Level 3",
    levelNumber: "03",
    title: "Seni Berbicara dengan Mesin",
    subtitle: "Empat Pilar Instruksi (Konteks, Instruksi, Format, Persona), Zero-Shot, Few-Shot, CoT, & ReAct Agent.",
    badge: "Master Prompt",
    readingTime: "5 Menit Baca",
    standardTag: "Brown dkk. (GPT-3 2020), Wei dkk. (Google 2022), & Yao dkk. (2022)",
    coverImg: "/illustrations/handbook_prompt.jpg",
    coverTagline: "Kuasai Formula Presisi Menstrukturkan Perintah untuk Menghasilkan Respons Tajam dan Terarah",
    stats: [
      { label: "Formula Inti", value: "4 Pilar (K-I-F-P)" },
      { label: "Penalaran Rumit", value: "Chain-of-Thought (Wei 2022)" },
      { label: "Sistem Agentic", value: "ReAct (Yao dkk., 2022)" }
    ],
    pages: [
      {
        pageNumber: "01",
        title: "Empat Pilar Instruksi yang Efektif",
        tagline: "Struktur standar industri untuk mengeliminasi ambiguitas dan respons generik.",
        img: "/illustrations/handbook_prompt.jpg",
        imgCaption: "Konstruksi 4 Pilar: Membagi prompt menjadi Konteks, Instruksi, Format, dan Persona.",
        contentSections: [
          {
            heading: "Mengapa Perintah Ambigu Berbahaya?",
            text: "Karena LLM bekerja dengan menebak kelanjutan teks paling mungkin, instruksi yang kabur seperti 'Tulis artikel tentang investasi' memaksa model mengambil jalan pintas berupa jawaban umum, klise, atau bahkan halusinasi. Riset prompt engineering (OpenAI, Anthropic, Google) menyarankan memecah instruksi menjadi 4 pilar terstruktur."
          },
          {
            heading: "Bedah 4 Pilar Presisi",
            text: "1. Konteks: Latar belakang dan situasi relevan agar AI tidak menjawab secara generik.\n2. Instruksi: Tindakan konkret, spesifik, dan imperatif yang harus dikerjakan.\n3. Format Output: Bentuk luaran yang diminta (tabel komparasi, JSON, poin ringkas maksimal 200 kata).\n4. Persona: Peran keahlian spesifik yang diminta untuk diadopsi AI."
          }
        ],
        callout: {
          type: "important",
          title: "Fungsi Teknis Menetapkan 'Persona':",
          text: "Menetapkan persona bukan sekadar gaya bahasa santai — secara teknis ini mengarahkan model untuk mempersempit distribusi probabilitas jawabannya ke domain keahlian tertentu, sehingga memangkas risiko respons melenceng."
        }
      },
      {
        pageNumber: "02",
        title: "Taksonomi Teknik: Zero-Shot vs Few-Shot",
        tagline: "Mengondisikan pola jawaban model melalui penyisipan contoh in-context konkret.",
        img: "/illustrations/handbook_brain.jpg",
        imgCaption: "Few-Shot Learning: Brown dkk. (OpenAI, 2020) membuktikan contoh in-context mendongkrak akurasi.",
        comparisons: [
          {
            myth: "Zero-Shot Prompting (langsung bertanya tanpa contoh) selalu cukup untuk tugas rumit apa pun.",
            fact: "Zero-Shot hanya cocok untuk tugas umum sederhana. Untuk tugas klasifikasi bernuansa atau format kaku, Zero-Shot sering menghasilkan keluaran yang formatnya tidak konsisten.",
            badge: "Zero-Shot (Dasar)"
          },
          {
            myth: "AI membutuhkan training ulang kode agar memahami gaya penulisan spesifik yang kita inginkan.",
            fact: "Makalah 'Language Models are Few-Shot Learners' (Brown dkk., 2020) membuktikan bahwa memberikan 2-3 contoh pasangan input-output di dalam prompt (Few-Shot) mampu mengondisikan pola jawaban secara instan tanpa melatih ulang model.",
            badge: "Few-Shot (Direkomendasikan)"
          }
        ],
        quote: "Satu contoh konkret di dalam prompt bernilai lebih dari seribu kata instruksi deskriptif."
      },
      {
        pageNumber: "03",
        title: "Penalaran Kompleks: Chain-of-Thought (CoT)",
        tagline: "Menginstruksikan AI berpikir langkah demi langkah untuk memecahkan logika rumit.",
        img: "/illustrations/handbook_prompt.jpg",
        imgCaption: "CoT Prompting: Wei dkk. (Google Research, 2022) menunjukkan penjabaran langkah mereduksi error penalaran.",
        contentSections: [
          {
            heading: "Mengapa Pertanyaan Rumit Butuh CoT?",
            text: "Pada soal matematika, deduksi hukum, atau logika analitis bertingkat, meminta AI langsung memberikan jawaban akhir sering memicu halusinasi karena model 'melompati' langkah kalkulasi logis."
          },
          {
            heading: "Temuan Wei dkk. (Google Research, 2022)",
            text: "Dalam makalah 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models', Wei dkk. membuktikan bahwa menyisipkan instruksi seperti: 'Mari kita pikirkan langkah demi langkah' (Let's think step by step) secara drastis mendongkrak akurasi pemecahan masalah rumit, karena proses berpikir model terjabarkan secara transparan dan terverifikasi."
          }
        ],
        warningBox: {
          title: "Formula Emas CoT",
          desc: "Sebelum menarik kesimpulan, instruksikan AI: '1. Tuliskan premis dasar. 2. Uraikan kalkulasi per tahap. 3. Identifikasi potensi kontradiksi. 4. Simpulkan jawaban akhir.'"
        }
      },
      {
        pageNumber: "04",
        title: "Paradigma ReAct: Sinergi Nalar dan Aksi Nyata",
        tagline: "Dasar arsitektur agen AI modern: Bernalar, memanggil alat eksternal, dan mengoreksi diri.",
        img: "/illustrations/handbook_pilot.jpg",
        imgCaption: "ReAct Workflow: Yao dkk. (2022) menggabungkan Reasoning dengan pemanggilan API eksternal.",
        contentSections: [
          {
            heading: "Apa itu ReAct (Reasoning + Acting)?",
            text: "Diperkenalkan oleh Yao dkk. (2022) dalam makalah 'ReAct: Synergizing Reasoning and Acting in Language Models'. ReAct melangkah lebih jauh dari CoT biasa: AI tidak hanya bernalar dalam bentuk teks internal, tetapi juga memutuskan untuk mengeksekusi aksi nyata — seperti memanggil mesin pencari web, mengeksekusi kalkulator kode, atau mengakses API eksternal."
          },
          {
            heading: "Siklus Kerja Agen ReAct",
            text: "1. Thought (AI menganalisis apa informasi yang kurang)\n2. Action (AI mencari data lewat API eksternal)\n3. Observation (AI membaca hasil pencarian)\n4. Final Answer (AI merumuskan jawaban yang divalidasi data faktual riil)."
          }
        ],
        frameworkSeal: "Mengacu pada Brown dkk. (GPT-3, NeurIPS 2020), Wei dkk. (Google Research 2022), dan Yao dkk. (ReAct 2022)."
      }
    ]
  },
  4: {
    id: 4,
    tag: "Level 4",
    levelNumber: "04",
    title: "AI sebagai Asisten Produktivitas",
    subtitle: "RAG (Retrieval-Augmented Generation), Memori Parametrik vs Non-Parametrik, & UNESCO Socratic Tutor.",
    badge: "Inovator Produktif",
    readingTime: "5 Menit Baca",
    standardTag: "Lewis dkk. (Meta AI, NeurIPS 2020) & UNESCO Guidance (2023)",
    coverImg: "/illustrations/handbook_cover.jpg",
    coverTagline: "Maksimalkan Efisiensi Riset dan Produktivitas dengan Landasan Fakta Valid Tanpa Mengorbankan Integritas",
    stats: [
      { label: "Arsitektur Solusi", value: "RAG (Patrick Lewis 2020)" },
      { label: "Kategori Memori", value: "Parametrik & Non-Parametrik" },
      { label: "Peran Etis", value: "Tutor Sokratik & Zero-Drafting" }
    ],
    pages: [
      {
        pageNumber: "01",
        title: "RAG: Solusi Teknis untuk Halusinasi dan Data Usang",
        tagline: "Menggabungkan pemrosesan bahasa generatif dengan basis data dokumen eksternal.",
        img: "/illustrations/handbook_cover.jpg",
        imgCaption: "Arsitektur RAG: Model tidak lagi sekadar menebak, melainkan merangkum dokumen valid yang disuntikkan.",
        contentSections: [
          {
            heading: "Kelemahan Model 'Buku Tertutup' (Closed-Book)",
            text: "Model bahasa klasik bekerja seperti siswa saat ujian buku tertutup — hanya mengandalkan hafalan bobot yang disimpan saat masa pelatihan lampau. Akibatnya, model tidak tahu berita terbaru, tidak punya akses ke dokumen privat organisasi, dan rawan mengarang fakta (halusinasi)."
          },
          {
            heading: "Lompatan Inovasi RAG (Lewis dkk., NeurIPS 2020)",
            text: "Pada tahun 2020, tim peneliti Facebook AI Research (Meta AI) bersama University College London dan NYU yang dipimpin Patrick Lewis merilis makalah 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks'. RAG membagi sistem menjadi dua bagian: komponen Retriever (pengambil dokumen eksternal relevan) dan komponen Generator (model bahasa yang merangkum jawaban berdasarkan dokumen tersebut)."
          }
        ],
        callout: {
          type: "important",
          title: "Patrick Lewis dkk. (Meta AI, NeurIPS 2020):",
          text: "'RAG models generated more specific, diverse, and factual language than outputs based purely on the original model parameters.' RAG menjadi standar emas industri untuk grounding fakta AI."
        }
      },
      {
        pageNumber: "02",
        title: "Memori Parametrik vs Memori Non-Parametrik",
        tagline: "Mengapa memperbarui basis data eksternal jauh lebih efisien daripada retraining model.",
        img: "/illustrations/handbook_brain.jpg",
        imgCaption: "Dua Pilar Memori: Memori parametrik di bobot internal, memori non-parametrik di basis data eksternal.",
        comparisons: [
          {
            myth: "Untuk menambahkan pengetahuan baru ke AI, kita wajib melatih ulang (retraining) seluruh bobot model.",
            fact: "Retraining model raksasa memakan biaya komputasi ratusan miliar rupiah dan memakan waktu berminggu-minggu.",
            badge: "Retraining Mahal"
          },
          {
            myth: "AI harus menghafal seluruh isi perpustakaan dunia di dalam file modelnya.",
            fact: "Dalam arsitektur RAG, pengetahuan baru disimpan dalam basis data dokumen eksternal (memori non-parametrik). Cukup perbarui basis data ini kapan saja, dan AI langsung bisa menjawab fakta terbaru tanpa retraining satu parameter pun.",
            badge: "Keunggulan RAG"
          }
        ],
        quote: "Jangan paksa AI menghafal seluruh dunia. Berikan ia akses ke perpustakaan dokumen yang valid melalui sistem RAG."
      },
      {
        pageNumber: "03",
        title: "Etika Pendidikan: Panduan UNESCO 2023",
        tagline: "Menggeser AI dari 'penulis instan' menjadi mitra dialog kritis dan pemantik gagasan.",
        img: "/illustrations/handbook_pilot.jpg",
        imgCaption: "Pedagogi Kritis: UNESCO melarang ketergantungan pasif pada teknologi generatif.",
        contentSections: [
          {
            heading: "Pedoman UNESCO untuk Pendidikan & Riset (2023)",
            text: "UNESCO merilis panduan resmi 'Guidance for Generative AI in Education and Research' (2023), yang menegaskan bahwa teknologi generatif tidak boleh menggantikan kemampuan berpikir mandiri pelajar, serta menekankan perlindungan data pribadi dan batas usia pengguna."
          },
          {
            heading: "Dua Rekomendasi Format Pemanfaatan",
            text: "1. Tutor Sokratik: Susun draf argumenmu sendiri secara mandiri lebih dulu, lalu instruksikan AI mencari celah, kelemahan, atau menyanggah asumsi premismu.\n2. Zero-Drafting / Pemantik Ide: Gunakan AI untuk mengatasi kebuntuan menulis (writer's block) dengan membuat kerangka kasar awal, bukan hasil akhir siap kumpul."
          }
        ],
        warningBox: {
          title: "Prinsip Kendali Intelektual",
          desc: "Setiap kalimat yang kamu serahkan harus dapat kamu pertanggungjawabkan dan jelaskan secara lisan di depan kelas atau forum profesional tanpa bantuan layar AI."
        }
      },
      {
        pageNumber: "04",
        title: "Integritas Akademik & Deklarasi Transparansi",
        tagline: "Garis pemisah yang tegas antara kolaborasi intelektual dan kecurangan plagiarisme.",
        img: "/illustrations/handbook_ethics.jpg",
        imgCaption: "Deklarasi Jujur: Sebutkan peran AI pada bagian catatan kaki atau metodologi karya ilmiah.",
        protocolSteps: [
          {
            num: "1",
            title: "Verifikasi Triangulasi Sumber",
            desc: "Setiap data numerik, kutipan sejarah, dan klaim teoritis yang disarankan AI wajib diverifikasi ke minimal dua sumber independen primer."
          },
          {
            num: "2",
            title: "Deklarasi Kontribusi Transparan",
            desc: "Cantumkan pernyataan terbuka: 'Penyusunan kerangka awal dibantu dengan eksplorasi AI generatif, penulisan analisis dan validasi data dilakukan mandiri oleh penulis.'"
          },
          {
            num: "3",
            title: "Tolak Penggantian Penuh Nalar Manusia",
            desc: "Menyalin mentah seluruh keluaran AI dan mencantumkan nama sendiri adalah pelanggaran berat integritas akademik dan etika profesi."
          }
        ],
        frameworkSeal: "Mengacu pada Patrick Lewis dkk. (Meta AI/NeurIPS 2020) dan UNESCO Guidance for GenAI in Education (2023)."
      }
    ]
  },
  5: {
    id: 5,
    tag: "Level 5",
    levelNumber: "05",
    title: "Eksplorasi AI Kreatif",
    subtitle: "Enam Sumbu Visual Prompting, Model Difusi (Ho 2020), Hak Cipta USCO, & Lisensi Global.",
    badge: "Kreator Beretika",
    readingTime: "5 Menit Baca",
    standardTag: "Ho dkk. (DDPM 2020), U.S. Copyright Office (2023-2025), & EU AI Act",
    coverImg: "/illustrations/handbook_prompt.jpg",
    coverTagline: "Kuasai Formula Parameter Seni Digital, Pahami Cara Kerja Difusi, dan Hormati Hak Cipta Global",
    stats: [
      { label: "Formula Parameter", value: "Enam Sumbu Visual" },
      { label: "Model Generatif", value: "Denoising Diffusion (DDPM)" },
      { label: "Batas Hak Cipta", value: "Human Authorship (USCO)" }
    ],
    pages: [
      {
        pageNumber: "01",
        title: "Enam Sumbu Formulasi Prompt Visual",
        tagline: "Panduan praktis mengarahkan model difusi gambar agar tidak menghasilkan karya klise.",
        img: "/illustrations/handbook_prompt.jpg",
        imgCaption: "Matriks 6 Sumbu: Mengendalikan Subjek, Gaya, Pencahayaan, Komposisi, Palet, dan Kualitas.",
        contentSections: [
          {
            heading: "Mengapa Kata Kunci Acak Menghasilkan Karya Cacat?",
            text: "Model text-to-image dan text-to-video berbasis difusi membutuhkan deskripsi terstruktur agar tidak mengambil jalan pintas algoritmik yang menghasilkan proporsi janggal (seperti tangan berjari enam atau perspektif miring). Praktisi visual memecah prompt ke dalam enam sumbu parameter teknis."
          },
          {
            heading: "Enam Sumbu Parameter Visual Presisi",
            text: "1. Subjek: Entitas utama dijelaskan tanpa ambiguitas.\n2. Gaya & Medium: Batasan estetika (misal: lukisan cat air, fotografi film 35mm, render 3D Octane).\n3. Pencahayaan & Suasana: Atmosfer cahaya (chiaroscuro dramatis, golden hour, backlight).\n4. Komposisi & Sudut Kamera: Sudut pandang (bird-eye view, rule of thirds, close-up makro).\n5. Palet Warna: Skema warna (monokromatik sinematik, neon cyberpunk, pastel lembut).\n6. Pengubah Kualitas: Penanda resolusi dan ketajaman detail (8k, hyper-detailed, photorealistic)."
          }
        ],
        callout: {
          type: "important",
          title: "Tips Praktisi Visual:",
          text: "Jangan menumpuk kata kunci klise seperti 'indah, menakjubkan, terbaik'. Gunakan istilah teknis fotografi dan seni rupa nyata untuk mengunci distribusi bobot model."
        }
      },
      {
        pageNumber: "02",
        title: "Model Difusi: Menghasilkan Seni dari Denoising",
        tagline: "Bagaimana algoritma DDPM (Ho dkk., 2020) membentuk gambar utuh dari pola bising acak.",
        img: "/illustrations/handbook_myth.jpg",
        imgCaption: "Proses Difusi: Menghapus derau gaussian secara bertahap menuju wujud visual terarah.",
        contentSections: [
          {
            heading: "Terobosan DDPM (Ho, Jain, & Abbeel, NeurIPS 2020)",
            text: "Generasi visual AI modern (seperti Midjourney, Stable Diffusion, DALL-E) bertumpu pada arsitektur Denoising Diffusion Probabilistic Models (DDPM). Berbeda dari anggapan umum bahwa AI 'menggunting dan menyalin potongan foto dari internet', model difusi belajar memprediksi dan menghilangkan partikel noise (derau) secara bertahap."
          },
          {
            heading: "Dua Tahap Utama Difusi",
            text: "1. Forward Diffusion: Menambahkan noise acak secara matematis ke gambar hingga menjadi derau murni tanpa makna.\n2. Reverse Diffusion (Denoising): Jaringan saraf dilatih untuk membalik proses tersebut — membersihkan noise selangkah demi selangkah sambil dipandu oleh token teks dari prompt pengguna."
          }
        ],
        quote: "Model difusi melukis bukan dengan menyalin, melainkan dengan memahat bentuk di tengah kabut bising matematis."
      },
      {
        pageNumber: "03",
        title: "Siapa Pemilik Karya AI? Standar US Copyright Office",
        tagline: "Doktrin kepengarangan manusia (Human Authorship) dalam pendaftaran hak cipta global.",
        img: "/illustrations/handbook_hallucination.jpg",
        imgCaption: "Hukum Hak Cipta: Sekadar mengetikkan prompt tidak memenuhi syarat kepengarangan manusia.",
        contentSections: [
          {
            heading: "Sikap Resmi U.S. Copyright Office (2023–2025)",
            text: "Kantor Hak Cipta Amerika Serikat dalam laporan kebijakannya menegaskan bahwa syarat mutlak perlindungan hak cipta adalah kepengarangan manusia (human authorship). Sekadar menuliskan prompt teks — betapa pun panjang dan puitisnya — tidak dianggap memberi 'kendali ekspresif' yang cukup, karena garis visual presisi dan piksel akhir diputuskan oleh algoritma mesin."
          },
          {
            heading: "Bagian Mana yang Bisa Dilindungi?",
            text: "Seseorang hanya dapat mengklaim hak cipta atas bagian yang mereka modifikasi, rancang, susun, atau poles secara kreatif dan substantif dari bahan mentah yang dihasilkan AI tersebut (ada kontribusi artistik orisinal manusia)."
          }
        ],
        warningBox: {
          title: "Prinsip Human Authorship",
          desc: "Karya murni buatan mesin tanpa sentuhan tangan kreatif manusia tidak memiliki hak cipta dan berstatus domain publik."
        }
      },
      {
        pageNumber: "04",
        title: "Lanskap Regulasi Global: Uni Eropa vs India",
        tagline: "Perbandingan pendekatan perlindungan karya seniman asli di berbagai yurisdiksi dunia.",
        img: "/illustrations/handbook_ethics.jpg",
        imgCaption: "Regulasi Global: Memperjuangkan kompensasi yang adil bagi kreator manusia.",
        comparisons: [
          {
            myth: "Pengembang AI bebas menyedot seluruh karya seni di internet tanpa izin siapa pun selamanya.",
            fact: "Uni Eropa melalui EU Artificial Intelligence Act dan arahan hak cipta Text and Data Mining (TDM) memberikan hak 'Opt-Out' kepada pencipta asli untuk menolak karyanya diserap sebagai data latih model komersial.",
            badge: "Uni Eropa (Hak Opt-Out)"
          },
          {
            myth: "Tidak ada solusi kompromi yang bisa menguntungkan kreator sekaligus industri AI.",
            fact: "Pemerintah India mulai mendiskusikan kerangka lisensi kolektif bertajuk 'One Nation, One License, One Payment': pengembang AI diperbolehkan memakai data untuk pelatihan, dengan kewajiban menyetor royalti ke dana bersama yang didistribusikan ke seniman asli.",
            badge: "India (Lisensi Kolektif)"
          }
        ],
        frameworkSeal: "Mengacu pada Ho dkk. (NeurIPS 2020), U.S. Copyright Office Guidance (2023–2025), dan EU AI Act."
      }
    ]
  },
  6: {
    id: 6,
    tag: "Level 6",
    levelNumber: "06",
    title: "Bertahan & Berdaya di Era AI",
    subtitle: "Analisis David Autor MIT (2015), Paradoks Polanyi 1966 (Tacit Knowledge), & 3 Human Skills WEF.",
    badge: "Cendekia Digital",
    readingTime: "5 Menit Baca",
    standardTag: "David Autor (MIT 2015), Michael Polanyi (1966), & WEF Future of Jobs",
    coverImg: "/illustrations/handbook_pilot.jpg",
    coverTagline: "Meluruskan Mitos Kiamat Lapangan Kerja dan Menemukan Nilai Kemanusiaan yang Tak Pernah Bisa Digantikan Mesin",
    stats: [
      { label: "Ekonomi Tenaga Kerja", value: "David Autor (MIT 2015)" },
      { label: "Batas Alami Otomasi", value: "Paradoks Polanyi (1966)" },
      { label: "Komoditas Berharga", value: "Human-Centric Skills" }
    ],
    pages: [
      {
        pageNumber: "01",
        title: "Meluruskan Ketakutan 'Kiamat Profesi'",
        tagline: "Mengapa otomatisasi rutin justru membuka ruang augmentasi pekerjaan bernilai tinggi.",
        img: "/illustrations/handbook_cover.jpg",
        imgCaption: "Komplementaritas Kerja: Mesin mengambil alih rutinitas, manusia fokus pada inovasi bernilai tinggi.",
        contentSections: [
          {
            heading: "Analisis Ekonom David H. Autor (MIT, 2015)",
            text: "Kekhawatiran akan pengangguran massal akibat otomatisasi bukanlah hal baru. Dalam makalah terkenalnya 'Why Are There Still So Many Jobs?' (Journal of Economic Perspectives, 2015), ekonom David Autor menunjukkan bahwa ramalan kiamat profesi sering mengabaikan fakta penting tentang dinamika pasar tenaga kerja."
          },
          {
            heading: "Tugas Rutin vs Tugas Fleksibel",
            text: "Tugas yang bersifat rutin dan berpola (baik fisik seperti pabrik manufaktur maupun kognitif seperti pembukuan dasar) memang sangat rentan diotomatisasi. Namun, tugas yang menuntut kepekaan sosial, pemecahan masalah non-linier, dan fleksibilitas situasional justru membuat mesin bergeser peran menjadi pelengkap (complement) produktivitas manusia, bukan pengganti (substitute) penuh."
          }
        ],
        callout: {
          type: "important",
          title: "David Autor (Journal of Economic Perspectives, 2015):",
          text: "Otomatisasi tidak memusnahkan pekerjaan; ia memecah pekerjaan menjadi tugas-tugas terpisah, mengotomatisasi bagian yang rutin, dan melipatgandakan nilai pasar dari tugas-tugas yang membutuhkan keahlian manusiawi."
        }
      },
      {
        pageNumber: "02",
        title: "Paradoks Polanyi: Batas Alami Otomatisasi",
        tagline: "'Kita tahu lebih banyak dari yang bisa kita katakan': Mengapa tacit knowledge tak terprogram.",
        img: "/illustrations/handbook_brain.jpg",
        imgCaption: "Tacit Knowledge: Keahlian intuitif manusia yang mustahil diterjemahkan menjadi kode kaku.",
        contentSections: [
          {
            heading: "Gagasan Michael Polanyi (1966)",
            text: "Filsuf-ekonom Michael Polanyi pada 1966 mengemukakan prinsip bahwa 'kita tahu lebih banyak dari yang bisa kita katakan' (tacit knowledge). Banyak keahlian manusia — seperti menyeimbangkan sepeda, membaca suasana hati seseorang dari sorot matanya, atau memimpin tim di tengah krisis — berjalan secara intuitif dan lahir dari pengalaman hidup nyata."
          },
          {
            heading: "Mengapa Mesin Kesulitan Meniru Tacit Knowledge?",
            text: "Karena keahlian tacit tidak bisa dituliskan menjadi instruksi aturan logis 'if-then' yang eksplisit, ia sangat sulit diformalkan ke dalam kode mesin. Algoritma statistik unggul dalam data berpola dan aturan jelas, tetapi lumpuh saat berhadapan dengan konteks situasional yang unik, ambiguitas moral, dan dinamika empati antarsesama manusia."
          }
        ],
        quote: "'We can know more than we can tell.' Prinsip Michael Polanyi adalah benteng pelindung alami kapasitas manusiawi kita."
      },
      {
        pageNumber: "03",
        title: "Dari Ilusi Otomatisasi Menuju Realitas Augmentasi",
        tagline: "Menghidupkan kembali visi para pionir Dartmouth 1956 tentang demokratisasi daya nalar.",
        img: "/illustrations/handbook_pilot.jpg",
        imgCaption: "Visi Dartmouth 1956: Komputasi diciptakan untuk mempertajam akal manusia, bukan menggantikannya.",
        contentSections: [
          {
            heading: "Visi Sejati Konferensi Dartmouth (1956)",
            text: "Visi awal para perintis AI seperti John McCarthy dan John Kemeny sesungguhnya berorientasi mendemokratisasi akses komputasi agar daya nalar manusia dapat bekerja lebih cepat dan tajam. Konsep ini disebut Augmented Intelligence (Kecerdasan Teraugmentasi), di mana mesin bertindak sebagai penguat kapasitas kognitif manusia."
          },
          {
            heading: "Paradoks Nilai: Keterampilan Humanistik Melonjak",
            text: "Seiring tugas-tugas mekanis (menyusun kode boilerplate, mengoreksi tata bahasa, mengekstrak tabel angka) dapat diselesaikan AI dalam hitungan detik, 'harga pasar' dari keahlian yang murni manusiawi justru meroket tajam di pasar kerja global."
          }
        ],
        warningBox: {
          title: "Ilusi vs Realitas",
          desc: "Ilusi otomatisasi memandang AI sebagai pengganti total manusia. Realitas augmentasi memandang AI sebagai katalis produktivitas yang mendongkrak pencapaian manusia."
        }
      },
      {
        pageNumber: "04",
        title: "Tiga Keterampilan Human-Centric yang Tak Tergantikan",
        tagline: "Kualifikasi masa depan World Economic Forum (WEF) yang menjadi benteng pertahanan karier Anda.",
        img: "/illustrations/handbook_ethics.jpg",
        imgCaption: "Keterampilan Human-Centric: EQ, nalar kritis ground truth, dan pertimbangan moral etis.",
        pilotAnalogy: {
          title: "Komoditas Paling Berharga di Era AI",
          quote: "Bukan AI yang akan menggantikan manusia, melainkan manusia yang mahir memanfaatkan AI secara etis dan kritis yang akan melangkah jauh ke depan.",
          desc: "Tiga keterampilan yang diproyeksikan laporan World Economic Forum (Future of Jobs) tetap dominan dikuasai manusia:"
        },
        keyPillars: [
          {
            icon: "fa-heart",
            title: "Kecerdasan Emosional (EQ) & Relasi",
            desc: "Memimpin tim di masa krisis, menegosiasikan kesepakatan, dan membangun rasa saling percaya menuntut empati otentik yang tidak dimiliki mesin statistik."
          },
          {
            icon: "fa-shield-halved",
            title: "Ketajaman Kritis & Ground Truth",
            desc: "Kemampuan menginterogasi data, membongkar bias algoritma, dan memverifikasi fakta di tengah banjir konten sintetis menjadi komoditas langka."
          },
          {
            icon: "fa-scale-balanced",
            title: "Penilaian Moral & Etika Terapan",
            desc: "Keputusan bernilai tinggi (vonis peradilan, tindakan medis, tata kelola lingkungan) tetap membutuhkan pertimbangan nurani manusia yang berkesadaran penuh."
          }
        ],
        frameworkSeal: "Mengacu pada David H. Autor (MIT/JEP 2015), Michael Polanyi (1966), dan World Economic Forum Future of Jobs Report."
      }
    ]
  }
};
