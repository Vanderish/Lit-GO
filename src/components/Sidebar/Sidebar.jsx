import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import './Sidebar.css';

export default function Sidebar() {
  const { badgeCount, doneCount, completedModulesCount } = useProgress();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user_data');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    // Menangkap sinyal dari DashboardNavbar untuk toggle menu
    const toggleMenu = () => setIsMobileOpen(prev => !prev);
    window.addEventListener('toggleMobileMenu', toggleMenu);
    
    // Membersihkan event listener saat komponen dibongkar
    return () => window.removeEventListener('toggleMobileMenu', toggleMenu);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user_data');
    setUserData(null);
    navigate('/login', { replace: true });
  };

  const closeMobileMenu = () => setIsMobileOpen(false);

  const modulNav = [
    { to: '/dashboard', title: 'Dashboard', icon: 'fa-gauge-high', color: '#6366F1' },
    { to: '/modul-belajar', title: 'Modul Belajar', icon: 'fa-book-bookmark', color: '#D97706', counter: `${completedModulesCount}/6` },
  ];

  const sandboxNav = [
    { to: '/radar-readiness', title: 'Radar Readiness', icon: 'fa-chart-pie', color: '#3B82F6' },
    { to: '/sandbox/deepfake-detective', title: 'Deepfake Detective', icon: 'fa-eye', color: '#0EA5E9' },
    { to: '/sandbox/bias-breaker', title: 'Bias Breaker', icon: 'fa-quote-left', color: '#F59E0B' },
    { to: '/sandbox/ethical-dilemma', title: 'Ethical Dilemma', icon: 'fa-scale-balanced', color: '#6366F1' },
    { to: '/sandbox/prompt-safety', title: 'Prompt Safety Lab', icon: 'fa-code', color: '#10B981' },
  ];

  const badgeNav = [
    { to: '/progres', title: 'Progres Belajar', icon: 'fa-chart-line', color: '#3B82F6', counter: `${doneCount}/24` },
    { to: '/koleksi-badge', title: 'Koleksi Badge', icon: 'fa-award', color: '#059669', counter: `${badgeCount}/5` },
  ];

  const userName = userData?.name || 'User Lit-GO';
  const userEmail = userData?.email || 'syifamojocanggih@gmail.com';
  const userPicture = userData?.picture;

  return (
    <>
      {/* Overlay Gelap */}
      {isMobileOpen && (
        <div className="mobile-sidebar-overlay" onClick={closeMobileMenu}></div>
      )}

      <aside className={`sidebar-card ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">

          <div className="sidebar-traffic-lights desktop-only">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
          </div>

          <div className="sidebar-profile-card">
            <div className="user-avatar-wrapper">
              {userPicture ? (
                <img src={userPicture} alt={userName} className="user-avatar-img" />
              ) : (
                <div className="user-avatar-initial">{userName.charAt(0).toUpperCase()}</div>
              )}
              <span className="profile-status-dot" title="Aktif"></span>
            </div>
            <div className="user-profile-info">
              <div className="user-name" title={userName}>{userName}</div>
              <div className="user-email" title={userEmail}>{userEmail}</div>
            </div>
          </div>
        </div>

        <div className="sidebar-content">
          <div className="sidebar-section">
            <div className="sidebar-section-title"><span>PUSAT PEMBELAJARAN</span></div>
            <div className="sidebar-menu-list">
              {modulNav.map((item) => (
                <NavLink key={item.to} to={item.to} onClick={closeMobileMenu} className={({ isActive }) => `sidebar-menu-item ${isActive ? 'active' : ''}`}>
                  <div className="menu-item-icon-clean" style={{ color: item.color }}><i className={`fa-solid ${item.icon}`}></i></div>
                  <div className="menu-item-info"><span className="menu-item-title">{item.title}</span></div>
                  {item.counter && <span className="menu-item-count">{item.counter}</span>}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-section-title"><span>SANDBOX LAB</span></div>
            <div className="sidebar-menu-list">
              {sandboxNav.map((item) => (
                <NavLink key={item.to} to={item.to} onClick={closeMobileMenu} className={({ isActive }) => `sidebar-menu-item ${isActive ? 'active' : ''}`}>
                  <div className="menu-item-icon-clean" style={{ color: item.color }}><i className={`fa-solid ${item.icon}`}></i></div>
                  <div className="menu-item-info"><span className="menu-item-title">{item.title}</span></div>
                </NavLink>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-section-title"><span>PENCAPAIAN</span></div>
            <div className="sidebar-menu-list">
              {badgeNav.map((item) => (
                <NavLink key={item.to} to={item.to} onClick={closeMobileMenu} className={({ isActive }) => `sidebar-menu-item ${isActive ? 'active' : ''}`}>
                  <div className="menu-item-icon-clean" style={{ color: item.color }}><i className={`fa-solid ${item.icon}`}></i></div>
                  <div className="menu-item-info"><span className="menu-item-title">{item.title}</span></div>
                  {item.counter && <span className="menu-item-count">{item.counter}</span>}
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-menu-list">
            <button type="button" className="sidebar-logout-btn" onClick={handleLogout}>
              <div className="menu-item-icon-clean" style={{ color: '#EF4444' }}><i className="fa-solid fa-right-from-bracket"></i></div>
              <div className="menu-item-info"><span className="menu-item-title">Logout</span></div>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}