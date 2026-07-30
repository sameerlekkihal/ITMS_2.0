import type { PageKey } from '../types';
import { useAppStore } from '../store/AppStore';

const navItemStyle = (active: boolean): React.CSSProperties => ({
  display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 9,
  fontSize: 13, fontWeight: 500, cursor: 'pointer', marginBottom: 1, userSelect: 'none',
  background: active ? 'rgba(232,25,44,.15)' : 'transparent',
  color: active ? '#ff6b79' : 'rgba(255,255,255,.48)',
});

const sectionLabelStyle: React.CSSProperties = { fontSize: 9.5, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase', color: 'rgba(255,255,255,.22)', padding: '14px 10px 5px' };

export function Sidebar() {
  const { state, onNavTo, onLogout } = useAppStore();
  const page = state.page;

  const NavItem = ({ p, icon, label, badge }: { p: PageKey; icon: string; label: string; badge?: string }) => (
    <div onClick={() => onNavTo(p)} style={navItemStyle(page === p)}>
      <span style={{ width: 18, textAlign: 'center', fontSize: 15, flexShrink: 0 }}>{icon}</span> {label}
      {badge && <span style={{ marginLeft: 'auto', background: '#e8192c', color: '#fff', fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 20 }}>{badge}</span>}
    </div>
  );

  return (
    <aside style={{ width: 232, background: '#0f1115', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100, overflow: 'hidden' }}>
      <div style={{ padding: '18px 18px 14px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(255,255,255,.06)', flexShrink: 0 }}>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: '#e8192c', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2 L17 5 L17 11 C17 14.5 13.9 17.5 10 19 C6.1 17.5 3 14.5 3 11 L3 5 Z" fill="white" />
            <path d="M7.5 10.5 L9.3 12.3 L13 8.5" stroke="#e8192c" strokeWidth="1.8" />
          </svg>
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Insurance<span style={{ color: '#e8192c' }}>Dekho</span> <span style={{ color: 'rgba(255,255,255,.3)', fontSize: 11, fontWeight: 400 }}>ITMS</span></div>
      </div>

      <nav style={{ flex: 1, padding: '14px 10px', overflowY: 'auto' }}>
        <div style={sectionLabelStyle}>Main</div>
        <NavItem p="home" icon="⊞" label="Home" />

        <div style={sectionLabelStyle}>Management</div>
        <NavItem p="users" icon="👥" label="User Management" badge="148" />
        <NavItem p="roles" icon="🔐" label="Role Management" />

        <div style={sectionLabelStyle}>Operations</div>
        <NavItem p="workflow" icon="🔄" label="Workflow" />
        <NavItem p="insurer" icon="🏢" label="Insurer Portal" />
      </nav>

      <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(255,255,255,.06)', flexShrink: 0 }}>
        <div onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 9, cursor: 'pointer' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #e8192c, #ff8a94)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>JJ</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#fff' }}>Jijo John</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,.3)' }}>Super Admin</div>
          </div>
          <div style={{ marginLeft: 'auto', fontSize: 18, color: 'rgba(255,255,255,.25)' }}>↩</div>
        </div>
      </div>
    </aside>
  );
}
