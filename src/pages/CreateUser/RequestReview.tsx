import { useAppStore } from '../../store/AppStore';
import { CU_STATUS_STYLE, CU_REGIONS, LOG_ICONS, LOG_DOT_BG } from '../../data/mockData';
import { LogList } from '../../components/ModalShell';

const labelStyle: React.CSSProperties = { display: 'block', fontSize: 12, fontWeight: 600, color: '#9ca3af', letterSpacing: .3, textTransform: 'uppercase', marginBottom: 6 };
const inputStyle: React.CSSProperties = { width: '100%', padding: '10px 13px', border: '1.5px solid #e5e7eb', borderRadius: 9, fontSize: 13, color: '#0f1115', outline: 'none', background: '#fff' };

export function RequestReview() {
  const { state, onCuBackToList, onCuConfigField, onCuCreateUser, onCuOpenReject } = useAppStore();
  const r = state.cuRequests.find(x => x.id === state.cuActiveId);
  if (!r) return null;

  const c = state.cuConfig;
  const sc = CU_STATUS_STYLE[r.status];
  const isL2 = state.cuPersona === 'L2';
  const editable = isL2 && r.status === 'Pending with L2';
  const eqUser = r.roleMode === 'equivalent' ? state.umUsers.find(u => u.email.toLowerCase() === r.equivalentEmail.toLowerCase()) : null;
  const activeRoles = state.rmRoles.filter(role => role.active);
  const logItems = r.logs.map(l => ({ ...l, icon: LOG_ICONS[l.type] || '•', bg: LOG_DOT_BG[l.type] || '#f3f4f6' }));

  const rows: [string, string][] = [
    ['Employee code', r.empCode],
    ['Employee email', r.email],
    ['Mobile number', r.mobile],
    ['Requested access', r.roleMode === 'role' ? r.role : `Equivalent to ${r.equivalentEmail}`],
    ['Raised by', r.raisedBy],
    ['Raised on', r.raisedAt],
  ];

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, fontSize: 13 }}>
        <span onClick={onCuBackToList} style={{ color: '#e8192c', cursor: 'pointer', fontWeight: 600 }}>← Requests</span>
        <span style={{ color: '#9ca3af' }}>/</span><span style={{ fontWeight: 600 }}>{r.id}</span>
        <span style={{ marginLeft: 6, display: 'inline-flex', alignItems: 'center', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: sc.bg, color: sc.color }}>{r.status}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 16, alignItems: 'start' }}>
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,.07)', border: '1.5px solid #e5e7eb', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', background: '#0f1115', color: '#fff' }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Request preview</div>
            <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,.5)', marginTop: 2 }}>Submitted by L1 — read only</div>
          </div>
          <div style={{ padding: '6px 20px 16px' }}>
            {rows.map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ fontSize: 12, color: '#9ca3af' }}>{k}</span>
                <span style={{ fontSize: 12.5, fontWeight: 500, textAlign: 'right' }}>{v}</span>
              </div>
            ))}
            {eqUser && (
              <div style={{ marginTop: 14, padding: '12px 14px', borderRadius: 10, background: '#ede9fe', color: '#5b21b6' }}>
                <div style={{ fontSize: 12, fontWeight: 700 }}>Resolved from equivalent user</div>
                <div style={{ fontSize: 12, marginTop: 3 }}>{eqUser.name} · {eqUser.role} · {eqUser.type}</div>
              </div>
            )}
            <div style={{ marginTop: 14 }}>
              <div style={labelStyle}>Special remark</div>
              <div style={{ fontSize: 12.5, color: r.remark ? '#0f1115' : '#9ca3af', lineHeight: 1.55, padding: '11px 13px', background: '#f3f4f6', borderRadius: 9 }}>{r.remark || 'No remark added'}</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,.07)', border: '1.5px solid #e5e7eb', padding: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>{editable ? 'Configure & create account' : 'Account configuration'}</div>
          <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2, marginBottom: 18 }}>
            {editable ? 'Acting as L2 · Jijo John (ITMS Admin)' : r.status === 'User Created' ? 'Account created from this request' : 'Request closed — no account created'}
          </div>

          {r.status === 'Pending with L2' && !isL2 && (
            <div style={{ padding: '12px 14px', borderRadius: 10, background: '#fef3c7', color: '#92400e', fontSize: 12.5, marginBottom: 16 }}>
              Pending with ITMS Admin (L2). Switch the persona to L2 to configure and create the account.
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 20px' }}>
            <div>
              <label style={labelStyle}>Full name <span style={{ color: '#e8192c' }}>*</span></label>
              <input value={c.name} disabled={!editable} onChange={e => onCuConfigField('name', e.target.value)} style={{ ...inputStyle, background: editable ? '#fff' : '#f9fafb' }} />
            </div>
            <div>
              <label style={labelStyle}>Role <span style={{ color: '#e8192c' }}>*</span></label>
              <select value={c.role} disabled={!editable} onChange={e => onCuConfigField('role', e.target.value)} style={{ ...inputStyle, background: editable ? '#fff' : '#f9fafb' }}>
                <option value="">Select role</option>
                {['Admin', 'Manager', 'Agent', 'Ops'].map(x => <option key={x} value={x}>{x}</option>)}
                {activeRoles.map(role => <option key={role.id} value={role.name}>{role.name}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>User type</label>
              <div style={{ display: 'flex', gap: 16, paddingTop: 4 }}>
                {(['ITMS', 'POS', 'LMS'] as const).map(t => (
                  <label key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, cursor: editable ? 'pointer' : 'default', color: editable ? '#0f1115' : '#9ca3af' }}>
                    <input type="radio" name="cu-usertype" disabled={!editable} checked={c.userType === t} onChange={() => onCuConfigField('userType', t)} style={{ accentColor: '#e8192c' }} /> {t}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label style={labelStyle}>Region</label>
              <select value={c.region} disabled={!editable} onChange={e => onCuConfigField('region', e.target.value)} style={{ ...inputStyle, background: editable ? '#fff' : '#f9fafb' }}>
                <option value="">Not set</option>
                {CU_REGIONS.map(x => <option key={x} value={x}>{x}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18, paddingTop: 16, borderTop: '1px solid #f3f4f6' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: editable ? 'pointer' : 'default' }}>
              <input type="checkbox" disabled={!editable} checked={c.teamOnly} onChange={e => onCuConfigField('teamOnly', e.target.checked)} style={{ accentColor: '#e8192c' }} /> Access to own team only
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: editable ? 'pointer' : 'default' }}>
              <input type="checkbox" disabled={!editable} checked={c.autoLogout} onChange={e => onCuConfigField('autoLogout', e.target.checked)} style={{ accentColor: '#e8192c' }} /> Auto-logout after shift hours
            </label>
          </div>

          {editable && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 22, paddingTop: 18, borderTop: '1px solid #f3f4f6' }}>
              <button onClick={onCuOpenReject} style={{ padding: '10px 18px', background: '#fff', color: '#e8192c', border: '1.5px solid #e8192c', borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Reject request</button>
              <button onClick={onCuCreateUser} style={{ padding: '10px 18px', background: '#e8192c', color: '#fff', border: 'none', borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Create user &amp; trigger email</button>
            </div>
          )}
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,.07)', border: '1.5px solid #e5e7eb', padding: '20px 24px', marginTop: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700 }}>Request log</div>
        <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2, marginBottom: 16 }}>Every action on {r.id}, with actor and timestamp</div>
        <LogList items={logItems} />
      </div>
    </>
  );
}
