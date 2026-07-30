import { useAppStore } from '../../store/AppStore';

const labelStyle: React.CSSProperties = { display: 'block', fontSize: 12, fontWeight: 600, color: '#9ca3af', letterSpacing: .3, textTransform: 'uppercase', marginBottom: 6 };
const inputStyle: React.CSSProperties = { width: '100%', padding: '10px 13px', border: '1.5px solid #e5e7eb', borderRadius: 9, fontSize: 13, color: '#0f1115', outline: 'none', background: '#fff' };

export function UserForm() {
  const { state, onUmBackToList, onUmFormField, onUmSaveUser } = useAppStore();
  const f = state.umForm;
  const title = state.umEditId ? 'Edit User' : 'Add User';
  const saveLabel = state.umEditId ? 'Save Changes' : 'Add User';

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, fontSize: 13 }}>
        <span onClick={onUmBackToList} style={{ color: '#e8192c', cursor: 'pointer', fontWeight: 600 }}>← User List</span>
        <span style={{ color: '#9ca3af' }}>/</span><span style={{ fontWeight: 600 }}>{title}</span>
      </div>
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,.07)', border: '1.5px solid #e5e7eb', padding: 28 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', letterSpacing: .5, textTransform: 'uppercase', marginBottom: 10 }}>User Type <span style={{ color: '#e8192c' }}>*</span></div>
        <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
          {['ITMS', 'POS', 'LMS'].map(t => (
            <label key={t} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
              <input type="radio" name="utype" checked={f.type === t} onChange={() => onUmFormField('type', t)} style={{ accentColor: '#e8192c' }} /> {t}
            </label>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px 32px' }}>
          <div>
            <div style={{ marginBottom: 14 }}><label style={labelStyle}>Full Name <span style={{ color: '#e8192c' }}>*</span></label><input value={f.name} onChange={e => onUmFormField('name', e.target.value)} placeholder="e.g. John Doe" style={inputStyle} /></div>
            <div style={{ marginBottom: 14 }}><label style={labelStyle}>Email <span style={{ color: '#e8192c' }}>*</span></label><input value={f.email} onChange={e => onUmFormField('email', e.target.value)} placeholder="john@insurancedekho.com" style={inputStyle} /></div>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Roles <span style={{ color: '#e8192c' }}>*</span></label>
              <select value={f.role} onChange={e => onUmFormField('role', e.target.value)} style={inputStyle}>
                <option value="">Select Role</option><option>Admin</option><option>Manager</option><option>Agent</option><option>Ops</option>
              </select>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" style={{ accentColor: '#e8192c' }} /> Access to own team only</label>
          </div>
          <div>
            <div style={{ marginBottom: 14 }}><label style={labelStyle}>Mobile <span style={{ color: '#e8192c' }}>*</span></label><input value={f.mobile} onChange={e => onUmFormField('mobile', e.target.value)} placeholder="9876543210" style={inputStyle} /></div>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Gender</label>
              <select style={inputStyle}><option value="">Select Gender</option><option>Male</option><option>Female</option><option>Other</option></select>
            </div>
            <div style={{ marginBottom: 14 }}><label style={labelStyle}>Region</label><input placeholder="e.g. North, South…" style={inputStyle} /></div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 24, paddingTop: 20, borderTop: '1px solid #f3f4f6' }}>
          <button onClick={onUmBackToList} style={{ padding: '10px 18px', background: '#fff', color: '#0f1115', border: '1.5px solid #e5e7eb', borderRadius: 9, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Cancel</button>
          <button onClick={onUmSaveUser} style={{ padding: '10px 18px', background: '#e8192c', color: '#fff', border: 'none', borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{saveLabel}</button>
        </div>
      </div>
    </>
  );
}
