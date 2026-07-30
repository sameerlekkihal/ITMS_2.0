import { useAppStore } from '../store/AppStore';
import { MODULE_CARDS } from '../data/mockData';

export function Home() {
  const { state, onNavTo, showToast } = useAppStore();
  const { lastLoginTime, sessionVia, todayDate } = state;

  return (
    <div style={{ animation: 'pageIn .4s ease forwards' }}>
      <div style={{ background: '#0f1115', borderRadius: 16, padding: '32px 36px', marginBottom: 28, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,25,44,.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -40, left: '20%', width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,184,150,.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(232,25,44,.15)', border: '1px solid rgba(232,25,44,.25)', borderRadius: 20, padding: '4px 12px', fontSize: 11, fontWeight: 600, color: '#ff7b87', letterSpacing: .5, textTransform: 'uppercase', marginBottom: 14 }}>
          <span style={{ fontSize: 7, animation: 'pulse 2s ease infinite' }}>●</span> Live session
        </div>
        <div style={{ fontFamily: "'Instrument Serif',serif", fontSize: 34, lineHeight: 1.15, color: '#fff', marginBottom: 8 }}>Good morning, <span style={{ color: '#ff7b87', fontStyle: 'italic' }}>Jijo</span> 👋</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,.45)', maxWidth: 480, lineHeight: 1.6 }}>Welcome back to ITMS. Here's a quick overview of where you left off — pick up right where you were.</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: 'rgba(255,255,255,.35)' }}><span>🕐</span><span>Last login: <strong style={{ color: 'rgba(255,255,255,.7)', fontWeight: 500 }}>{lastLoginTime}</strong></span></div>
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,.2)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: 'rgba(255,255,255,.35)' }}><span>📍</span><span>Session via: <strong style={{ color: 'rgba(255,255,255,.7)', fontWeight: 500 }}>{sessionVia}</strong></span></div>
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,.2)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: 'rgba(255,255,255,.35)' }}><span>📅</span><span><strong style={{ color: 'rgba(255,255,255,.7)', fontWeight: 500 }}>{todayDate}</strong></span></div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div><h3 style={{ fontSize: 15, fontWeight: 700 }}>Recently Accessed</h3><p style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>Modules you interacted with most recently — jump back in</p></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 16 }}>
        {MODULE_CARDS.map(mc => (
          <div
            key={mc.key}
            onClick={() => mc.page ? onNavTo(mc.page) : showToast(mc.toast!)}
            style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,.07), 0 2px 8px rgba(0,0,0,.05)', border: '1.5px solid #e5e7eb', cursor: 'pointer', transition: 'border-color .2s, box-shadow .2s, transform .18s', opacity: mc.opacity }}
          >
            <div style={{ height: 122, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', background: mc.previewBg }}>
              <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,.45)', borderRadius: 20, padding: '3px 9px', fontSize: 10, color: 'rgba(255,255,255,.55)' }}>{mc.ts}</div>
            </div>
            <div style={{ padding: '14px 16px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, background: mc.iconBg }}>{mc.icon}</div>
                <span style={{ fontSize: 10, color: '#9ca3af', background: '#f3f4f6', padding: '3px 8px', borderRadius: 20 }}>{mc.statusLabel}</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0f1115', marginBottom: 3 }}>{mc.label}</div>
              <div style={{ fontSize: 11.5, color: '#9ca3af', lineHeight: 1.45 }}>{mc.desc}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, paddingTop: 11, borderTop: '1px solid #f3f4f6' }}>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>{mc.stat}</div>
                <button style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: mc.ctaColor, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>{mc.cta}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
