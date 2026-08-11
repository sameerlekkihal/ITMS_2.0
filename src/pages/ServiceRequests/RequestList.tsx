import { useAppStore } from '../../store/AppStore';
import {
  SR_AGENTS, SR_INSURERS, SR_CASE_TYPES, SR_POLICY_TYPES, SR_BUSINESS_TYPES, SR_SOURCES, SR_PAYMENT_MODES,
  SR_AGEING_COLOR, SR_STATUS_COLOR,
} from '../../data/mockData';

const QUICK_STATUS_CHIPS = ['Medical Pending', 'Booked Verification Call Pending', 'Booked Verification Call Done', 'Proposal Payment Link Generated'];

export function RequestList() {
  const {
    state, srFilteredRequests, onSrFilterField, onSrToggleMoreFilters, onSrSearch, onSrResetFilters,
    onSrQuickChip, onSrOpenDetails, onSrAssignedToChange,
  } = useAppStore();

  const f = state.srFilters;
  const rows = srFilteredRequests();

  return (
    <div className="sr-root">
      <div className="sr-breadcrumb">
        <a href="#" onClick={e => e.preventDefault()}>Home</a>
        <span>/</span>
        <span className="current">Health Policy List</span>
      </div>

      <div className="sr-chip-row" style={{ marginBottom: 14 }}>
        <span style={{ fontSize: 12, color: 'var(--neu-03)', marginRight: 2 }}>Quick filters:</span>
        {QUICK_STATUS_CHIPS.map(label => (
          <button
            key={label}
            className={`sr-chip${f.status === label ? ' active' : ''}`}
            onClick={() => onSrQuickChip('status', label)}
          >
            {label}
          </button>
        ))}
        <button
          className={`sr-chip${f.myTickets ? ' active' : ''}`}
          onClick={() => onSrFilterField('myTickets', !f.myTickets)}
        >
          👤 My Tickets
        </button>
      </div>

      <div className="sr-filter-card">
        <div className="sr-filter-grid" style={{ marginBottom: 10 }}>
          <div>
            <label className="sr-field-row-label">Request ID</label>
            <input className="sr-input" value={f.reqId} onChange={e => onSrFilterField('reqId', e.target.value)} placeholder="Enter Request ID" />
          </div>
          <div>
            <label className="sr-field-row-label">Customer Name</label>
            <input className="sr-input" value={f.customerName} onChange={e => onSrFilterField('customerName', e.target.value)} placeholder="Enter Customer Name" />
          </div>
          <div>
            <label className="sr-field-row-label">Mobile</label>
            <input className="sr-input" value={f.mobile} onChange={e => onSrFilterField('mobile', e.target.value)} placeholder="Enter Mobile Number" />
          </div>
          <div>
            <label className="sr-field-row-label">Case Type</label>
            <div className="sr-sel-wrap">
              <select className="sr-sel" value={f.caseType} onChange={e => onSrFilterField('caseType', e.target.value)}>
                <option value="">All case types</option>
                {SR_CASE_TYPES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <span className="sr-sel-chevron">▾</span>
            </div>
          </div>
          <div>
            <label className="sr-field-row-label">Insurer</label>
            <div className="sr-sel-wrap">
              <select className="sr-sel" value={f.insurer} onChange={e => onSrFilterField('insurer', e.target.value)}>
                <option value="">All insurers</option>
                {SR_INSURERS.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
              <span className="sr-sel-chevron">▾</span>
            </div>
          </div>
        </div>

        {state.srMoreFiltersOpen && (
          <>
            <hr className="sr-divider" />
            <div className="sr-filter-grid" style={{ marginBottom: 10 }}>
              <div>
                <label className="sr-field-row-label">Policy Number</label>
                <input className="sr-input" value={f.policyNumber} onChange={e => onSrFilterField('policyNumber', e.target.value)} placeholder="Enter Policy Number" />
              </div>
              <div>
                <label className="sr-field-row-label">Proposal Number</label>
                <input className="sr-input" value={f.proposalNumber} onChange={e => onSrFilterField('proposalNumber', e.target.value)} placeholder="Enter Proposal Number" />
              </div>
              <div>
                <label className="sr-field-row-label">Email Id</label>
                <input className="sr-input" value={f.email} onChange={e => onSrFilterField('email', e.target.value)} placeholder="Enter Email Id" />
              </div>
              <div>
                <label className="sr-field-row-label">Policy Medium</label>
                <div className="sr-sel-wrap">
                  <select className="sr-sel" value={f.medium} onChange={e => onSrFilterField('medium', e.target.value)}>
                    <option value="">All mediums</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                  </select>
                  <span className="sr-sel-chevron">▾</span>
                </div>
              </div>
              <div>
                <label className="sr-field-row-label">Status contains</label>
                <input className="sr-input" value={f.status} onChange={e => onSrFilterField('status', e.target.value)} placeholder="e.g. Pending, Done…" />
              </div>
            </div>
            <div className="sr-filter-grid" style={{ marginBottom: 10 }}>
              <div>
                <label className="sr-field-row-label">Policy Type</label>
                <div className="sr-sel-wrap">
                  <select className="sr-sel" value={f.policyType} onChange={e => onSrFilterField('policyType', e.target.value)}>
                    <option value="">All policy types</option>
                    {SR_POLICY_TYPES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                  <span className="sr-sel-chevron">▾</span>
                </div>
              </div>
              <div>
                <label className="sr-field-row-label">Business Type</label>
                <div className="sr-sel-wrap">
                  <select className="sr-sel" value={f.businessType} onChange={e => onSrFilterField('businessType', e.target.value)}>
                    <option value="">All business types</option>
                    {SR_BUSINESS_TYPES.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                  <span className="sr-sel-chevron">▾</span>
                </div>
              </div>
              <div>
                <label className="sr-field-row-label">Source</label>
                <div className="sr-sel-wrap">
                  <select className="sr-sel" value={f.source} onChange={e => onSrFilterField('source', e.target.value)}>
                    <option value="">All sources</option>
                    {SR_SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <span className="sr-sel-chevron">▾</span>
                </div>
              </div>
              <div>
                <label className="sr-field-row-label">Payment Mode</label>
                <div className="sr-sel-wrap">
                  <select className="sr-sel" value={f.paymentMode} onChange={e => onSrFilterField('paymentMode', e.target.value)}>
                    <option value="">All payment modes</option>
                    {SR_PAYMENT_MODES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                  <span className="sr-sel-chevron">▾</span>
                </div>
              </div>
            </div>
          </>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <button className="sr-more-filters-btn" onClick={onSrToggleMoreFilters}>
            {state.srMoreFiltersOpen ? '▴ Fewer filters' : '▾ More filters (10)'}
          </button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="sr-btn sr-btn-ghost" onClick={onSrResetFilters}>Reset</button>
            <button className="sr-btn sr-btn-primary" onClick={onSrSearch}>Search</button>
          </div>
        </div>
      </div>

      <div className="sr-result-bar">
        <span className="sr-result-count">{rows.length} request{rows.length !== 1 ? 's' : ''} found</span>
      </div>

      <div className="sr-card" style={{ marginBottom: 0 }}>
        <div className="sr-table-wrap">
          <table className="sr-table">
            <thead>
              <tr>
                <th>Request</th>
                <th>Customer</th>
                <th>Channel / Source</th>
                <th>Ageing</th>
                <th>Channel Partner / City</th>
                <th>Case / Policy</th>
                <th>Insurer</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr><td colSpan={10}><div className="sr-empty-state">No service requests match your filters.<br />Try adjusting or resetting your search.</div></td></tr>
              )}
              {rows.map(r => {
                const status = `${r.caseType} ${r.statusSel}`.trim();
                const statusColor = SR_STATUS_COLOR[status] || { bg: 'var(--neu-09)', color: 'var(--neu-02)' };
                const ageColor = SR_AGEING_COLOR[r.ageingLevel];
                return (
                  <tr key={r.id}>
                    <td>
                      <button className="sr-row-link" onClick={() => onSrOpenDetails(r.id)}>{r.id}</button>
                      <div style={{ fontSize: 11, color: 'var(--neu-04)', marginTop: 2 }}>{r.requestDate}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 500 }}>{r.customerName}</div>
                      <div style={{ fontSize: 11, color: 'var(--neu-04)', marginTop: 2 }}>{r.mobile}</div>
                    </td>
                    <td style={{ fontSize: 12.5 }}>{r.channelType}<div style={{ fontSize: 11, color: 'var(--neu-04)' }}>{r.subSource}</div></td>
                    <td>
                      <span className="sr-ageing-dot" style={{ background: ageColor.color }} />
                      <span style={{ marginLeft: 6, fontSize: 12.5 }}>{r.ageingLabel}</span>
                    </td>
                    <td style={{ fontSize: 12.5 }}>{r.channelPartner}<div style={{ fontSize: 11, color: 'var(--neu-04)' }}>{r.city}</div></td>
                    <td style={{ fontSize: 12.5 }}>{r.caseTag} / {r.policyTag}<div style={{ fontSize: 11, color: 'var(--neu-04)' }}>{r.policyNumber}</div></td>
                    <td style={{ fontSize: 12.5 }}>{r.insurerName}</td>
                    <td>
                      <span className="sr-badge" style={{ background: statusColor.bg, color: statusColor.color }}>{status}</span>
                    </td>
                    <td>
                      <div className="sr-sel-wrap" style={{ minWidth: 130 }}>
                        <select
                          className="sr-sel"
                          style={{ height: 32, fontSize: 12.5 }}
                          value={r.assignedTo}
                          onChange={e => onSrAssignedToChange(r.id, e.target.value)}
                        >
                          <option value="">Unassigned</option>
                          {SR_AGENTS.map(a => <option key={a} value={a}>{a}</option>)}
                        </select>
                        <span className="sr-sel-chevron">▾</span>
                      </div>
                    </td>
                    <td>
                      <button className="sr-btn sr-btn-outline" style={{ height: 30, fontSize: 12 }} onClick={() => onSrOpenDetails(r.id)}>Open</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
