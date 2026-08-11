import { useAppStore } from '../../store/AppStore';
import { CU_STATUS_STYLE } from '../../data/mockData';

const thStyle: React.CSSProperties = { textAlign: 'left', padding: '11px 14px', fontSize: 11, fontWeight: 600, color: '#9ca3af', letterSpacing: .5, textTransform: 'uppercase' };
const tdStyle: React.CSSProperties = { padding: '13px 14px', fontSize: 13, borderBottom: '1px solid #f3f4f6' };
const iconBtnStyle: React.CSSProperties = { width: 28, height: 28, borderRadius: 7, border: '1.5px solid #e5e7eb', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 13 };

export function RequestList() {
  const { state, cuFilteredRequests, setCuPersona, onCuNewRequest, onCuOpenReview, onCuOpenLog, update } = useAppStore();
  const isL1 = state.cuPersona === 'L1';
  const rows = cuFilteredRequests();
  const pending = state.cuRequests.filter(r => r.status === 'Pending with L2').length;
  const created = state.cuRequests.filter(r => r.status === 'User Created').length;
  const rejected = state.cuRequests.filter(r => r.status === 'Rejected').length;

  const stats = [
    { label: 'Pending with L2', value: pending, color: '#92400e', bg: '#fef3c7' },
    { label: 'Users created', value: created, color: '#166534', bg: '#dcfce7' },
    { label: 'Rejected', value: rejected, color: '#991b1b', bg: '#fee2e2' },
  ];

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>Create ITMS User</h2>
          <p style={{ fontSize: 13, color: '#9ca3af', marginTop: 3 }}>Raise and process new user requests inside ITMS — no email trail required</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', gap: 3, background: '#f3f4f6', borderRadius: 9, padding: 3 }}>
            {(['L1', 'L2'] as const).map(p => (
              <div key={p} onClick={() => setCuPersona(p)} title={p === 'L1' ? 'Requester' : 'ITMS Admin'} style={{ padding: '6px 14px', borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: 'pointer', color: state.cuPersona === p ? '#e8192c' : '#9ca3af', background: state.cuPersona === p ? '#fff' : 'transparent', boxShadow: state.cuPersona === p ? '0 1px 4px rgba(0,0,0,.09)' : 'none' }}>
                {p === 'L1' ? 'L1 · Requester' : 'L2 · ITMS Admin'}
              </div>
            ))}
          </div>
          {isL1 && <button onClick={onCuNewRequest} style={{ padding: '10px 18px', background: '#e8192c', color: '#fff', border: 'none', borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>＋ Raise Request</button>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 16 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: '#fff', borderRadius: 12, border: '1.5px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,.07)', padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', letterSpacing: .4, textTransform: 'uppercase' }}>{s.label}</div>
              <div style={{ fontSize: 24, fontWeight: 700, marginTop: 5 }}>{s.value}</div>
            </div>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: s.bg, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 14, boxShadow: '0 1px 3px rgba(0,0,0,.07)', border: '1.5px solid #e5e7eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1.5px solid #e5e7eb', borderRadius: 9, padding: '8px 12px', color: '#9ca3af', flex: 1, maxWidth: 460 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input value={state.cuSearch} onChange={e => update({ cuSearch: e.target.value })} placeholder="Search request ID, employee code, email…" style={{ border: 'none', outline: 'none', fontSize: 13, width: '100%', color: '#0f1115', background: 'transparent' }} />
        </div>
        <select value={state.cuStatus} onChange={e => update({ cuStatus: e.target.value })} style={{ border: '1.5px solid #e5e7eb', borderRadius: 9, padding: '8px 12px', fontSize: 13, color: '#0f1115', outline: 'none', cursor: 'pointer', background: '#fff' }}>
          <option value="">All statuses</option>
          <option value="Pending with L2">Pending with L2</option>
          <option value="User Created">User Created</option>
          <option value="Rejected">Rejected</option>
        </select>
        <span style={{ fontSize: 12, color: '#9ca3af', marginLeft: 'auto' }}>{rows.length} request{rows.length !== 1 ? 's' : ''}</span>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,.07)', border: '1.5px solid #e5e7eb', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ background: '#f3f4f6' }}>
            <th style={thStyle}>Request</th><th style={thStyle}>Employee</th><th style={thStyle}>Mobile</th>
            <th style={thStyle}>Role Requested</th><th style={thStyle}>Raised By</th><th style={thStyle}>Status</th><th style={thStyle}>Actions</th>
          </tr></thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan={7} style={{ textAlign: 'center', padding: 40, color: '#9ca3af', fontSize: 14 }}>No requests match your search or filters.</td></tr>}
            {rows.map(r => {
              const sc = CU_STATUS_STYLE[r.status];
              const pendingRow = r.status === 'Pending with L2';
              return (
                <tr key={r.id}>
                  <td style={tdStyle}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{r.id}</div>
                    <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 1 }}>{r.raisedAt}</div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{r.empCode}</div>
                    <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 1 }}>{r.email}</div>
                  </td>
                  <td style={{ ...tdStyle, color: '#9ca3af', fontSize: 12 }}>{r.mobile}</td>
                  <td style={tdStyle}>
                    {r.roleMode === 'role' ? (
                      <span style={{ fontSize: 12.5, fontWeight: 500 }}>{r.role}</span>
                    ) : (
                      <>
                        <span style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 9px', borderRadius: 20, fontSize: 10.5, fontWeight: 600, background: '#ede9fe', color: '#5b21b6' }}>Equivalent user</span>
                        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 3 }}>{r.equivalentEmail}</div>
                      </>
                    )}
                  </td>
                  <td style={{ ...tdStyle, fontSize: 12 }}>{r.raisedBy}</td>
                  <td style={tdStyle}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: sc.bg, color: sc.color }}>{r.status}</span>
                    {r.status === 'Rejected' && r.rejectReason && <div style={{ fontSize: 10.5, color: '#9ca3af', marginTop: 3 }}>{r.rejectReason}</div>}
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      {!isL1 && pendingRow ? (
                        <button onClick={() => onCuOpenReview(r.id)} style={{ padding: '7px 12px', background: '#e8192c', color: '#fff', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Review &amp; Create</button>
                      ) : (
                        <button onClick={() => onCuOpenReview(r.id)} style={{ padding: '7px 12px', background: '#fff', color: '#0f1115', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>View</button>
                      )}
                      <div onClick={() => onCuOpenLog(r.id)} title="Activity log" style={iconBtnStyle}>📋</div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 14, fontSize: 12, color: '#9ca3af' }}>
        {isL1
          ? 'As L1 you raise the request. It moves to the L2 queue (ITMS Admin) for configuration and account creation.'
          : 'As L2 you preview each request, configure the account and create the user. Requester and new user are emailed automatically.'}
      </div>
    </>
  );
}
