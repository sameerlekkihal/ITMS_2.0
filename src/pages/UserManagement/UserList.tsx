import { useAppStore } from '../../store/AppStore';
import { AV_COLORS, ROLE_STYLE, ADDED_BY } from '../../data/mockData';
import { maskEmail, maskMobile } from '../../utils/mask';

const thStyle: React.CSSProperties = { textAlign: 'left', padding: '11px 14px', fontSize: 11, fontWeight: 600, color: '#9ca3af', letterSpacing: .5, textTransform: 'uppercase' };
const tdStyle: React.CSSProperties = { padding: '13px 14px', fontSize: 13, borderBottom: '1px solid #f3f4f6' };
const iconBtnStyle: React.CSSProperties = { width: 28, height: 28, borderRadius: 7, border: '1.5px solid #e5e7eb', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 13 };

export function UserList() {
  const {
    state, umFilteredUsers, onUmAddUser, onUmToggleStatus, onUmOpenPerms,
    onUmOpenEdit, onUmOpenDelete, onUmOpenAlloc, onUmOpenLog, onUmChangePage, onUmGoPage, update, showToast,
  } = useAppStore();

  const filtered = umFilteredUsers();
  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / state.umPerPage));
  const start = (state.umPage - 1) * state.umPerPage;
  const slice = filtered.slice(start, start + state.umPerPage);

  const typeRadios = ['', 'ITMS', 'POS', 'LMS'];

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 22 }}>
        <div><h2 style={{ fontSize: 20, fontWeight: 700 }}>User Management</h2><p style={{ fontSize: 13, color: '#9ca3af', marginTop: 3 }}>Manage platform users, permissions and team allocations</p></div>
        <button onClick={onUmAddUser} style={{ padding: '10px 18px', background: '#e8192c', color: '#fff', border: 'none', borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>＋ Add User</button>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 14, boxShadow: '0 1px 3px rgba(0,0,0,.07)', border: '1.5px solid #e5e7eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1.5px solid #e5e7eb', borderRadius: 9, padding: '8px 12px', color: '#9ca3af', flex: 1, maxWidth: 480 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input type="text" value={state.umSearch} onChange={e => update({ umSearch: e.target.value, umPage: 1 })} placeholder="Search by name, email, mobile…" style={{ border: 'none', outline: 'none', fontSize: 13, width: '100%', color: '#0f1115', background: 'transparent' }} />
          </div>
          <select value={state.umStatus} onChange={e => update({ umStatus: e.target.value, umPage: 1 })} style={{ border: '1.5px solid #e5e7eb', borderRadius: 9, padding: '8px 12px', fontSize: 13, color: '#0f1115', outline: 'none', cursor: 'pointer', background: '#fff' }}>
            <option value="">All users</option><option value="active">Active users</option><option value="inactive">Inactive users</option>
          </select>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 3, background: '#f3f4f6', borderRadius: 9, padding: 3 }}>
            {typeRadios.map(t => (
              <div key={t || 'all'} onClick={() => update({ umType: t, umPage: 1 })} style={{ padding: '6px 14px', borderRadius: 7, fontSize: 12, fontWeight: 500, cursor: 'pointer', color: state.umType === t ? '#e8192c' : '#9ca3af', background: state.umType === t ? '#fff' : 'transparent', boxShadow: state.umType === t ? '0 1px 4px rgba(0,0,0,.09)' : 'none' }}>{t || 'All'}</div>
            ))}
          </div>
          <span style={{ fontSize: 12, color: '#9ca3af', paddingLeft: 4, borderLeft: '1px solid #e5e7eb', marginLeft: 4 }}>{total} user{total !== 1 ? 's' : ''}</span>
          <button onClick={() => showToast('CSV export started')} style={{ padding: '10px 18px', background: '#fff', color: '#0f1115', border: '1.5px solid #e5e7eb', borderRadius: 9, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>⬇ Export</button>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,.07)', border: '1.5px solid #e5e7eb', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ background: '#f3f4f6' }}>
            <th style={thStyle}>User</th><th style={thStyle}>Username</th><th style={thStyle}>Role</th>
            <th style={thStyle}>Mobile</th><th style={thStyle}>Added Date</th><th style={thStyle}>Added By</th>
            <th style={thStyle}>Status</th><th style={thStyle}>Actions</th>
          </tr></thead>
          <tbody>
            {slice.length === 0 && <tr><td colSpan={8} style={{ textAlign: 'center', padding: 40, color: '#9ca3af', fontSize: 14 }}>No users match your search or filters.</td></tr>}
            {slice.map(u => {
              const rc = ROLE_STYLE[u.role] || ROLE_STYLE.Agent;
              const addedBy = ADDED_BY[(u.id - 1) % ADDED_BY.length].split(' · ');
              return (
                <tr key={u.id}>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0, background: AV_COLORS[(u.id - 1) % AV_COLORS.length] }}>{u.name.charAt(0)}</div>
                      <div><div style={{ fontWeight: 600, fontSize: 13 }}>{u.name}</div><div style={{ fontSize: 11, color: '#9ca3af', marginTop: 1 }}>{maskEmail(u.email)}</div></div>
                    </div>
                  </td>
                  <td style={{ ...tdStyle, color: '#9ca3af', fontSize: 12 }}>{u.email.split('@')[0]}</td>
                  <td style={tdStyle}><span style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: rc.bg, color: rc.color }}>{u.role}</span></td>
                  <td style={{ ...tdStyle, color: '#9ca3af', fontSize: 12 }}>{maskMobile(u.mobile)}</td>
                  <td style={{ ...tdStyle, color: '#9ca3af', fontSize: 12 }}>{u.added}</td>
                  <td style={tdStyle}>
                    <div style={{ fontSize: 12, fontWeight: 500, color: '#0f1115' }}>{addedBy[1] || addedBy[0]}</div>
                    <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 1 }}>{addedBy[0]}</div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <label style={{ position: 'relative', width: 40, height: 22, flexShrink: 0, display: 'inline-block' }}>
                        <input type="checkbox" checked={u.active} onChange={() => onUmToggleStatus(u.id)} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
                        <span style={{ position: 'absolute', inset: 0, borderRadius: 22, background: u.active ? '#00b896' : '#d1d5db', cursor: 'pointer' }} onClick={() => onUmToggleStatus(u.id)} />
                        <span style={{ position: 'absolute', width: 16, height: 16, borderRadius: '50%', background: '#fff', top: 3, left: u.active ? 21 : 3, boxShadow: '0 1px 3px rgba(0,0,0,.2)', transition: 'left .2s', pointerEvents: 'none' }} />
                      </label>
                      <span style={{ fontSize: 11, fontWeight: 600, color: u.active ? '#00b896' : '#9ca3af' }}>{u.active ? 'Active' : 'Inactive'}</span>
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                      <div onClick={() => onUmOpenPerms(u.id, 12)} title="Permissions" style={iconBtnStyle}>🔑</div>
                      <div onClick={() => onUmOpenEdit(u.id)} title="Edit" style={iconBtnStyle}>✏️</div>
                      <div onClick={() => onUmOpenDelete(u.id)} title="Delete" style={iconBtnStyle}>🗑️</div>
                      <div onClick={() => onUmOpenAlloc(u.id)} title="Team Allocation" style={iconBtnStyle}>🏷️</div>
                      <div onClick={() => onUmOpenLog(u.id)} title="Activity Log" style={iconBtnStyle}>📋</div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderTop: '1px solid #f3f4f6' }}>
          <span style={{ fontSize: 12, color: '#9ca3af' }}>Showing {Math.min(start + 1, total)}–{Math.min(start + state.umPerPage, total)} of {total} users</span>
          <div style={{ display: 'flex', gap: 4 }}>
            <div onClick={() => onUmChangePage(-1)} style={iconBtnStyle}>‹</div>
            {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
              <div key={p} onClick={() => onUmGoPage(p)} style={{ ...iconBtnStyle, width: 30, height: 30, background: p === state.umPage ? '#e8192c' : '#fff', color: p === state.umPage ? '#fff' : '#0f1115', fontWeight: 500 }}>{p}</div>
            ))}
            <div onClick={() => onUmChangePage(1)} style={iconBtnStyle}>›</div>
          </div>
        </div>
      </div>
    </>
  );
}
