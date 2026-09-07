import { Link, NavLink } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';

export default function DashboardNavbar({ pts = 0, badgeCount = 0, expPct = 0, lv = 1, onRequestReset }) {
  const { isEnglish, toggleLanguage } = useProgress();
  
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
            {isEnglish ? 'Progress' : 'Progres'}
          </NavLink>
          <NavLink to="/koleksi-badge" className={({ isActive }) => (isActive ? 'active' : '')}>
            {isEnglish ? 'Rewards' : 'Reward'}
          </NavLink>
        </div>

        <div className="nav-hud">
          <div className="hud-chips">
            <span title="Etika Gems">
              💎 <strong>{pts}</strong>
            </span>
            <div className="hud-sep"></div>
            <span title={isEnglish ? 'E-Badges Earned' : 'E-Badge Terkumpul'}>
              🏅 <strong>{badgeCount}/5</strong>
            </span>
            <div className="hud-sep"></div>
            <div className="exp-bar-wrap" title="Progress EXP">
              <div className="exp-bar-fill" style={{ width: `${expPct}%` }}></div>
            </div>
          </div>
          <div className="hud-level" title={`Level ${lv}`}>
            LV.
            <span className="hud-lv-badge">{lv}</span>
          </div>

          {/* Language Switcher Button */}
          <button
            className="btn-lang-toggle"
            onClick={toggleLanguage}
            title={isEnglish ? 'Switch to Indonesian' : 'Beralih ke Bahasa Inggris'}
            style={{
              background: 'var(--white)',
              border: '1px solid var(--line)',
              borderRadius: '10px',
              padding: '6px 10px',
              fontWeight: 700,
              fontSize: '0.78rem',
              color: 'var(--navy)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
            }}
          >
            <i className="fa-solid fa-globe" style={{ color: 'var(--indigo)' }}></i>
            <span>{isEnglish ? 'EN' : 'ID'}</span>
          </button>

          <button className="btn-reset" onClick={onRequestReset} title="Reset Progres Platform">
            <i className="fa-solid fa-rotate-right"></i>
          </button>
        </div>
      </div>
    </nav>
  );
}