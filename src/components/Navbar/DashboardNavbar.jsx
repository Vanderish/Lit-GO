import { Link, NavLink } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import Logo from '../Logo/Logo';
import './Navbar.css';

export default function DashboardNavbar({ pts = 0, badgeCount = 0, expPct = 0, lv = 1, onRequestReset }) {
  const { isEnglish, toggleLanguage } = useProgress();
  
  // Fungsi untuk memicu event membuka/menutup sidebar
  const handleToggleSidebar = () => {
    window.dispatchEvent(new CustomEvent('toggleMobileMenu'));
  };

  return (
    <nav className="dashboard-nav">
      <div className="nav-inner dashboard-nav-inner">
        
        {/* Tombol Hamburger (Khusus Mobile) */}
        <button className="mobile-nav-toggle" onClick={handleToggleSidebar} aria-label="Toggle Menu">
          <i className="fa-solid fa-bars"></i>
        </button>

        <Link to="/dashboard" className="logo dashboard-logo">
          <Logo size={28} showText={true} color="#3B82F6" textColor="var(--navy, #1E293B)" />
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
            className="btn-lang-toggle dashboard-lang-toggle"
            onClick={toggleLanguage}
            title={isEnglish ? 'Switch to Indonesian' : 'Beralih ke Bahasa Inggris'}
          >
            <i className="fa-solid fa-globe icon-lang"></i>
            <span>{isEnglish ? 'EN' : 'ID'}</span>
          </button>

          <button className="btn-reset" onClick={onRequestReset} title={isEnglish ? 'Manage Demo Data & Reset' : 'Kelola Data Demo & Reset'}>
            <i className="fa-solid fa-sliders"></i>
          </button>
        </div>
      </div>
    </nav>
  );
}