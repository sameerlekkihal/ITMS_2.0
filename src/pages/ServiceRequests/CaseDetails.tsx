import { useState, type ReactNode } from 'react';
import { useAppStore } from '../../store/AppStore';
import { SR_AGENTS, SR_PENDING_REASONS, SR_PENDING_WITH, SR_CASE_TYPES, SR_STATUS_OPTIONS, SR_STATUS_COLOR } from '../../data/mockData';

function Field({ label, value }: { label: string; value?: string }) {
  const empty = !value || value === 'N/A';
  return (
    <div>
      <div className="sr-field-label">{label}</div>
      <div className={`sr-field-value${empty ? ' sr-empty' : ''}`}>{empty ? '—' : value}</div>
    </div>
  );
}

function SectionCard({ title, children, actions }: { title: string; children: ReactNode; actions?: ReactNode }) {
  return (
    <div className="sr-card">
      <div className="sr-card-header">
        <span className="sr-card-title">{title}</span>
        {actions}
      </div>
      <div className="sr-card-body">{children}</div>
    </div>
  );
}

const DETAIL_TABS = [
  { key: 'insured', label: 'Insured Details' },
  { key: 'dealer', label: 'Dealer Details' },
  { key: 'proposer', label: 'Proposer & Nominee Details' },
  { key: 'medical', label: 'Medical Details' },
  { key: 'payment', label: 'Payment Details' },
  { key: 'addons', label: 'Addons' },
] as const;

const QUOTE_TABS = ['Summary', 'Previous Details', 'Kyc Details'] as const;

const ACTIVITY_FILTERS = ['All', 'edit', 'create', 'assign', 'toggle', 'delete'];
const ACTIVITY_ICON: Record<string, { icon: string; bg: string; color: string }> = {
  edit: { icon: '✏️', bg: 'var(--sec-08)', color: 'var(--sec-02)' },
  create: { icon: '✅', bg: '#dcfce7', color: '#166534' },
  perm: { icon: '🔑', bg: '#ede9fe', color: '#5b21b6' },
  login: { icon: '🔓', bg: '#fef3c7', color: '#92400e' },
  toggle: { icon: '🔄', bg: 'var(--sec-08)', color: 'var(--sec-02)' },
  delete: { icon: '⚠️', bg: '#fee2e2', color: '#991b1b' },
  assign: { icon: '👤', bg: 'var(--neu-09)', color: 'var(--neu-02)' },
};

export function CaseDetails() {
  const {
    state, onSrBackToList, onSrSetCaseType, onSrSetStatus, onSrToggleCommunication,
    onSrPendingReasonChange, onSrClearPendingReason, onSrPendingWithChange, onSrAssignedToChange, onSrSaveCase,
    onSrRemarksDraftChange, onSrSaveRemarks, setSrActivityFilter,
  } = useAppStore();

  const [detailTab, setDetailTab] = useState<typeof DETAIL_TABS[number]['key']>('insured');
  const [quoteTab, setQuoteTab] = useState<typeof QUOTE_TABS[number]>('Summary');
  const [quoteOpen, setQuoteOpen] = useState(true);

  const r = state.srRequests.find(x => x.id === state.srActiveId);
  if (!r) return null;

  const status = `${r.caseType} ${r.statusSel}`.trim();
  const statusColor = SR_STATUS_COLOR[status] || { bg: 'var(--neu-09)', color: 'var(--neu-02)' };

  const policyFields: [string, string | undefined][] = [
    ['Request ID', r.id], ['Proposer Name', r.proposerName], ['Case Type', r.policyTag], ['NSTP Reason', r.nstpReason],
    ['Insurer Name', r.insurerName], ['Medium', r.medium], ['Policy Type', r.caseTag], ['Plan Type', r.planType],
    ['Channel Type', r.channelType], ['Policy Sub Source', r.policySubSource], ['Request Date', r.requestDate], ['Dealer Name', r.dealerName],
    ['Proposal No', r.proposalNo], ['Business Type', r.businessType], ['Fresh Desk Id', r.freshDeskId], ['Group Policy Type', r.groupPolicyType],
    ['Medical Type', r.medicalType], ['Pre Request Id', r.preRequestId], ['Broker Name', r.brokerName], ['Local Issuance', r.localIssuance],
    ['Cross Sell', r.crossSell],
  ];

  const filteredLog = state.srActivityFilter === 'All' ? r.activityLog : r.activityLog.filter(l => l.type === state.srActivityFilter);

  return (
    <div className="sr-root">
      <div className="sr-breadcrumb">
        <a href="#" onClick={e => { e.preventDefault(); onSrBackToList(); }}>Home</a>
        <span>/</span>
        <a href="#" onClick={e => { e.preventDefault(); onSrBackToList(); }}>Health Policy List</a>
        <span>/</span>
        <span className="current">Health Details</span>
      </div>

      <div className="sr-sticky-header">
        <div className="sr-sticky-left">
          <button className="sr-back-link" onClick={onSrBackToList}>← Back</button>
          <span className="sr-sticky-name">{r.customerName}</span>
          <span className="sr-sticky-id">{r.ticketDisplayId}</span>
          <span className="sr-badge" style={{ background: statusColor.bg, color: statusColor.color }}>{status}</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--neu-04)' }}>Requested {r.requestDate}</div>
      </div>

      <div className="sr-page-grid">
        {/* Left column */}
        <div>
          <SectionCard title="Policy Details">
            <div className="sr-field-grid">
              {policyFields.map(([label, value]) => <Field key={label} label={label} value={value} />)}
            </div>
          </SectionCard>

          <div className="sr-card">
            <div className="sr-card-header"><span className="sr-card-title">Details</span></div>
            <div style={{ padding: '0 20px' }}>
              <div className="sr-tabs-line">
                {DETAIL_TABS.map(t => (
                  <button key={t.key} className={`sr-tab-item${detailTab === t.key ? ' active' : ''}`} onClick={() => setDetailTab(t.key)}>{t.label}</button>
                ))}
              </div>
              <div className="sr-tab-content" style={{ paddingBottom: 20 }}>
                {detailTab === 'insured' && (
                  <div className="sr-table-wrap">
                    <table className="sr-table" style={{ minWidth: 0 }}>
                      <thead><tr><th>Relation</th><th>Name</th><th>Gender</th><th>DOB</th><th>Occupation</th><th>Height</th><th>Weight</th><th>Annual Income</th></tr></thead>
                      <tbody>
                        {r.insuredMembers.map((m, i) => (
                          <tr key={i}>
                            <td style={{ textTransform: 'capitalize' }}>{m.relation}</td>
                            <td>{m.name}</td>
                            <td>{m.gender}</td>
                            <td>{m.dob}</td>
                            <td className={!m.occupation ? 'sr-field-value sr-empty' : ''}>{m.occupation || '—'}</td>
                            <td>{m.height}</td>
                            <td>{m.weight}</td>
                            <td className={!m.annualIncome ? 'sr-field-value sr-empty' : ''}>{m.annualIncome || '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {detailTab === 'dealer' && (
                  <div className="sr-field-grid-2" style={{ display: 'grid' }}>
                    <Field label="Dealer Name" value={r.dealerName} />
                    <Field label="Broker Name" value={r.brokerName} />
                  </div>
                )}
                {detailTab === 'proposer' && <Field label="Proposer Name" value={r.proposerName} />}
                {detailTab === 'medical' && (
                  <div className="sr-empty-state">No medical questionnaire has been recorded for this case yet.</div>
                )}
                {detailTab === 'payment' && (
                  <div className="sr-field-grid-2" style={{ display: 'grid' }}>
                    <Field label="Payment Mode" value={r.quote.paymentMode} />
                    <Field label="Total Premium" value={r.quote.totalPremium} />
                  </div>
                )}
                {detailTab === 'addons' && (
                  <div className="sr-empty-state">No addons were selected on this policy.</div>
                )}
              </div>
            </div>
          </div>

          <div className="sr-card">
            <div className="sr-card-header" style={{ cursor: 'pointer' }} onClick={() => setQuoteOpen(v => !v)}>
              <span className="sr-card-title">Quote Summary</span>
              <span style={{ fontSize: 12, color: 'var(--neu-03)' }}>{quoteOpen ? '▴' : '▾'}</span>
            </div>
            {quoteOpen && (
              <>
                <div className="sr-quote-strip">
                  <div className="sr-quote-strip-item"><Field label="Total Premium" value={r.quote.totalPremium} /></div>
                  <div className="sr-quote-strip-item"><Field label="Total Coverage" value={r.quote.totalCoverage} /></div>
                  <div className="sr-quote-strip-item"><Field label="Plan Name" value={r.quote.planName} /></div>
                  <div className="sr-quote-strip-item"><Field label="Tenure" value={r.quote.tenure} /></div>
                </div>
                <div style={{ padding: '0 20px' }}>
                  <div className="sr-tabs-line">
                    {QUOTE_TABS.map(t => <button key={t} className={`sr-tab-item${quoteTab === t ? ' active' : ''}`} onClick={() => setQuoteTab(t)}>{t}</button>)}
                  </div>
                  <div className="sr-tab-content" style={{ paddingBottom: 20 }}>
                    {quoteTab === 'Summary' && (
                      <>
                        <div className="sr-field-grid" style={{ marginBottom: 16 }}>
                          <Field label="Insurer" value={r.quote.insurer} />
                          <Field label="Plan Name" value={r.quote.planName} />
                          <Field label="Base Coverage" value={r.quote.baseCoverage} />
                          <Field label="Topup Coverage" value={r.quote.topupCoverage} />
                        </div>
                        <div className="sr-field-grid" style={{ marginBottom: 16 }}>
                          <Field label="Policy Start Date" value={r.quote.policyStartDate} />
                          <Field label="Policy End Date" value={r.quote.policyEndDate} />
                          <Field label="Premium Amount" value={r.quote.premiumAmount} />
                          <Field label="Deductible Amount" value={r.quote.deductibleAmount} />
                        </div>
                        <div className="sr-field-grid">
                          <Field label="Tax" value={r.quote.tax} />
                          <Field label="Policy Case Id" value={r.quote.policyCaseId} />
                          <Field label="Health Visit Id" value={r.quote.healthVisitId} />
                          <Field label="Insured Members" value={r.insuredMembers.map(m => m.relation).join(', ')} />
                        </div>
                      </>
                    )}
                    {quoteTab === 'Previous Details' && <div className="sr-empty-state">No previous policy details found for this proposer.</div>}
                    {quoteTab === 'Kyc Details' && <div className="sr-empty-state">KYC has not been captured for this case yet.</div>}
                  </div>
                </div>
              </>
            )}
          </div>

          <SectionCard title="Payment Details">
            <div className="sr-field-label" style={{ marginBottom: 8, fontWeight: 600 }}>Transaction Details</div>
            {r.transactions.length === 0 ? (
              <div className="sr-empty-state">No payment transactions recorded yet.</div>
            ) : (
              <div className="sr-table-wrap">
                <table className="sr-table" style={{ minWidth: 0 }}>
                  <thead><tr><th>TXN Time</th><th>Payment Status</th><th>TXN ID</th><th>Payment Proof</th></tr></thead>
                  <tbody>
                    {r.transactions.map((t, i) => (
                      <tr key={i}><td>{t.txnTime}</td><td>{t.status}</td><td style={{ fontFamily: 'var(--mono)' }}>{t.txnId}</td><td className="sr-field-value sr-empty">{t.paymentProof === 'N/A' ? '—' : t.paymentProof}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </SectionCard>

          <SectionCard title="Payment Reminder Details">
            {r.paymentReminders.length === 0 ? (
              <div className="sr-empty-state">No payment reminders scheduled.</div>
            ) : (
              <div className="sr-table-wrap">
                <table className="sr-table" style={{ minWidth: 0 }}>
                  <thead><tr><th>Payment Number</th><th>Payment to be Collected</th><th>Default Due Date</th><th>Actual Received Date</th><th>Status</th></tr></thead>
                  <tbody>
                    {r.paymentReminders.map((p, i) => (
                      <tr key={i}><td>{p.paymentNumber}</td><td>{p.toBeCollected}</td><td>{p.defaultDueDate}</td><td className={!p.actualReceivedDate ? 'sr-field-value sr-empty' : ''}>{p.actualReceivedDate || '—'}</td><td>{p.status}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </SectionCard>
        </div>

        {/* Right column: Case Control Panel */}
        <div className="sr-right-col">
          <div className="sr-card">
            <div className="sr-card-header"><span className="sr-card-title">Case Control</span></div>
            <div className="sr-card-body">
              <div className="sr-field-row">
                <label className="sr-field-row-label">Case Type</label>
                <div className="sr-sel-wrap">
                  <select className="sr-sel" value={r.caseType} onChange={e => onSrSetCaseType(e.target.value)}>
                    {SR_CASE_TYPES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <span className="sr-sel-chevron">▾</span>
                </div>
              </div>
              <div className="sr-field-row">
                <label className="sr-field-row-label">Status</label>
                <div className="sr-sel-wrap">
                  <select className="sr-sel" value={r.statusSel} onChange={e => onSrSetStatus(e.target.value)}>
                    {SR_STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <span className="sr-sel-chevron">▾</span>
                </div>
              </div>
              <hr className="sr-divider" />
              <div className="sr-toggle-wrap" style={{ justifyContent: 'space-between', marginBottom: 14 }}>
                <label className="sr-field-row-label" style={{ marginBottom: 0 }}>Communication to customer</label>
                <button className={`sr-toggle${r.communication ? ' on' : ''}`} onClick={onSrToggleCommunication} aria-label="Toggle communication" />
              </div>
              <div className="sr-field-row">
                <label className="sr-field-row-label">Pending Reason</label>
                <div style={{ display: 'flex', gap: 6 }}>
                  <div className="sr-sel-wrap" style={{ flex: 1 }}>
                    <select className="sr-sel" value={r.pendingReason} onChange={e => onSrPendingReasonChange(e.target.value)}>
                      <option value="">Select a reason</option>
                      {SR_PENDING_REASONS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <span className="sr-sel-chevron">▾</span>
                  </div>
                  {r.pendingReason && <button className="sr-icon-btn" onClick={onSrClearPendingReason} title="Clear">✕</button>}
                </div>
              </div>
              <div className="sr-field-row">
                <label className="sr-field-row-label">Pending With</label>
                <div className="sr-sel-wrap">
                  <select className="sr-sel" value={r.pendingWith} onChange={e => onSrPendingWithChange(e.target.value)}>
                    <option value="">Select pending with</option>
                    {SR_PENDING_WITH.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                  <span className="sr-sel-chevron">▾</span>
                </div>
              </div>
              {state.srDirty && (
                <div className="sr-unsaved-banner">
                  <span>You have unsaved changes</span>
                  <button className="sr-btn sr-btn-primary" style={{ height: 28, fontSize: 11, padding: '0 10px' }} onClick={onSrSaveCase}>Save changes</button>
                </div>
              )}
            </div>
          </div>

          <div className="sr-card">
            <div className="sr-card-header"><span className="sr-card-title">Assigned To</span></div>
            <div className="sr-card-body">
              <div className="sr-sel-wrap">
                <select className="sr-sel" value={r.assignedTo} onChange={e => onSrAssignedToChange(r.id, e.target.value)}>
                  <option value="">Unassigned</option>
                  {SR_AGENTS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
                <span className="sr-sel-chevron">▾</span>
              </div>
            </div>
          </div>

          <div className="sr-card">
            <div className="sr-card-header"><span className="sr-card-title">Tasks</span></div>
            <div className="sr-card-body">
              <div className="sr-empty-state" style={{ padding: '12px 0' }}>No open tasks on this case.</div>
            </div>
          </div>

          <div className="sr-card">
            <div className="sr-card-header"><span className="sr-card-title">Remarks</span></div>
            <div className="sr-card-body">
              {r.remarks && <div className="sr-field-value" style={{ marginBottom: 10, padding: 10, background: 'var(--neu-09)', borderRadius: 'var(--r-md)', fontSize: 12.5 }}>{r.remarks}</div>}
              <textarea className="sr-textarea" rows={3} placeholder="Enter remarks here…" value={state.srRemarksDraft} onChange={e => onSrRemarksDraftChange(e.target.value)} />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                <button className="sr-btn sr-btn-primary" onClick={onSrSaveRemarks}>Save</button>
              </div>
            </div>
          </div>

          <div className="sr-card">
            <div className="sr-card-header">
              <span className="sr-card-title">Activity Log</span>
              <div className="sr-sel-wrap" style={{ width: 120 }}>
                <select className="sr-sel" style={{ height: 30, fontSize: 11 }} value={state.srActivityFilter} onChange={e => setSrActivityFilter(e.target.value)}>
                  {ACTIVITY_FILTERS.map(a => <option key={a} value={a}>{a === 'All' ? 'All activity' : a}</option>)}
                </select>
                <span className="sr-sel-chevron">▾</span>
              </div>
            </div>
            <div className="sr-card-body">
              {filteredLog.length === 0 && <div className="sr-empty-state">No activity of this type yet.</div>}
              {filteredLog.map((l, i) => {
                const ic = ACTIVITY_ICON[l.type] || ACTIVITY_ICON.assign;
                return (
                  <div className="sr-timeline-item" key={i}>
                    <div className="sr-timeline-dot" style={{ background: ic.bg, color: ic.color }}>{ic.icon}</div>
                    <div>
                      <div className="sr-timeline-text">{l.text}</div>
                      <div className="sr-timeline-meta">{l.by} · {l.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
