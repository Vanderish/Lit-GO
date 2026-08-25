import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useProgress } from '../../context/ProgressContext';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { refreshState } = useProgress();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const clientId = import.meta.env.VITE_OAUTH_SECRET;

  // Handle Login Manual (Email & Password)
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

  // Handle Login Sukses Google
  const handleGoogleSuccess = (credentialResponse) => {
    const userDetail = jwtDecode(credentialResponse.credential);
    console.log('Login Google Berhasil! Data User:', userDetail);
    localStorage.setItem('user_data', JSON.stringify(userDetail));
    if (refreshState) refreshState();
    navigate('/dashboard');
  };

  return (
    <GoogleOAuthProvider clientId={`${clientId}`}>
      <div className="login-wrapper">
        <div className="bg-grid"></div>
        <div className="bg-glow"></div>
        <div className="bg-glow2"></div>

        <main className="login-card">
          {/* Logo / Brand Area */}
          <div className="brand-header">
            <div className="brand-logo">L</div>
            <h1 className="brand-title">Lit-GO</h1>
          </div>

          <form onSubmit={handleManualLogin}>
            {/* Email Input */}
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

            {/* Password Input */}
            <div className="form-group">
              <div className="label-row">
                <label htmlFor="password">Kata Sandi</label>
                <a href="#forgot" className="link-text">Lupa kata sandi?</a>
              </div>
              <div className="input-wrapper">
                <i className="input-icon left fa-solid fa-lock"></i>
                <input 
                  type={showPassword ? "text" : "password"} 
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
                  <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-submit">
              Masuk <i className="fa-solid fa-arrow-right" style={{ fontSize: '16px' }}></i>
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <span>atau</span>
          </div>

          {/* Google OAuth Login Button */}
          <div className="google-auth-wrapper">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.log('Proses Login Google Gagal')}
              useOneTap
              shape="rectangular"
              theme="outline"
              text="signin_with"
              size="large"
            />
          </div>

          <div className="register-prompt">
            Belum punya akun? <a href="#register" className="link-text">Daftar sekarang</a>
          </div>

          <div className="trust-badge">
            Memahami AI dengan Kritis.
          </div>
        </main>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;