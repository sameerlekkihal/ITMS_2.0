import './rome.css';
import { useState } from 'react';
import { useAppStore } from '../../store/AppStore';
import { SidePanel, LogList } from '../../components/ModalShell';
import { AB_MODULES, AB_PRODUCT_TYPES, AR_FIELD_LABELS, AR_FIELD_OPTIONS } from '../../data/mockData';
import type { ArFieldKey } from '../../types';

const FIELD_KEYS = Object.keys(AR_FIELD_LABELS) as ArFieldKey[];

export function AllocationRules() {
  const {
    state, arFilteredRules, onArFilterField, onArResetFilters, onArOpenAdd, onArOpenEdit, onArCloseModal,
    onArNameDraftChange, onArModuleDraftChange, onArMaxTicketsDraftChange, onArProductTypeDraftChange,
    onArAddFieldRow, onArFieldTypeChange, onArFieldValueChange, onArFieldMultiToggle, onArToggleFieldConfirm,
    onArRemoveFieldRow, onArToggleStatus, onArLinkBucketChange, onArSave, onArOpenLog, onArCloseLog,
  } = useAppStore();

  const [insurerSearch, setInsurerSearch] = useState<Record<number, string>>({});

  const rows = arFilteredRules();
  const f = state.arFilters;
  const logRule = state.arLogId ? state.arRules.find(r => r.id === state.arLogId) : null;
  const logItems = logRule ? logRule.log.map(l => ({ icon: '📝', bg: 'var(--neu-09)', action: l.text, by: l.by, time: l.at })) : [];

  return (
    <div className="sr-root">
      <div className="sr-breadcrumb">
        <a href="#" onClick={e => e.preventDefault()}>Home</a>
        <span>/</span>
        <span>Health Requests</span>
        <span>/</span>
        <span className="current">Allocation Rules</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Allocation Rules — Health</h2>
          <p style={{ fontSize: 12.5, color: 'var(--neu-04)', marginTop: 3 }}>Route incoming Health cases into buckets based on case attributes</p>
        </div>
        <button className="sr-btn sr-btn-primary" onClick={onArOpenAdd}>+ Add Rule</button>
      </div>

      <div className="sr-filter-card">
        <div className="sr-filter-grid">
          <div>
            <label className="sr-field-row-label">Rule Name</label>
            <input className="sr-input" value={f.name} onChange={e => onArFilterField('name', e.target.value)} placeholder="Search rule name" />
          </div>
          <div>
            <label className="sr-field-row-label">Module</label>
            <div className="sr-sel-wrap">
              <select className="sr-sel" value={f.module} onChange={e => onArFilterField('module', e.target.value)}>
                <option value="all">All</option>
                {AB_MODULES.filter(m => m !== 'All').map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <span className="sr-sel-chevron">▾</span>
            </div>
          </div>
          <div>
            <label className="sr-field-row-label">Status</label>
            <div className="sr-sel-wrap">
              <select className="sr-sel" value={f.status} onChange={e => onArFilterField('status', e.target.value)}>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <span className="sr-sel-chevron">▾</span>
            </div>
          </div>
          <div>
            <label className="sr-field-row-label">Created By</label>
            <input className="sr-input" list="ar-created-by" value={f.createdBy} onChange={e => onArFilterField('createdBy', e.target.value)} placeholder="Select or search user" />
            <datalist id="ar-created-by">{Array.from(new Set(state.arRules.map(r => r.createdBy))).map(n => <option key={n} value={n} />)}</datalist>
          </div>
          <div>
            <label className="sr-field-row-label">Link Bucket</label>
            <div className="sr-sel-wrap">
              <select className="sr-sel" value={f.linkBucket} onChange={e => onArFilterField('linkBucket', e.target.value)}>
                <option value="all">All</option>
                {state.abBuckets.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
              <span className="sr-sel-chevron">▾</span>
            </div>
          </div>
        </div>
        <div className="sr-filter-grid" style={{ marginTop: 10 }}>
          <div>
            <label className="sr-field-row-label">Created From</label>
            <input className="sr-input" type="date" value={f.createdFrom} onChange={e => onArFilterField('createdFrom', e.target.value)} />
          </div>
          <div>
            <label className="sr-field-row-label">Created To</label>
            <input className="sr-input" type="date" value={f.createdTo} onChange={e => onArFilterField('createdTo', e.target.value)} />
          </div>
          <div>
            <label className="sr-field-row-label">Updated From</label>
            <input className="sr-input" type="date" value={f.updatedFrom} onChange={e => onArFilterField('updatedFrom', e.target.value)} />
          </div>
          <div>
            <label className="sr-field-row-label">Updated To</label>
            <input className="sr-input" type="date" value={f.updatedTo} onChange={e => onArFilterField('updatedTo', e.target.value)} />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 10 }}>
          <button className="sr-btn sr-btn-ghost" onClick={onArResetFilters}>Reset</button>
        </div>
      </div>

      <div className="sr-result-bar">
        <span className="sr-result-count">{rows.length} rule{rows.length !== 1 ? 's' : ''} found</span>
      </div>

      <div className="sr-card" style={{ marginBottom: 0 }}>
        <div className="sr-table-wrap">
          <table className="sr-table">
            <thead>
              <tr>
                <th>Name</th><th>Module</th><th>Status</th><th>Creation Date</th><th>Updation Date</th>
                <th>Created By</th><th>Activity Log</th><th>Action</th><th>Link Bucket</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && <tr><td colSpan={9}><div className="sr-empty-state">No rules match the selected filters.</div></td></tr>}
              {rows.map(r => (
                <tr key={r.id}>
                  <td style={{ fontWeight: 600, color: 'var(--sec-00)' }}>{r.name}</td>
                  <td style={{ fontSize: 12.5 }}>{r.module}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <button className={`sr-toggle${r.status ? ' on' : ''}`} onClick={() => onArToggleStatus(r.id)} aria-label="Toggle status" />
                      <span style={{ fontSize: 11, fontWeight: 600, color: r.status ? 'var(--success)' : 'var(--neu-04)' }}>{r.status ? 'Active' : 'Inactive'}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: 11.5, color: 'var(--neu-04)' }}>{r.createdAt}</td>
                  <td style={{ fontSize: 11.5, color: 'var(--neu-04)' }}>{r.updatedAt}</td>
                  <td style={{ fontSize: 12.5 }}>{r.createdBy}</td>
                  <td><button className="sr-icon-btn" title="Activity Log" onClick={() => onArOpenLog(r.id)}>👁</button></td>
                  <td><button className="sr-icon-btn" title="Edit" onClick={() => onArOpenEdit(r.id)}>✏️</button></td>
                  <td>
                    <div className="sr-sel-wrap" style={{ minWidth: 170 }}>
                      <select className="sr-sel" style={{ height: 32, fontSize: 12.5 }} value={r.linkedBucket} onChange={e => onArLinkBucketChange(r.id, e.target.value)}>
                        {state.abBuckets.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                      </select>
                      <span className="sr-sel-chevron">▾</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {state.arModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,17,21,.5)', zIndex: 400, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '40px 20px', overflowY: 'auto' }}>
          <div style={{ background: '#fff', borderRadius: 'var(--r-lg)', width: 680, maxWidth: '94vw', fontFamily: 'var(--font)' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--neu-08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600 }}>{state.arEditId ? 'Edit Rule' : 'Add New Rule'}</h3>
              <button onClick={onArCloseModal} style={{ border: 'none', background: 'none', fontSize: 20, cursor: 'pointer', color: 'var(--neu-03)' }}>×</button>
            </div>
            <div style={{ padding: '20px 24px', maxHeight: '70vh', overflowY: 'auto' }}>
              <div style={{ marginBottom: 16 }}>
                <label className="sr-field-row-label" style={{ textAlign: 'left', width: 'auto', display: 'block', marginBottom: 6 }}>Rule Name <span className="sr-required">*</span></label>
                <input className="sr-input" value={state.arNameDraft} onChange={e => onArNameDraftChange(e.target.value)} placeholder="Type Rule Name" />
              </div>
              <div style={{ display: 'flex', gap: 18, marginBottom: 16 }}>
                <div style={{ flex: 1 }}>
                  <label className="sr-field-row-label" style={{ textAlign: 'left', width: 'auto', display: 'block', marginBottom: 6 }}>Module <span className="sr-required">*</span></label>
                  <div className="sr-sel-wrap">
                    <select className="sr-sel" value={state.arModuleDraft} onChange={e => onArModuleDraftChange(e.target.value)}>
                      <option value="">Select</option>
                      {AB_MODULES.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <span className="sr-sel-chevron">▾</span>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <label className="sr-field-row-label" style={{ textAlign: 'left', width: 'auto', display: 'block', marginBottom: 6 }}>Max Tickets Assigned <span className="sr-required">*</span></label>
                  <input className="sr-input" type="number" min={1} max={100} value={state.arMaxTicketsDraft} onChange={e => onArMaxTicketsDraftChange(e.target.value)} placeholder="Enter number (1-100)" />
                </div>
              </div>
              <div style={{ maxWidth: 260, marginBottom: 18 }}>
                <label className="sr-field-row-label" style={{ textAlign: 'left', width: 'auto', display: 'block', marginBottom: 6 }}>Product Type <span className="sr-required">*</span></label>
                <div className="sr-sel-wrap">
                  <select className="sr-sel" value={state.arProductTypeDraft} onChange={e => onArProductTypeDraftChange(e.target.value)}>
                    <option value="">Select</option>
                    {AB_PRODUCT_TYPES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                  <span className="sr-sel-chevron">▾</span>
                </div>
              </div>

              <div style={{ border: '1px solid var(--neu-08)', borderRadius: 'var(--r-md)', padding: 14 }}>
                <div style={{ fontSize: 13, fontStyle: 'italic', color: 'var(--neu-03)', marginBottom: 10 }}>Add more fields</div>
                {state.arFieldsDraft.map((row, idx) => {
                  const usedElsewhere = state.arFieldsDraft.filter((x, i) => i !== idx && x.field).map(x => x.field);
                  const availableKeys = FIELD_KEYS.filter(k => !usedElsewhere.includes(k) || k === row.field);
                  const opt = row.field ? AR_FIELD_OPTIONS[row.field] : null;
                  return (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10 }}>
                      <div className="sr-sel-wrap" style={{ flex: '0 0 170px' }}>
                        <select className="sr-sel" disabled={row.confirmed} value={row.field} onChange={e => onArFieldTypeChange(idx, e.target.value as ArFieldKey)}>
                          <option value="">Select Field</option>
                          {availableKeys.map(k => <option key={k} value={k}>{AR_FIELD_LABELS[k]}</option>)}
                        </select>
                        <span className="sr-sel-chevron">▾</span>
                      </div>
                      <div style={{ flex: 1 }}>
                        {!row.field && <input className="sr-input" placeholder="Enter Value" disabled />}
                        {row.field && opt?.type === 'select' && (
                          <div className="sr-sel-wrap">
                            <select className="sr-sel" disabled={row.confirmed} value={row.value as string} onChange={e => onArFieldValueChange(idx, e.target.value)}>
                              <option value="">Select</option>
                              {opt.options.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                            <span className="sr-sel-chevron">▾</span>
                          </div>
                        )}
                        {row.field && opt?.type === 'multiselect' && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', border: '1px solid var(--neu-06)', borderRadius: 'var(--r-md)', padding: '8px 10px' }}>
                            {opt.options.map(o => {
                              const selected = Array.isArray(row.value) ? row.value : [];
                              return (
                                <label key={o} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12.5, cursor: 'pointer' }}>
                                  <input type="checkbox" checked={selected.includes(o)} disabled={row.confirmed} onChange={() => onArFieldMultiToggle(idx, o)} /> {o}
                                </label>
                              );
                            })}
                          </div>
                        )}
                        {row.field && opt?.type === 'multiselect-search' && (
                          <div>
                            <input
                              className="sr-input" placeholder="Search insurer" disabled={row.confirmed} style={{ marginBottom: 6 }}
                              value={insurerSearch[idx] || ''} onChange={e => setInsurerSearch(s => ({ ...s, [idx]: e.target.value }))}
                            />
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', border: '1px solid var(--neu-06)', borderRadius: 'var(--r-md)', padding: '8px 10px' }}>
                              {opt.options.filter(o => o.toLowerCase().includes((insurerSearch[idx] || '').toLowerCase())).map(o => {
                                const selected = Array.isArray(row.value) ? row.value : [];
                                return (
                                  <label key={o} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12.5, cursor: 'pointer' }}>
                                    <input type="checkbox" checked={selected.includes(o)} disabled={row.confirmed} onChange={() => onArFieldMultiToggle(idx, o)} /> {o}
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                      <button className="sr-icon-btn" style={row.confirmed ? { background: 'var(--success)', color: '#fff', borderColor: 'var(--success)' } : { color: 'var(--success)' }} title="Confirm field" onClick={() => onArToggleFieldConfirm(idx)}>✓</button>
                      <button className="sr-icon-btn" style={{ color: 'var(--error)' }} title="Remove field" onClick={() => onArRemoveFieldRow(idx)}>🗑</button>
                    </div>
                  );
                })}
                <button className="sr-btn sr-btn-outline" style={{ height: 32, fontSize: 12.5 }} onClick={onArAddFieldRow}>+ Add Field</button>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, padding: '14px 24px', borderTop: '1px solid var(--neu-08)' }}>
              <button className="sr-btn sr-btn-ghost" onClick={onArCloseModal}>Cancel</button>
              <button className="sr-btn sr-btn-primary" onClick={onArSave}>Save</button>
            </div>
          </div>
        </div>
      )}

      {state.arLogOpen && (
        <SidePanel title="Activity Log" subtitle={logRule ? logRule.name : '—'} onClose={onArCloseLog}>
          <LogList items={logItems} />
        </SidePanel>
      )}
    </div>
  );
}
