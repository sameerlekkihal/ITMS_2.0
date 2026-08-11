import './rome.css';
import { useAppStore } from '../../store/AppStore';
import { ModalOverlay, SidePanel, LogList } from '../../components/ModalShell';
import { AB_ROSTER } from '../../data/mockData';

export function AllocationBuckets() {
  const {
    state, abFilteredBuckets, onAbFilterField, onAbResetFilters, onAbOpenAdd, onAbOpenEdit, onAbCloseModal,
    onAbNameDraftChange, onAbDescDraftChange, onAbUserSearchChange, onAbAddUser, onAbRemoveUser, onAbToggleStatus,
    onAbSave, onAbOpenLog, onAbCloseLog,
  } = useAppStore();

  const rows = abFilteredBuckets();
  const f = state.abFilters;
  const matches = state.abUserSearch.trim()
    ? AB_ROSTER.filter(n => n.toLowerCase().includes(state.abUserSearch.toLowerCase()) && !state.abUsersDraft.includes(n))
    : [];

  const logBucket = state.abLogId ? state.abBuckets.find(b => b.id === state.abLogId) : null;
  const logItems = logBucket ? logBucket.log.map(l => ({ icon: '📝', bg: 'var(--neu-09)', action: l.text, by: l.by, time: l.at })) : [];

  return (
    <div className="sr-root">
      <div className="sr-breadcrumb">
        <a href="#" onClick={e => e.preventDefault()}>Home</a>
        <span>/</span>
        <span>Health Requests</span>
        <span>/</span>
        <span className="current">Allocation Buckets</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Allocation Buckets — Health</h2>
          <p style={{ fontSize: 12.5, color: 'var(--neu-04)', marginTop: 3 }}>Group executives into buckets that Allocation Rules route Health cases into</p>
        </div>
        <button className="sr-btn sr-btn-primary" onClick={onAbOpenAdd}>+ Add Bucket</button>
      </div>

      <div className="sr-filter-card">
        <div className="sr-filter-grid">
          <div>
            <label className="sr-field-row-label">Bucket Name</label>
            <input className="sr-input" value={f.name} onChange={e => onAbFilterField('name', e.target.value)} placeholder="Search bucket name" />
          </div>
          <div>
            <label className="sr-field-row-label">Status</label>
            <div className="sr-sel-wrap">
              <select className="sr-sel" value={f.status} onChange={e => onAbFilterField('status', e.target.value)}>
                <option value="all">All</option>
                <option value="on">On</option>
                <option value="off">Off</option>
              </select>
              <span className="sr-sel-chevron">▾</span>
            </div>
          </div>
          <div>
            <label className="sr-field-row-label">Created By</label>
            <input className="sr-input" list="ab-created-by" value={f.createdBy} onChange={e => onAbFilterField('createdBy', e.target.value)} placeholder="Select or search user" />
            <datalist id="ab-created-by">{Array.from(new Set(state.abBuckets.map(b => b.createdBy))).map(n => <option key={n} value={n} />)}</datalist>
          </div>
          <div>
            <label className="sr-field-row-label">Creation Date</label>
            <input className="sr-input" type="date" value={f.createdDate} onChange={e => onAbFilterField('createdDate', e.target.value)} />
          </div>
          <div>
            <label className="sr-field-row-label">Updation Date</label>
            <input className="sr-input" type="date" value={f.updatedDate} onChange={e => onAbFilterField('updatedDate', e.target.value)} />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 10 }}>
          <button className="sr-btn sr-btn-ghost" onClick={onAbResetFilters}>Reset</button>
        </div>
      </div>

      <div className="sr-result-bar">
        <span className="sr-result-count">{rows.length} bucket{rows.length !== 1 ? 's' : ''} found</span>
      </div>

      <div className="sr-card" style={{ marginBottom: 0 }}>
        <div className="sr-table-wrap">
          <table className="sr-table">
            <thead>
              <tr>
                <th>Name</th><th>Description</th><th>Status</th><th>Created By</th>
                <th>Bucket Creation Date</th><th>Bucket Updation Date</th><th>Activity Log</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && <tr><td colSpan={8}><div className="sr-empty-state">No buckets match the selected filters.</div></td></tr>}
              {rows.map(b => (
                <tr key={b.id}>
                  <td style={{ fontWeight: 600, color: 'var(--sec-00)' }}>{b.name}</td>
                  <td style={{ fontSize: 12.5, color: 'var(--neu-03)' }}>{b.desc || '—'}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <button className={`sr-toggle${b.status ? ' on' : ''}`} onClick={() => onAbToggleStatus(b.id)} aria-label="Toggle status" />
                      <span style={{ fontSize: 11, fontWeight: 600, color: b.status ? 'var(--success)' : 'var(--neu-04)' }}>{b.status ? 'On' : 'Off'}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: 12.5 }}>{b.createdBy}</td>
                  <td style={{ fontSize: 11.5, color: 'var(--neu-04)' }}>{b.createdAt}</td>
                  <td style={{ fontSize: 11.5, color: 'var(--neu-04)' }}>{b.updatedAt}</td>
                  <td><button className="sr-icon-btn" title="Activity Log" onClick={() => onAbOpenLog(b.id)}>👁</button></td>
                  <td><button className="sr-icon-btn" title="Edit" onClick={() => onAbOpenEdit(b.id)}>✏️</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {state.abModalOpen && (
        <ModalOverlay>
          <div style={{ background: 'var(--bg-white)', borderRadius: 'var(--r-lg)', width: 560, maxWidth: '92vw', fontFamily: 'var(--font)' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--neu-08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: 'var(--neu-01)' }}>{state.abEditId ? 'Edit Bucket' : 'Add New Bucket'}</h3>
              <button onClick={onAbCloseModal} style={{ border: 'none', background: 'none', fontSize: 20, cursor: 'pointer', color: 'var(--neu-03)' }}>×</button>
            </div>
            <div style={{ padding: '20px 24px' }}>
              <div style={{ display: 'flex', gap: 18, marginBottom: 16 }}>
                <div style={{ flex: 1 }}>
                  <label className="sr-field-row-label" style={{ textAlign: 'left', width: 'auto', display: 'block', marginBottom: 6 }}>Bucket Name <span className="sr-required">*</span></label>
                  <input className="sr-input" value={state.abNameDraft} onChange={e => onAbNameDraftChange(e.target.value)} placeholder="Type Bucket Name" />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="sr-field-row-label" style={{ textAlign: 'left', width: 'auto', display: 'block', marginBottom: 6 }}>Description</label>
                  <input className="sr-input" value={state.abDescDraft} onChange={e => onAbDescDraftChange(e.target.value)} placeholder="Type Description" />
                </div>
              </div>
              <label className="sr-field-row-label" style={{ textAlign: 'left', width: 'auto', display: 'block', marginBottom: 6 }}>Users <span className="sr-required">*</span></label>
              <div style={{ border: '1px solid var(--neu-06)', borderRadius: 'var(--r-md)', padding: '8px 10px', display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', minHeight: 44, position: 'relative' }}>
                {state.abUsersDraft.map(n => (
                  <span key={n} className="sr-chip active" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {n} <button onClick={() => onAbRemoveUser(n)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--sec-02)', fontSize: 13 }}>×</button>
                  </span>
                ))}
                <input
                  value={state.abUserSearch} onChange={e => onAbUserSearchChange(e.target.value)} placeholder="Search Users"
                  style={{ border: 'none', outline: 'none', flex: 1, minWidth: 120, fontSize: 13.5, padding: 4 }}
                />
                {matches.length > 0 && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', border: '1px solid var(--neu-06)', borderTop: 'none', borderRadius: '0 0 8px 8px', maxHeight: 160, overflowY: 'auto', zIndex: 5, boxShadow: 'var(--sh-md)' }}>
                    {matches.map(n => (
                      <div key={n} onClick={() => onAbAddUser(n)} style={{ padding: '8px 12px', fontSize: 13.5, cursor: 'pointer' }}>{n}</div>
                    ))}
                  </div>
                )}
              </div>
              <div className="sr-derived-hint">Only Health Ops team executives can be added to a Health bucket.</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, padding: '14px 24px', borderTop: '1px solid var(--neu-08)' }}>
              <button className="sr-btn sr-btn-ghost" onClick={onAbCloseModal}>Cancel</button>
              <button className="sr-btn sr-btn-primary" onClick={onAbSave}>Save</button>
            </div>
          </div>
        </ModalOverlay>
      )}

      {state.abLogOpen && (
        <SidePanel title="Activity Log" subtitle={logBucket ? logBucket.name : '—'} onClose={onAbCloseLog}>
          <LogList items={logItems} />
        </SidePanel>
      )}
    </div>
  );
}
