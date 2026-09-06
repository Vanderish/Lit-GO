# Modul 3: Seni Berbicara dengan Mesin (Prompt Engineering)

> **Kurikulum Literasi AI Komprehensif**  
> *Berdasarkan Formula 4 Pilar Rekayasa Prompt, Riset Few-Shot GPT-3 Brown et al. (2020), Chain-of-Thought Wei et al. (2022), dan ReAct Framework Yao et al. (2022).*

---

## A. Empat Pilar Instruksi yang Efektif

Kualitas output model AI berbanding lurus dengan ketepatan instruksi yang diberikan (*garbage in, garbage out*). Prompt yang efektif bukan sekadar kumpulan kata kunci acak, melainkan struktur instruksi yang mencakup **Empat Pilar Utama**:

1. **Konteks (*Context*):**  
   Latar belakang masalah, audiens target, tujuan proyek, atau situasi spesifik di mana informasi akan digunakan.  
   *(Contoh: "Saya adalah guru SMA yang sedang menyusun rencana pengajaran biologi kelas 10...")*
2. **Instruksi (*Instruction* / Task):**  
   Tugas konkret yang harus dikerjakan model secara spesifik, menggunakan kata kerja operasional yang jelas.  
   *(Contoh: "Buatlah rubrik asesmen formatif 4 tingkat untuk praktikum fotosintesis...")*
3. **Format (*Format* / Output Constraints):**  
   Bentuk keluaran yang diinginkan secara detail: tabel Markdown, poin-poin bertingkat, kode JSON, esai 300 kata, atau dialog interaktif.  
   *(Contoh: "Sajikan dalam tabel Markdown 4 kolom: Kriteria, Skor 1-4, Deskripsi, dan Bobot...")*
4. **Persona (*Persona* / Role):**  
   Identitas profesional atau sudut pandang keahlian yang harus diadopsi oleh AI.  
   *(Contoh: "Bertindaklah sebagai kurator kurikulum nasional dan pakar pedagogi sains...")*

> 💡 **Fungsi Teknis Persona:**  
> Menetapkan persona bukan sekadar gaya bahasa, melainkan mengondisikan distribusi probabilitas LLM (*steering attention*) agar memprioritaskan istilah teknis, metodologi, dan pola nalar yang relevan dengan domain keahlian tersebut.

---

## B. Taksonomi Teknik Rekayasa Prompting

| Teknik Prompting | Mekanisme Kerja | Landasan Ilmiah & Studi Kasus |
| :--- | :--- | :--- |
| **Zero-Shot Prompting** | Memberikan instruksi langsung tanpa contoh sebelumnya. Model mengandalkan representasi data latih dasar. | Cocok untuk tugas terjemahan sederhana, peringkasan ringkas, atau pembuatan draf umum. |
| **Few-Shot Prompting** | Menyertakan 2–5 contoh pasangan input-output yang ideal sebelum meminta AI mengerjakan tugas target. | Dipopulerkan makalah legendaris **GPT-3 (Brown dkk., OpenAI, NeurIPS 2020)**. Menghilangkan ambiguitas format dan meningkatkan konsistensi output secara drastis. |
| **Chain-of-Thought (CoT)** | Menginstruksikan model untuk "berpikir langkah-demi-langkah" (*"Let's think step by step"*) sebelum menulis kesimpulan akhir. | Dibuktikan oleh **Wei dkk. (Google Research, NeurIPS 2022)**. Membuka kemampuan penalaran simbolik (*multi-step reasoning*) pada matematika dan penalaran logis. |
| **ReAct Framework** | Menggabungkan penalaran (*Reasoning*) dan tindakan eksekusi (*Action*) secara interaktif dalam satu putaran loop. | Diperkenalkan oleh **Yao dkk. (Princeton & Google Brain, ICLR 2023)**. Fondasi utama di balik agen AI otonom yang dapat memanggil kalkulator, API, dan mesin pencari. |

---

## 📝 Kuis Evaluasi Pemahaman

### Kuis 1: Apa fungsi teknis menetapkan "Persona" pada instruksi AI?
*   **A.** Sekadar memperindah gaya bahasa agar terlihat ramah.
*   **B.** Membantu model mengarahkan distribusi probabilitas kata ke domain dan kosakata bidang keahlian tertentu.
*   **C.** Mengubah nama model AI di server pusat.
*   **D.** Mempercepat koneksi internet pengguna.

> **Jawaban & Pembahasan:** **B.** Persona mempersempit ruang distribusi token model sehingga responsnya lebih konsisten dengan kosakata dan kerangka berpikir keahlian yang diminta.

---

### Kuis 2: Makalah penelitian Brown dkk. (NeurIPS 2020) menunjukkan bahwa menyertakan beberapa contoh input-output sebelum meminta AI menjawab sangat efektif. Teknik ini disebut...
*   **A.** Zero-Shot Prompting
*   **B.** Fine-Tuning Mandiri
*   **C.** Few-Shot Prompting
*   **D.** Prompt Injection

> **Jawaban & Pembahasan:** **C.** Few-shot prompting memberikan beberapa contoh pola input-output sebagai referensi sebelum model mengeksekusi tugas baru (Brown dkk., 2020).

---

### Kuis 3: Apa manfaat menambahkan instruksi "Mari kita pikirkan langkah demi langkah" (Chain-of-Thought, Wei dkk. 2022)?
*   **A.** Menghapus batasan token pada model.
*   **B.** Membantu model memecah soal logika rumit menjadi tahapan berurutan sehingga akurasi penalaran meningkat.
*   **C.** Memastikan AI tidak pernah menghasilkan kode pemrograman.
*   **D.** Menghemat daya listrik server AI.

> **Jawaban & Pembahasan:** **B.** Chain-of-Thought (CoT) memicu penalaran eksplisit di mana model memecahkan masalah langkah-demi-langkah sebelum memberikan jawaban akhir.

---

### Kuis 4: Kerangka kerja ReAct (Yao dkk., 2022) merupakan singkatan dari perpaduan dua hal utama, yaitu...
*   **A.** Reading dan Acting
*   **B.** Reasoning dan Acting (Penalaran dan Tindakan)
*   **C.** Reactivity dan Activation
*   **D.** Reviewing dan Actualizing

> **Jawaban & Pembahasan:** **B.** ReAct memadukan kemampuan Reasoning (merencanakan apa yang harus dilakukan) dan Acting (mengeksekusi alat bantu seperti kalkulator, browser, atau API).

---

## 🎮 Konsep Permainan Edukatif: "Bengkel Prompt" (Prompt Makeover)

Permainan kompetitif untuk merombak prompt buruk menjadi prompt presisi tinggi menggunakan kerangka 4 Pilar (Konteks, Instruksi, Format, Persona).

*   **Skenario Tantangan:** Peserta menerima prompt ambigu seperti:
    - *"Bantu aku bikin CV"*
    - *"Jelaskan tentang investasi"*
    - *"Bikin rencana belajar"*
*   **Misi 5 Menit:** Peserta merombak prompt tersebut menjadi prompt profesional dengan melengkapi keempat pilar dan menyertakan pembatas format yang jelas.
*   **Babak Bonus CoT:** Peserta menambahkan perintah penalaran (*"Jabarkan langkah demi langkah sebelum membuat formula"*) dan menguji komparasi output model dengan vs tanpa CoT.
*   **Kriteria Penilaian:** Relevansi, kedalaman wawasan, kepatuhan format keluaran, dan ketepatan persona profesional.

---

### 📚 Referensi Akademik Terkait
- **Brown, T., et al. (2020).** *Language Models are Few-Shot Learners*. OpenAI, NeurIPS 2020 / arXiv:2005.14165.
- **Wei, J., Wang, X., Schuurmans, D., Bosma, M., Xia, F., Chi, E., Le, Q. V., & Zhou, D. (2022).** *Chain-of-Thought Prompting Elicits Reasoning in Large Language Models*. NeurIPS 2022 / arXiv:2201.11903.
- **Yao, S., Zhao, J., Yu, D., Du, N., Shafran, I., Narasimhan, K., & Cao, Y. (2022).** *ReAct: Synergizing Reasoning and Acting in Language Models*. ICLR 2023 / arXiv:2210.03629.
