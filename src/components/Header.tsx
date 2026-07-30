import { useAppStore } from '../store/AppStore';

const pageLabels: Record<string, string> = { home: 'Dashboard', users: 'User Management', roles: 'Role Management', workflow: 'Workflow', insurer: 'Insurer Portal' };

export function Header() {
  const { state, onNavTo, onToggleProfile, onProfileItem, onSettingsClick, onLogout } = useAppStore();
  const { page, profileOpen } = state;

  return (
    <header style={{ position: 'fixed', top: 0, left: 232, right: 0, height: 56, zIndex: 90, background: '#fff', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', padding: '0 28px', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
        <span onClick={() => onNavTo('home')} style={{ color: '#9ca3af', cursor: 'pointer' }}>Home</span>
        {page !== 'home' && <><span style={{ color: '#9ca3af' }}>/</span><span style={{ fontWeight: 600 }}>{pageLabels[page] || page}</span></>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 34, height: 34, borderRadius: 8, border: '1.5px solid #e5e7eb', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 15, color: '#9ca3af', position: 'relative' }}>
          🔔
          <div style={{ position: 'absolute', top: 4, right: 4, width: 7, height: 7, borderRadius: '50%', background: '#e8192c', border: '1.5px solid #fff' }} />
        </div>
        <div onClick={onSettingsClick} style={{ width: 34, height: 34, borderRadius: 8, border: '1.5px solid #e5e7eb', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 15, color: '#9ca3af' }}>⚙️</div>
        <div style={{ position: 'relative' }}>
          <div onClick={onToggleProfile} style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #e8192c, #ff8a94)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>JJ</div>
          {profileOpen && (
            <div style={{ position: 'absolute', top: 'calc(100% + 10px)', right: 0, width: 220, background: '#fff', borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,.14), 0 0 0 1px rgba(0,0,0,.06)', overflow: 'hidden', zIndex: 200 }}>
              <div style={{ padding: '14px 16px 12px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #e8192c, #ff8a94)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>JJ</div>
                <div><div style={{ fontSize: 13, fontWeight: 600, color: '#0f1115' }}>Jijo John</div><div style={{ fontSize: 11, color: '#9ca3af', marginTop: 1 }}>jijo.john@insurancedekho.com</div></div>
              </div>
              <div style={{ padding: 6 }}>
                <div onClick={() => onProfileItem('Profile settings coming soon')} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 8, fontSize: 13, color: '#4b5563', cursor: 'pointer' }}><span style={{ fontSize: 15, width: 20, textAlign: 'center' }}>👤</span> My Profile</div>
                <div onClick={() => onProfileItem('Account settings coming soon')} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 8, fontSize: 13, color: '#4b5563', cursor: 'pointer' }}><span style={{ fontSize: 15, width: 20, textAlign: 'center' }}>⚙️</span> Account Settings</div>
                <div style={{ height: 1, background: '#e5e7eb', margin: '4px 6px' }} />
                <div onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 8, fontSize: 13, color: '#e8192c', cursor: 'pointer' }}><span style={{ fontSize: 15, width: 20, textAlign: 'center' }}>↩</span> Log out</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
