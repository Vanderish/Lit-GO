# Modul 5: Eksplorasi AI Kreatif

> **Kurikulum Literasi AI Komprehensif**  
> *Berdasarkan Model Difusi DDPM Ho et al. (2020), 6 Sumbu Prompt Visual, Kebijakan US Copyright Office (2023), Regulasi AI Act Uni Eropa, dan Kerangka Lisensi Kolektif.*

---

## A. Enam Sumbu Prompt Visual

Model text-to-image dan text-to-video (seperti keluarga *Diffusion Model* yang dipopulerkan melalui riset **Denoising Diffusion Probabilistic Models / DDPM** oleh **Jonathan Ho dkk., UC Berkeley, NeurIPS 2020**) memerlukan instruksi yang terstruktur agar menghasilkan karya dengan komposisi artistik matang dan bebas dari distorsi anatomi.

Praktisi kreatif merumuskan **Enam Sumbu Prompt Visual**:
1. **Subjek (*Subject*):** Objek utama, karakter, tindakan spesifik, ekspresi wajah, pakaian, atau interaksi.
2. **Medium & Gaya Artistik (*Medium & Style*):** Fotografi 35mm, lukisan cat minyak Renaissance, rendering 3D Unreal Engine 5, anime cel-shaded, atau litografi vintage.
3. **Pencahayaan (*Lighting*):** *Golden hour*, pencahayaan sinematik *chiaroscuro*, neon *cyberpunk*, *rim light*, atau cahaya lembut terdistribusi (*softbox*).
4. **Sudut Pandang & Komposisi (*Camera Angle & Composition*):** *Wide-angle shot*, lensa makro 85mm f/1.8, *bird's eye view*, *rule of thirds*, atau sudut pandang dramatis dari bawah (*low angle*).
5. **Palet Warna & Atmosfer (*Color Palette & Mood*):** Warna pastel lembut, monokrom kontras tinggi, palet warna bumi (*earthy tones*), atmosfer melankolis, atau energik.
6. **Detail Teknis (*Technical Modifiers*):** Resolusi 8K, *octane render*, *hyperrealistic*, kedalaman ruang tajam (*shallow depth of field*), atau simulasi butiran film analog (*film grain*).

---

## B. Siapa Pemilik Hak Cipta Karya AI? Perspektif Hukum Global

Pertanyaan seputar hak cipta atas karya yang dihasilkan oleh kecerdasan buatan menjadi salah satu perdebatan hukum paling krusial di seluruh dunia:

### 1. Amerika Serikat: Doktrin Keaslian Manusia (*Human Authorship Requirement*)
**U.S. Copyright Office (USCO, Maret 2023)** mengeluarkan pedoman resmi: karya yang dihasilkan murni oleh AI melalui perintah teks (*prompt*) **tidak memenuhi syarat untuk mendapatkan perlindungan hak cipta**, karena hukum hak cipta AS mensyaratkan adanya penciptaan manusia (*human authorship*). 

Namun, jika manusia memodifikasi, mengedit secara substansial, atau menyusun elemen-elemen AI ke dalam sebuah susunan baru yang menunjukkan kreativitas manusiawi, maka perlindungan hak cipta hanya berlaku pada bagian modifikasi dan susunan kreatif manusia tersebut.

### 2. Uni Eropa: Penambangan Teks dan Data (TDM Exception & Opt-Out)
**Uni Eropa (melalui Regulasi DSM Directive dan EU AI Act 2024)** mengizinkan perusahaan melatih model AI menggunakan data publik di internet, **kecuali jika pemilik hak cipta secara eksplisit menyatakan menolak (*opt-out*)** hak penambangan data mereka melalui metadata yang dapat dibaca mesin (*machine-readable format*).

### 3. Pendekatan Alternatif: Model Lisensi Kolektif
Sejumlah yurisdiksi dan organisasi industri (seperti di India dan serikat pekerja kreatif) mendorong pembentukan **lembaga manajemen kolektif (*collective management organizations*)**. Pendekatan ini mewajibkan pengembang AI membayar royalti kepada kumpulan seniman dan kreator yang karyanya dipakai sebagai bahan pelatihan model.

---

## 📝 Kuis Evaluasi Pemahaman

### Kuis 1: Apa alasan utama praktisi AI kreatif memecah prompt ke dalam enam sumbu (subjek, medium, pencahayaan, sudut kamera, warna, detail teknis)?
*   **A.** Agar generator AI tidak mengalami eror server saat merender.
*   **B.** Untuk memberikan kendali artistik yang presisi dan mencegah hasil gambar yang klise atau terdistorsi.
*   **C.** Karena komputer hanya bisa membaca instruksi jika terdiri dari tepat enam kata.
*   **D.** Untuk memperbesar ukuran file gambar secara otomatis.

> **Jawaban & Pembahasan:** **B.** Enam sumbu prompt membantu mengarahkan model difusi secara detail pada aspek visual tertentu, menghasilkan komposisi yang proporsional dan sesuai visi kreatif kreator.

---

### Kuis 2: Berdasarkan panduan resmi U.S. Copyright Office (USCO, 2023), apakah gambar yang murni dihasilkan dari prompt AI generatif bisa didaftarkan hak ciptanya?
*   **A.** Bisa secara otomatis atas nama bot AI tersebut.
*   **B.** Bisa atas nama perusahaan penyedia kartu grafis komputer.
*   **C.** Tidak bisa, karena hukum hak cipta mensyaratkan unsur penciptaan manusiawi (human authorship).
*   **D.** Bisa, tetapi hanya jika prompt-nya lebih dari 100 kata.

> **Jawaban & Pembahasan:** **C.** USCO menegaskan bahwa karya yang murni dihasilkan mesin lewat prompt tidak memiliki hak cipta; hak cipta hanya melekat pada elemen modifikasi atau susunan kreatif manusia.

---

### Kuis 3: Riset penting Ho dkk. (NeurIPS 2020) yang menjadi fondasi algoritma di balik Stable Diffusion dan Midjourney berjudul...
*   **A.** Attention Is All You Need
*   **B.** Denoising Diffusion Probabilistic Models (DDPM)
*   **C.** Deep Residual Learning
*   **D.** Generative Adversarial Networks

> **Jawaban & Pembahasan:** **B.** DDPM (Jonathan Ho dkk., 2020) merintis fondasi pemodelan difusi modern untuk generasi gambar berkualitas tinggi dari derau acak (noise).

---

### Kuis 4: Bagaimana regulasi Uni Eropa (melalui DSM Directive & EU AI Act) mengatur penggunaan karya seniman untuk pelatihan model AI?
*   **A.** Melarang total semua penggunaan AI di bidang seni.
*   **B.** Membolehkan penambangan data pelatihan, kecuali jika seniman secara eksplisit menyatakan opt-out lewat metadata yang dapat dibaca mesin.
*   **C.** Memberikan denda kepada seniman yang tidak mau karyanya dipelajari oleh AI.
*   **D.** Menghapus hak cipta semua karya seni yang diunggah ke internet.

> **Jawaban & Pembahasan:** **B.** Aturan Uni Eropa menerapkan pengecualian penambangan data (TDM), namun memberi hak opt-out eksplisit bagi pemegang hak cipta yang menolak karyanya dijadikan data latih.

---

## 🎮 Konsep Permainan Edukatif: "Sutradara AI" (Enam Sumbu Challenge)

Permainan kombinasi kartu artistik untuk melatih penyusunan prompt visual terstruktur sekaligus membuka ruang diskusi seputar orisinalitas dan etika hak cipta karya visual AI.

*   **Penyusunan Dek Kartu:** Disediakan 6 tumpukan kartu:
    1. **Dek Subjek:** (mis. *"Arsitek lanskap sedang merancang kubah kaca"*).
    2. **Dek Medium:** (mis. *"Foto analog 35mm grain"* atau *"Litografi abad 19"*).
    3. **Dek Pencahayaan:** (mis. *"Rembrandt lighting"* atau *"Neon cyberpunk"*).
    4. **Dek Komposisi:** (mis. *"Cinematic wide-shot 24mm rule of thirds"*).
    5. **Dek Palet Warna:** (mis. *"Monokrom sepia"* atau *"Vibrant teal and orange"*).
    6. **Dek Detail Teknis:** (mis. *"Shallow depth of field f/1.4"*).
*   **Tantangan Merangkai:** Peserta menarik 1 kartu dari tiap dek, merangkainya menjadi satu prompt koheren, lalu merendernya di generator visual AI.
*   **Simulasi "Sidang Hak Cipta":** Kelompok membedah karya yang dihasilkan: apakah gambar tersebut layak diklaim memiliki sentuhan kreatif manusiawi atau murni susunan probabilitas algoritma (berdasarkan kriteria US Copyright Office).

---

### 📚 Referensi Akademik Terkait
- **Ho, J., Jain, A., & Abbeel, P. (2020).** *Denoising Diffusion Probabilistic Models (DDPM)*. NeurIPS 2020 / arXiv:2006.11239.
- **U.S. Copyright Office (2023).** *Copyright Registration Guidance: Works Containing Material Generated by Artificial Intelligence*. Federal Register, 88(51), 16190-16194.
- **European Union (2019/2024).** *Directive (EU) 2019/790 on Copyright and Related Rights in the Digital Single Market & The Artificial Intelligence Act*.
