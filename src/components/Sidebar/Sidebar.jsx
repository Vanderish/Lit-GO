import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import './Sidebar.css';

export default function Sidebar() {
  const location = useLocation();
  const { badgeCount, doneCount } = useProgress();
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

  const sandboxNav = [
    {
      to: '/sandbox/deepfake-detective',
      title: 'Deepfake Detective',
      sub: 'Inspeksi Artefak Visual',
      icon: 'fa-eye',
      color: '#0EA5E9',
    },
    {
      to: '/sandbox/bias-breaker',
      title: 'Bias Breaker',
      sub: 'Deteksi Halusinasi Teks',
      icon: 'fa-quote-left',
      color: '#F59E0B',
    },
    {
      to: '/sandbox/ethical-dilemma',
      title: 'Ethical Dilemma',
      sub: 'Simulasi Keputusan',
      icon: 'fa-scale-balanced',
      color: '#6366F1',
    },
    {
      to: '/sandbox/prompt-safety',
      title: 'Prompt Safety Lab',
      sub: 'Parser Anatomi Prompt',
      icon: 'fa-code',
      color: '#10B981',
    },
  ];

  const mainNav = [
    {
      to: '/radar-readiness',
      title: 'Radar Readiness',
      sub: 'Asesmen 4 Pilar',
      icon: 'fa-chart-pie',
      color: '#3B82F6',
    },
    {
      to: '/modul-belajar',
      title: 'Modul Belajar',
      sub: '6 Modul Silabus',
      icon: 'fa-book-bookmark',
      color: '#D97706',
      counter: `${doneCount}/6`,
    },
    {
      to: '/koleksi-badge',
      title: 'Koleksi Badge',
      sub: '& E-Sertifikat',
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

        <NavLink to="/dashboard" className="sidebar-brand" style={{ textDecoration: 'none' }}>
          <div className="sidebar-brand-logo">L</div>
          <div className="sidebar-brand-text">
            <span className="brand-name">Lit-GO</span>
            <span className="brand-tag">Literasi AI Lab</span>
          </div>
        </NavLink>
      </div>

      <div className="sidebar-content">
        {/* SECTION 1: SANDBOX LAB */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">
            <span><i className="fa-solid fa-shapes mr-1.5" style={{ color: '#64748B' }}></i> SANDBOX LAB</span>
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
                  {/* Clean icon without background square box */}
                  <div className="menu-item-icon-clean" style={{ color: item.color }}>
                    <i className={`fa-solid ${item.icon}`}></i>
                  </div>
                  <div className="menu-item-info">
                    <span className="menu-item-title">{item.title}</span>
                    <span className="menu-item-sub">{item.sub}</span>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: FITUR DIREKTORI */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">
            <span><i className="fa-solid fa-folder-open mr-1.5" style={{ color: '#64748B' }}></i> FITUR DIREKTORI</span>
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
                  {/* Clean icon without background square box */}
                  <div className="menu-item-icon-clean" style={{ color: item.color }}>
                    <i className={`fa-solid ${item.icon}`}></i>
                  </div>
                  <div className="menu-item-info">
                    <span className="menu-item-title">{item.title}</span>
                    <span className="menu-item-sub">{item.sub}</span>
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
    </aside>
  );
}
