import { useState, type ReactNode } from 'react';
import { useAppStore } from '../../store/AppStore';
import {
  SR_AGENTS, SR_PENDING_REASONS, SR_PENDING_WITH, SR_CASE_TYPES, SR_STATUS_OPTIONS, SR_STATUS_COLOR,
  SR_INSURERS, SR_BROKERS, CHR_PAYMENT_MODES,
} from '../../data/mockData';
import { maskEmail, maskMobile } from '../../utils/mask';
import { ageFromDob } from '../../utils/date';
import type { SrRequest } from '../../types';

type PolicyEditDraft = Pick<SrRequest,
  'proposerName' | 'nstpReason' | 'insurerName' | 'medium' | 'channelType' | 'policySubSource' | 'dealerName' |
  'proposalNo' | 'businessType' | 'freshDeskId' | 'groupPolicyType' | 'medicalType' | 'preRequestId' | 'brokerName' |
  'localIssuance' | 'crossSell'>;

function policyEditErrors(d: PolicyEditDraft): Partial<Record<keyof PolicyEditDraft, string>> {
  const errors: Partial<Record<keyof PolicyEditDraft, string>> = {};
  if (!d.proposerName.trim()) errors.proposerName = 'Proposer Name is required.';
  else if (!/^[A-Za-z\s]{2,50}$/.test(d.proposerName.trim())) errors.proposerName = 'Alphabetic only, 2–50 characters.';
  if (!d.insurerName) errors.insurerName = 'Insurer Name is required.';
  if (!d.medium) errors.medium = 'Medium is required.';
  if (!d.proposalNo.trim()) errors.proposalNo = 'Proposal No is required.';
  else if (!/^[A-Za-z0-9]+$/.test(d.proposalNo.trim())) errors.proposalNo = 'Alphanumeric only — no spaces or special characters.';
  if (!d.businessType) errors.businessType = 'Business Type is required.';
  if (!d.brokerName) errors.brokerName = 'Broker Name is required.';
  if (!d.localIssuance) errors.localIssuance = 'Local Issuance is required.';
  if (!d.crossSell) errors.crossSell = 'Cross Sell is required.';
  return errors;
}

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
    onSrOpenPolicyEdit, onSrCancelPolicyEdit, onSrSavePolicyDetails,
    onSrOpenPaymentModal, onSrClosePaymentModal, onSrPaymentDraftField, onSrSavePayment, onSrRemovePayment,
  } = useAppStore();

  const [detailTab, setDetailTab] = useState<typeof DETAIL_TABS[number]['key']>('insured');
  const [quoteTab, setQuoteTab] = useState<typeof QUOTE_TABS[number]>('Summary');
  const [quoteOpen, setQuoteOpen] = useState(true);
  const [dealerInfoRevealed, setDealerInfoRevealed] = useState(false);
  const [editDraft, setEditDraft] = useState<PolicyEditDraft | null>(null);

  const r = state.srRequests.find(x => x.id === state.srActiveId);
  if (!r) return null;

  const editErrors = editDraft ? policyEditErrors(editDraft) : {};

  function startEdit() {
    setEditDraft({
      proposerName: r!.proposerName, nstpReason: r!.nstpReason, insurerName: r!.insurerName, medium: r!.medium,
      channelType: r!.channelType, policySubSource: r!.policySubSource, dealerName: r!.dealerName, proposalNo: r!.proposalNo,
      businessType: r!.businessType, freshDeskId: r!.freshDeskId, groupPolicyType: r!.groupPolicyType, medicalType: r!.medicalType,
      preRequestId: r!.preRequestId, brokerName: r!.brokerName, localIssuance: r!.localIssuance, crossSell: r!.crossSell,
    });
    onSrOpenPolicyEdit();
  }
  function saveEdit() {
    if (!editDraft || Object.keys(policyEditErrors(editDraft)).length > 0) return;
    onSrSavePolicyDetails(editDraft);
    setEditDraft(null);
  }
  function cancelEdit() {
    setEditDraft(null);
    onSrCancelPolicyEdit();
  }

  const status = `${r.caseType} ${r.statusSel}`.trim();
  const statusColor = SR_STATUS_COLOR[status] || { bg: 'var(--neu-09)', color: 'var(--neu-02)' };

  const policyFieldDefs: [string, keyof PolicyEditDraft | null, string | undefined, string[]?][] = [
    ['Request ID', null, r.id],
    ['Proposer Name', 'proposerName', r.proposerName],
    ['Case Type', null, r.policyTag],
    ['NSTP Reason', 'nstpReason', r.nstpReason],
    ['Insurer Name', 'insurerName', r.insurerName, SR_INSURERS],
    ['Medium', 'medium', r.medium, ['Online', 'Offline']],
    ['Policy Type', null, r.caseTag],
    ['Plan Type', null, r.planType],
    ['Channel Type', 'channelType', r.channelType],
    ['Policy Sub Source', 'policySubSource', r.policySubSource],
    ['Request Date', null, r.requestDate],
    ['Dealer Name', 'dealerName', r.dealerName],
    ['Proposal No', 'proposalNo', r.proposalNo],
    ['Business Type', 'businessType', r.businessType, ['Retail', 'Group']],
    ['Fresh Desk Id', 'freshDeskId', r.freshDeskId],
    ['Group Policy Type', 'groupPolicyType', r.groupPolicyType],
    ['Medical Type', 'medicalType', r.medicalType],
    ['Pre Request Id', 'preRequestId', r.preRequestId],
    ['Broker Name', 'brokerName', r.brokerName, SR_BROKERS],
    ['Local Issuance', 'localIssuance', r.localIssuance, ['Yes', 'No']],
    ['Cross Sell', 'crossSell', r.crossSell, ['Yes', 'No']],
  ];

  function renderPolicyField(label: string, key: keyof PolicyEditDraft | null, viewValue: string | undefined, options?: string[]) {
    if (editDraft && key) {
      const val = editDraft[key];
      const err = editErrors[key];
      return (
        <div key={label}>
          <div className="sr-field-label">{label}</div>
          {options ? (
            <div className="sr-sel-wrap">
              <select className="sr-sel" style={{ height: 32 }} value={val} onChange={e => setEditDraft(d => d && { ...d, [key]: e.target.value })}>
                <option value="">Select</option>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
              <span className="sr-sel-chevron">▾</span>
            </div>
          ) : (
            <input className="sr-input" style={{ height: 32 }} value={val} onChange={e => setEditDraft(d => d && { ...d, [key]: e.target.value })} />
          )}
          {err && <div style={{ fontSize: 11, color: 'var(--error)', marginTop: 3 }}>{err}</div>}
        </div>
      );
    }
    return <Field key={label} label={label} value={viewValue} />;
  }

  const filteredLog = state.srActivityFilter === 'All' ? r.activityLog : r.activityLog.filter(l => l.type === state.srActivityFilter);
  const amountRemaining = (Number(r.quote.totalPremium) || 0) - r.payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

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
          <SectionCard
            title="Policy Details"
            actions={editDraft ? (
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="sr-btn sr-btn-ghost" style={{ height: 28, fontSize: 11, padding: '0 10px' }} onClick={cancelEdit}>Cancel</button>
                <button
                  className="sr-btn sr-btn-success" style={{ height: 28, fontSize: 11, padding: '0 10px' }}
                  disabled={Object.keys(editErrors).length > 0} onClick={saveEdit}
                >
                  Save
                </button>
              </div>
            ) : (
              <button className="sr-btn sr-btn-success" style={{ height: 28, fontSize: 11, padding: '0 10px' }} onClick={startEdit}>Edit</button>
            )}
          >
            <div className="sr-field-grid">
              {policyFieldDefs.map(([label, key, viewValue, options]) => renderPolicyField(label, key, viewValue, options))}
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
                  <>
                    <div className="sr-field-grid" style={{ marginBottom: 16 }}>
                      <Field label="GCD Code" value={r.dealerDetails.gcdCode} />
                      <Field label="Name" value={r.dealerName} />
                      <Field label="City" value={r.city} />
                      <div>
                        <div className="sr-field-label">Mobile</div>
                        <div className="sr-field-value">{maskMobile(r.dealerDetails.mobile)}</div>
                      </div>
                    </div>
                    <div className="sr-field-grid" style={{ marginBottom: 16 }}>
                      <div>
                        <div className="sr-field-label">Address</div>
                        <div className="sr-field-value">{dealerInfoRevealed ? r.dealerDetails.address : '••••••••••••••••'}</div>
                      </div>
                      <div style={{ alignSelf: 'end' }}>
                        <button className="sr-btn sr-btn-outline" style={{ height: 28, fontSize: 11, padding: '0 10px' }} onClick={() => setDealerInfoRevealed(v => !v)}>
                          {dealerInfoRevealed ? 'Hide Info' : 'Show Info'}
                        </button>
                      </div>
                    </div>
                    <div className="sr-field-grid" style={{ marginBottom: 20 }}>
                      <Field label="RAP" value={r.dealerDetails.rap} />
                      <Field label="M POS GCD" value={r.dealerDetails.mPosGcd} />
                      <Field label="M POS Name" value={r.dealerDetails.mPosName} />
                    </div>
                    <hr className="sr-divider" />
                    <div className="sr-table-wrap">
                      <table className="sr-table" style={{ minWidth: 0 }}>
                        <thead><tr><th>Name</th><th>Email</th><th>Mobile</th></tr></thead>
                        <tbody>
                          {r.dealerDetails.users.map((u, i) => (
                            <tr key={i}><td>{u.name}</td><td>{maskEmail(u.email)}</td><td>{maskMobile(u.mobile)}</td></tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
                {detailTab === 'proposer' && (
                  <div className="sr-field-grid">
                    <Field label="Proposer Name" value={r.proposerName} />
                    <Field label="Gender" value={r.proposerDetails.gender} />
                    <Field label="DOB" value={r.proposerDetails.dob} />
                    <Field label="Marital Status" value={r.proposerDetails.maritalStatus} />
                    <Field label="Mobile Number" value={maskMobile(r.mobile)} />
                    <Field label="Email" value={maskEmail(r.email)} />
                    <Field label="Alt Mobile No" value={r.proposerDetails.altMobile} />
                    <Field label="Alt Email" value={r.proposerDetails.altEmail} />
                    <Field label="Address" value={r.proposerDetails.address} />
                    <Field label="Pin Code" value={r.proposerDetails.pincode} />
                    <Field label="State" value={r.proposerDetails.state} />
                    <Field label="City" value={r.proposerDetails.city} />
                    <Field label="Area" value={r.proposerDetails.area} />
                    <Field label="Adhaar Card" value={r.proposerDetails.aadhaar} />
                    <Field label="Annual Income" value={r.proposerDetails.annualIncome} />
                    <Field label="Occupation" value={r.proposerDetails.occupation} />
                    <Field label="GST Number" value={r.proposerDetails.gstNumber} />
                    <Field label="PAN Card" value={r.proposerDetails.panCard} />
                    <Field label="Nominee Name" value={r.proposerDetails.nomineeName} />
                    <Field label="Nominee Relation" value={r.proposerDetails.nomineeRelation} />
                    <Field label="Nominee Age" value={r.proposerDetails.nomineeAge} />
                  </div>
                )}
                {detailTab === 'medical' && (
                  <div className="sr-table-wrap">
                    <table className="sr-table" style={{ minWidth: 0 }}>
                      <thead><tr><th>Relation</th><th>Name</th><th>Age</th><th>Suffering From</th></tr></thead>
                      <tbody>
                        {r.insuredMembers.map((m, i) => {
                          const age = ageFromDob(m.dob);
                          return (
                            <tr key={i}>
                              <td style={{ textTransform: 'capitalize' }}>{m.relation}</td>
                              <td>{m.name}</td>
                              <td>{age === null ? '—' : age}</td>
                              <td className={m.sufferingFrom === 'N/A' ? 'sr-field-value sr-empty' : ''}>{m.sufferingFrom === 'N/A' ? '—' : m.sufferingFrom}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
                {detailTab === 'payment' && (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                      <div>
                        <div className="sr-field-label">Amount Remaining</div>
                        <div className="sr-field-value" style={{ fontSize: 16 }}>{amountRemaining.toFixed(2)}</div>
                      </div>
                      <button className="sr-btn sr-btn-success" onClick={onSrOpenPaymentModal}>+ Add Payment</button>
                    </div>
                    <div className="sr-table-wrap" style={{ marginBottom: 20 }}>
                      <table className="sr-table" style={{ minWidth: 0 }}>
                        <thead><tr><th>Payment Mode</th><th>Amount</th><th>Sub-Amount</th><th>Cheque Number</th><th>Linked policy</th><th>Actions</th></tr></thead>
                        <tbody>
                          {r.payments.length === 0 && (
                            <tr><td colSpan={6}><div className="sr-empty-state">No payments recorded yet.</div></td></tr>
                          )}
                          {r.payments.map((p, i) => (
                            <tr key={i}>
                              <td>{p.paymentMode}</td>
                              <td>{p.amount}</td>
                              <td className={!p.subAmount ? 'sr-field-value sr-empty' : ''}>{p.subAmount || '—'}</td>
                              <td className={!p.chequeNumber ? 'sr-field-value sr-empty' : ''}>{p.chequeNumber || '—'}</td>
                              <td className={!p.linkedPolicy ? 'sr-field-value sr-empty' : ''}>{p.linkedPolicy || '—'}</td>
                              <td><button className="sr-icon-btn" title="Remove" onClick={() => onSrRemovePayment(i)}>✕</button></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="sr-field-grid" style={{ marginBottom: 16 }}>
                      <Field label="Total APE" value={r.quote.totalPremium} />
                      <Field label="APE Tax" value={r.quote.tax} />
                      <Field label="Gross APE" value={r.quote.totalPremium} />
                    </div>
                    <div className="sr-field-grid" style={{ marginBottom: 16 }}>
                      <Field label="Total Payment Collected" value="N/A" />
                      <Field label="Payment Collected Tax" value="N/A" />
                      <Field label="Gross Payment Collected" value="N/A" />
                    </div>
                    <div className="sr-field-grid" style={{ marginBottom: 16 }}>
                      <Field label="Total Payment EMI" value={r.quote.totalPremium} />
                      <Field label="Payment EMI Tax" value="N/A" />
                      <Field label="Gross Payment EMI" value={r.quote.totalPremium} />
                    </div>
                    <div className="sr-field-grid" style={{ marginBottom: 16 }}>
                      <Field label="Payment Frequency" value="N/A" />
                      <Field label="EMI Type" value="No" />
                      <Field label="ECS Type" value="N/A" />
                    </div>
                    <div className="sr-field-grid" style={{ marginBottom: 16 }}>
                      <Field label="Total Collected For" value="N/A" />
                      <Field label="Cheque Number" value="N/A" />
                      <Field label="Cheque Issuing Bank" value="N/A" />
                    </div>
                    <div className="sr-field-grid">
                      <Field label="Cheque Copy" value="N/A" />
                      <Field label="Payment Method" value={r.quote.paymentMode} />
                    </div>
                  </>
                )}
                {detailTab === 'addons' && (
                  <div className="sr-table-wrap">
                    <table className="sr-table" style={{ minWidth: 0 }}>
                      <thead><tr><th>Name</th><th>Premium</th><th>Tax</th><th>Total Premium</th></tr></thead>
                      <tbody>
                        <tr><td colSpan={4}><div className="sr-empty-state">No addons were selected on this policy.</div></td></tr>
                      </tbody>
                    </table>
                  </div>
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
                    {quoteTab === 'Previous Details' && (
                      <>
                        <div className="sr-field-grid" style={{ marginBottom: 10 }}>
                          <Field label="Previous Policy No." value={r.previousPolicy.previousPolicyNo} />
                          <Field label="Policy Expiry Date" value={r.previousPolicy.policyExpiryDate} />
                          <Field label="Previous Insurer" value={r.previousPolicy.previousInsurer} />
                          <Field label="Port Reason" value={r.previousPolicy.portReason} />
                        </div>
                        <Field label="GIBPL Previous Policy" value={r.previousPolicy.gibplPreviousPolicy} />
                      </>
                    )}
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

      {state.srPaymentModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }} onClick={onSrClosePaymentModal}>
          <div className="sr-card" style={{ width: 480, margin: 0 }} onClick={e => e.stopPropagation()}>
            <div className="sr-card-header">
              <span className="sr-card-title">Add Payment</span>
              <button className="sr-icon-btn" onClick={onSrClosePaymentModal}>✕</button>
            </div>
            <div className="sr-card-body">
              <div className="sr-field-grid-2" style={{ display: 'grid', marginBottom: 14 }}>
                <div>
                  <label className="sr-field-row-label">Payment Mode<span className="sr-required">*</span></label>
                  <div className="sr-sel-wrap">
                    <select className="sr-sel" value={state.srPaymentDraft.paymentMode} onChange={e => onSrPaymentDraftField('paymentMode', e.target.value)}>
                      <option value="">Select Payment Mode</option>
                      {CHR_PAYMENT_MODES.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <span className="sr-sel-chevron">▾</span>
                  </div>
                </div>
                <div>
                  <label className="sr-field-row-label">Amount<span className="sr-required">*</span></label>
                  <input className="sr-input" value={state.srPaymentDraft.amount} onChange={e => onSrPaymentDraftField('amount', e.target.value.replace(/[^0-9.]/g, ''))} placeholder="Enter Total Amount" />
                </div>
              </div>
              <div className="sr-field-grid-2" style={{ display: 'grid', marginBottom: 18 }}>
                <div>
                  <label className="sr-field-row-label">Sub Amount</label>
                  <input className="sr-input" value={state.srPaymentDraft.subAmount} onChange={e => onSrPaymentDraftField('subAmount', e.target.value.replace(/[^0-9.]/g, ''))} placeholder="Enter Amount for Ticket" />
                </div>
                <div>
                  <label className="sr-field-row-label">Transaction Id<span className="sr-required">*</span></label>
                  <input className="sr-input" value={state.srPaymentDraft.transactionId} onChange={e => onSrPaymentDraftField('transactionId', e.target.value)} placeholder="Enter Transaction Id" />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button className="sr-btn sr-btn-success" onClick={onSrSavePayment}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
