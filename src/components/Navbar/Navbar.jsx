import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

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
          <a href="#section-labs">Sandbox Lab</a>
          <a href="#section-modules">Modul</a>
          <a href="#section-gamifikasi">E&#8209;Badge</a>
          <a href="#section-akses">Aksesibilitas</a>
        </div>

        <div className="nav-hud">
          <button className="btn-nav-cta" onClick={handleLogin}>SignIn</button>
        </div>
      </div>
    </nav>
  );
}