import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

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
    navigate('/dashboard');
  };

  // Handle Login Sukses Google
  const handleGoogleSuccess = (credentialResponse) => {
    setIsGoogleLoading(true);
    const userDetail = jwtDecode(credentialResponse.credential);
    console.log('Login Google Berhasil! Data User:', userDetail);
    localStorage.setItem('user_data', JSON.stringify(userDetail));
    navigate('/dashboard');
  };

  const handleGoogleError = () => {
    setIsGoogleLoading(false);
    console.log('Proses Login Google Gagal');
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
              onError={handleGoogleError}
              useOneTap
              shape="rectangular"
              theme="outline"
              text="signin_with"
              size="large"
              render={(renderProps) => (
                <button
                  type="button"
                  className={`google-login-btn ${isGoogleLoading ? 'is-loading' : ''}`}
                  onClick={() => {
                    setIsGoogleLoading(true);
                    renderProps.onClick();
                  }}
                  disabled={renderProps.disabled || isGoogleLoading}
                >
                  <span className="google-login-icon-wrap">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="google-login-icon">
                      <path
                        fill="#EA4335"
                        d="M12 10.2v3.9h5.4c-.2 1.3-1.5 3.9-5.4 3.9-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.7 3.3 14.7 2.5 12 2.5 6.8 2.5 2.5 6.8 2.5 12S6.8 21.5 12 21.5c6.9 0 11.5-4.8 11.5-11.5 0-.8-.1-1.5-.2-2.1H12Z"
                      />
                      <path
                        fill="#34A853"
                        d="M3.8 7.3l3.4 2.5c.9-1.8 2.9-3.1 4.8-3.1 1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.7 3.3 14.7 2.5 12 2.5 8.3 2.5 5.1 4.9 3.8 7.3Z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M3.9 16.8c1.2 2.3 3.5 4.1 8.1 4.1 2.4 0 4.4-.8 5.9-2.2l-2.8-2.2c-.8.5-1.9.9-3.1.9-2.5 0-4.7-1.7-5.4-3.9l-2.7 2.3Z"
                      />
                      <path
                        fill="#4285F4"
                        d="M12 21.5c2.9 0 5.3-.9 7.1-2.6l-3.3-2.7c-.9.6-2.2 1.1-3.8 1.1-2.9 0-5.2-2-5.9-4.7l-3.2 2.5C1.5 18 6.3 21.5 12 21.5Z"
                      />
                    </svg>
                  </span>
                  <span className="google-login-text">
                    {isGoogleLoading ? 'Memproses login...' : 'Masuk dengan Google'}
                  </span>
                </button>
              )}
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