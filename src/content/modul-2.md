# Modul 2: Kompas Etika, Keamanan & Privasi

> **Kurikulum Literasi AI Komprehensif**  
> *Berdasarkan Rekomendasi UNESCO (2021), Surat Edaran Menkominfo No. 9/2023, Audit Gender Shades Buolamwini (2018), Riset Word2Vec Bolukbasi (2016), dan Koalisi C2PA.*

---

## A. Kerangka Etika Global dan Nasional

Pada November 2021, **UNESCO** mengesahkan **Recommendation on the Ethics of Artificial Intelligence** — standar normatif global pertama di bidang kecerdasan buatan yang disepakati secara aklamasi oleh 193 negara anggota. Dokumen ini menegaskan prinsip perlindungan martabat manusia, hak asasi manusia, keadilan sosial, keberlanjutan lingkungan, transparansi, akuntabilitas, dan prinsip bahwa manusia harus selalu memegang kendali pengawasan (*human oversight*) atas keputusan sistem kecerdasan buatan.

Di Indonesia, **Kementerian Komunikasi dan Informatika (Kominfo)** menindaklanjutinya dengan menerbitkan **Surat Edaran Menkominfo Nomor 9 Tahun 2023 tentang Etika Kecerdasan Artifisial**. Surat edaran ini menjadi panduan etis resmi bagi pengembang dan penyelenggara sistem elektronik untuk:
1. Mencegah kebocoran data pribadi dan diskriminasi algoritma.
2. Memastikan transparansi dan keamanan digital.
3. Menyelaraskan implementasi AI dengan ketentuan **UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP)**.

---

## B. Bias Algoritma: Ketika AI Meniru Ketidakadilan Manusia

AI belajar dari dataset masa lalu yang disusun oleh manusia — termasuk prasangka, ketimpangan, dan stereotip yang ada di dalamnya. 

Riset audit legendaris **"Gender Shades" (2018)** oleh **Joy Buolamwini (MIT Media Lab) dan Timnit Gebru**, dipresentasikan di *Conference on Fairness, Accountability and Transparency (FAT\*)*, membuktikan disparitas akurasi fatal pada tiga sistem klasifikasi wajah komersial terkemuka:
- Tingkat kesalahan (*error rate*) untuk pria berkulit terang: **hanya 0,8%**.
- Tingkat kesalahan untuk perempuan berkulit gelap: **melonjak drastis hingga 34,7%**.

Penyebabnya terungkap saat mengaudit dataset benchmark: dataset populer (seperti Adience) ternyata didominasi hingga 86,2% oleh subjek berkulit terang. Studi ini mengguncang industri teknologi dan memaksa perusahaan-perusahaan besar menghentikan sementara penjualan produk pengenalan wajah komersial mereka.

Bias serupa merambah pemrosesan bahasa alami. Riset **Bolukbasi dkk. (2016)**, *"Man is to Computer Programmer as Woman is to Homemaker? Debiasing Word Embeddings"*, membuktikan bahwa model representasi vektor kata (*Word2Vec*) yang dilatih dari teks berita menyerap stereotip patriarkal secara matematis. Sebagai contoh, model menghasilkan proyeksi analogi otomatis: *"pria : programmer :: wanita : ibu rumah tangga"*. Hal ini membuktikan bahwa bias bukan sekadar perdebatan sosial, melainkan risiko teknis riil yang dapat merugikan pelamar kerja dalam sistem rekrutmen otomatis.

---

## C. Melawan Deepfake: Forensik Digital vs. Standar C2PA

Media sintetis (*deepfake*) kini semakin canggih dan sulit dikenali mata telanjang. Dalam literasi keamanan digital, terdapat dua pendekatan utama untuk menghadapinya:

| Dimensi | Deteksi Forensik Digital | Standar Provenance C2PA |
| :--- | :--- | :--- |
| **Sifat Pendekatan** | **Reaktif** (Pengecekan Pasca-Penyebaran) | **Proaktif** (Sertifikasi Sejak Pembuatan) |
| **Cara Kerja** | Menganalisis ketidakkonsistenan piksel, pencahayaan mata, distorsi frekuensi, artefak kompresi. | Menyematkan tanda tangan kriptografis tahan rusak (*tamper-evident metadata*) langsung ke file media. |
| **Pertanyaan Inti** | *"Apakah gambar/video ini palsu atau hasil editan?"* | *"Dari mana asal media ini, perangkat apa yang merekam, dan riwayat editan apa yang terjadi?"* |
| **Inisiator Utama** | Peneliti keamanan siber & lab forensik digital. | **Coalition for Content Provenance and Authenticity (C2PA)** — didukung Adobe, Microsoft, BBC, Google, Intel, Arm, dll. |

> 💡 **Analogi C2PA:**  
> C2PA diibaratkan seperti *"Label Nutrisi"* atau *"Akta Lahir Digital"* pada kemasan makanan: publik bisa mengklik tombol informasi untuk melihat riwayat asal file, tanggal jepretan kamera, software penyunting, hingga jejak keterlibatan model AI generatif.

---

## 📝 Kuis Evaluasi Pemahaman

### Kuis 1: Apa tujuan utama standar etika AI UNESCO (2021) dan pedoman Kominfo (SE Menkominfo No. 9/2023)?
*   **A.** Melarang total pengembangan teknologi AI di semua sektor.
*   **B.** Memastikan AI dikembangkan dengan menghormati HAM, inklusivitas, transparansi, serta perlindungan data pribadi.
*   **C.** Mewajibkan AI menggantikan semua pekerjaan manusia dalam 5 tahun.
*   **D.** Menyerahkan seluruh keputusan hukum kepada algoritma otomatis.

> **Jawaban & Pembahasan:** **B.** Keduanya menekankan perlindungan martabat manusia, transparansi, pengawasan manusia, serta kepatuhan pada regulasi data pribadi (UU PDP).

---

### Kuis 2: Riset "Gender Shades" (Buolamwini & Gebru, 2018) menemukan error rate AI pengenalan wajah pada perempuan berkulit gelap mencapai 34,7%, sedangkan pria kulit putih hanya 0,8%. Apa akar masalah utamanya?
*   **A.** Kamera yang digunakan saat pengujian rusak.
*   **B.** Dataset pelatihan didominasi subjek pria berkulit terang sehingga model tidak terlatih baik pada keragaman lain.
*   **C.** Algoritma sengaja diprogram secara jahat oleh peneliti.
*   **D.** Komputer tidak mampu memproses warna selain hitam dan putih.

> **Jawaban & Pembahasan:** **B.** Bias representasi dataset pelatihan adalah akar masalah utama; algoritma hanya seakurat keragaman data yang dipelajarinya.

---

### Kuis 3: Apa perbedaan mendasar antara pendekatan Deteksi Forensik dengan standar C2PA dalam menghadapi deepfake?
*   **A.** Forensik bekerja sebelum media dibuat, C2PA bekerja setelah media tersebar.
*   **B.** Forensik bersifat reaktif dengan memeriksa artefak piksel, sedangkan C2PA bersifat proaktif menyematkan riwayat kriptografis sejak media dibuat.
*   **C.** Forensik hanya untuk audio, C2PA hanya untuk teks.
*   **D.** C2PA menghapus metadata file, sedangkan forensik menambahkan metadata baru.

> **Jawaban & Pembahasan:** **B.** Forensik menganalisis kejanggalan piksel setelah media tersebar (reaktif), sementara C2PA menyematkan manifest kriptografis tahan rusak sejak awal pembuatan (proaktif).

---

### Kuis 4: Temuan riset Bolukbasi dkk. (2016) memperlihatkan bahwa Word2Vec menghasilkan analogi bias seperti "man is to computer programmer as woman is to homemaker". Risiko nyata apa yang bisa terjadi dari bias ini?
*   **A.** Komputer akan mati secara otomatis jika membaca kata perempuan.
*   **B.** Sistem seleksi CV berbasis AI bisa secara otomatis mendiskriminasi kandidat perempuan untuk posisi teknis.
*   **C.** Tidak ada dampak nyata karena AI hanyalah program di komputer.
*   **D.** Kecepatan internet di wilayah tertentu akan melambat.

> **Jawaban & Pembahasan:** **B.** Model pemrosesan bahasa yang bias dapat menyusup ke sistem seleksi otomatis (mis. screening CV kerja) dan memfilter kandidat berdasarkan stereotip gender tanpa disengaja oleh pihak perekrut.

---

## 🎮 Konsep Permainan Edukatif: "Asli atau Rekayasa?"

Permainan simulasi kelompok untuk melatih kewaspadaan terhadap bias algoritma dan konten sintetis, sekaligus mempraktikkan kerangka berpikir verifikasi provenance ala C2PA.

*   **Komponen Kasus:** Fasilitator menyiapkan kartu studi kasus:
    1. Rekrutmen HRD otomatis yang menolak CV perempuan untuk posisi engineering.
    2. Deepfake audio suara tokoh publik yang meminta transfer dana darurat.
    3. Foto bencana alam buatan AI yang tidak memiliki riwayat manifest C2PA.
    4. Artikel opini yang bias karena dilatih dari korpus internet satu arah.
*   **Cara Bermain:** Tim beradu cepat mengkategorikan kartu ke dalam: *"Bias Dataset"*, *"Kesalahan Teknis Netral"*, atau *"Rekayasa / Deepfake"*, dan wajib menyebutkan minimal satu bukti pendukung ala C2PA (jejak metadata, sumber asal data, siapa pembuatnya).
*   **Refleksi:** Peserta mendiskusikan langkah mitigasi tata kelola yang relevan dengan SE Kominfo No. 9/2023 di lingkungan institusi mereka.

---

### 📚 Referensi Akademik Terkait
- **UNESCO (2021).** *Recommendation on the Ethics of Artificial Intelligence*. Paris: UNESCO.
- **Kementerian Komunikasi dan Informatika RI (2023).** *Surat Edaran Menkominfo No. 9 Tahun 2023 tentang Etika Kecerdasan Artifisial*.
- **Buolamwini, J., & Gebru, T. (2018).** *Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification*. Proceedings of Machine Learning Research (FAT\*), 81, 77–91.
- **Bolukbasi, T., Chang, K.-W., Zou, J., Saligrama, V., & Kalai, A. (2016).** *Man is to Computer Programmer as Woman is to Homemaker? Debiasing Word Embeddings*. NeurIPS 2016.
- **C2PA (Coalition for Content Provenance and Authenticity).** *Technical Specifications for Digital Media Provenance*. Supported by Adobe, Microsoft, BBC, Google, Intel.
