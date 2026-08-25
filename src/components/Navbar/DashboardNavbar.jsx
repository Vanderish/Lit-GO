import React from 'react';

export default function DashboardNavbar({ pts = 0, badgeCount = 0, expPct = 0, lv = 1, onRequestReset }) {
  return (
    <nav>
      <div className="nav-inner">
        <div className="logo">
          <div className="logo-mark">L</div>
          Lit - GO
        </div>
        <div className="nav-links">
          <a href="#hub-radar">Radar</a>
          <a href="#hub-modules">Modul</a>
          <a href="#hub-sandbox">Lab</a>
          <a href="#hub-rewards">Reward</a>
        </div>
        <div className="nav-hud">
          <div className="hud-chips">
            <span title="Etika Gems">💎 <strong>{pts}</strong></span>
            <div className="hud-sep"></div>
            <span title="E-Badge Terkumpul">🏅 <strong>{badgeCount}/5</strong></span>
            <div className="hud-sep"></div>
            <div className="exp-bar-wrap" title="Progress EXP">
              <div className="exp-bar-fill" style={{ width: `${expPct}%` }}></div>
            </div>
          </div>
          <div className="hud-level" title={`Level ${lv}`}>
            LV.1
            <span className="hud-lv-badge">{lv}</span>
          </div>
          <button className="btn-reset" onClick={onRequestReset} title="Reset Progres Platform">
            <i className="fa-solid fa-rotate-right"></i>
          </button>
        </div>
      </div>
    </nav>
  );
}