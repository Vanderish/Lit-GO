import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import Logo from '../../components/Logo/Logo';
import './Login.css';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { refreshState } = useProgress();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleManualRegister = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (password && confirmPassword && password !== confirmPassword) {
      setErrorMsg('Kata sandi dan konfirmasi kata sandi tidak cocok!');
      return;
    }

    const trimmedName = name.trim() || (email && email.includes('@') ? email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : 'Pengguna Lit-GO');
    const userDetail = {
      name: trimmedName,
      email: email || 'pengguna@litgo.id',
      picture: '',
    };
    
    localStorage.setItem('user_data', JSON.stringify(userDetail));
    
    // Simpan ke daftar akun terdaftar agar saat login nama tetap tersimpan
    try {
      const existingUsers = JSON.parse(localStorage.getItem('litgo_registered_users') || '[]');
      const filtered = existingUsers.filter((u) => u.email.toLowerCase() !== (email || '').toLowerCase());
      filtered.push({ ...userDetail, password: password || '' });
      localStorage.setItem('litgo_registered_users', JSON.stringify(filtered));
    } catch {
      // ignore
    }

    if (refreshState) refreshState();
    navigate('/dashboard');
  };

  const handleGoogleRegister = () => {
    const trimmedName = name.trim() || 'Pelajar Lit-GO';
    const userDetail = {
      name: trimmedName,
      email: email || 'pelajar@google.com',
      picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    };
    localStorage.setItem('user_data', JSON.stringify(userDetail));
    if (refreshState) refreshState();
    navigate('/dashboard');
  };

  return (
    <div className="login-wrapper">
      <div className="bg-grid"></div>
      <div className="bg-glow"></div>
      <div className="bg-glow2"></div>

      {/* Tombol Batal / Kembali */}
      <Link to="/" className="btn-back-home">
        <i className="fa-solid fa-arrow-left"></i> Kembali
      </Link>

      <main className="login-card">
        <div className="brand-header" style={{ marginBottom: '24px' }}>
          <Logo size={46} color="#0A2540" />
          <h1 className="brand-title">Daftar Akun LIT-GO</h1>
        </div>

        <form onSubmit={handleManualRegister}>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <div className="label-row">
              <label htmlFor="name">Nama Lengkap</label>
            </div>
            <div className="input-wrapper">
              <i className="input-icon left fa-solid fa-user"></i>
              <input 
                type="text" 
                id="name" 
                className="form-input" 
                placeholder="Nama lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '16px' }}>
            <div className="label-row">
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-wrapper">
              <i className="input-icon left fa-solid fa-envelope"></i>
              <input 
                type="email" 
                id="email" 
                className="form-input" 
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '16px' }}>
            <div className="label-row">
              <label htmlFor="password">Kata Sandi</label>
            </div>
            <div className="input-wrapper">
              <i className="input-icon left fa-solid fa-lock"></i>
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                className="form-input" 
                style={{ paddingRight: '48px' }}
                placeholder="Buat kata sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button" 
                className="input-icon right"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
              </button>
            </div>
          </div>

          <div className="form-group">
            <div className="label-row">
              <label htmlFor="confirmPassword">Konfirmasi Kata Sandi</label>
            </div>
            <div className="input-wrapper">
              <i className="input-icon left fa-solid fa-shield-check"></i>
              <input 
                type={showPassword ? "text" : "password"} 
                id="confirmPassword" 
                className="form-input" 
                placeholder="Ulangi kata sandi"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {errorMsg && (
              <div style={{ color: 'var(--red)', fontSize: '0.8rem', marginTop: '6px', fontWeight: '600' }}>
                <i className="fa-solid fa-triangle-exclamation mr-1"></i> {errorMsg}
              </div>
            )}
          </div>

          <button type="submit" className="btn-submit" style={{ marginTop: '20px' }}>
            Daftar Sekarang
          </button>
        </form>

        <div className="divider" style={{ margin: '20px 0' }}>
          <span>atau</span>
        </div>

        <div className="google-auth-wrapper">
          <button
            type="button"
            className="google-login-btn"
            onClick={handleGoogleRegister}
          >
            <span className="google-login-icon-wrap">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                alt="Google Logo" 
                className="google-login-icon" 
              />
            </span>
            <span className="google-login-text">
              Daftar dengan Google
            </span>
          </button>
        </div>

        <div className="register-prompt">
          Sudah punya akun? <Link to="/login" className="link-text">Masuk di sini</Link>
        </div>
      </main>
    </div>
  );
};

export default RegisterForm;