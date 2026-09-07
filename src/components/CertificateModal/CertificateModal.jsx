import { useProgress } from '../../context/ProgressContext';
import './CertificateModal.css';

export default function CertificateModal({
  isOpen,
  onClose,
  recipientName = 'Peserta Didik Lit-GO',
  certId = 'LITGO-2026-CERT-8842',
  issueDate
}) {
  const { isEnglish, BADGE_DATA } = useProgress();

  if (!isOpen) return null;

  const formattedDate = issueDate || new Date().toLocaleDateString(isEnglish ? 'en-US' : 'id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="cert-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      {/* Modal Actions Bar (hidden in print) */}
      <div className="cert-modal-actions" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="btn-cert-action print"
          onClick={handlePrint}
          title={isEnglish ? 'Print or Save as PDF' : 'Cetak atau Simpan sebagai PDF'}
        >
          <i className="fa-solid fa-print"></i>
          <span>{isEnglish ? 'Print / Save as PDF' : 'Cetak / Simpan PDF'}</span>
        </button>
        <button
          type="button"
          className="btn-cert-action close"
          onClick={onClose}
          title={isEnglish ? 'Close' : 'Tutup'}
        >
          <i className="fa-solid fa-xmark"></i>
          <span>{isEnglish ? 'Close' : 'Tutup'}</span>
        </button>
      </div>

      {/* Official Certificate Sheet */}
      <div className="cert-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Watermark */}
        <div className="cert-watermark">LIT-GO</div>

        {/* Double Golden Border Frame */}
        <div className="cert-outer-border">
          <div className="cert-inner-border">
            {/* Corner Ornaments */}
            <span className="cert-corner top-left">✦</span>
            <span className="cert-corner top-right">✦</span>
            <span className="cert-corner bottom-left">✦</span>
            <span className="cert-corner bottom-right">✦</span>

            {/* Top Header */}
            <div className="cert-top-header">
              <div className="cert-institution-tag">
                <i className="fa-solid fa-shield-halved"></i>
                <span>{isEnglish ? 'LIT-GO INDONESIA • NATIONAL AI LITERACY INITIATIVE' : 'LIT-GO INDONESIA • INISIASI LITERASI AI NASIONAL'}</span>
              </div>
              <h1 className="cert-main-title">
                {isEnglish ? 'CERTIFICATE OF EXCELLENCE' : 'SERTIFIKAT KELULUSAN'}
              </h1>
              <div className="cert-title-sub">
                {isEnglish ? 'MASTER OF ARTIFICIAL INTELLIGENCE & ETHICS' : 'KECERDASAN BUATAN & ETIKA DIGITAL TINGKAT MAHIR'}
              </div>
            </div>

            {/* Recipient Section */}
            <div className="cert-recipient-section">
              <div className="cert-presentation-text">
                {isEnglish ? 'This certificate is proudly presented to:' : 'Sertifikat ini dengan bangga dianugerahkan kepada:'}
              </div>
              <div className="cert-recipient-name">
                {recipientName && recipientName.trim() ? recipientName.trim() : (isEnglish ? 'Distinguished Learner' : 'Peserta Didik Lit-GO')}
              </div>
              <p className="cert-citation-text">
                {isEnglish
                  ? 'For outstanding dedication in successfully completing the comprehensive AI Literacy Curriculum on the Lit-GO platform, mastering modern LLM architectures, deepfake detection, ethical governance, and advanced prompt engineering.'
                  : 'Atas dedikasi luar biasa dalam menyelesaikan kurikulum komprehensif Literasi Kecerdasan Buatan pada platform Lit-GO, menguasai arsitektur LLM modern, deteksi deepfake, tata kelola etika AI, serta rekayasa prompt tingkat lanjut.'}
              </p>
            </div>

            {/* Badges Competency Row */}
            <div className="cert-badges-row">
              {(BADGE_DATA || []).map((b) => (
                <div key={b.id} className="cert-badge-medal">
                  <i className={`fa-solid ${b.icon}`}></i>
                  <span>{b.name}</span>
                </div>
              ))}
            </div>

            {/* Certificate Footer Row */}
            <div className="cert-footer-row">
              {/* Left Column: Verification */}
              <div className="cert-verification-col">
                <div className="cert-id-tag">ID: {certId}</div>
                <div className="cert-date-tag">
                  {isEnglish ? `Issued: ${formattedDate}` : `Diterbitkan: ${formattedDate}`}
                </div>
                <div className="cert-date-tag" style={{ color: '#059669', fontWeight: 600 }}>
                  <i className="fa-solid fa-circle-check" style={{ marginRight: 4 }}></i>
                  {isEnglish ? 'Officially Verified & Recorded' : 'Terverifikasi & Tercatat Resmi'}
                </div>
              </div>

              {/* Center: 3D Embossed Golden Seal */}
              <div className="cert-golden-seal">
                <i className="fa-solid fa-award"></i>
                <span>LIT-GO<br />SEAL</span>
              </div>

              {/* Right Column: Signatures */}
              <div className="cert-signature-col">
                <div className="cert-signature-draw">Dr. Ir. Hendra Gunawan</div>
                <div className="cert-sig-line-solid"></div>
                <div className="cert-sig-name">Dr. Ir. Hendra Gunawan, M.Sc.</div>
                <div className="cert-sig-role">
                  {isEnglish ? 'Head of Academic Board & AI Literacy Council' : 'Ketua Dewan Kurikulum & Literasi AI'}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
