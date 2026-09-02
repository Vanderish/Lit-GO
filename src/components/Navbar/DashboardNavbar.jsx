import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function DashboardNavbar({ pts = 0, badgeCount = 0, expPct = 0, lv = 1, onRequestReset }) {
  
  // Fungsi untuk memicu event membuka/menutup sidebar
  const handleToggleSidebar = () => {
    window.dispatchEvent(new CustomEvent('toggleMobileMenu'));
  };

  return (
    <nav style={{ margin: '0 0 24px 0', width: '100%' }}>
      <div className="nav-inner" style={{ justifyContent: 'flex-start' }}>
        
        {/* Tombol Hamburger (Khusus Mobile) */}
        <button className="mobile-nav-toggle" onClick={handleToggleSidebar} aria-label="Toggle Menu">
          <i className="fa-solid fa-bars"></i>
        </button>

        <Link to="/dashboard" className="logo" style={{ textDecoration: 'none', marginRight: 'auto' }}>
          <div className="logo-mark">L</div>
          Lit - GO
        </Link>

        <div className="nav-links">
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
            Dashboard
          </NavLink>
          <NavLink to="/progres" className={({ isActive }) => (isActive ? 'active' : '')}>
            Progres
          </NavLink>
          <NavLink to="/koleksi-badge" className={({ isActive }) => (isActive ? 'active' : '')}>
            Reward
          </NavLink>
        </div>

        <div className="nav-hud">
          <div className="hud-chips">
            <span title="Etika Gems">
              💎 <strong>{pts}</strong>
            </span>
            <div className="hud-sep"></div>
            <span title="E-Badge Terkumpul">
              🏅 <strong>{badgeCount}/5</strong>
            </span>
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