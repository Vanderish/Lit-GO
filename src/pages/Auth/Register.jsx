import React, { useState } from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleManualRegister = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Kata sandi dan konfirmasi kata sandi tidak cocok!');
      return;
    }

    const userDetail = {
      name: name.trim() || email.split('@')[0],
      email: email,
      picture: '',
    };
    
    localStorage.setItem('user_data', JSON.stringify(userDetail));
    navigate('/dashboard');
  };

  const registerWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsGoogleLoading(true);
      try {
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        }).then(res => res.json());

        const userDetail = {
          name: userInfo.name || 'User Lit-GO',
          email: userInfo.email,
          picture: userInfo.picture || '',
        };
        
        localStorage.setItem('user_data', JSON.stringify(userDetail));
        navigate('/dashboard');
      } catch (error) {
        console.error('Gagal mengambil data user Google:', error);
        setIsGoogleLoading(false);
      }
    },
    onError: (error) => {
      console.log('Proses Register Google Gagal', error);
      setIsGoogleLoading(false);
    },
  });

  return (
    <div className="login-wrapper">
      <div className="bg-grid"></div>
      <div className="bg-glow"></div>
      <div className="bg-glow2"></div>

      {/* Tombol Batal / Kembali */}
      <Link to="/" className="btn-back-home">
        <i className="fa-solid fa-arrow-left"></i> Batal
      </Link>

      <main className="login-card">
        <div className="brand-header" style={{ marginBottom: '24px' }}>
          <div className="brand-logo">L</div>
          <h1 className="brand-title">Daftar Akun</h1>
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
                placeholder="John Doe" 
                required 
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
                required 
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
                required 
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
                required 
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
            Daftar Sekarang <i className="fa-solid fa-user-plus" style={{ fontSize: '14px' }}></i>
          </button>
        </form>

        <div className="divider" style={{ margin: '20px 0' }}>
          <span>atau</span>
        </div>

        <div className="google-auth-wrapper">
          <button
            type="button"
            className={`google-login-btn ${isGoogleLoading ? 'is-loading' : ''}`}
            onClick={() => {
              setIsGoogleLoading(true);
              registerWithGoogle();
            }}
            disabled={isGoogleLoading}
          >
            <span className="google-login-icon-wrap">
              {isGoogleLoading ? (
                <i className="fa-solid fa-circle-notch fa-spin" style={{ color: '#4F46E5', fontSize: '18px' }}></i>
              ) : (
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                  alt="Google Logo" 
                  className="google-login-icon" 
                />
              )}
            </span>
            <span className="google-login-text">
              {isGoogleLoading ? 'Memproses...' : 'Daftar dengan Google'}
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

const RegisterWrapper = () => {
  const clientId = import.meta.env.VITE_OAUTH_SECRET || "DUMMY_CLIENT_ID";
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <RegisterForm />
    </GoogleOAuthProvider>
  );
};

export default RegisterWrapper;