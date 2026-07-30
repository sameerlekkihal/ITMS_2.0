import { useAppStore } from '../../store/AppStore';

const labelStyle: React.CSSProperties = { display: 'block', fontSize: 12, fontWeight: 600, color: '#9ca3af', letterSpacing: .3, textTransform: 'uppercase', marginBottom: 6 };
const inputStyle: React.CSSProperties = { width: '100%', padding: '10px 13px', border: '1.5px solid #e5e7eb', borderRadius: 9, fontSize: 13, color: '#0f1115', outline: 'none', background: '#fff' };

export function RoleForm() {
  const { state, onRmBackToList, onRmFormField, onRmSaveRole } = useAppStore();
  const f = state.rmForm;
  const title = state.rmEditId ? 'Edit Role' : 'Add Role';
  const saveLabel = state.rmEditId ? 'Save Changes' : 'Add Role';

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, fontSize: 13 }}>
        <span onClick={onRmBackToList} style={{ color: '#e8192c', cursor: 'pointer', fontWeight: 600 }}>← Role List</span>
        <span style={{ color: '#9ca3af' }}>/</span><span style={{ fontWeight: 600 }}>{title}</span>
      </div>
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,.07)', border: '1.5px solid #e5e7eb', padding: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px 32px' }}>
          <div>
            <div style={{ marginBottom: 14 }}><label style={labelStyle}>Name <span style={{ color: '#e8192c' }}>*</span></label><input value={f.name} onChange={e => onRmFormField('name', e.target.value)} placeholder="e.g. Lead Motor Ops" style={inputStyle} /></div>
            <div style={{ marginBottom: 14 }}><label style={labelStyle}>Description</label><input placeholder="Short description of this role" style={inputStyle} /></div>
          </div>
          <div>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Ticket Type <span style={{ color: '#e8192c' }}>*</span></label>
              <select value={f.ticket} onChange={e => onRmFormField('ticket', e.target.value)} style={inputStyle}>
                <option value="">Select Ticket type</option><option>Motor Online</option><option>Motor Offline Punching</option><option>Insurance_Sales</option><option>Health Online</option><option>Life Online</option>
              </select>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Product Name</label>
              <select value={f.product} onChange={e => onRmFormField('product', e.target.value)} style={inputStyle}>
                <option value="">Select Product</option><option>Insurance</option><option>Health</option><option>Life</option>
              </select>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 24, paddingTop: 20, borderTop: '1px solid #f3f4f6' }}>
          <button onClick={onRmBackToList} style={{ padding: '10px 18px', background: '#fff', color: '#0f1115', border: '1.5px solid #e5e7eb', borderRadius: 9, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Cancel</button>
          <button onClick={onRmSaveRole} style={{ padding: '10px 18px', background: '#e8192c', color: '#fff', border: 'none', borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{saveLabel}</button>
        </div>
      </div>
    </>
  );
}
