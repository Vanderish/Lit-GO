import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import Logo from '../../components/Logo/Logo';
import './Login.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const { refreshState } = useProgress();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleManualLogin = (e) => {
    if (e) e.preventDefault();
    
    // Cari nama user jika sudah pernah mendaftar dengan email ini
    let resolvedName = '';
    try {
      const existingUsers = JSON.parse(localStorage.getItem('litgo_registered_users') || '[]');
      const found = existingUsers.find((u) => u.email && email && u.email.toLowerCase() === email.toLowerCase());
      if (found && found.name) {
        resolvedName = found.name;
      }
    } catch {
      // ignore
    }

    // Jika tidak ditemukan di riwayat register, format nama dari email
    if (!resolvedName) {
      if (email && email.includes('@')) {
        resolvedName = email
          .split('@')[0]
          .replace(/[._-]+/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());
      } else {
        resolvedName = 'Pengguna Lit-GO';
      }
    }

    const userDetail = {
      name: resolvedName,
      email: email || 'pengguna@litgo.id',
      picture: '',
    };
    localStorage.setItem('user_data', JSON.stringify(userDetail));
    if (refreshState) refreshState();
    navigate('/dashboard');
  };

  const handleGoogleLogin = () => {
    let resolvedName = 'Pengguna Google';
    if (email && email.includes('@')) {
      resolvedName = email
        .split('@')[0]
        .replace(/[._-]+/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
    }
    const userDetail = {
      name: resolvedName,
      email: email || 'user.google@litgo.id',
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
        <div className="brand-header">
          <Logo size={46} color="#0A2540" />
          <h1 className="brand-title">LIT-GO</h1>
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
            Masuk
          </button>
        </form>

        <div className="divider">
          <span>atau</span>
        </div>

        <div className="google-auth-wrapper">
          <button
            type="button"
            className="google-login-btn"
            onClick={handleGoogleLogin}
          >
            <span className="google-login-icon-wrap">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                alt="Google Logo"
                className="google-login-icon"
              />
            </span>
            <span className="google-login-text">
              Masuk dengan Google
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

export default LoginForm;