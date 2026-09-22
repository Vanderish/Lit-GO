import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import Logo from '../Logo/Logo';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const { isEnglish, toggleLanguage } = useProgress();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <nav>
      <div className="nav-inner">
        <div className="logo" style={{ cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Logo size={28} showText={true} color="#3B82F6" textColor="var(--navy, #1E293B)" />
        </div>

        <div className="nav-links">
          <a href="#section-labs">{isEnglish ? 'Sandbox Labs' : 'Sandbox Lab'}</a>
          <a href="#section-modules">{isEnglish ? 'Modules' : 'Modul'}</a>
          <a href="#section-gamifikasi">{isEnglish ? 'E-Badges' : 'E-Badge'}</a>
          <a href="#section-akses">{isEnglish ? 'Accessibility' : 'Aksesibilitas'}</a>
        </div>

        <div className="nav-hud">
          {/* Quick Language Toggle */}
          <button
            className="btn-lang-toggle"
            onClick={toggleLanguage}
            title={isEnglish ? 'Switch to Indonesian' : 'Beralih ke Bahasa Inggris'}
          >
            <i className="fa-solid fa-globe icon-lang"></i>
            <span>{isEnglish ? 'EN' : 'ID'}</span>
          </button>

          <button className="btn-nav-cta" onClick={handleLogin}>
            {isEnglish ? 'Sign In' : 'Masuk'}
          </button>
          <button className="btn-nav-reg" onClick={handleRegister}>
            {isEnglish ? 'Sign Up' : 'Daftar'}
          </button>
        </div>
      </div>
    </nav>
  );
}