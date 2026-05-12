import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LangProvider, useLang } from './contexts/LangContext';
import CoachProLandingComplete from './pages/CoachProLandingComplete';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import CoachDashboard from './pages/coach/CoachDashboard';
import ClientDashboard from './pages/client/ClientDashboard';
import LangButton from './components/LangButton';
import Toast from './components/Toast';

function AppInner() {
  const { user, userData, loading } = useAuth();
  const { t } = useLang();
  const [page, setPage] = useState('landing'); // بدأ بـ Landing Page
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'ok') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-logo">
          <div className="loading-icon">⚡</div>
          <div className="loading-brand">CoachPro</div>
        </div>
        <div className="loading-bar"><div className="loading-fill" /></div>
      </div>
    );
  }

  // ─── LOGGED IN ───────────────────────────────────────────────────────────────
  if (user && userData) {
    const role = userData.role;
    const status = userData.status;

    // Pending coach
    if (role === 'coach' && status === 'pending') {
      return (
        <div className="auth-page">
          <div className="auth-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
            <h2 style={{ marginBottom: 8 }}>{t.pending}</h2>
            <p style={{ color: 'var(--text3)', fontSize: 14, marginBottom: 24 }}>{t.pendingMsg}</p>
           <LogoutBtn t={t} />
          </div>
          <LangButton />
        </div>
      );
    }

    // Suspended account
    if (status === 'suspended') {
      return (
        <div className="auth-page">
          <div className="auth-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🚫</div>
            <h2 style={{ marginBottom: 8, color: 'var(--red)' }}>{t.suspended}</h2>
            <p style={{ color: 'var(--text3)', fontSize: 14, marginBottom: 24 }}>{t.suspendedMsg}</p>
            <LogoutBtn t={t} />
          </div>
          <LangButton />
        </div>
      );
    }

    return (
      <>
        {role === 'admin'  && <AdminDashboard  showToast={showToast} />}
        {role === 'coach'  && <CoachDashboard  showToast={showToast} />}
        {role === 'client' && <ClientDashboard showToast={showToast} />}
        <LangButton />
        {toast && <Toast msg={toast.msg} type={toast.type} />}
      </>
    );
  }

  // ─── NOT LOGGED IN ────────────────────────────────────────────────────────────
  // Landing Page
  if (page === 'landing') {
    return (
      <>
        <CoachProLandingComplete />
        <LangButton />
        {toast && <Toast msg={toast.msg} type={toast.type} />}
      </>
    );
  }

  // Login و Register
  return (
    <>
      {page === 'login'    && <LoginPage    onRegister={() => setPage('register')} showToast={showToast} />}
      {page === 'register' && <RegisterPage onLogin={() => setPage('login')} showToast={showToast} />}
      <LangButton />
      {toast && <Toast msg={toast.msg} type={toast.type} />}
    </>
  );
}

function LogoutBtn({ t }) {
  const { logout } = useAuth();
  return <button className="btn btn-ghost" onClick={logout}>{t.logout}</button>;
}

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/201550870190"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: 24,
        left: 24,
        width: 56,
        height: 56,
        borderRadius: '50%',
        backgroundColor: '#25D366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(37,211,102,0.5)',
        zIndex: 9999,
        textDecoration: 'none',
        transition: 'transform 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      title="تواصل معنا على واتساب"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

export default function App() {
  return (
    <LangProvider>
      <AuthProvider>
        <AppInner />
        <WhatsAppButton />
      </AuthProvider>
    </LangProvider>
  );
}