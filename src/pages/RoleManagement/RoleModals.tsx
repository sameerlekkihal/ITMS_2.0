import { useAppStore } from '../../store/AppStore';
import { ModalOverlay, SidePanel, LogList } from '../../components/ModalShell';
import { RM_PERM_MODULES, ROLE_STYLE, AV_COLORS, LOG_ICONS, LOG_DOT_BG } from '../../data/mockData';
import { maskEmail } from '../../utils/mask';

const btnGhost: React.CSSProperties = { padding: '10px 18px', background: '#fff', color: '#0f1115', border: '1.5px solid #e5e7eb', borderRadius: 9, fontSize: 13, fontWeight: 500, cursor: 'pointer' };
const btnPrimary: React.CSSProperties = { padding: '10px 18px', background: '#e8192c', color: '#fff', border: 'none', borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: 'pointer' };

export function RoleModals() {
  const {
    state, onRmClosePerms, onRmTogglePermItem, onRmSavePerms, onRmCloseUsers, update, onRmCloseLog,
  } = useAppStore();

  const permsRole = state.rmPermsRoleId ? state.rmRoles.find(r => r.id === state.rmPermsRoleId) : null;
  const usersRole = state.rmUserRoleId ? state.rmRoles.find(r => r.id === state.rmUserRoleId) : null;
  const logRole = state.rmLogRoleId ? state.rmRoles.find(r => r.id === state.rmLogRoleId) : null;

  const pool = state.rmUserRoleId ? state.umUsers.filter((_u, i) => (state.rmUserRoleId! % 4) === (i % 4)) : [];
  const activeUsers = pool.filter(u => u.active);
  const inactiveUsers = pool.filter(u => !u.active);
  const usersList = (state.rmUserTab === 'active' ? activeUsers : inactiveUsers).map(u => {
    const rc = ROLE_STYLE[u.role] || ROLE_STYLE.Agent;
    return { key: u.id, name: u.name, email: maskEmail(u.email), initial: u.name.charAt(0), avColor: AV_COLORS[(u.id - 1) % AV_COLORS.length], role: u.role, roleBg: rc.bg, roleColor: rc.color };
  });

  const logItems = logRole ? [
    { type: 'create', action: 'Role created', by: 'Jijo John', time: `${logRole.added}, 09:15 AM` },
    { type: 'perm', action: 'Permissions updated — Claims Access added', by: 'Jijo John', time: '2026-01-10, 03:22 PM' },
    { type: 'edit', action: 'Ticket type changed to ' + logRole.ticket, by: 'Priya Nair', time: '2026-02-14, 11:05 AM' },
    { type: 'toggle', action: `Role ${logRole.active ? 'activated' : 'deactivated'}`, by: 'Jijo John', time: '2026-03-01, 10:00 AM' },
  ].map(l => ({ ...l, icon: LOG_ICONS[l.type], bg: LOG_DOT_BG[l.type] })) : [];

  return (
    <>
      {state.rmPermsOpen && (
        <ModalOverlay align="top">
          <div style={{ background: '#fff', borderRadius: 14, width: 760, maxWidth: '98vw', margin: 'auto', animation: 'modalIn .3s cubic-bezier(.34,1.4,.64,1)' }}>
            <div style={{ padding: '20px 22px 16px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div><div style={{ fontSize: 16, fontWeight: 700 }}>Role Permissions</div><div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{permsRole ? `${permsRole.name} · ${permsRole.ticket}` : '—'}</div></div>
              <button onClick={onRmClosePerms} style={{ width: 30, height: 30, borderRadius: 7, border: '1.5px solid #e5e7eb', background: '#fff', cursor: 'pointer', fontSize: 18, color: '#9ca3af' }}>×</button>
            </div>
            <div style={{ padding: '20px 22px', maxHeight: '60vh', overflowY: 'auto' }}>
              {RM_PERM_MODULES.map(mod => (
                <div key={mod.section} style={{ marginBottom: 20 }}>
                  <div style={{ padding: '10px 14px', background: '#0f1115', borderRadius: '9px 9px 0 0', fontSize: 12, fontWeight: 700, color: '#fff', letterSpacing: .3, textTransform: 'uppercase' }}>{mod.section}</div>
                  <div style={{ border: '1.5px solid #e5e7eb', borderTop: 'none', borderRadius: '0 0 9px 9px', overflow: 'hidden' }}>
                    {mod.items.map((name, i) => {
                      const key = mod.section + '|' + name;
                      const on = state.rmPermsChecked[key] !== undefined ? state.rmPermsChecked[key] : i % 3 === 0;
                      return (
                        <div key={name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 14px', borderBottom: '1px solid #f3f4f6', fontSize: 13 }}>
                          <span style={{ fontWeight: 500 }}>{name}</span>
                          <div onClick={() => onRmTogglePermItem(key)} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                            <input type="checkbox" checked={on} onChange={() => onRmTogglePermItem(key)} style={{ accentColor: '#e8192c', width: 15, height: 15 }} />
                            <span style={{ fontSize: 11, color: '#9ca3af' }}>Enabled</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: '14px 22px', borderTop: '1px solid #f3f4f6', background: '#f3f4f6', display: 'flex', justifyContent: 'flex-end', gap: 10, borderRadius: '0 0 14px 14px' }}>
              <button onClick={onRmClosePerms} style={btnGhost}>Cancel</button>
              <button onClick={onRmSavePerms} style={btnPrimary}>Save Permissions</button>
            </div>
          </div>
        </ModalOverlay>
      )}

      {state.rmUsersOpen && (
        <ModalOverlay>
          <div style={{ background: '#fff', borderRadius: 14, width: 620, maxWidth: '95vw', animation: 'modalIn .3s cubic-bezier(.34,1.4,.64,1)' }}>
            <div style={{ padding: '20px 22px 16px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div><div style={{ fontSize: 16, fontWeight: 700 }}>Users in Role</div><div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{usersRole ? usersRole.name : '—'}</div></div>
              <button onClick={onRmCloseUsers} style={{ width: 30, height: 30, borderRadius: 7, border: '1.5px solid #e5e7eb', background: '#fff', cursor: 'pointer', fontSize: 18, color: '#9ca3af' }}>×</button>
            </div>
            <div style={{ padding: '16px 22px 0' }}>
              <div style={{ display: 'flex', borderBottom: '2px solid #e5e7eb' }}>
                <div onClick={() => update({ rmUserTab: 'active' })} style={{ padding: '9px 18px', fontSize: 13, fontWeight: 500, cursor: 'pointer', color: state.rmUserTab === 'active' ? '#e8192c' : '#9ca3af', borderBottom: `2px solid ${state.rmUserTab === 'active' ? '#e8192c' : 'transparent'}`, marginBottom: -2 }}>Active Users <span style={{ background: '#e6faf6', color: '#00b896', fontSize: 10, fontWeight: 700, padding: '1px 7px', borderRadius: 20 }}>{activeUsers.length}</span></div>
                <div onClick={() => update({ rmUserTab: 'inactive' })} style={{ padding: '9px 18px', fontSize: 13, fontWeight: 500, cursor: 'pointer', color: state.rmUserTab === 'inactive' ? '#e8192c' : '#9ca3af', borderBottom: `2px solid ${state.rmUserTab === 'inactive' ? '#e8192c' : 'transparent'}`, marginBottom: -2 }}>Inactive Users <span style={{ background: '#fff0f1', color: '#e8192c', fontSize: 10, fontWeight: 700, padding: '1px 7px', borderRadius: 20 }}>{inactiveUsers.length}</span></div>
              </div>
            </div>
            <div style={{ padding: '16px 22px', maxHeight: 380, overflowY: 'auto' }}>
              {usersList.length === 0 && <div style={{ textAlign: 'center', padding: 32, color: '#9ca3af', fontSize: 13 }}>No users found for this role.</div>}
              {usersList.map(u => (
                <div key={u.key} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: '1px solid #f3f4f6' }}>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', background: u.avColor }}>{u.initial}</div>
                  <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600 }}>{u.name}</div><div style={{ fontSize: 11, color: '#9ca3af' }}>{u.email}</div></div>
                  <span style={{ fontSize: 10, padding: '3px 10px', borderRadius: 20, background: u.roleBg, color: u.roleColor, fontWeight: 600 }}>{u.role}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: '14px 22px', borderTop: '1px solid #f3f4f6', background: '#f3f4f6', display: 'flex', justifyContent: 'flex-end', borderRadius: '0 0 14px 14px' }}>
              <button onClick={onRmCloseUsers} style={btnGhost}>Close</button>
            </div>
          </div>
        </ModalOverlay>
      )}

      {state.rmLogOpen && (
        <SidePanel title="Role Activity Log" subtitle={logRole ? logRole.name : '—'} onClose={onRmCloseLog}>
          <LogList items={logItems} />
        </SidePanel>
      )}
    </>
  );
}
