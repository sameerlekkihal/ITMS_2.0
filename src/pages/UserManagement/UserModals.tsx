import { useAppStore } from '../../store/AppStore';
import { ModalOverlay, SidePanel, LogList } from '../../components/ModalShell';
import { PERMS_LIST, LOG_ICONS, LOG_DOT_BG } from '../../data/mockData';

const btnGhost: React.CSSProperties = { padding: '10px 18px', background: '#fff', color: '#0f1115', border: '1.5px solid #e5e7eb', borderRadius: 9, fontSize: 13, fontWeight: 500, cursor: 'pointer' };
const btnPrimary: React.CSSProperties = { padding: '10px 18px', background: '#e8192c', color: '#fff', border: 'none', borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: 'pointer' };

export function UserModals() {
  const {
    state, onUmCancelDelete, onUmConfirmDelete, onUmClosePerms, onUmTogglePerm, onUmSavePerms,
    onUmCloseAlloc, onUmSaveAlloc, onUmCloseLog,
  } = useAppStore();

  const deleteName = state.umUsers.find(u => u.id === state.umDeleteId)?.name || 'this user';
  const permsUser = state.umPermsUserId ? state.umUsers.find(u => u.id === state.umPermsUserId) : null;
  const allocUser = state.umAllocUserId ? state.umUsers.find(u => u.id === state.umAllocUserId) : null;
  const logUser = state.umLogUserId ? state.umUsers.find(u => u.id === state.umLogUserId) : null;

  const logItems = logUser ? [
    { type: 'create', action: 'User account created', by: 'Super Admin · Jijo John', time: '21 Apr 2026, 10:32 AM' },
    { type: 'perm', action: 'Policy Access permission granted', by: 'Admin · Priya Nair', time: '21 Apr 2026, 02:40 PM' },
    { type: 'edit', action: 'Role changed to ' + logUser.role, by: 'Super Admin · Jijo John', time: '22 Apr 2026, 10:00 AM' },
    { type: 'login', action: 'Successful login', by: 'User themselves', time: '22 Apr 2026, 09:05 AM' },
    { type: 'toggle', action: 'Account activated', by: 'Super Admin · Jijo John', time: '22 Apr 2026, 11:30 AM' },
  ].map(l => ({ ...l, icon: LOG_ICONS[l.type], bg: LOG_DOT_BG[l.type] })) : [];

  return (
    <>
      {state.umDeleteOpen && (
        <ModalOverlay>
          <div style={{ background: '#fff', borderRadius: 14, width: 380, textAlign: 'center', padding: 28, animation: 'modalIn .3s cubic-bezier(.34,1.4,.64,1)' }}>
            <div style={{ fontSize: 42, marginBottom: 12 }}>🗑️</div>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Delete User?</div>
            <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 24 }}>This will permanently remove <strong>{deleteName}</strong> from the platform. This cannot be undone.</div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button onClick={onUmCancelDelete} style={btnGhost}>Cancel</button>
              <button onClick={onUmConfirmDelete} style={{ ...btnPrimary, padding: '10px 22px' }}>Delete</button>
            </div>
          </div>
        </ModalOverlay>
      )}

      {state.umPermsOpen && (
        <ModalOverlay>
          <div style={{ background: '#fff', borderRadius: 14, width: 580, maxWidth: '95vw', maxHeight: '88vh', overflowY: 'auto', animation: 'modalIn .3s cubic-bezier(.34,1.4,.64,1)' }}>
            <div style={{ padding: '20px 22px 16px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div><div style={{ fontSize: 16, fontWeight: 700 }}>User Permissions</div><div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{permsUser ? `${permsUser.name} · ${permsUser.role}` : '—'}</div></div>
              <button onClick={onUmClosePerms} style={{ width: 30, height: 30, borderRadius: 7, border: '1.5px solid #e5e7eb', background: '#fff', cursor: 'pointer', fontSize: 18, color: '#9ca3af' }}>×</button>
            </div>
            <div style={{ padding: '20px 22px' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', letterSpacing: .5, textTransform: 'uppercase', marginBottom: 12 }}>Module Access</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
                {PERMS_LIST.map((name, i) => {
                  const on = !!state.umPermsChecked[i];
                  return (
                    <div key={name} onClick={() => onUmTogglePerm(i)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 11px', borderRadius: 8, border: `1.5px solid ${on ? '#e8192c' : '#e5e7eb'}`, background: on ? '#fff0f1' : '#fff', cursor: 'pointer' }}>
                      <input type="checkbox" checked={on} onChange={() => onUmTogglePerm(i)} style={{ accentColor: '#e8192c' }} />
                      <label style={{ fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>{name}</label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={{ padding: '14px 22px', borderTop: '1px solid #f3f4f6', background: '#f3f4f6', display: 'flex', justifyContent: 'flex-end', gap: 10, borderRadius: '0 0 14px 14px' }}>
              <button onClick={onUmClosePerms} style={btnGhost}>Cancel</button>
              <button onClick={onUmSavePerms} style={btnPrimary}>Save</button>
            </div>
          </div>
        </ModalOverlay>
      )}

      {state.umAllocOpen && (
        <ModalOverlay>
          <div style={{ background: '#fff', borderRadius: 14, width: 420, maxWidth: '95vw', animation: 'modalIn .3s cubic-bezier(.34,1.4,.64,1)' }}>
            <div style={{ padding: '20px 22px 16px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div><div style={{ fontSize: 16, fontWeight: 700 }}>Team Allocation</div><div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{allocUser ? `Mapping team for ${allocUser.name}` : '—'}</div></div>
              <button onClick={onUmCloseAlloc} style={{ width: 30, height: 30, borderRadius: 7, border: '1.5px solid #e5e7eb', background: '#fff', cursor: 'pointer', fontSize: 18, color: '#9ca3af' }}>×</button>
            </div>
            <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div><div style={{ fontSize: 12, fontWeight: 600, color: '#9ca3af', letterSpacing: .3, textTransform: 'uppercase', marginBottom: 6 }}>Assign Team</div>
                <select style={{ width: '100%', padding: '10px 13px', border: '1.5px solid #e5e7eb', borderRadius: 9, fontSize: 13, color: '#0f1115', outline: 'none', background: '#fff' }}>
                  <option>Team Alpha — North Zone</option><option>Team Beta — South Zone</option><option>Team Gamma — East Zone</option>
                </select>
              </div>
              <div><div style={{ fontSize: 12, fontWeight: 600, color: '#9ca3af', letterSpacing: .3, textTransform: 'uppercase', marginBottom: 6 }}>Reporting Manager</div>
                <select style={{ width: '100%', padding: '10px 13px', border: '1.5px solid #e5e7eb', borderRadius: 9, fontSize: 13, color: '#0f1115', outline: 'none', background: '#fff' }}>
                  <option>Rahul Mehta</option><option>Priya Sharma</option><option>Amit Kumar</option>
                </select>
              </div>
            </div>
            <div style={{ padding: '14px 22px', borderTop: '1px solid #f3f4f6', background: '#f3f4f6', display: 'flex', justifyContent: 'flex-end', gap: 10, borderRadius: '0 0 14px 14px' }}>
              <button onClick={onUmCloseAlloc} style={btnGhost}>Cancel</button>
              <button onClick={onUmSaveAlloc} style={btnPrimary}>Save</button>
            </div>
          </div>
        </ModalOverlay>
      )}

      {state.umLogOpen && (
        <SidePanel title="Activity Log" subtitle={logUser ? `${logUser.name} · ${logUser.email}` : '—'} onClose={onUmCloseLog}>
          <LogList items={logItems} />
        </SidePanel>
      )}
    </>
  );
}
