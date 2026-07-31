import type { PageKey } from '../types';
import { useAppStore } from '../store/AppStore';

const navItemStyle = (active: boolean, collapsed: boolean): React.CSSProperties => ({
  display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 9,
  fontSize: 13, fontWeight: 500, cursor: 'pointer', marginBottom: 1, userSelect: 'none',
  background: active ? 'rgba(232,25,44,.15)' : 'transparent',
  color: active ? '#ff6b79' : 'rgba(255,255,255,.78)',
  justifyContent: collapsed ? 'center' : 'flex-start',
});

const umrSubItemStyle = (active: boolean): React.CSSProperties => ({
  display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 7,
  fontSize: 13, fontWeight: 500, cursor: 'pointer', marginBottom: 2, userSelect: 'none',
  background: active ? '#fff' : 'rgba(255,255,255,.14)',
  color: active ? '#1f2937' : 'rgba(255,255,255,.75)',
});

const sectionLabelStyle: React.CSSProperties = { fontSize: 9.5, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', padding: '14px 10px 5px' };

export function Sidebar() {
  const { state, onNavTo, onLogout, onToggleSidebar, onToggleUmr } = useAppStore();
  const { page, sidebarCollapsed, umrExpanded } = state;
  const expanded = !sidebarCollapsed;

  const asideWidth = sidebarCollapsed ? 68 : 232;
  const toggleIcon = sidebarCollapsed ? '›' : '‹';
  const toggleTitle = sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar';

  const NavItem = ({ p, icon, label, badge }: { p: PageKey; icon: string; label: string; badge?: string }) => (
    <div onClick={() => onNavTo(p)} style={navItemStyle(page === p, sidebarCollapsed)}>
      <span style={{ width: 18, textAlign: 'center', fontSize: 15, flexShrink: 0 }}>{icon}</span>
      {expanded && <>{label}{badge && <span style={{ marginLeft: 'auto', background: '#e8192c', color: '#fff', fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 20 }}>{badge}</span>}</>}
    </div>
  );

  return (
    <aside style={{ width: asideWidth, background: '#0f1115', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100, overflow: 'hidden', transition: 'width .2s ease' }}>
      <div style={{ padding: '18px 18px 14px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(255,255,255,.06)', flexShrink: 0 }}>
        {sidebarCollapsed ? (
          <div onClick={onToggleSidebar} title={toggleTitle} style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer', color: 'rgba(255,255,255,.6)', fontSize: 14 }}>{toggleIcon}</div>
        ) : (
          <>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: '#e8192c', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2 L17 5 L17 11 C17 14.5 13.9 17.5 10 19 C6.1 17.5 3 14.5 3 11 L3 5 Z" fill="white" />
                <path d="M7.5 10.5 L9.3 12.3 L13 8.5" stroke="#e8192c" strokeWidth="1.8" />
              </svg>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', flex: 1 }}>Insurance<span style={{ color: '#e8192c' }}>Dekho</span> <span style={{ color: 'rgba(255,255,255,.3)', fontSize: 11, fontWeight: 400 }}>ITMS</span></div>
            <div onClick={onToggleSidebar} title={toggleTitle} style={{ width: 26, height: 26, borderRadius: 7, background: 'rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(255,255,255,.5)', fontSize: 13, flexShrink: 0 }}>{toggleIcon}</div>
          </>
        )}
      </div>

      <nav style={{ flex: 1, padding: '14px 10px', overflowY: 'auto' }}>
        {expanded && <div style={sectionLabelStyle}>Main</div>}
        <NavItem p="home" icon="⊞" label="Home" />

        {expanded && (
          <div style={{ border: '1px solid rgba(255,255,255,.16)', borderRadius: 9, overflow: 'hidden', marginBottom: 1, marginTop: 14 }}>
            <div onClick={onToggleUmr} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', color: 'rgba(255,255,255,.85)', fontSize: 13, fontWeight: 600, cursor: 'pointer', userSelect: 'none', background: umrExpanded ? 'rgba(255,255,255,.04)' : 'transparent' }}>
              <span style={{ width: 18, textAlign: 'center', fontSize: 15, flexShrink: 0 }}>🗂️</span> User &amp; Roles
              <span style={{ marginLeft: 'auto', fontSize: 11, color: 'rgba(255,255,255,.55)' }}>{umrExpanded ? '▾' : '▸'}</span>
            </div>
            {umrExpanded && (
              <div style={{ borderTop: '1px solid rgba(255,255,255,.16)', padding: '4px 6px 6px' }}>
                <div onClick={() => onNavTo('users')} style={umrSubItemStyle(page === 'users')}>
                  <span style={{ width: 14, flexShrink: 0 }} /><span style={{ width: 18, textAlign: 'center', fontSize: 14, flexShrink: 0 }}>👥</span> User Management
                </div>
                <div onClick={() => onNavTo('roles')} style={umrSubItemStyle(page === 'roles')}>
                  <span style={{ width: 14, flexShrink: 0 }} /><span style={{ width: 18, textAlign: 'center', fontSize: 14, flexShrink: 0 }}>🔐</span> Role Management
                </div>
              </div>
            )}
          </div>
        )}
        {sidebarCollapsed && (
          <div onClick={() => onNavTo('users')} style={navItemStyle(page === 'users' || page === 'roles', true)} title="User &amp; Roles">
            <span style={{ width: 18, textAlign: 'center', fontSize: 15, flexShrink: 0 }}>🗂️</span>
          </div>
        )}

        {expanded && <div style={sectionLabelStyle}>Operations</div>}
        <NavItem p="workflow" icon="🔄" label="Workflow" />
        <NavItem p="insurer" icon="🏢" label="Insurer Portal" />
      </nav>

      <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(255,255,255,.06)', flexShrink: 0 }}>
        <div onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 9, cursor: 'pointer' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #e8192c, #ff8a94)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>JJ</div>
          {expanded && (
            <>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#fff' }}>Jijo John</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.55)' }}>Super Admin</div>
              </div>
              <div style={{ marginLeft: 'auto', fontSize: 18, color: 'rgba(255,255,255,.25)' }}>↩</div>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
