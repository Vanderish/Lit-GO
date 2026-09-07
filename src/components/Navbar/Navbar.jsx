import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { isEnglish, toggleLanguage } = useProgress();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <nav>
      <div className="nav-inner">
        <div className="logo">
          <div className="logo-mark">L</div>
          Lit - GO
        </div>

        <div className="nav-links">
          <a href="#section-labs">{isEnglish ? 'Sandbox Labs' : 'Sandbox Lab'}</a>
          <a href="#section-modules">{isEnglish ? 'Modules' : 'Modul'}</a>
          <a href="#section-gamifikasi">{isEnglish ? 'E-Badges' : 'E-Badge'}</a>
          <a href="#section-akses">{isEnglish ? 'Accessibility' : 'Aksesibilitas'}</a>
        </div>

        <div className="nav-hud" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Quick Language Toggle */}
          <button
            className="btn-lang-toggle"
            onClick={toggleLanguage}
            title={isEnglish ? 'Switch to Indonesian' : 'Beralih ke Bahasa Inggris'}
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--line, #E2E8F0)',
              borderRadius: '10px',
              padding: '6px 12px',
              fontWeight: 700,
              fontSize: '0.78rem',
              color: 'var(--navy, #1E293B)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
            }}
          >
            <i className="fa-solid fa-globe" style={{ color: 'var(--indigo, #4F46E5)' }}></i>
            <span>{isEnglish ? 'EN' : 'ID'}</span>
          </button>

          <button className="btn-nav-cta" onClick={handleLogin}>
            {isEnglish ? 'Sign In' : 'Masuk'}
          </button>
        </div>
      </div>
    </nav>
  );
}