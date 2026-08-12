import { useAppStore } from '../../store/AppStore';
import type { SrQuickTab } from '../../types';
import {
  SR_AGENTS, SR_INSURERS, SR_CASE_TAGS, SR_POLICY_TYPES, SR_BUSINESS_TYPES, SR_CHANNEL_TYPES, SR_SOURCES,
  SR_PAYMENT_MODES, SR_PAYMENT_METHODS, SR_GROUP_TYPES, SR_RETAIL_TYPES, SR_BOOKED_BY, SR_YES_NO, SR_DEALERS,
  SR_AGEING_COLOR, SR_STATUS_COLOR,
} from '../../data/mockData';

const SR_QUICK_TABS: SrQuickTab[] = ['All', 'Unbooked (STP)', 'Upcoming Renewals', 'Pre QC'];

function TextField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="sr-field-row-label">{label}</label>
      <input className="sr-input" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}

function SelectField({ label, value, onChange, options, placeholder }: { label: string; value: string; onChange: (v: string) => void; options: string[]; placeholder: string }) {
  return (
    <div>
      <label className="sr-field-row-label">{label}</label>
      <div className="sr-sel-wrap">
        <select className="sr-sel" value={value} onChange={e => onChange(e.target.value)}>
          <option value="">{placeholder}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <span className="sr-sel-chevron">▾</span>
      </div>
    </div>
  );
}

function DateField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="sr-field-row-label">{label}</label>
      <input type="date" className="sr-input" value={value} onChange={e => onChange(e.target.value)} />
    </div>
  );
}

function DateRangeField({ label, from, to, onFrom, onTo }: { label: string; from: string; to: string; onFrom: (v: string) => void; onTo: (v: string) => void }) {
  return (
    <div>
      <label className="sr-field-row-label">{label}</label>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <input type="date" className="sr-input" value={from} onChange={e => onFrom(e.target.value)} />
        <span style={{ color: 'var(--neu-04)', fontSize: 12 }}>–</span>
        <input type="date" className="sr-input" value={to} onChange={e => onTo(e.target.value)} />
      </div>
    </div>
  );
}

export function RequestList() {
  const {
    state, srFilteredRequests, onSrFilterField, onSrToggleMoreFilters, onSrSetActiveTab, onSrSearch, onSrCount,
    onSrDownload, onSrResetFilters, onSrOpenDetails, onSrAssignedToChange,
  } = useAppStore();

  const f = state.srFilters;
  const rows = srFilteredRequests();

  const sf = (field: keyof typeof f) => (value: string) => onSrFilterField(field, value);

  return (
    <div className="sr-root">
      <div className="sr-breadcrumb">
        <a href="#" onClick={e => e.preventDefault()}>Home</a>
        <span>/</span>
        <span className="current">Health Policy List</span>
      </div>

      <div className="sr-filter-card">
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: 'var(--neu-02)', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={f.myTickets}
              onChange={e => onSrFilterField('myTickets', e.target.checked)}
              style={{ accentColor: 'var(--pri-00)', width: 15, height: 15, cursor: 'pointer' }}
            />
            My Tickets
          </label>
        </div>

        <div className="sr-filter-grid" style={{ gridTemplateColumns: 'repeat(6, 1fr)', marginBottom: 10 }}>
          <TextField label="Request ID" value={f.reqId} onChange={sf('reqId')} placeholder="Enter Request ID" />
          <TextField label="Policy Number" value={f.policyNumber} onChange={sf('policyNumber')} placeholder="Enter Policy Number" />
          <TextField label="Proposal Number" value={f.proposalNumber} onChange={sf('proposalNumber')} placeholder="Enter Proposal Number" />
          <TextField label="Customer Name" value={f.customerName} onChange={sf('customerName')} placeholder="Enter Customer Name" />
          <TextField label="Mobile" value={f.mobile} onChange={sf('mobile')} placeholder="Enter Mobile Number" />
          <SelectField label="Payment Mode" value={f.paymentMode} onChange={sf('paymentMode')} options={SR_PAYMENT_MODES} placeholder="Select Payment Mode" />
        </div>

        <div className="sr-filter-grid" style={{ gridTemplateColumns: 'repeat(6, 1fr)', marginBottom: 10 }}>
          <TextField label="Email Id" value={f.email} onChange={sf('email')} placeholder="Enter Email Id" />
          <SelectField label="Case Type" value={f.caseType} onChange={sf('caseType')} options={SR_CASE_TAGS} placeholder="Select Case Type" />
          <SelectField label="Insurer" value={f.insurer} onChange={sf('insurer')} options={SR_INSURERS} placeholder="Select Insurer" />
          <SelectField label="Policy Medium" value={f.medium} onChange={sf('medium')} options={['Online', 'Offline']} placeholder="Select Medium" />
          <DateField label="Booking Date" value={f.bookingDate} onChange={sf('bookingDate')} />
          <DateRangeField label="Requested Date Range" from={f.requestedFrom} to={f.requestedTo} onFrom={sf('requestedFrom')} onTo={sf('requestedTo')} />
        </div>

        <div className="sr-filter-grid" style={{ gridTemplateColumns: 'repeat(6, 1fr)', marginBottom: 10 }}>
          <TextField label="Status" value={f.status} onChange={sf('status')} placeholder="e.g. Pending, Done…" />
          <SelectField label="Policy Type" value={f.policyType} onChange={sf('policyType')} options={SR_POLICY_TYPES} placeholder="Select Policy Type" />
          <SelectField label="Business Type" value={f.businessType} onChange={sf('businessType')} options={SR_BUSINESS_TYPES} placeholder="Select Business Type" />
          <SelectField label="Source" value={f.source} onChange={sf('source')} options={SR_CHANNEL_TYPES} placeholder="Select Source" />
          <DateRangeField label="Payment Date Range" from={f.paymentFrom} to={f.paymentTo} onFrom={sf('paymentFrom')} onTo={sf('paymentTo')} />
          <SelectField label="Payment Method" value={f.paymentMethod} onChange={sf('paymentMethod')} options={SR_PAYMENT_METHODS} placeholder="Select Payment Method" />
        </div>

        {state.srMoreFiltersOpen && (
          <>
            <hr className="sr-divider" />
            <div className="sr-filter-grid" style={{ gridTemplateColumns: 'repeat(6, 1fr)', marginBottom: 10 }}>
              <SelectField label="Dealership Name" value={f.dealerName} onChange={sf('dealerName')} options={SR_DEALERS} placeholder="Select Dealer" />
              <SelectField label="Channel Type" value={f.channelType} onChange={sf('channelType')} options={SR_CHANNEL_TYPES} placeholder="Select Channel Type" />
              <SelectField label="Sub Source" value={f.subSource} onChange={sf('subSource')} options={SR_SOURCES} placeholder="Select Sub Source" />
              <SelectField label="Assignee" value={f.assignee} onChange={sf('assignee')} options={SR_AGENTS} placeholder="Select Assignee" />
              <SelectField label="Group Type" value={f.groupType} onChange={sf('groupType')} options={SR_GROUP_TYPES} placeholder="Select Group Type" />
              <SelectField label="Retail Type" value={f.retailType} onChange={sf('retailType')} options={SR_RETAIL_TYPES} placeholder="Select Retail Type" />
            </div>
            <div className="sr-filter-grid" style={{ gridTemplateColumns: 'repeat(6, 1fr)', marginBottom: 10 }}>
              <SelectField label="Medical Type" value={f.medicalType} onChange={sf('medicalType')} options={[]} placeholder="Select Medical Type" />
              <SelectField label="Booked By" value={f.bookedBy} onChange={sf('bookedBy')} options={SR_BOOKED_BY} placeholder="Select Booking Type" />
              <DateRangeField label="Cancellation Date Range" from={f.cancellationFrom} to={f.cancellationTo} onFrom={sf('cancellationFrom')} onTo={sf('cancellationTo')} />
              <SelectField label="Dealer MVT" value={f.dealerMVT} onChange={sf('dealerMVT')} options={SR_YES_NO} placeholder="Select Dealer Movement" />
              <SelectField label="Is Bulk Uploaded" value={f.isBulkUploaded} onChange={sf('isBulkUploaded')} options={SR_YES_NO} placeholder="Select" />
              <DateRangeField label="Policy End Date Range" from={f.policyEndFrom} to={f.policyEndTo} onFrom={sf('policyEndFrom')} onTo={sf('policyEndTo')} />
            </div>
          </>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <button className="sr-more-filters-btn" onClick={onSrToggleMoreFilters}>
            {state.srMoreFiltersOpen ? '− Basic Filters' : '+ More Filters'}
          </button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="sr-btn sr-btn-success" onClick={onSrSearch}>Search</button>
            <button className="sr-btn sr-btn-warning" onClick={onSrCount}>Count</button>
            <button className="sr-btn sr-btn-ghost" onClick={onSrResetFilters}>Reset</button>
          </div>
        </div>
      </div>

      <div className="sr-result-bar">
        <span className="sr-result-count">
          {f.requestedFrom && f.requestedTo
            ? `(Data has been shown on request date from ${f.requestedFrom} to ${f.requestedTo})`
            : `${rows.length} request${rows.length !== 1 ? 's' : ''} found`}
        </span>
        <button className="sr-icon-btn" title="Download" onClick={onSrDownload}>⬇</button>
      </div>

      <div className="sr-tabs-line" style={{ marginBottom: 14 }}>
        {SR_QUICK_TABS.map(tab => (
          <button
            key={tab}
            className={`sr-tab-item${state.srActiveTab === tab ? ' active' : ''}`}
            onClick={() => { onSrSetActiveTab(tab); if (tab === 'All') onSrResetFilters(); }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="sr-card" style={{ marginBottom: 0 }}>
        <div className="sr-table-wrap">
          <table className="sr-table">
            <thead>
              <tr>
                <th>Request Id</th>
                <th>Request Date</th>
                <th>Customer Name</th>
                <th>Channel Type</th>
                <th>Sub Source</th>
                <th>Ageing</th>
                <th>Channel Partner / City</th>
                <th>Case Type / Policy Type</th>
                <th>Policy Number</th>
                <th>Insurer Name</th>
                <th>Status</th>
                <th>Assigned to</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr><td colSpan={13}><div className="sr-empty-state">No service requests match your filters.<br />Try adjusting or resetting your search.</div></td></tr>
              )}
              {rows.map(r => {
                const status = `${r.caseType} ${r.statusSel}`.trim();
                const statusColor = SR_STATUS_COLOR[status] || { bg: 'var(--neu-09)', color: 'var(--neu-02)' };
                const ageColor = SR_AGEING_COLOR[r.ageingLevel];
                return (
                  <tr key={r.id}>
                    <td>
                      <button className="sr-row-link" onClick={() => onSrOpenDetails(r.id)}>{r.id}</button>
                    </td>
                    <td style={{ fontSize: 12.5 }}>{r.requestDate}</td>
                    <td>
                      <div style={{ fontWeight: 500 }}>{r.customerName}</div>
                      <div style={{ fontSize: 11, color: 'var(--neu-04)', marginTop: 2 }}>{r.mobile}</div>
                    </td>
                    <td style={{ fontSize: 12.5 }}>{r.channelType} / {r.medium}</td>
                    <td style={{ fontSize: 12.5 }}>{r.subSource}</td>
                    <td>
                      <span className="sr-ageing-dot" style={{ background: ageColor.color }} />
                      <span style={{ marginLeft: 6, fontSize: 12.5 }}>{r.ageingLabel}</span>
                    </td>
                    <td style={{ fontSize: 12.5 }}>{r.channelPartner} / {r.city}</td>
                    <td style={{ fontSize: 12.5 }}>{r.caseTag} / {r.policyTag}</td>
                    <td style={{ fontSize: 12.5 }}>{r.policyNumber}</td>
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
                    <td></td>
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
