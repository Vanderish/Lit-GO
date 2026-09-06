// Data Handbook Interaktif Bergaya Editorial Blue-and-White untuk Lit-GO
export const HANDBOOK_MODULES = {
  1: {
    id: 1,
    tag: "Level 1",
    levelNumber: "01",
    title: 'Kenalan dengan "Otak" AI',
    subtitle: "Definisi AI, UNESCO Framework, Mitos vs Realitas, & Halusinasi Data.",
    badge: "Pionir AI",
    readingTime: "4 Menit Baca",
    standardTag: "UNESCO AI Framework 2024 & Stanford AI Index",
    coverImg: "/illustrations/handbook_cover.jpg",
    coverTagline: "Panduan Komprehensif Memahami Logika Probabilitas & Nalar Kritis Penggunaan AI",
    stats: [
      { label: "Mekanisme Inti", value: "Stochastic Prediction" },
      { label: "Tingkat Kesadaran", value: "0% (Mesin Statistik)" },
      { label: "Prinsip Utama", value: "Human-in-the-Loop" }
    ],
    pages: [
      {
        pageNumber: "01",
        title: "Selamat Datang & Anatomi 'Otak' AI",
        tagline: "Membedah cara kerja kecerdasan buatan dari sudut pandang probabilitas matematis.",
        img: "/illustrations/handbook_brain.jpg",
        imgCaption: "Anatomi AI: Bekerja melalui jaringan bobot statistik untuk memprediksi token kata berikutnya.",
        contentSections: [
          {
            heading: "Apakah AI Benar-Benar 'Cerdas'?",
            text: "Pernahkah kamu bertanya-tanya bagaimana AI seperti ChatGPT, Claude, atau Gemini mampu menjawab pertanyaan rumit, menulis kode, hingga menggubah puisi? Jawabannya ada pada Artificial Intelligence (AI) atau Kecerdasan Buatan. Namun pertanyaannya: apakah ia benar-benar cerdas dan sadar seperti manusia?"
          },
          {
            heading: "Definisi Ilmiah: Simulasi Probabilitas",
            text: "Secara ilmiah, AI adalah simulasi kecerdasan manusia oleh mesin yang dilatih menggunakan miliaran hingga triliunan data teks dan multimodal. Berbeda dengan software konvensional yang mengeksekusi logika perintah 'if-then' yang kaku, model AI modern (khususnya Large Language Models / LLM) memetakan pola distribusi bahasa secara matematis."
          }
        ],
        callout: {
          type: "important",
          title: "UNESCO AI Competency Framework (2024):",
          text: "AI bekerja berbasis 'Stochastic Prediction' (prediksi probabilitas kata berikutnya). AI tidak memiliki kesadaran, kehendak bebas, empati, ataupun pemahaman hakiki tentang dunia nyata."
        }
      },
      {
        pageNumber: "02",
        title: "Mitos vs Realitas Kecerdasan Buatan",
        tagline: "Meluruskan kesalahpahaman umum dengan fakta teknis yang teruji.",
        img: "/illustrations/handbook_myth.jpg",
        imgCaption: "Inspeksi Faktual: Memilah antara kemampuan nyata AI dan persepsi fiksi masyarakat.",
        comparisons: [
          {
            myth: "AI memiliki perasaan, emosi, dan kehendak mandiri.",
            fact: "AI adalah program perangkat lunak dengan bobot matematika. Tanpa prompt instruksi dari manusia, AI tidak melakukan tindakan apa pun.",
            badge: "Mitos Terbantahkan"
          },
          {
            myth: "AI tahu segalanya dan jawabannya selalu 100% benar.",
            fact: "Pengetahuan AI hanya sebatas data pelatihannya. Data tersebut bisa saja usang, bias secara budaya, atau mengandung kekeliruan bawaan.",
            badge: "Fakta Teknis"
          },
          {
            myth: "AI memahami makna kalimat yang sedang diketiknya.",
            fact: "AI mengolah urutan token/vektor angka. Ia menyusun kalimat karena kata-kata tersebut sering muncul berurutan, bukan karena memahaminya.",
            badge: "Fakta Teknis"
          }
        ],
        quote: "Jangan perlakukan AI sebagai dewa peramal serba tahu, perlakukan ia sebagai kalkulator bahasa yang memerlukan verifikasi manusia."
      },
      {
        pageNumber: "03",
        title: "Waspada Fenomena 'Halusinasi' AI",
        tagline: "Kelemahan paling berisiko: menghasilkan kebohongan dengan nada ilmiah.",
        img: "/illustrations/handbook_hallucination.jpg",
        imgCaption: "Halusinasi Data: AI mengarang pasal hukum atau kutipan fiktif dengan intonasi sangat meyakinkan.",
        warningBox: {
          title: "Apa itu Halusinasi AI?",
          desc: "Halusinasi adalah fenomena di mana model AI menghasilkan fakta palsu, sitasi riset tidak ada, nama jurnal fiktif, atau nomor undang-undang palsu, tetapi menyampaikannya dengan gaya bahasa yang sangat percaya diri, ilmiah, dan meyakinkan."
        },
        whyHappens: {
          title: "Mengapa Halusinasi Terjadi?",
          text: "Objektif matematis AI adalah memaksimalkan kelancaran dan koherensi kalimat berikutnya (fluency), bukan mencari kebenaran ontologis (truth). Ketika AI tidak memiliki data presisi, sistem kalkulasinya cenderung 'mengisi celah kosong' dengan mengarang kata-kata yang terdengar masuk akal."
        },
        protocolSteps: [
          {
            num: "1",
            title: "Cross-Check Sumber Asli",
            desc: "Selalu lacak judul paper, nama penulis, nomor undang-undang, atau data numerik ke Google Scholar atau repositori terakreditasi."
          },
          {
            num: "2",
            title: "Uji Konsistensi (Counter-Prompt)",
            desc: "Uji jawaban AI dengan bertanya balik: 'Sebutkan DOI asli atau sumber primer resmi dari data tersebut, jika tidak yakin akui kamu tidak tahu.'"
          },
          {
            num: "3",
            title: "Zona Larangan Tanpa Validasi",
            desc: "Jangan pernah menggunakan jawaban AI tanpa konfirmasi dokter, pakar hukum, atau auditor keuangan untuk urusan medis, legal, dan finansial."
          }
        ]
      },
      {
        pageNumber: "04",
        title: "Filosofi Pilot vs Kopilot (Kesimpulan)",
        tagline: "Prinsip dasar literasi AI: Anda yang memegang kendali penerbangan.",
        img: "/illustrations/handbook_pilot.jpg",
        imgCaption: "Kolaborasi Ideal: AI berperan sebagai kopilot navigasi, manusia memegang kemudi utama.",
        pilotAnalogy: {
          title: "Prinsip Emas Literasi AI",
          quote: "AI adalah KOPILOT yang luar biasa untuk mempercepat riset dan menumbuhkan ide, namun KAMU ADALAH PILOT UTAMANYA.",
          desc: "Sebagai pilot, kamu bertanggung jawab atas keselamatan penerbangan, memeriksa instrumen, dan mengambil keputusan akhir. Jangan pernah membiarkan kopilot mengambil alih kemudi ketika kamu tertidur."
        },
        keyPillars: [
          { icon: "fa-scale-balanced", title: "Akuntabilitas Moral", desc: "Pengguna bertanggung jawab penuh atas keluaran dan dampak karya AI." },
          { icon: "fa-glasses", title: "Nalar Kritis Aktif", desc: "Selalu bersikap skeptis konstruktif terhadap setiap paragraf yang dihasilkan." },
          { icon: "fa-handshake", title: "Sinergi Produktif", desc: "Gunakan AI untuk melengkapi kapasitas berpikir manusia, bukan menggantikannya." }
        ],
        frameworkSeal: "Modul ini disusun mengacu pada UNESCO AI Competency Framework (2024) dan IEEE Ethics of Autonomous Systems."
      }
    ]
  },
  2: {
    id: 2,
    tag: "Level 2",
    levelNumber: "02",
    title: "Kompas Etika & Privasi",
    subtitle: "UNESCO Ethics 2021 & IEEE: Privasi Data, Hak Cipta, & Deteksi Deepfake.",
    badge: "Penjaga Etika",
    readingTime: "5 Menit Baca",
    standardTag: "UNESCO Ethics of AI 2021 & IEEE Global Initiative",
    coverImg: "/illustrations/handbook_ethics.jpg",
    coverTagline: "Navigasi Batasan Moral, Perlindungan Data Sensitif, dan Verifikasi Keaslian Media Digital",
    stats: [
      { label: "Standar Privasi", value: "Zero PII Exposure" },
      { label: "Regulasi", value: "UU PDP & UNESCO 2021" },
      { label: "Deteksi Manipulasi", value: "Forensik Deepfake" }
    ],
    pages: [
      {
        pageNumber: "01",
        title: "Data Pribadi & Prompt AI Publik",
        tagline: "Memahami apa yang terjadi pada data yang kamu masukkan ke dalam prompt.",
        img: "/illustrations/handbook_ethics.jpg",
        imgCaption: "Perlindungan Data: Jangan pernah memasukkan identitas pribadi atau rahasia organisasi ke AI publik.",
        contentSections: [
          {
            heading: "AI Publik Menyerap Data Latih",
            text: "Banyak pengguna tidak menyadari bahwa teks yang dimasukkan ke platform AI publik (kecuali jika enterprise tier atau zero-retention mode diaktifkan) berpotensi disimpan di server penyedia untuk melatih model generasi berikutnya."
          },
          {
            heading: "Klasifikasi PII (Personally Identifiable Information)",
            text: "Dilarang keras memasukkan NIK KTP, password perbankan, riwayat medis rekam kesehatan, nomor rekening, dan dokumen rahasia instansi ke prompt AI publik."
          }
        ],
        callout: {
          type: "important",
          title: "Aturan Utama Keamanan Data:",
          text: "Jika suatu informasi tidak aman untuk kamu tempelkan di papan pengumuman umum, jangan pernah memasukkannya ke kolom chat AI publik."
        }
      },
      {
        pageNumber: "02",
        title: "Mendeteksi Artefak Deepfake & Manipulasi Audio-Visual",
        tagline: "Teknik forensik sederhana untuk mengidentifikasi media sintetis AI.",
        img: "/illustrations/handbook_myth.jpg",
        imgCaption: "Forensik Visual: Amati anatomi biologis yang sering gagal dirender sempurna oleh AI generatif.",
        comparisons: [
          {
            myth: "Deepfake selalu sempurna dan mustahil dibedakan dengan mata telanjang.",
            fact: "Generative visual AI sering meninggalkan artefak mikroskopis: jari tangan berlebih (polydactyly), pantulan cahaya pupil asimetris, dan tekstur gigi yang menyatu.",
            badge: "Teknik Forensik"
          },
          {
            myth: "Klip suara AI selalu terdengar seperti robot monoton.",
            fact: "Voice cloning modern mampu meniru intonasi, tarikan napas, dan tawa. Verifikasi harus melalui saluran konfirmasi sekunder (telepon langsung/sandi keluarga).",
            badge: "Waspada Kloning Suara"
          }
        ],
        quote: "Dalam era deepfake, 'melihat belum tentu percaya'. Konfirmasi multi-kanal adalah benteng pertahanan terbaik."
      }
    ]
  },
  3: {
    id: 3,
    tag: "Level 3",
    levelNumber: "03",
    title: "Seni Berbicara dengan Mesin",
    subtitle: "NIST AI RMF & OpenAI Safety: 4 Elemen Anatomi Prompt, Few-Shot, & Safety Guardrails.",
    badge: "Master Prompt",
    readingTime: "5 Menit Baca",
    standardTag: "NIST AI Risk Management Framework & OpenAI Prompt Engineering Guide",
    coverImg: "/illustrations/handbook_prompt.jpg",
    coverTagline: "Kuasai Formula Presisi 4 Blok Prompting untuk Mendapatkan Output Berkualitas Tinggi",
    stats: [
      { label: "Formula Inti", value: "4-Block Framework" },
      { label: "Metode Presisi", value: "Few-Shot In-Context" },
      { label: "Standar Keamanan", value: "Prompt Injection Defense" }
    ],
    pages: [
      {
        pageNumber: "01",
        title: "Anatomi 4 Blok Prompting Presisi",
        tagline: "Struktur standar industri untuk menghasilkan respons AI yang tajam dan relevan.",
        img: "/illustrations/handbook_prompt.jpg",
        imgCaption: "Konstruksi Prompt: Susun Persona, Konteks, Instruksi, dan Format Output layaknya balok presisi.",
        contentSections: [
          {
            heading: "Mengapa 'Garbage In, Garbage Out' Berlaku?",
            text: "Kualitas jawaban AI merupakan cerminan langsung dari kejelasan instruksi yang kamu berikan. Prompt yang kabur seperti 'Tulis artikel tentang sejarah' akan menghasilkan jawaban umum dan dangkal."
          },
          {
            heading: "Rumus 4 Pilar Prompt Berkualitas",
            text: "1. Persona (Siapa AI bertindak: Dosen, Editor Senior)\n2. Konteks (Latar belakang situasi dan audiens target)\n3. Instruksi Spesifik (Tugas utama dengan batasan jelas)\n4. Format Output (Tabel, daftar poin ringkas, maksimal 200 kata)."
          }
        ],
        callout: {
          type: "important",
          title: "Few-Shot Prompting:",
          text: "Memberikan 1-2 contoh format output yang kamu inginkan (Few-Shot) meningkatkan akurasi respons AI hingga 300% dibandingkan instruksi tanpa contoh (Zero-Shot)."
        }
      }
    ]
  },
  4: {
    id: 4,
    tag: "Level 4",
    levelNumber: "04",
    title: "Asisten Produktivitas AI",
    subtitle: "Tips riset anti-hoaks, prompt repair, & faktualisasi verifikasi.",
    badge: "Inovator Produktif",
    readingTime: "4 Menit Baca",
    standardTag: "OECD AI Principles & Digital Literacy Guidelines",
    coverImg: "/illustrations/handbook_cover.jpg",
    coverTagline: "Maksimalkan Efisiensi Belajar dan Bekerja Tanpa Kehilangan Integritas Akademik",
    stats: [
      { label: "Efisiensi Kerja", value: "3x Lebih Cepat" },
      { label: "Integritas", value: "Etika Akademik Transparan" },
      { label: "Metode Riset", value: "Triangulasi Sumber" }
    ],
    pages: [
      {
        pageNumber: "01",
        title: "Etika Akademis & Kolaborasi Sehat dengan AI",
        tagline: "Menggunakan AI sebagai mitra dialog pemikiran, bukan jalan pintas plagiarisme.",
        img: "/illustrations/handbook_cover.jpg",
        imgCaption: "Riset Terintegrasi: Gunakan AI untuk brainstorming kerangka makalah, bukan menyalin jawaban mentah.",
        contentSections: [
          {
            heading: "Perbedaan Antara Kolaborasi dan Plagiarisme",
            text: "Menggunakan AI untuk menyusun outline, mencari sudut pandang argumen tandingan, atau membenahi tata bahasa adalah bentuk pemanfaatan produktif. Namun menyalin utuh teks AI dan mengklaimnya sebagai karya mandiri melanggar integritas ilmiah."
          },
          {
            heading: "Deklarasi Transparansi Penggunaan AI",
            text: "Dalam standar penulisan ilmiah modern, sebutkan secara jujur pada catatan kaki atau bagian metodologi jika kamu menggunakan AI untuk membantu eksplorasi gagasan awal."
          }
        ],
        callout: {
          type: "important",
          title: "Aturan Emas Mahasiswa & Peneliti:",
          text: "Setiap kalimat yang kamu serahkan harus dapat kamu pertanggungjawabkan dan jelaskan secara lisan tanpa bantuan layar AI."
        }
      }
    ]
  },
  5: {
    id: 5,
    tag: "Level 5",
    levelNumber: "05",
    title: "Kecerdasan Kritis & Masa Depan Kerja",
    subtitle: "Masa depan karir di era otomatisasi: Keterampilan manusiawi yang tak tergantikan.",
    badge: "Pemikir Kritis",
    readingTime: "4 Menit Baca",
    standardTag: "World Economic Forum (WEF) Future of Jobs Report",
    coverImg: "/illustrations/handbook_pilot.jpg",
    coverTagline: "Mengasah Kemampuan Berpikir Orisinal, Empati, dan Penilaian Strategis di Era Otomasi",
    stats: [
      { label: "Skill Utama WEF", value: "Analytical & Creative Thinking" },
      { label: "Diferensiasi", value: "Empati & Nalar Moral" },
      { label: "Orientasi", value: "Augmented Intelligence" }
    ],
    pages: [
      {
        pageNumber: "01",
        title: "Keterampilan Manusia yang Tak Bisa Ditiru Algoritma",
        tagline: "Ketika kemampuan kalkulasi diambil alih mesin, nilai kemanusiaan justru makin berharga.",
        img: "/illustrations/handbook_pilot.jpg",
        imgCaption: "Augmentasi Manusia: Masa depan bukan tentang manusia versus mesin, melainkan manusia bersama mesin.",
        contentSections: [
          {
            heading: "Batas Kemampuan Model Kecerdasan Buatan",
            text: "AI mampu memproses miliaran data dalam detik, namun ia tidak memiliki 'lived experience', kesadaran moral, rasa empati saat menatap mata sesama manusia, serta intuisi kreatif yang lahir dari rasa penasaran."
          },
          {
            heading: "Human Skills: Aset Termahal Masa Depan",
            text: "Tiga keahlian yang menjadi pembeda mutlak: 1. Critical Thinking (menantang premis yang keliru), 2. High Empathy & Collaboration (membangun relasi saling percaya), dan 3. Complex Problem Solving (menavigasi situasi tanpa kepastian)."
          }
        ],
        callout: {
          type: "important",
          title: "Kesimpulan Masa Depan Kerja:",
          text: "Bukan AI yang akan menggantikan manusia, melainkan manusia yang mahir memanfaatkan AI secara etis dan kritis yang akan melangkah jauh ke depan."
        }
      }
    ]
  },
  6: {
    id: 6,
    tag: "Level 6",
    levelNumber: "06",
    title: "Manifesto & Aksi Nyata",
    subtitle: "Deklarasi etika pribadi dan sertifikasi pionir literasi digital bertanggung jawab.",
    badge: "Duta AI Bijak",
    readingTime: "3 Menit Baca",
    standardTag: "Lit-GO AI Ethical Charter & UNESCO Youth Declaration",
    coverImg: "/illustrations/handbook_cover.jpg",
    coverTagline: "Janji Aksi Nyata Menjadi Pelopor Literasi AI yang Beradab dan Menginspirasi Lingkungan",
    stats: [
      { label: "Komitmen", value: "100% Etis & Bertanggung Jawab" },
      { label: "Sertifikasi", value: "Pionir Lit-GO Indonesia" },
      { label: "Misi", value: "Edukasi Komunitas Sekitar" }
    ],
    pages: [
      {
        pageNumber: "01",
        title: "Manifesto Pengguna AI Beradab",
        tagline: "Deklarasi sikap dan etika digital untuk menciptakan masa depan teknologi yang inklusif.",
        img: "/illustrations/handbook_cover.jpg",
        imgCaption: "Komitmen Bersama: Jadilah pionir yang cerdas bernalar, berintegritas, dan menjunjung martabat manusia.",
        contentSections: [
          {
            heading: "5 Janji Pionir Lit-GO",
            text: "1. Saya berjanji selalu memverifikasi fakta sebelum membagikan keluaran AI.\n2. Saya berjanji tidak memasukkan data rahasia pribadi orang lain ke AI publik.\n3. Saya berjanji transparan mendeklarasikan kontribusi AI dalam karya saya.\n4. Saya berjanji menolak pembuatan dan penyebaran konten hoaks deepfake.\n5. Saya berjanji menggunakan AI untuk memajukan ilmu pengetahuan dan kebaikan publik."
          }
        ],
        callout: {
          type: "important",
          title: "Selamat!",
          text: "Kamu telah menuntaskan seluruh fondasi literasi AI. Jadilah duta literasi yang menginspirasi teman, keluarga, dan lingkungan sekitarmu!"
        }
      }
    ]
  }
};
