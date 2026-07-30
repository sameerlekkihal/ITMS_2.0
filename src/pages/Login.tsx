import { useAppStore } from '../store/AppStore';

const floatingIcons = [
  { top: '11%', left: '7%', anim: 'fiFloat 17s ease-in-out infinite' },
  { top: '8%', right: '5%', anim: 'fiFloat 22s ease-in-out infinite 4s' },
  { bottom: '11%', left: '6%', anim: 'fiFloat 23s ease-in-out infinite .8s' },
  { bottom: '7%', right: '7%', anim: 'fiFloat 21s ease-in-out infinite 2s' },
];

export function Login() {
  const { state, onLoginClick } = useAppStore();
  const loggingIn = state.loggingIn;

  return (
    <div style={{ height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'radial-gradient(ellipse 70% 60% at 15% 40%, rgba(232,25,44,.20) 0%, transparent 60%),radial-gradient(ellipse 55% 70% at 85% 70%, rgba(232,25,44,.12) 0%, transparent 55%),linear-gradient(145deg, #0f1115 0%, #1a0c0d 50%, #0f1115 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)', backgroundSize: '48px 48px', WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)' }} />

      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', filter: 'blur(70px)', background: 'rgba(232,25,44,.18)', top: -100, left: -80, animation: 'blobFloat 16s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', width: 280, height: 280, borderRadius: '50%', filter: 'blur(70px)', background: 'rgba(232,25,44,.12)', bottom: -60, right: '8%', animation: 'blobFloat 20s ease-in-out infinite 5s' }} />
      <div style={{ position: 'absolute', width: 180, height: 180, borderRadius: '50%', filter: 'blur(70px)', background: 'rgba(245,158,11,.08)', top: '35%', right: -30, animation: 'blobFloat 18s ease-in-out infinite 2.5s' }} />

      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
        {floatingIcons.map((pos, i) => (
          <div key={i} style={{ position: 'absolute', ...pos }}>
            <div style={{ width: 52, height: 52, borderRadius: 13, background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(0,0,0,.22)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ opacity: .65 }}>
                <rect x="5" y="3" width="14" height="18" rx="2" stroke="white" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div style={{ background: '#fff', borderRadius: 20, width: 410, padding: '0 38px 38px', boxShadow: '0 0 0 1px rgba(255,255,255,.1), 0 32px 80px rgba(0,0,0,.55), 0 4px 16px rgba(0,0,0,.28)', animation: 'cardIn .65s cubic-bezier(.34,1.3,.64,1) forwards' }}>
          <div style={{ height: 4, margin: '0 -38px 36px', background: 'linear-gradient(90deg, transparent 0%, #e8192c 25%, #ff5a68 55%, #e8192c 75%, transparent 100%)', borderRadius: '20px 20px 0 0' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 26 }}>
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
              <rect width="34" height="34" rx="8" fill="#fff0f1" />
              <path d="M17 4 L27 8 L27 18 C27 23.5 22.5 28 17 30 C11.5 28 7 23.5 7 18 L7 8 Z" fill="#e8192c" />
              <path d="M13 17.5 L15.8 20.3 L21.5 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div style={{ fontSize: 17, fontWeight: 600, color: '#0f1115' }}>Insurance<em style={{ fontStyle: 'normal', color: '#e8192c' }}>Dekho</em></div>
          </div>

          <div style={{ fontFamily: "'Instrument Serif',serif", fontSize: 27, lineHeight: 1.15, color: '#0f1115', marginBottom: 5 }}>Log in to ITMS</div>
          <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 30 }}>Use your company account to continue</div>

          <button onClick={() => onLoginClick('Google')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 11, width: '100%', padding: '13px 16px', borderRadius: 11, border: '1.5px solid #e5e7eb', background: '#fff', fontSize: 14, fontWeight: 500, color: '#0f1115', cursor: 'pointer', marginBottom: 12 }}>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span>{loggingIn === 'Google' ? 'Connecting to Google…' : 'Sign in with Google'}</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '16px 0' }}>
            <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} /><span style={{ fontSize: 12, color: '#9ca3af' }}>OR</span><div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
          </div>

          <button onClick={() => onLoginClick('Zoho')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 11, width: '100%', padding: '13px 16px', borderRadius: 11, border: '1.5px solid #e5e7eb', background: '#fff', fontSize: 14, fontWeight: 500, color: '#0f1115', cursor: 'pointer' }}>
            <div style={{ width: 22, height: 22, borderRadius: 5, background: '#e8192c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#fff', flexShrink: 0 }}>Z</div>
            <span>{loggingIn === 'Zoho' ? 'Connecting to Zoho…' : 'Sign in with Zoho'}</span>
          </button>

          <div style={{ marginTop: 26, textAlign: 'center', fontSize: 11, color: '#9ca3af', lineHeight: 1.7 }}>
            By signing in you agree to our <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a><br />
            Need help? <a href="#">Contact IT Support</a>
          </div>
        </div>
      </div>
    </div>
  );
}
