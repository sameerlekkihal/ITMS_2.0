import { useAppStore } from '../../store/AppStore';

const labelStyle: React.CSSProperties = { display: 'block', fontSize: 12, fontWeight: 600, color: '#9ca3af', letterSpacing: .3, textTransform: 'uppercase', marginBottom: 6 };
const inputStyle: React.CSSProperties = { width: '100%', padding: '10px 13px', border: '1.5px solid #e5e7eb', borderRadius: 9, fontSize: 13, color: '#0f1115', outline: 'none', background: '#fff' };

export function RequestForm() {
  const { state, onCuBackToList, onCuFormField, onCuSubmitRequest } = useAppStore();
  const f = state.cuForm;
  const activeRoles = state.rmRoles.filter(r => r.active);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, fontSize: 13 }}>
        <span onClick={onCuBackToList} style={{ color: '#e8192c', cursor: 'pointer', fontWeight: 600 }}>← Requests</span>
        <span style={{ color: '#9ca3af' }}>/</span><span style={{ fontWeight: 600 }}>Raise User Creation Request</span>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,.07)', border: '1.5px solid #e5e7eb', padding: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22, paddingBottom: 18, borderBottom: '1px solid #f3f4f6' }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: '#fff0f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>🧑‍💼</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Employee details</div>
            <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 1 }}>Raised as L1 · Jijo John — routed to ITMS Admin (L2) on submit</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px 32px' }}>
          <div>
            <label style={labelStyle}>Employee Code <span style={{ color: '#e8192c' }}>*</span></label>
            <input value={f.empCode} onChange={e => onCuFormField('empCode', e.target.value)} placeholder="e.g. ID20984" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Employee Email ID <span style={{ color: '#e8192c' }}>*</span></label>
            <input value={f.email} onChange={e => onCuFormField('email', e.target.value)} placeholder="name@insurancedekho.com" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Employee Mobile Number <span style={{ color: '#e8192c' }}>*</span></label>
            <input value={f.mobile} onChange={e => onCuFormField('mobile', e.target.value)} placeholder="9876543210" style={inputStyle} />
          </div>
        </div>

        <div style={{ marginTop: 26, paddingTop: 20, borderTop: '1px solid #f3f4f6' }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Access to be granted</div>
          <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 14 }}>Name the exact role, or point to a user whose role should be replicated</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            {([['role', 'Exact role name', 'Pick a configured ITMS role'], ['equivalent', 'Equivalent user email', 'Replicate the role of an existing user']] as const).map(([mode, title, desc]) => {
              const on = f.roleMode === mode;
              return (
                <div key={mode} onClick={() => onCuFormField('roleMode', mode)} style={{ display: 'flex', gap: 10, padding: '13px 14px', borderRadius: 10, border: `1.5px solid ${on ? '#e8192c' : '#e5e7eb'}`, background: on ? '#fff0f1' : '#fff', cursor: 'pointer' }}>
                  <input type="radio" name="cu-rolemode" checked={on} onChange={() => onCuFormField('roleMode', mode)} style={{ accentColor: '#e8192c', marginTop: 2 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{title}</div>
                    <div style={{ fontSize: 11.5, color: '#9ca3af', marginTop: 2 }}>{desc}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {f.roleMode === 'role' ? (
            <div style={{ maxWidth: 520 }}>
              <label style={labelStyle}>Role Type <span style={{ color: '#e8192c' }}>*</span></label>
              <select value={f.role} onChange={e => onCuFormField('role', e.target.value)} style={inputStyle}>
                <option value="">Select role</option>
                {activeRoles.map(r => <option key={r.id} value={r.name}>{r.name} — {r.ticket}</option>)}
              </select>
            </div>
          ) : (
            <div style={{ maxWidth: 520 }}>
              <label style={labelStyle}>Equivalent User Email ID <span style={{ color: '#e8192c' }}>*</span></label>
              <input list="cu-equiv-users" value={f.equivalentEmail} onChange={e => onCuFormField('equivalentEmail', e.target.value)} placeholder="existing.user@id.in" style={inputStyle} />
              <datalist id="cu-equiv-users">
                {state.umUsers.map(u => <option key={u.id} value={u.email}>{u.name} · {u.role}</option>)}
              </datalist>
              <div style={{ fontSize: 11.5, color: '#9ca3af', marginTop: 6 }}>L2 will resolve and confirm the exact role before creating the account.</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 26, paddingTop: 20, borderTop: '1px solid #f3f4f6' }}>
          <label style={labelStyle}>Special Remark</label>
          <textarea value={f.remark} onChange={e => onCuFormField('remark', e.target.value)} rows={3} placeholder="Context for the admin — joining date, team, access restrictions…" style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 24, paddingTop: 20, borderTop: '1px solid #f3f4f6' }}>
          <button onClick={onCuBackToList} style={{ padding: '10px 18px', background: '#fff', color: '#0f1115', border: '1.5px solid #e5e7eb', borderRadius: 9, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Cancel</button>
          <button onClick={onCuSubmitRequest} style={{ padding: '10px 18px', background: '#e8192c', color: '#fff', border: 'none', borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Submit to L2</button>
        </div>
      </div>
    </>
  );
}
