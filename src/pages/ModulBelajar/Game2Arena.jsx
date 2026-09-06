import React, { useState, useEffect } from 'react';
import './Game2Arena.css';

// 24 MIMO-STYLE INTERACTIVE CODE & PROMPT CHALLENGES (4 STEPS x 6 MODULES)
const MIMO_CHALLENGES = {
  // === MODUL 1: KENALAN DENGAN OTAK BUATAN ===
  '1-1': {
    moduleTitle: 'Modul 1: Kenalan dengan "Otak" Buatan',
    stepTitle: 'Langkah 1: Sejarah & Arsitektur AI',
    instruction: 'Pisahkan baris teks dan format instruksi prompt AI menggunakan tag pemisah:',
    instructionHighlight: '<br>',
    fileName: 'index.html',
    fileType: 'html',
    codeTemplate: [
      { text: '<h1>My favorite things</h1>' },
      { text: '<p>' },
      { text: 'Raindrops on roses ' },
      { slotId: 0 },
      { text: 'Whiskers on kittens' },
      { slotId: 1 },
      { text: 'Bright copper kettles ' },
      { slotId: 2 },
      { text: 'Warm woolen mittens' },
      { text: '</p>' }
    ],
    tokens: ['<br>', '<br>', '<br>', '<hr>', '<p>'],
    solution: ['<br>', '<br>', '<br>'],
    previewType: 'browser_html',
    explanation: 'Tag <br> (Line Break) dalam HTML dan template teks digunakan untuk menyisipkan pemisah baris tanpa membuka paragraf baru, memudahkan penataan bait prompt agar instruksi terbaca rapi oleh mesin.',
    citation: 'Vaswani dkk. (2017) & Konvensi Format Teks W3C.'
  },
  '1-2': {
    moduleTitle: 'Modul 1: Kenalan dengan "Otak" Buatan',
    stepTitle: 'Langkah 2: Mekanisme Self-Attention',
    instruction: 'Lengkapi kalkulasi matriks Self-Attention Transformer (Vaswani dkk., 2017):',
    instructionHighlight: 'Attention(Q, K, V)',
    fileName: 'attention_mechanism.py',
    fileType: 'python',
    codeTemplate: [
      { text: '# Vaswani et al. (2017) Attention Is All You Need' },
      { text: 'def scaled_dot_product_attention(Q, K, V, d_k):' },
      { text: '    scores = torch.matmul(' },
      { slotId: 0 },
      { text: ', ' },
      { slotId: 1 },
      { text: '.transpose(-2, -1)) / math.sqrt(d_k)' },
      { text: '    attention_weights = F.softmax(scores, dim=-1)' },
      { text: '    return torch.matmul(attention_weights, ' },
      { slotId: 2 },
      { text: ')' }
    ],
    tokens: ['Q', 'K', 'V', 'RNN_Cell', 'Hidden_State'],
    solution: ['Q', 'K', 'V'],
    previewType: 'attention_weights',
    explanation: 'Mekanisme self-attention mengalikan matriks Query (Q) dan Key (K) secara dot-product yang dibagi akar d_k, lalu di-softmax untuk membobot representasi Value (V). Inovasi ini membuang recurrence dan memungkinkan komputasi paralel masif.',
    citation: 'Vaswani, A., et al. (2017). Attention Is All You Need. NeurIPS 2017.'
  },
  '1-3': {
    moduleTitle: 'Modul 1: Kenalan dengan "Otak" Buatan',
    stepTitle: 'Langkah 3: Logika Probabilitas & Sampling',
    instruction: 'Atur parameter inferensi agar LLM menghasilkan jawaban yang presisi dan deterministik:',
    instructionHighlight: 'temperature & top_p',
    fileName: 'sampling_config.json',
    fileType: 'json',
    codeTemplate: [
      { text: '{' },
      { text: '  "model": "transformer-llm-v2",' },
      { text: '  "sampling_strategy": "nucleus",' },
      { text: '  "temperature": ' },
      { slotId: 0 },
      { text: ',' },
      { text: '  "top_p": ' },
      { slotId: 1 },
      { text: ',' },
      { text: '  "mode": ' },
      { slotId: 2 },
      { text: '}' }
    ],
    tokens: ['0.2', '0.95', '"factual_research"', '1.9', '"random_hallucinate"'],
    solution: ['0.2', '0.95', '"factual_research"'],
    previewType: 'sampling_chart',
    explanation: 'Temperature rendah (misal 0.2) menajamkan distribusi probabilitas softmax sehingga model memilih token dengan kemungkinan tertinggi, meminimalkan spekulasi acak pada riset akademik.',
    citation: 'Brown, T., et al. (2020). Language Models are Few-Shot Learners. NeurIPS 2020.'
  },
  '1-4': {
    moduleTitle: 'Modul 1: Kenalan dengan "Otak" Buatan',
    stepTitle: 'Langkah 4: Detektif Halusinasi & Validator',
    instruction: 'Pasang penangkap eksepsi saat klaim model tidak terbukti pada sumber primer:',
    instructionHighlight: 'AIHallucinationError',
    fileName: 'hallucination_guard.py',
    fileType: 'python',
    codeTemplate: [
      { text: 'def audit_legal_claim(claim, primary_sources):' },
      { text: '    if not primary_sources.contains(claim):' },
      { text: '        raise ' },
      { slotId: 0 },
      { text: '("Kutipan fiktif terdeteksi!")' },
      { text: '    return ' },
      { slotId: 1 }
    ],
    tokens: ['AIHallucinationError', 'VERIFIED_FACT', 'Ignore_Warning', 'SyntaxError'],
    solution: ['AIHallucinationError', 'VERIFIED_FACT'],
    previewType: 'audit_terminal',
    explanation: 'Studi audit independen di ranah hukum membuktikan LLM rawan mengarang nomor pasal dan yurisprudensi jika tidak ditambatkan (grounded) pada data primer dan divalidasi oleh manusia.',
    citation: 'Lin, S., et al. (2021). TruthfulQA: Measuring How Models Mimic Human Falsehoods.'
  },

  // === MODUL 2: KOMPAS ETIKA, KEAMANAN & PRIVASI ===
  '2-1': {
    moduleTitle: 'Modul 2: Kompas Etika, Keamanan & Privasi',
    stepTitle: 'Langkah 1: Kerangka Etika Global & Nasional',
    instruction: 'Konfigurasikan gerbang kepatuhan etika SE Menkominfo No. 9/2023 dan UU PDP:',
    instructionHighlight: 'human_oversight & pdp_consent',
    fileName: 'compliance_gate.py',
    fileType: 'python',
    codeTemplate: [
      { text: '# Standar Normatif UNESCO (2021) & Kominfo RI' },
      { text: 'def process_sensitive_data(user_record):' },
      { text: '    assert user_record.has_consent == ' },
      { slotId: 0 },
      { text: '    if user_record.is_high_risk():' },
      { text: '        trigger_gate(' },
      { slotId: 1 },
      { text: ')' }
    ],
    tokens: ['True', '"HUMAN_OVERSIGHT"', '"BYPASS_PRIVACY"', 'False'],
    solution: ['True', '"HUMAN_OVERSIGHT"'],
    previewType: 'compliance_badge',
    explanation: 'SE Menkominfo No. 9/2023 dan UNESCO (2021) mewajibkan persetujuan subjek data serta pengawasan manusia (human oversight) untuk setiap pemrosesan sistem cerdas berisiko tinggi.',
    citation: 'UNESCO (2021) & Kementerian Kominfo RI (SE No. 9/2023).'
  },
  '2-2': {
    moduleTitle: 'Modul 2: Kompas Etika, Keamanan & Privasi',
    stepTitle: 'Langkah 2: Bias Algoritma (Gender Shades)',
    instruction: 'Seimbangkan proporsi demografi dataset latih guna mereduksi disparitas error rate:',
    instructionHighlight: 'rebalance_demographics()',
    fileName: 'audit_gender_shades.py',
    fileType: 'python',
    codeTemplate: [
      { text: '# Buolamwini & Gebru (FAT* 2018) Gender Shades Audit' },
      { text: 'dataset = balance_dataset(' },
      { text: '    darker_females_ratio=' },
      { slotId: 0 },
      { text: ',' },
      { text: '    lighter_males_ratio=' },
      { slotId: 1 },
      { text: ')' }
    ],
    tokens: ['0.50', '0.50', '0.05', '0.95'],
    solution: ['0.50', '0.50'],
    previewType: 'bias_chart',
    explanation: 'Audit Buolamwini & Gebru (2018) menemukan error rate perempuan kulit gelap melonjak hingga 34,7% akibat dataset benchmark yang didominasi 86,2% pria kulit terang. Solusinya adalah keseimbangan representasi data pelatihan.',
    citation: 'Buolamwini, J., & Gebru, T. (2018). Gender Shades. FAT* 2018.'
  },
  '2-3': {
    moduleTitle: 'Modul 2: Kompas Etika, Keamanan & Privasi',
    stepTitle: 'Langkah 3: Bias Bahasa & Word Embedding',
    instruction: 'Netralkan secara geometris vektor kata agar terbebas dari bias asosiasi gender:',
    instructionHighlight: 'hard_debias()',
    fileName: 'debias_word2vec.py',
    fileType: 'python',
    codeTemplate: [
      { text: '# Bolukbasi et al. (NeurIPS 2016) Debiasing Word Embeddings' },
      { text: 'gender_direction = get_vector("he") - get_vector("she")' },
      { text: 'v_programmer = orthogonal_projection(' },
      { slotId: 0 },
      { text: ', ' },
      { slotId: 1 },
      { text: ')' }
    ],
    tokens: ['v_programmer', 'gender_direction', 'bias_multiplier', 'v_random'],
    solution: ['v_programmer', 'gender_direction'],
    previewType: 'vector_space',
    explanation: 'Bolukbasi dkk. (2016) menemukan analogi bias "man:programmer :: woman:homemaker". Teknik hard debiasing memproyeksikan kata netral agar tegak lurus (ortogonal) terhadap sumbu gender.',
    citation: 'Bolukbasi, T., et al. (2016). Man is to Computer Programmer as Woman is to Homemaker? NeurIPS 2016.'
  },
  '2-4': {
    moduleTitle: 'Modul 2: Kompas Etika, Keamanan & Privasi',
    stepTitle: 'Langkah 4: Stempel Provenance Anti-Deepfake C2PA',
    instruction: 'Sematkan tanda tangan kriptografis tahan manipulasi pada metadata file media sintetis:',
    instructionHighlight: 'c2pa_manifest.json',
    fileName: 'c2pa_manifest.json',
    fileType: 'json',
    codeTemplate: [
      { text: '{' },
      { text: '  "action": ' },
      { slotId: 0 },
      { text: ',' },
      { text: '  "signature": ' },
      { slotId: 1 },
      { text: ',' },
      { text: '  "ai_generative_tool": "Lit-GO Studio",' },
      { text: '  "tamper_evident": true' },
      { text: '}' }
    ],
    tokens: ['"c2pa.created"', '"sha256_cryptoseal"', '"anonymize"', '"delete_history"'],
    solution: ['"c2pa.created"', '"sha256_cryptoseal"'],
    previewType: 'c2pa_badge',
    explanation: 'Standar Coalition for Content Provenance and Authenticity (C2PA) menyematkan manifest kriptografis tahan manipulasi sejak awal media dibuat—berfungsi sebagai "label nutrisi" informasi digital.',
    citation: 'Coalition for Content Provenance and Authenticity (C2PA) Technical Standard (2023).'
  },

  // === MODUL 3: SENI BERBICARA DENGAN MESIN (PROMPT ENGINEERING) ===
  '3-1': {
    moduleTitle: 'Modul 3: Seni Berbicara dengan Mesin',
    stepTitle: 'Langkah 1: Empat Pilar Prompting',
    instruction: 'Lengkapi 4 pilar prompt profesional: Konteks, Instruksi, Format, dan Persona:',
    instructionHighlight: '[Persona] & [Format]',
    fileName: 'prompt_template.txt',
    fileType: 'prompt',
    codeTemplate: [
      { text: 'Konteks: Penyusunan silabus kurikulum literasi AI SMA.' },
      { slotId: 0 },
      { text: ': Anda adalah spesialis pedagogi dan kurator nasional.' },
      { text: 'Instruksi: Analisis 3 kompetensi dasar penalaran komputasi.' },
      { slotId: 1 },
      { text: ': Sajikan dalam tabel Markdown 4 kolom.' }
    ],
    tokens: ['Persona', 'Format', 'Emosi', 'Algoritma'],
    solution: ['Persona', 'Format'],
    previewType: 'prompt_render',
    explanation: 'Formula 4 Pilar (Konteks, Instruksi, Format, Persona) mempersempit ruang probabilitas model agar merespons dengan terminologi domain yang tepat dan format terstruktur yang siap pakai.',
    citation: 'Brown, T., et al. (2020) & Prinsip Rekayasa Prompt Modern.'
  },
  '3-2': {
    moduleTitle: 'Modul 3: Seni Berbicara dengan Mesin',
    stepTitle: 'Langkah 2: Taksonomi Zero-Shot vs Few-Shot',
    instruction: 'Tambahkan pasangan demonstrasi input-output untuk mengaktifkan In-Context Learning (ICL):',
    instructionHighlight: 'Few-Shot Examples',
    fileName: 'few_shot_prompt.txt',
    fileType: 'prompt',
    codeTemplate: [
      { text: '# GPT-3 In-Context Learning (Brown dkk., 2020)' },
      { text: 'Contoh 1: Input: "Aplikasi ini lambat" -> Sentimen: ' },
      { slotId: 0 },
      { text: 'Contoh 2: Input: "Fitur AI sangat membantu!" -> Sentimen: ' },
      { slotId: 1 },
      { text: 'Target: Input: "Kualitas gambar memukau" -> Sentimen:' }
    ],
    tokens: ['Negatif', 'Positif', 'Netral', 'Acak'],
    solution: ['Negatif', 'Positif'],
    previewType: 'few_shot_eval',
    explanation: 'Makalah GPT-3 membuktikan menyertakan beberapa demonstrasi input-output (Few-Shot) memandu model memahami pemetaan format dan kriteria tugas baru tanpa perlu pelatihan ulang bobot parameter.',
    citation: 'Brown, T., et al. (2020). Language Models are Few-Shot Learners. NeurIPS 2020.'
  },
  '3-3': {
    moduleTitle: 'Modul 3: Seni Berbicara dengan Mesin',
    stepTitle: 'Langkah 3: Chain-of-Thought (Wei dkk., 2022)',
    instruction: 'Suntikkan pemicu penalaran langkah-demi-langkah (Kojima 2022) pada soal logika bertahap:',
    instructionHighlight: 'Let\'s think step by step',
    fileName: 'chain_of_thought.txt',
    fileType: 'prompt',
    codeTemplate: [
      { text: 'Pertanyaan: Sebuah perpustakaan meminjamkan 40 buku di hari Senin dan 25 buku di hari Selasa...' },
      { slotId: 0 },
      { text: 'Langkah 1: Jumlahkan buku yang dipinjam = 40 + 25 = 65.' },
      { text: 'Langkah 2: Hitung sisa stok = 100 - 65 = 35.' },
      { text: 'Jawaban Akhir: 35 buku.' }
    ],
    tokens: ['"Let\'s think step by step"', '"Jawab langsung tanpa berpikir"', '"Abaikan angka"', '"Hapus konteks"'],
    solution: ['"Let\'s think step by step"'],
    previewType: 'cot_reasoning',
    explanation: 'Menambahkan instruksi eksplisit untuk berpikir bertahap (CoT) memicu penalaran simbolik bertingkat, mereduksi kesalahan perhitungan dan halusinasi deduktif secara dramatis.',
    citation: 'Wei, J., et al. (2022). Chain-of-Thought Prompting. NeurIPS 2022.'
  },
  '3-4': {
    moduleTitle: 'Modul 3: Seni Berbicara dengan Mesin',
    stepTitle: 'Langkah 4: Agen Cerdas ReAct (Yao dkk., 2022)',
    instruction: 'Lengkapi siklus agen otonom: Thought (Nalar) -> Action (Panggil Alat) -> Observation:',
    instructionHighlight: 'Reasoning + Acting',
    fileName: 'react_agent_loop.py',
    fileType: 'python',
    codeTemplate: [
      { text: '# Yao et al. (ICLR 2023) ReAct Framework' },
      { text: 'while not agent.completed:' },
      { text: '    thought = agent.plan_reasoning(' },
      { slotId: 0 },
      { text: ')' },
      { text: '    action_result = agent.execute_tool(' },
      { slotId: 1 },
      { text: ')' },
      { text: '    agent.observe(action_result)' }
    ],
    tokens: ['"Thought"', '"Calculator_API"', '"Sleep"', '"Terminate"'],
    solution: ['"Thought"', '"Calculator_API"'],
    previewType: 'react_console',
    explanation: 'Kerangka kerja ReAct memadukan nalar internal dengan eksekusi alat bantu nyata (web search, kalkulator, API eksternal) untuk mengatasi kelemahan memori statis model bahasa.',
    citation: 'Yao, S., et al. (2022). ReAct: Synergizing Reasoning and Acting. ICLR 2023.'
  },

  // === MODUL 4: AI SEBAGAI ASISTEN PRODUKTIVITAS ===
  '4-1': {
    moduleTitle: 'Modul 4: AI Asisten Produktivitas',
    stepTitle: 'Langkah 1: Arsitektur RAG (Lewis Meta AI 2020)',
    instruction: 'Sambungkan modul Retriever dokumen eksternal dengan Generator model bahasa:',
    instructionHighlight: 'Retrieval-Augmented Generation',
    fileName: 'rag_pipeline.py',
    fileType: 'python',
    codeTemplate: [
      { text: '# Lewis et al. (NeurIPS 2020) Meta AI' },
      { text: 'def answer_query(user_query):' },
      { text: '    docs = vector_db.retrieve(' },
      { slotId: 0 },
      { text: ')' },
      { text: '    grounded_prompt = inject_context(user_query, docs)' },
      { text: '    return llm.generate(' },
      { slotId: 1 },
      { text: ')' }
    ],
    tokens: ['user_query', 'grounded_prompt', 'empty_string', 'random_weights'],
    solution: ['user_query', 'grounded_prompt'],
    previewType: 'rag_output',
    explanation: 'RAG menyatukan memori parametrik (bobot LLM) dengan memori non-parametrik (dokumen eksternal terpercaya), menghasilkan jawaban yang faktual lengkap dengan rujukan sitasi.',
    citation: 'Lewis, P., et al. (2020). Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks. NeurIPS 2020.'
  },
  '4-2': {
    moduleTitle: 'Modul 4: AI Asisten Produktivitas',
    stepTitle: 'Langkah 2: Vector DB & Cosine Similarity',
    instruction: 'Hitung derajat kemiripan semantik antar-vektor kueri dan vektor dokumen:',
    instructionHighlight: 'cosine_similarity()',
    fileName: 'vector_search.py',
    fileType: 'python',
    codeTemplate: [
      { text: 'def compute_similarity(v_query, v_doc):' },
      { text: '    dot_val = np.dot(' },
      { slotId: 0 },
      { text: ', ' },
      { slotId: 1 },
      { text: ')' },
      { text: '    return dot_val / (norm(v_query) * norm(v_doc))' }
    ],
    tokens: ['v_query', 'v_doc', 'zero_matrix', 'random_seed'],
    solution: ['v_query', 'v_doc'],
    previewType: 'vector_cluster',
    explanation: 'Pencarian semantik di basis data vektor mengukur kosinus sudut antara dua vektor makna; skor mendekati 1 menandakan topik dokumen sangat relevan dengan pertanyaan.',
    citation: 'Standar Pencarian Vektor (Pinecone, Chroma, Qdrant Architecture).'
  },
  '4-3': {
    moduleTitle: 'Modul 4: AI Asisten Produktivitas',
    stepTitle: 'Langkah 3: Tutor Sokratik (UNESCO 2023)',
    instruction: 'Konfigurasikan sistem prompt agar AI bertindak sebagai pendamping dialog berpikir:',
    instructionHighlight: 'Socratic Prompting',
    fileName: 'socratic_system.txt',
    fileType: 'prompt',
    codeTemplate: [
      { text: 'System: Bertindaklah sebagai Tutor Sokratik bagi mahasiswa.' },
      { text: 'Aturan 1: Jangan pernah berikan jawaban tugas akhir secara langsung.' },
      { text: 'Aturan 2: Ajukan ' },
      { slotId: 0 },
      { text: ' untuk memandu siswa.' },
      { text: 'Tujuan: Mengasah kemampuan ' },
      { slotId: 1 },
      { text: ' mandiri siswa.' }
    ],
    tokens: ['"pertanyaan pemantik"', '"daya nalar kritis"', '"contekan instan"', '"kunci jawaban"'],
    solution: ['"pertanyaan pemantik"', '"daya nalar kritis"'],
    previewType: 'socratic_chat',
    explanation: 'Panduan UNESCO (2023) menganjurkan AI sebagai sparring partner Sokratik yang memancing pemikiran analitis siswa, mempertahankan integritas intelektual dan agensi manusia.',
    citation: 'UNESCO (2023). Guidance for Generative AI in Education and Research.'
  },
  '4-4': {
    moduleTitle: 'Modul 4: AI Asisten Produktivitas',
    stepTitle: 'Langkah 4: Teknik Zero-Drafting',
    instruction: 'Gunakan AI untuk mengatasi kebuntuan draf awal lalu lakukan validasi manusiawi:',
    instructionHighlight: 'Zero-Drafting Workflow',
    fileName: 'zero_drafting_workflow.py',
    fileType: 'python',
    codeTemplate: [
      { text: 'rough_outline = ai_assistant.generate_draft_zero(topic)' },
      { text: 'final_paper = human_researcher.review_and_rewrite(' },
      { slotId: 0 },
      { text: ')' },
      { text: 'assert final_paper.verified_by_human == ' },
      { slotId: 1 }
    ],
    tokens: ['rough_outline', 'True', 'False', 'None'],
    solution: ['rough_outline', 'True'],
    previewType: 'draft_diff',
    explanation: 'Zero-Drafting memanfaatkan AI sebagai pemantik gagasan awal (draf 0) guna mengatasi writer\'s block, di mana manusia tetap menjadi penulis, penyunting, dan penanggung jawab mutlak karya.',
    citation: 'UNESCO (2023) & Etika Kepengarangan Akademik.'
  },

  // === MODUL 5: EKSPLORASI AI KREATIF ===
  '5-1': {
    moduleTitle: 'Modul 5: Eksplorasi AI Kreatif',
    stepTitle: 'Langkah 1: Enam Sumbu Prompt Visual (DDPM)',
    instruction: 'Rangkai prompt difusi visual dengan sumbu pencahayaan dan gaya artistik:',
    instructionHighlight: '6 Sumbu Visual',
    fileName: 'diffusion_prompt.txt',
    fileType: 'prompt',
    codeTemplate: [
      { text: 'Subjek: Jamur bercahaya di hutan mistis' },
      { text: 'Pencahayaan: ' },
      { slotId: 0 },
      { text: 'Gaya Artistik: ' },
      { slotId: 1 },
      { text: 'Komposisi: 35mm lens, rule of thirds, cinematic 8k' }
    ],
    tokens: ['"Volumetric Rembrandt Lighting"', '"Renaissance Oil Painting"', '"Blurry low quality"', '"Overexposed flash"'],
    solution: ['"Volumetric Rembrandt Lighting"', '"Renaissance Oil Painting"'],
    previewType: 'art_render',
    explanation: 'Enam Sumbu Visual (Subjek, Medium, Lighting, Komposisi, Palet, Detail) memandu algoritma model difusi (DDPM Ho dkk. 2020) menghasilkan karya estetik beresolusi tinggi tanpa distorsi.',
    citation: 'Ho, J., et al. (2020). Denoising Diffusion Probabilistic Models (DDPM). NeurIPS 2020.'
  },
  '5-2': {
    moduleTitle: 'Modul 5: Eksplorasi AI Kreatif',
    stepTitle: 'Langkah 2: Doktrin US Copyright Office (2023)',
    instruction: 'Tentukan kelayakan hak cipta antara hasil mentah AI vs penataan kreatif manusia:',
    instructionHighlight: 'Human Authorship Requirement',
    fileName: 'copyright_registry.json',
    fileType: 'json',
    codeTemplate: [
      { text: '{' },
      { text: '  "raw_ai_image_status": ' },
      { slotId: 0 },
      { text: ',' },
      { text: '  "human_creative_arrangement": ' },
      { slotId: 1 },
      { text: '}' }
    ],
    tokens: ['"NO_COPYRIGHT"', '"PROTECTED"', '"AUTOMATIC"', '"UNKNOWN"'],
    solution: ['"NO_COPYRIGHT"', '"PROTECTED"'],
    previewType: 'copyright_cert',
    explanation: 'U.S. Copyright Office (2023) dalam kasus Zarya of the Dawn menegaskan bahwa materi yang dihasilkan murni oleh AI tidak memiliki hak cipta karena ketiadaan human authorship; hak cipta hanya melekat pada susunan kreatif manusia.',
    citation: 'U.S. Copyright Office (2023). Copyright Registration Guidance: AI-Generated Works.'
  },
  '5-3': {
    moduleTitle: 'Modul 5: Eksplorasi AI Kreatif',
    stepTitle: 'Langkah 3: Hak Opt-Out Regulasi Uni Eropa',
    instruction: 'Konfigurasikan reservasi hak digital untuk melarang perayapan (scraping) dataset AI:',
    instructionHighlight: 'EU TDM Reservation',
    fileName: 'robots.txt',
    fileType: 'text',
    codeTemplate: [
      { text: 'User-agent: AI-Crawler-Scraper' },
      { text: 'TDM-Reservation: ' },
      { slotId: 0 },
      { text: 'Disallow: ' },
      { slotId: 1 }
    ],
    tokens: ['"OPT-OUT"', '"/artworks/"', '"ALLOW-ALL"', '"/index.html"'],
    solution: ['"OPT-OUT"', '"/artworks/"'],
    previewType: 'firewall_badge',
    explanation: 'Regulasi DSM Directive dan EU AI Act mewajibkan pengembang AI menghormati sinyal reservasi hak cipta (machine-readable opt-out) yang dipasang kreator untuk melindungi ciptaan mereka.',
    citation: 'European Union (2019/2024). DSM Copyright Directive & EU AI Act.'
  },
  '5-4': {
    moduleTitle: 'Modul 5: Eksplorasi AI Kreatif',
    stepTitle: 'Langkah 4: Proteksi Seniman (Glaze & Nightshade)',
    instruction: 'Terapkan perturbasi piksel mikro untuk melindungi gaya artistik dari ekstraksi model:',
    instructionHighlight: 'Glaze Style Cloaking',
    fileName: 'artist_defense.py',
    fileType: 'python',
    codeTemplate: [
      { text: '# Shan et al. (UChicago 2023) Glaze Protection' },
      { text: 'protected_canvas = apply_glaze_cloaking(' },
      { slotId: 0 },
      { text: ')' },
      { text: 'is_cloaked = protected_canvas.check_feature_shift() == ' },
      { slotId: 1 }
    ],
    tokens: ['original_artwork', 'True', 'False', 'corrupted_file'],
    solution: ['original_artwork', 'True'],
    previewType: 'glaze_comparison',
    explanation: 'Alat Glaze dari University of Chicago menyuntikkan perubahan piksel mikro yang tak kasat mata bagi manusia, namun mengaburkan ruang fitur model AI sehingga AI gagal mempelajari gaya khas seniman.',
    citation: 'Shan, S., et al. (2023). Glaze: Protecting Artists from Style Mimicry by Text-to-Image Models.'
  },

  // === MODUL 6: BERTAHAN & BERDAYA DI ERA AI ===
  '6-1': {
    moduleTitle: 'Modul 6: Bertahan & Berdaya di Era AI',
    stepTitle: 'Langkah 1: Analisis Tugas David Autor (MIT 2015)',
    instruction: 'Petakan pembagian kerja: otomatisasi tugas rutin vs augmentasi tugas non-rutin:',
    instructionHighlight: 'Routine vs Non-Routine Tasks',
    fileName: 'task_allocation_matrix.py',
    fileType: 'python',
    codeTemplate: [
      { text: '# David H. Autor (MIT 2015) Why Are There Still So Many Jobs?' },
      { text: 'task_entry_data_pembukuan = ' },
      { slotId: 0 },
      { text: 'task_negosiasi_diplomasi_tim = ' },
      { slotId: 1 }
    ],
    tokens: ['"AUTOMATE_ROUTINE"', '"AUGMENT_HUMAN"', '"DELETE_JOB"', '"IGNORE"'],
    solution: ['"AUTOMATE_ROUTINE"', '"AUGMENT_HUMAN"'],
    previewType: 'productivity_chart',
    explanation: 'Autor (2015) menyimpulkan teknologi mengotomatisasi tugas-tugas rutin berpola baku (tasks), namun meningkatkan nilai tugas komplementer manusia seperti nalar kritis, empati, dan kepemimpinan.',
    citation: 'Autor, D. H. (2015). Why Are There Still So Many Jobs? Journal of Economic Perspectives.'
  },
  '6-2': {
    moduleTitle: 'Modul 6: Bertahan & Berdaya di Era AI',
    stepTitle: 'Langkah 2: Paradoks Polanyi (Tacit Knowledge)',
    instruction: 'Definisikan batas alami otomatisasi di mana pengetahuan intuitif manusia tak dapat dikodekan:',
    instructionHighlight: 'Polanyi\'s Paradox 1966',
    fileName: 'polanyi_paradox.py',
    fileType: 'python',
    codeTemplate: [
      { text: '# Michael Polanyi (1966) The Tacit Dimension' },
      { text: 'def can_fully_automate(knowledge):' },
      { text: '    if knowledge.is_tacit_or_intuitive():' },
      { text: '        return ' },
      { slotId: 0 },
      { text: '    return ' },
      { slotId: 1 }
    ],
    tokens: ['False', 'True', 'None', '"Undefined"'],
    solution: ['False', 'True'],
    previewType: 'tacit_boundary',
    explanation: 'Paradoks Polanyi menyatakan: "Kita tahu lebih banyak daripada yang bisa kita jelaskan". Pengetahuan terpendam (tacit knowledge) seperti empati dan intuisi tidak dapat dirumuskan ke dalam kode algoritma kaku.',
    citation: 'Polanyi, M. (1966). The Tacit Dimension. Doubleday.'
  },
  '6-3': {
    moduleTitle: 'Modul 6: Bertahan & Berdaya di Era AI',
    stepTitle: 'Langkah 3: Tiga Pilar Keterampilan Masa Depan WEF',
    instruction: 'Konfigurasikan portofolio keahlian human-centric masa depan versi World Economic Forum:',
    instructionHighlight: 'Human-Centric Core Skills',
    fileName: 'future_skills_wef.json',
    fileType: 'json',
    codeTemplate: [
      { text: '{' },
      { text: '  "pilar_1": ' },
      { slotId: 0 },
      { text: ',' },
      { text: '  "pilar_2": ' },
      { slotId: 1 },
      { text: ',' },
      { text: '  "ai_synergy": "Multiplier"' },
      { text: '}' }
    ],
    tokens: ['"Critical_Thinking"', '"Social_Emotional_Intelligence"', '"Typing_Speed"', '"Rote_Memorization"'],
    solution: ['"Critical_Thinking"', '"Social_Emotional_Intelligence"'],
    previewType: 'wef_radar',
    explanation: 'Laporan WEF Future of Jobs (2023) menempatkan pemikiran analitis kritis, inovasi pemecahan masalah kompleks, serta kecerdasan sosial-emosional sebagai keterampilan dengan ketahanan tertinggi.',
    citation: 'World Economic Forum (2023). The Future of Jobs Report 2023.'
  },
  '6-4': {
    moduleTitle: 'Modul 6: Bertahan & Berdaya di Era AI',
    stepTitle: 'Langkah 4: Manifesto Warga Digital Berdaulat',
    instruction: 'Deklarasikan kemudi pilot manusia dalam pengambilan keputusan berisiko tinggi:',
    instructionHighlight: 'Sovereign Digital Citizen',
    fileName: 'pilot_manifesto.py',
    fileType: 'python',
    codeTemplate: [
      { text: '# Lit-GO Manifesto: Human as Pilot, AI as Copilot' },
      { text: 'def decide_critical_case(case):' },
      { text: '    ai_recommendation = copilot.draft_options(case)' },
      { text: '    final_verdict = ' },
      { slotId: 0 },
      { text: '.evaluate_with_ethics(ai_recommendation)' },
      { text: '    return final_verdict' }
    ],
    tokens: ['HUMAN_PILOT', 'AUTONOMOUS_BOT', 'BLACK_BOX_ALGORITHM', 'RANDOM_GENERATOR'],
    solution: ['HUMAN_PILOT'],
    previewType: 'pilot_badge',
    explanation: 'Warga digital berdaulat memposisikan AI sebagai instrumen pengungkit produktivitas (kopilot), sedangkan pertimbangan moral, empati, rasa keadilan, dan tanggung jawab hukum mutlak berada di tangan manusia (pilot).',
    citation: 'Lit-GO Ethical Digital Sovereignty Framework (2026).'
  }
};

export default function Game2Arena({ activeStep, onClose, onComplete, onSwitchToGame1 }) {
  const { mod, step } = activeStep;
  const challengeKey = step ? step.id : '1-1';
  const challenge = MIMO_CHALLENGES[challengeKey] || MIMO_CHALLENGES['1-1'];

  // Game state
  const totalSlots = challenge.solution.length;
  const [placedSlots, setPlacedSlots] = useState(Array(totalSlots).fill(null));
  const [usedTokenIndices, setUsedTokenIndices] = useState([]);
  const [checkedState, setCheckedState] = useState(null); // 'correct' | 'incorrect' | null
  const [showExplainModal, setShowExplainModal] = useState(false);

  // Reset when challenge step changes
  useEffect(() => {
    setPlacedSlots(Array(challenge.solution.length).fill(null));
    setUsedTokenIndices([]);
    setCheckedState(null);
    setShowExplainModal(false);
  }, [challengeKey]);

  // Keyboard shortcut listener (Enter for Check/Continue, Ctrl+K for Explain)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShowExplainModal((prev) => !prev);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (checkedState === 'correct') {
          handleContinue();
        } else if (checkedState === 'incorrect') {
          handleRetry();
        } else {
          handleCheckAnswer();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [checkedState, placedSlots]);

  // Handle placing a token from tray into the first available slot
  const handleSelectToken = (tokenValue, tokenIdx) => {
    if (usedTokenIndices.includes(tokenIdx) || checkedState === 'correct') return;

    // Find first empty slot
    const emptyIdx = placedSlots.findIndex((s) => s === null);
    if (emptyIdx === -1) return;

    const newSlots = [...placedSlots];
    newSlots[emptyIdx] = { value: tokenValue, tokenIdx };
    setPlacedSlots(newSlots);
    setUsedTokenIndices([...usedTokenIndices, tokenIdx]);
    setCheckedState(null);
  };

  // Remove a placed slot on click
  const handleRemoveSlot = (slotIdx) => {
    if (checkedState === 'correct') return;
    const item = placedSlots[slotIdx];
    if (!item) return;

    const newSlots = [...placedSlots];
    newSlots[slotIdx] = null;
    setPlacedSlots(newSlots);
    setUsedTokenIndices(usedTokenIndices.filter((idx) => idx !== item.tokenIdx));
    setCheckedState(null);
  };

  // Remove last placed token button
  const handleRemoveLast = () => {
    if (checkedState === 'correct') return;
    // Find rightmost filled slot
    for (let i = placedSlots.length - 1; i >= 0; i--) {
      if (placedSlots[i] !== null) {
        handleRemoveSlot(i);
        break;
      }
    }
  };

  // Reset all slots
  const handleResetSlots = () => {
    if (checkedState === 'correct') return;
    setPlacedSlots(Array(totalSlots).fill(null));
    setUsedTokenIndices([]);
    setCheckedState(null);
  };

  // Check Answer Validation
  const handleCheckAnswer = () => {
    // Must fill all slots
    if (placedSlots.some((s) => s === null)) return;

    const userAnswers = placedSlots.map((s) => s.value);
    const isCorrect = userAnswers.every((val, idx) => val === challenge.solution[idx]);

    if (isCorrect) {
      setCheckedState('correct');
    } else {
      setCheckedState('incorrect');
    }
  };

  const handleRetry = () => {
    setCheckedState(null);
  };

  const handleContinue = () => {
    if (onComplete) {
      onComplete(step.id);
    }
    if (onClose) {
      onClose();
    }
  };

  // Dynamic live preview renderer
  const renderLivePreview = () => {
    const isFilled = placedSlots.every((s) => s !== null);
    const answers = placedSlots.map((s) => s?.value || '___');

    if (challenge.previewType === 'browser_html') {
      return (
        <div className="mimo-preview-canvas">
          <h1>My favorite things</h1>
          <p>
            Raindrops on roses
            {answers[0] === '<br>' ? <br /> : ' '}
            Whiskers on kittens
            {answers[1] === '<br>' ? <br /> : ' '}
            Bright copper kettles
            {answers[2] === '<br>' ? <br /> : ' '}
            Warm woolen mittens
          </p>
        </div>
      );
    }

    if (challenge.previewType === 'attention_weights') {
      return (
        <div className="mimo-preview-canvas" style={{ fontFamily: 'sans-serif' }}>
          <div className="mimo-preview-ai-box">
            <div className="mimo-ai-header-tag">
              <i className="fa-solid fa-network-wired"></i> Vaswani (2017) Self-Attention Matrix
            </div>
            <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '14px' }}>
              Formula: <code>Attention({answers[0]}, {answers[1]}, {answers[2]})</code>
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
              {['The', 'AI', 'Brain', 'Thinks'].map((w1, r) => (
                <div key={r} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6366f1' }}>{w1}</div>
                  <div
                    style={{
                      height: '28px',
                      background: isFilled ? 'rgba(99, 102, 241, 0.35)' : 'rgba(203, 213, 225, 0.25)',
                      borderRadius: '4px',
                      marginTop: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                    }}
                  >
                    {isFilled ? '0.88' : '0.00'}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '14px', fontSize: '0.8rem', color: isFilled ? '#16a34a' : '#94a3b8', fontWeight: 600 }}>
              {isFilled ? '✓ Matriks Paralel Valid: Skor perhatian terdistribusi efisien' : '○ Menunggu injeksi matriks Q, K, V...'}
            </div>
          </div>
        </div>
      );
    }

    if (challenge.previewType === 'c2pa_badge') {
      return (
        <div className="mimo-preview-canvas" style={{ fontFamily: 'sans-serif' }}>
          <div className="mimo-preview-ai-box" style={{ border: '2px solid #818cf8', background: '#f0fdf4' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#166534', background: '#dcfce7', padding: '3px 10px', borderRadius: '6px' }}>
                <i className="fa-solid fa-stamp mr-1"></i> Content Credentials (C2PA)
              </span>
              <span style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 700 }}>VERIFIED</span>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#1f2937', lineHeight: 1.6 }}>
              <div><strong>Status Aksi:</strong> <code>{answers[0]}</code></div>
              <div><strong>Kriptoseal:</strong> <code>{answers[1]}</code></div>
              <div><strong>Peralatan:</strong> Lit-GO Generative Studio</div>
              <div><strong>Standar:</strong> Coalition for Content Provenance</div>
            </div>
            <div style={{ marginTop: '12px', fontSize: '0.75rem', color: '#047857' }}>
              ✓ Bukti keaslian tertanam sejak awal pembuatan media digital.
            </div>
          </div>
        </div>
      );
    }

    // Default Academic Live Preview Panel
    return (
      <div className="mimo-preview-canvas" style={{ fontFamily: 'sans-serif' }}>
        <div className="mimo-preview-ai-box">
          <div className="mimo-ai-header-tag">
            <i className="fa-solid fa-microchip mr-1"></i> AI Studio Live Environment
          </div>
          <div style={{ fontSize: '0.9rem', color: '#1e293b', lineHeight: 1.6 }}>
            <strong>File Terpilih:</strong> <code>{challenge.fileName}</code><br />
            <strong>Slot Terisi:</strong> {placedSlots.filter((s) => s !== null).length} dari {totalSlots}<br />
            <div style={{ marginTop: '10px', padding: '10px', background: '#e0e7ff', borderRadius: '8px', fontSize: '0.84rem' }}>
              {isFilled ? (
                <span>
                  <i className="fa-solid fa-circle-check text-emerald mr-1"></i> Parameter siap dievaluasi oleh runtime studio.
                </span>
              ) : (
                <span>
                  <i className="fa-solid fa-spinner fa-spin text-indigo mr-1"></i> Lengkapi seluruh slot di editor untuk melihat simulasi output live.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mimo-arena-root">
      {/* 1. MIMO TOP NAVIGATION BAR */}
      <header className="mimo-header">
        <button className="mimo-close-btn" onClick={onClose} title="Keluar Arena">
          <i className="fa-solid fa-xmark"></i>
        </button>

        {/* Segmented Progress Bar */}
        <div className="mimo-progress-container">
          <button className="mimo-nav-arrow" disabled title="Sebelumnya">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <div className="mimo-segmented-bar">
            {[0, 1, 2, 3].map((segIdx) => (
              <div
                key={segIdx}
                className={`mimo-segment ${segIdx === 0 ? 'active' : ''} ${checkedState === 'correct' && segIdx === 0 ? 'filled' : ''}`}
              />
            ))}
          </div>
          <button className="mimo-nav-arrow" disabled title="Berikutnya">
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>

        {/* Right Info Badges & Game Switcher */}
        <div className="mimo-header-right">
          {onSwitchToGame1 && (
            <button className="mimo-switch-btn" onClick={onSwitchToGame1} title="Ganti ke Tampilan Game 1 (Duolingo Style)">
              <i className="fa-solid fa-gamepad"></i> Ganti Game 1
            </button>
          )}
          <span className="mimo-mode-badge">
            <i className="fa-solid fa-code"></i> Game 2: Mimo Studio
          </span>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE */}
      <main className="mimo-workspace">
        {/* Instruction Header */}
        <div className="mimo-instruction-header">
          <p className="mimo-instruction-text">
            {challenge.instruction}{' '}
            <span className="mimo-tag-pill">{challenge.instructionHighlight}</span>
          </p>
          <p className="mimo-sub-instruction">
            {challenge.stepTitle} &bull; Klik kartu token di bawah untuk mengisi slot kosong pada kode.
          </p>
        </div>

        {/* Dual Panel Split: Left Editor & Right Live Preview */}
        <div className="mimo-split-workspace">
          {/* Left Panel: Code & Prompt Editor */}
          <div className="mimo-card">
            <div className="mimo-card-header">
              <div className="mimo-card-tab">
                <span className="mimo-file-badge">{challenge.fileType.toUpperCase()}</span>
                <span>{challenge.fileName}</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Interactive Code Slot</span>
            </div>

            {/* Code Lines */}
            <div className="mimo-code-content">
              {challenge.codeTemplate.map((item, idx) => {
                if (item.slotId !== undefined) {
                  const currentSlot = placedSlots[item.slotId];
                  return (
                    <span
                      key={idx}
                      className={`mimo-slot ${currentSlot ? 'filled' : 'empty'}`}
                      onClick={() => handleRemoveSlot(item.slotId)}
                      title={currentSlot ? 'Klik untuk melepas token ini' : 'Slot kosong'}
                    >
                      {currentSlot ? currentSlot.value : '___'}
                    </span>
                  );
                }
                return <span key={idx}>{item.text}</span>;
              })}
            </div>

            {/* Editor Footer Toolbar */}
            <div className="mimo-card-footer">
              <button className="mimo-action-icon-btn" onClick={handleResetSlots} title="Reset seluruh slot">
                <i className="fa-solid fa-rotate-left"></i> Reset
              </button>
              <button className="mimo-action-icon-btn" onClick={handleRemoveLast} title="Hapus token terakhir">
                <i className="fa-solid fa-delete-left"></i> Remove
              </button>
            </div>
          </div>

          {/* Right Panel: Live Output Preview */}
          <div className="mimo-preview-card">
            <div className="mimo-preview-header">
              <div className="mimo-traffic-lights">
                <span className="mimo-dot red"></span>
                <span className="mimo-dot yellow"></span>
                <span className="mimo-dot green"></span>
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8' }}>
                <i className="fa-solid fa-globe mr-1"></i> Live Output Simulation
              </span>
            </div>
            {renderLivePreview()}
          </div>
        </div>

        {/* 3. TOKEN TRAY (PILLS) */}
        <div className="mimo-token-tray-wrapper">
          <div className="mimo-token-tray-title">Pilihan Token &amp; Tag Tersedia:</div>
          <div className="mimo-token-tray">
            {challenge.tokens.map((token, tIdx) => {
              const isUsed = usedTokenIndices.includes(tIdx);
              return (
                <button
                  key={tIdx}
                  className="mimo-token-pill"
                  disabled={isUsed || checkedState === 'correct'}
                  onClick={() => handleSelectToken(token, tIdx)}
                >
                  {token}
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* 4. BOTTOM ACTION & VALIDATION BAR (MIMO STYLE) */}
      <footer className={`mimo-footer ${checkedState || ''}`}>
        {/* Left: Monitor Robot Mascot + Speech */}
        <div className="mimo-footer-left">
          <div className={`mimo-mascot-box ${checkedState || 'idle'}`}>
            <div className="mimo-monitor-head">
              <div className="mimo-monitor-screen">
                {checkedState === 'correct' && '✓'}
                {checkedState === 'incorrect' && '✗'}
                {!checkedState && <i className="fa-solid fa-terminal" style={{ fontSize: '0.75rem' }}></i>}
              </div>
            </div>
            <div className="mimo-monitor-legs">
              <span className="mimo-monitor-leg"></span>
              <span className="mimo-monitor-leg"></span>
            </div>
          </div>

          <div className="mimo-feedback-content">
            {checkedState === 'correct' && (
              <>
                <div className="mimo-feedback-title correct">
                  <i className="fa-solid fa-circle-check"></i> Exactly! (Tepat sekali!)
                </div>
                <button className="mimo-explain-btn" onClick={() => setShowExplainModal(true)}>
                  Ingin penjelasan ilmiah? <i className="fa-solid fa-wand-magic-sparkles"></i> Explain (Ctrl+K)
                </button>
              </>
            )}

            {checkedState === 'incorrect' && (
              <>
                <div className="mimo-feedback-title incorrect">
                  <i className="fa-solid fa-circle-xmark"></i> Sayang sekali!
                </div>
                <div style={{ fontSize: '0.8rem', color: '#fca5a5' }}>
                  Urutan token atau parameter belum tepat. Coba periksa kembali.
                </div>
              </>
            )}

            {!checkedState && (
              <div style={{ fontSize: '0.86rem', color: '#94a3b8' }}>
                Lengkapi slot kode di atas lalu tekan <strong>Periksa</strong>.
              </div>
            )}
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="mimo-footer-right">
          {checkedState === 'correct' ? (
            <button className="mimo-main-btn continue" onClick={handleContinue}>
              Continue (Enter) <i className="fa-solid fa-arrow-right"></i>
            </button>
          ) : checkedState === 'incorrect' ? (
            <button className="mimo-main-btn retry" onClick={handleRetry}>
              Coba Lagi <i className="fa-solid fa-rotate-right"></i>
            </button>
          ) : (
            <button
              className="mimo-main-btn check"
              disabled={placedSlots.some((s) => s === null)}
              onClick={handleCheckAnswer}
            >
              Periksa (Enter) <i className="fa-solid fa-check"></i>
            </button>
          )}
        </div>
      </footer>

      {/* 5. ACADEMIC EXPLANATION MODAL (CTRL+K) */}
      {showExplainModal && (
        <div className="mimo-explain-modal-backdrop" onClick={() => setShowExplainModal(false)}>
          <div className="mimo-explain-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="mimo-explain-head">
              <div className="mimo-explain-title">
                <i className="fa-solid fa-book-open text-indigo"></i> Penjelasan Ilmiah &amp; Teori
              </div>
              <button
                className="mimo-close-btn"
                onClick={() => setShowExplainModal(false)}
                style={{ width: '32px', height: '32px' }}
              >
                ✕
              </button>
            </div>
            <p style={{ fontSize: '0.98rem', lineHeight: 1.7, color: '#e2e8f0', marginBottom: '18px' }}>
              {challenge.explanation}
            </p>
            <div style={{ background: '#13152a', border: '1px solid #2d3360', padding: '14px', borderRadius: '10px', fontSize: '0.82rem', color: '#a5b4fc' }}>
              <strong><i className="fa-solid fa-bookmark mr-1"></i> Rujukan Jurnal / Standar:</strong><br />
              {challenge.citation}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
