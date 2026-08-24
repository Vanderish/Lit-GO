import React from 'react';

export default function ResetModal({ isOpen, onClose, onReset }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" id="modal-confirm" style={{ display: 'flex' }}>
      <div className="modal-box" style={{ maxWidth: '420px', textAlign: 'center' }}>
        <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '1.3rem', color: 'var(--red)' }}>
          <i className="fa-solid fa-triangle-exclamation"></i>
        </div>
        <div className="modal-title" style={{ justifyContent: 'center', marginBottom: '8px' }}>Konfirmasi Reset Data</div>
        <p style={{ fontSize: '0.86rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>Seluruh progres, badge, dan skor akan dihapus permanen dari browser kamu. Apakah kamu yakin?</p>
        <div className="modal-footer" style={{ justifyContent: 'center' }}>
          <button className="btn-modal-cancel" onClick={onClose}>Batal</button>
          <button className="btn-modal-danger" onClick={onReset}>Ya, Reset Sekarang</button>
        </div>
      </div>
    </div>
  );
}
