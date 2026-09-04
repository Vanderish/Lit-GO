import React, { useState } from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { useNavigate, Link } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import './Login.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const { refreshState } = useProgress();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleManualLogin = (e) => {
    e.preventDefault();
    const userDetail = {
      name: email.split('@')[0] || 'User Lit-GO',
      email: email,
      picture: '',
    };
    localStorage.setItem('user_data', JSON.stringify(userDetail));
    if (refreshState) refreshState();
    navigate('/dashboard');
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsGoogleLoading(true);
      try {
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        }).then((res) => res.json());

        const userDetail = {
          name: userInfo.name || 'User Lit-GO',
          email: userInfo.email,
          picture: userInfo.picture || '',
        };

        localStorage.setItem('user_data', JSON.stringify(userDetail));
        if (refreshState) refreshState();
        navigate('/dashboard');
      } catch (error) {
        console.error('Gagal mengambil data user Google:', error);
        setIsGoogleLoading(false);
      }
    },
    onError: (error) => {
      console.log('Proses Login Google Gagal', error);
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
        <i className="fa-solid fa-arrow-left"></i> Kembali
      </Link>

      <main className="login-card">
        <div className="brand-header">
          <div className="brand-logo">L</div>
          <h1 className="brand-title">Lit-GO</h1>
        </div>

        <form onSubmit={handleManualLogin}>
          <div className="form-group">
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

          <div className="form-group">
            <div className="label-row">
              <label htmlFor="password">Kata Sandi</label>
              <a href="#forgot" className="link-text">
                Lupa kata sandi?
              </a>
            </div>
            <div className="input-wrapper">
              <i className="input-icon left fa-solid fa-lock"></i>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="form-input"
                style={{ paddingRight: '48px' }}
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="input-icon right"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
              </button>
            </div>
          </div>

          <button type="submit" className="btn-submit">
            Masuk <i className="fa-solid fa-arrow-right" style={{ fontSize: '16px' }}></i>
          </button>
        </form>

        <div className="divider">
          <span>atau</span>
        </div>

        <div className="google-auth-wrapper">
          <button
            type="button"
            className={`google-login-btn ${isGoogleLoading ? 'is-loading' : ''}`}
            onClick={() => {
              setIsGoogleLoading(true);
              loginWithGoogle();
            }}
            disabled={isGoogleLoading}
          >
            <span className="google-login-icon-wrap">
              {isGoogleLoading ? (
                <i
                  className="fa-solid fa-circle-notch fa-spin"
                  style={{ color: '#4F46E5', fontSize: '18px' }}
                ></i>
              ) : (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                  alt="Google Logo"
                  className="google-login-icon"
                />
              )}
            </span>
            <span className="google-login-text">
              {isGoogleLoading ? 'Memproses...' : 'Masuk dengan Google'}
            </span>
          </button>
        </div>

        <div className="register-prompt">
          Belum punya akun? <Link to="/register" className="link-text">Daftar sekarang</Link>
        </div>

        <div className="trust-badge">
          Memahami AI dengan Kritis.
        </div>
      </main>
    </div>
  );
};

const LoginWrapper = () => {
  const clientId = import.meta.env.VITE_OAUTH_SECRET || 'DUMMY_CLIENT_ID';
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <LoginForm />
    </GoogleOAuthProvider>
  );
};

export default LoginWrapper;