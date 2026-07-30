import { useAppStore } from '../../store/AppStore';
import { IP_LOGINS, IP_STATUS_STYLE, IP_INSURERS, IP_STATUSES } from '../../data/mockData';
import { InsurerModals } from './InsurerModals';

const thStyle: React.CSSProperties = { textAlign: 'left', padding: '11px 14px', fontSize: 11, fontWeight: 600, color: '#9ca3af', letterSpacing: .5, textTransform: 'uppercase' };
const tdStyle: React.CSSProperties = { padding: '13px 14px', fontSize: 12, borderBottom: '1px solid #f3f4f6' };
const labelStyle: React.CSSProperties = { fontSize: 11, fontWeight: 600, color: '#9ca3af', letterSpacing: .3, textTransform: 'uppercase', marginBottom: 5 };
const fieldStyle: React.CSSProperties = { width: '100%', padding: '8px 11px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 13, color: '#0f1115', outline: 'none', background: '#fff' };
const tabStyle = (active: boolean): React.CSSProperties => ({ flex: 1, textAlign: 'center', padding: '13px 10px', fontSize: 13, fontWeight: active ? 600 : 500, color: active ? '#fff' : '#9ca3af', cursor: 'pointer', borderRight: '1px solid #e5e7eb', background: active ? '#0f1115' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 });

export function InsurerPortal() {
  const {
    state, setIpTab, ipFilteredUsers, onIpFilterField, onIpFilterUsers, onIpResetFilters,
    onIpApproverChange, onIpApproverAdd, onIpApproverRemove, onIpSaveApprovers, onIpOpenDetail, onIpOpenUpload,
  } = useAppStore();

  const filteredUsers = ipFilteredUsers();

  return (
    <div style={{ animation: 'pageIn .4s ease forwards' }}>
      <div style={{ marginBottom: 20 }}><h2 style={{ fontSize: 20, fontWeight: 700 }}>Insurer Portal</h2><p style={{ fontSize: 13, color: '#9ca3af', marginTop: 3 }}>Manage approvers, user access requests and login credentials</p></div>

      <div style={{ display: 'flex', background: '#fff', borderRadius: 12, border: '1.5px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,.07)', overflow: 'hidden', marginBottom: 20 }}>
        <div onClick={() => setIpTab('approver')} style={tabStyle(state.ipTab === 'approver')}>⚙️ Add Approver</div>
        <div onClick={() => setIpTab('users')} style={tabStyle(state.ipTab === 'users')}>📋 User Listing</div>
        <div onClick={() => setIpTab('logins')} style={{ ...tabStyle(state.ipTab === 'logins'), borderRight: 'none' }}>🔑 Login Listing</div>
      </div>

      {state.ipTab === 'approver' && (
        <div style={{ background: '#fff', borderRadius: 12, border: '1.5px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,.07)', padding: 28, maxWidth: 700 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid #f3f4f6' }}>Configure Approval Hierarchy</h3>
          {state.ipApprovers.map((ap, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 0', borderBottom: '1px solid #f3f4f6' }}>
              <div style={{ width: 110, fontSize: 14, fontWeight: 600, color: '#0f1115', flexShrink: 0 }}>{ap.label}</div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', border: '1.5px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
                <input value={ap.value} onChange={e => onIpApproverChange(i, e.target.value)} style={{ flex: 1, padding: '10px 13px', border: 'none', outline: 'none', fontSize: 13, color: '#0f1115' }} />
                <button onClick={() => onIpApproverRemove(i)} title="Remove" style={{ width: 36, height: 36, border: 'none', background: '#f3f4f6', fontSize: 16, cursor: 'pointer', flexShrink: 0, borderLeft: '1px solid #e5e7eb', color: '#e8192c' }}>−</button>
                <button onClick={() => onIpApproverAdd(i)} title="Add" style={{ width: 36, height: 36, border: 'none', background: '#f3f4f6', fontSize: 16, cursor: 'pointer', flexShrink: 0, borderLeft: '1px solid #e5e7eb', color: '#00b896' }}>+</button>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #f3f4f6' }}>
            <button onClick={onIpSaveApprovers} style={{ padding: '9px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none', background: '#00b896', color: '#fff' }}>Save</button>
          </div>
        </div>
      )}

      {state.ipTab === 'users' && (
        <>
          <div style={{ background: '#fff', borderRadius: 12, border: '1.5px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,.07)', padding: '16px 18px', marginBottom: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 12 }}>
              <div><div style={labelStyle}>Request ID</div><input value={state.ipFilters.reqid} onChange={e => onIpFilterField('reqid', e.target.value)} placeholder="Enter Request ID" style={fieldStyle} /></div>
              <div><div style={labelStyle}>Insurer</div>
                <select value={state.ipFilters.insurer} onChange={e => onIpFilterField('insurer', e.target.value)} style={fieldStyle}>
                  <option value="">Select Insurer</option>{IP_INSURERS.map(i => <option key={i}>{i}</option>)}
                </select>
              </div>
              <div><div style={labelStyle}>GCD/GID Code</div><input value={state.ipFilters.gcd} onChange={e => onIpFilterField('gcd', e.target.value)} placeholder="Enter GCD/GID Code" style={fieldStyle} /></div>
              <div><div style={labelStyle}>Status</div>
                <select value={state.ipFilters.status} onChange={e => onIpFilterField('status', e.target.value)} style={fieldStyle}>
                  <option value="">All Status</option>{IP_STATUSES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button onClick={onIpFilterUsers} style={{ padding: '9px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none', background: '#e8192c', color: '#fff' }}>Search</button>
              <button onClick={onIpResetFilters} style={{ padding: '9px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', background: '#fff', border: '1.5px solid #e5e7eb', color: '#0f1115' }}>Reset</button>
              <span style={{ marginLeft: 'auto', fontSize: 12, color: '#9ca3af' }}>Showing {filteredUsers.length} records</span>
            </div>
          </div>

          <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,.07)', border: '1.5px solid #e5e7eb', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr style={{ background: '#f3f4f6' }}>
                <th style={thStyle}>Request ID</th><th style={thStyle}>Insurer</th><th style={thStyle}>Operated By</th>
                <th style={thStyle}>GCD/GID Code</th><th style={thStyle}>Last Action Date</th><th style={thStyle}>Status</th><th style={thStyle}>Action</th>
              </tr></thead>
              <tbody>
                {filteredUsers.length === 0 && <tr><td colSpan={7} style={{ textAlign: 'center', padding: 40, color: '#9ca3af' }}>No records match your filters.</td></tr>}
                {filteredUsers.map(u => {
                  const st = IP_STATUS_STYLE[u.status] || { bg: '#f3f4f6', color: '#374151' };
                  return (
                    <tr key={u.id}>
                      <td style={{ ...tdStyle, fontWeight: 600 }}>{u.id}</td>
                      <td style={tdStyle}>{u.insurer}</td>
                      <td style={tdStyle}>{u.opBy}</td>
                      <td style={tdStyle}>{u.gcd}</td>
                      <td style={{ ...tdStyle, fontSize: 11, color: '#9ca3af' }}>{u.date}</td>
                      <td style={{ ...tdStyle, fontSize: 13 }}><span style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: st.bg, color: st.color }}>{u.status}</span></td>
                      <td style={{ ...tdStyle, fontSize: 13 }}>
                        <div onClick={() => onIpOpenDetail(u.id)} title="View Details" style={{ width: 28, height: 28, borderRadius: 7, border: '1.5px solid #e5e7eb', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 13 }}>👁</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {state.ipTab === 'logins' && (
        <>
          <div style={{ background: '#fff', borderRadius: 12, border: '1.5px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,.07)', padding: '16px 18px', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Search Login Credentials Data</span>
              <button onClick={onIpOpenUpload} style={{ padding: '9px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none', background: '#00b896', color: '#fff' }}>＋ Upload Login Credentials</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
              <div><div style={labelStyle}>Ticket ID</div><input placeholder="Enter Ticket ID" style={fieldStyle} /></div>
              <div><div style={labelStyle}>Insurer</div><select style={fieldStyle}><option value="">Select Insurer</option><option>United India Insurance</option><option>HDFC Ergo</option></select></div>
              <div><div style={labelStyle}>GCD/GID Code</div><input placeholder="Enter GCD/GID Code" style={fieldStyle} /></div>
              <div><div style={labelStyle}>Status</div><select style={fieldStyle}><option value="">Select Status</option><option>Mapped</option><option>Unmapped</option></select></div>
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,.07)', border: '1.5px solid #e5e7eb', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr style={{ background: '#f3f4f6' }}>
                <th style={thStyle}>ID</th><th style={thStyle}>Login ID</th><th style={thStyle}>Insurer</th>
                <th style={thStyle}>Status</th><th style={thStyle}>IMD Code</th><th style={thStyle}>GCD Code</th>
              </tr></thead>
              <tbody>
                {IP_LOGINS.map(l => {
                  const st = IP_STATUS_STYLE[l.status] || { bg: '#f3f4f6', color: '#374151' };
                  return (
                    <tr key={l.id}>
                      <td style={{ ...tdStyle, fontSize: 13, fontWeight: 500 }}>{l.id}</td>
                      <td style={{ ...tdStyle, fontSize: 13 }}>{l.loginId}</td>
                      <td style={{ ...tdStyle, fontSize: 13 }}>{l.insurer}</td>
                      <td style={{ ...tdStyle, fontSize: 13 }}><span style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: st.bg, color: st.color }}>{l.status}</span></td>
                      <td style={{ ...tdStyle, color: '#9ca3af' }}>{l.imd}</td>
                      <td style={{ ...tdStyle, color: '#9ca3af' }}>{l.gcd}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      <InsurerModals />
    </div>
  );
}
