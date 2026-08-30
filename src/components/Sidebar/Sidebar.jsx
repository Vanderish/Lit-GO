import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import './Sidebar.css';

export default function Sidebar() {
  const { badgeCount, doneCount } = useProgress();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user_data');
    if (savedUser) {
      try {
        setUserData(JSON.parse(savedUser));
      } catch (err) {
        console.error('Failed to parse user_data', err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user_data');
    setUserData(null);
    navigate('/login', { replace: true });
  };

  const sandboxNav = [
    {
      to: '/sandbox/deepfake-detective',
      title: 'Deepfake Detective',
      icon: 'fa-eye',
      color: '#0EA5E9',
    },
    {
      to: '/sandbox/bias-breaker',
      title: 'Bias Breaker',
      icon: 'fa-quote-left',
      color: '#F59E0B',
    },
    {
      to: '/sandbox/ethical-dilemma',
      title: 'Ethical Dilemma',
      icon: 'fa-scale-balanced',
      color: '#6366F1',
    },
    {
      to: '/sandbox/prompt-safety',
      title: 'Prompt Safety Lab',
      icon: 'fa-code',
      color: '#10B981',
    },
  ];

  const mainNav = [
    {
      to: '/modul-belajar',
      title: 'Modul Belajar',
      icon: 'fa-book-bookmark',
      color: '#D97706',
      counter: `${doneCount}/6`,
    },
    {
      to: '/koleksi-badge',
      title: 'Koleksi Badge',
      icon: 'fa-award',
      color: '#059669',
      counter: `${badgeCount}/5`,
    },
  ];

  const userName = userData?.name || 'User Lit-GO';
  const userEmail = userData?.email || 'syifamojocanggih@gmail.com';
  const userPicture = userData?.picture;

  return (
    <aside className="sidebar-card">
      {/* Header macOS Dots & Brand */}
      <div className="sidebar-header">
        <div className="sidebar-traffic-lights">
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
        </div>

        <div className="sidebar-profile-card">
          {userPicture ? (
            <img src={userPicture} alt={userName} className="user-avatar-img" />
          ) : (
            <div className="user-avatar-initial">
              {userName.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="user-profile-info">
            <div className="user-name" title={userName}>{userName}</div>
            <div className="user-email" title={userEmail}>{userEmail}</div>
          </div>
          <div className="profile-status-dot" title="Aktif"></div>
        </div>
      </div>

      <div className="sidebar-content">

        {/* SECTION 1: SANDBOX LAB */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">
            <span>SANDBOX LAB</span>
          </div>

          <div className="sidebar-menu-list">
            {sandboxNav.map((item) => {
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `sidebar-menu-item ${isActive ? 'active' : ''}`
                  }
                >
                  <div className="menu-item-icon-clean" style={{ color: item.color }}>
                    <i className={`fa-solid ${item.icon}`}></i>
                  </div>
                  <div className="menu-item-info">
                    <span className="menu-item-title">{item.title}</span>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: PUSAT LITERASI */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">
            <span>PUSAT LITERASI</span>
          </div>

          <div className="sidebar-menu-list">
            {mainNav.map((item) => {
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `sidebar-menu-item ${isActive ? 'active' : ''}`
                  }
                >
                  <div className="menu-item-icon-clean" style={{ color: item.color }}>
                    <i className={`fa-solid ${item.icon}`}></i>
                  </div>
                  <div className="menu-item-info">
                    <span className="menu-item-title">{item.title}</span>
                  </div>
                  {item.counter && (
                    <span className="menu-item-count">{item.counter}</span>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Profile User */}
      <div className="sidebar-footer">
        <div className="sidebar-menu-list">
          <button
            type="button"
            className="sidebar-logout-btn"
            onClick={handleLogout}
            aria-label="Logout"
          >
            <div className="menu-item-icon-clean" style={{ color: '#EF4444' }}>
              <i className="fa-solid fa-right-from-bracket"></i>
            </div>
            <div className="menu-item-info">
              <span className="menu-item-title">Logout</span>
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
}
