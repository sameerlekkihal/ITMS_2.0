import { useAppStore } from '../../store/AppStore';

const thStyle: React.CSSProperties = { textAlign: 'left', padding: '11px 14px', fontSize: 11, fontWeight: 600, color: '#9ca3af', letterSpacing: .5, textTransform: 'uppercase' };
const tdStyle: React.CSSProperties = { padding: '13px 14px', fontSize: 13, borderBottom: '1px solid #f3f4f6' };
const iconBtnStyle: React.CSSProperties = { width: 28, height: 28, borderRadius: 7, border: '1.5px solid #e5e7eb', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 13 };

export function RoleList() {
  const {
    state, rmFilteredRoles, onRmAddRole, onRmToggleStatus, onRmToggleAuto, onRmOpenPerms,
    onRmOpenEdit, onRmOpenLog, onRmOpenUsers, onRmChangePage, onRmGoPage, update, showToast,
  } = useAppStore();

  const filtered = rmFilteredRoles();
  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / state.rmPerPage));
  const start = (state.rmPage - 1) * state.rmPerPage;
  const slice = filtered.slice(start, start + state.rmPerPage);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 22 }}>
        <div><h2 style={{ fontSize: 20, fontWeight: 700 }}>Role Management</h2><p style={{ fontSize: 13, color: '#9ca3af', marginTop: 3 }}>Define roles, set granular permissions and control access hierarchy</p></div>
        <button onClick={onRmAddRole} style={{ padding: '10px 18px', background: '#e8192c', color: '#fff', border: 'none', borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>＋ Add Role</button>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 14, boxShadow: '0 1px 3px rgba(0,0,0,.07)', border: '1.5px solid #e5e7eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1.5px solid #e5e7eb', borderRadius: 9, padding: '8px 12px', color: '#9ca3af', flex: 1, maxWidth: 480 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input type="text" value={state.rmSearch} onChange={e => update({ rmSearch: e.target.value, rmPage: 1 })} placeholder="Search by role, ticket, product…" style={{ border: 'none', outline: 'none', fontSize: 13, width: '100%', color: '#0f1115', background: 'transparent' }} />
          </div>
          <select value={state.rmStatus} onChange={e => update({ rmStatus: e.target.value, rmPage: 1 })} style={{ border: '1.5px solid #e5e7eb', borderRadius: 9, padding: '8px 12px', fontSize: 13, color: '#0f1115', outline: 'none', cursor: 'pointer', background: '#fff' }}>
            <option value="">All Status</option><option value="active">Active</option><option value="inactive">Inactive</option>
          </select>
        </div>
        <button onClick={() => showToast('CSV export started')} style={{ padding: '10px 18px', background: '#fff', color: '#0f1115', border: '1.5px solid #e5e7eb', borderRadius: 9, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>⬇ Export</button>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,.07)', border: '1.5px solid #e5e7eb', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ background: '#f3f4f6' }}>
            <th style={thStyle}>Role Name</th><th style={thStyle}>Product</th><th style={thStyle}>Ticket Type</th>
            <th style={thStyle}>Added By</th><th style={thStyle}>Added Date</th><th style={thStyle}>Status</th>
            <th style={thStyle}>Auto Logout</th><th style={thStyle}>Actions</th>
          </tr></thead>
          <tbody>
            {slice.length === 0 && <tr><td colSpan={8} style={{ textAlign: 'center', padding: 40, color: '#9ca3af', fontSize: 14 }}>No roles match your search or filters.</td></tr>}
            {slice.map(r => (
              <tr key={r.id}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{r.name}</td>
                <td style={{ ...tdStyle, fontSize: 12, color: '#4b5563' }}>{r.product}</td>
                <td style={{ ...tdStyle, fontSize: 12 }}><span style={{ padding: '3px 9px', borderRadius: 20, background: '#f3f4f6', color: '#4b5563' }}>{r.ticket}</span></td>
                <td style={{ ...tdStyle, fontSize: 12, color: '#9ca3af' }}>{r.addedBy}</td>
                <td style={{ ...tdStyle, fontSize: 12, color: '#9ca3af' }}>{r.added}</td>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <label style={{ position: 'relative', width: 40, height: 22, flexShrink: 0, display: 'inline-block' }}>
                      <input type="checkbox" checked={r.active} onChange={() => onRmToggleStatus(r.id)} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
                      <span onClick={() => onRmToggleStatus(r.id)} style={{ position: 'absolute', inset: 0, borderRadius: 22, background: r.active ? '#00b896' : '#d1d5db', cursor: 'pointer' }} />
                      <span style={{ position: 'absolute', width: 16, height: 16, borderRadius: '50%', background: '#fff', top: 3, left: r.active ? 21 : 3, boxShadow: '0 1px 3px rgba(0,0,0,.2)', transition: 'left .2s', pointerEvents: 'none' }} />
                    </label>
                    <span style={{ fontSize: 11, fontWeight: 600, color: r.active ? '#00b896' : '#9ca3af' }}>{r.active ? 'Active' : 'Inactive'}</span>
                  </div>
                </td>
                <td style={tdStyle}>
                  <label style={{ position: 'relative', width: 40, height: 22, flexShrink: 0, display: 'inline-block' }}>
                    <input type="checkbox" checked={r.autoLogout} onChange={() => onRmToggleAuto(r.id)} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
                    <span onClick={() => onRmToggleAuto(r.id)} style={{ position: 'absolute', inset: 0, borderRadius: 22, background: r.autoLogout ? '#00b896' : '#d1d5db', cursor: 'pointer' }} />
                    <span style={{ position: 'absolute', width: 16, height: 16, borderRadius: '50%', background: '#fff', top: 3, left: r.autoLogout ? 21 : 3, boxShadow: '0 1px 3px rgba(0,0,0,.2)', transition: 'left .2s', pointerEvents: 'none' }} />
                  </label>
                </td>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                    <div onClick={() => onRmOpenPerms(r.id)} title="Permissions" style={iconBtnStyle}>🔑</div>
                    <div onClick={() => onRmOpenEdit(r.id)} title="Edit" style={iconBtnStyle}>✏️</div>
                    <div onClick={() => onRmOpenLog(r.id)} title="Activity Log" style={iconBtnStyle}>📋</div>
                    <div onClick={() => onRmOpenUsers(r.id)} title="Tagged Users" style={iconBtnStyle}>👥</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderTop: '1px solid #f3f4f6' }}>
          <span style={{ fontSize: 12, color: '#9ca3af' }}>Showing {Math.min(start + 1, total)}–{Math.min(start + state.rmPerPage, total)} of {total} roles</span>
          <div style={{ display: 'flex', gap: 4 }}>
            <div onClick={() => onRmChangePage(-1)} style={iconBtnStyle}>‹</div>
            {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
              <div key={p} onClick={() => onRmGoPage(p)} style={{ ...iconBtnStyle, width: 30, height: 30, background: p === state.rmPage ? '#e8192c' : '#fff', color: p === state.rmPage ? '#fff' : '#0f1115', fontWeight: 500 }}>{p}</div>
            ))}
            <div onClick={() => onRmChangePage(1)} style={iconBtnStyle}>›</div>
          </div>
        </div>
      </div>
    </>
  );
}
