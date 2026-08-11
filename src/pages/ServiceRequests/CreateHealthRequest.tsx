import './rome.css';
import { useState, type ReactNode } from 'react';
import { useAppStore } from '../../store/AppStore';
import { chrIsValid, chrEffectiveMembers } from '../../store/AppStore';
import {
  SR_BROKERS, SR_INSURERS, CHR_CASE_TYPES, CHR_GENDERS, CHR_TENURES, CHR_SUM_INSURED,
  CHR_COUNT_OPTIONS, CHR_PLANS_BY_INSURER, CHR_PLAN_TYPE_LOOKUP, CHR_DEALER_LOOKUP, CHR_PINCODE_LOOKUP,
  CHR_PAYMENT_MODES, CHR_PAYMENT_FREQUENCY, CHR_ISSUING_BANKS, CHR_RELATIONSHIPS, CHR_PED_OPTIONS,
} from '../../data/mockData';

function Collapsible({ title, children, defaultOpen = true }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="sr-collapsible">
      <div className="sr-collapsible-header" onClick={() => setOpen(v => !v)}>
        <span>{title}</span>
        <span className={`sr-collapsible-chevron${open ? ' open' : ''}`}>▾</span>
      </div>
      {open && <div className="sr-collapsible-body">{children}</div>}
    </div>
  );
}

function Row({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: ReactNode }) {
  return (
    <div className="sr-form-row">
      <div className="sr-form-row-label">{label}{required && <span className="sr-required">*</span>}</div>
      <div className="sr-form-row-control">
        {children}
        {hint && <div className="sr-derived-hint">{hint}</div>}
      </div>
    </div>
  );
}

function RadioGroup({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="sr-radio-group">
      {options.map(o => (
        <label className="sr-radio-item" key={o}>
          <input type="radio" checked={value === o} onChange={() => onChange(o)} /> {o}
        </label>
      ))}
    </div>
  );
}

function FileField({ fileName, onPick, accept, resetKey }: { fileName: string; onPick: (name: string) => void; accept?: string; resetKey: number }) {
  return (
    <div>
      <input
        key={resetKey} type="file" accept={accept} className="sr-input" style={{ padding: 6 }}
        onChange={e => onPick(e.target.files && e.target.files[0] ? e.target.files[0].name : '')}
      />
      {fileName && <div className="sr-derived-hint" style={{ color: 'var(--success)' }}>✓ {fileName} uploaded</div>}
    </div>
  );
}

function PedPicker({ selected, onToggle }: { selected: string[]; onToggle: (v: string) => void }) {
  const [search, setSearch] = useState('');
  const matches = search.trim() ? CHR_PED_OPTIONS.filter(p => p.toLowerCase().includes(search.toLowerCase()) && !selected.includes(p)).slice(0, 30) : [];
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ border: '1px solid var(--neu-06)', borderRadius: 'var(--r-md)', padding: '6px 8px', display: 'flex', flexWrap: 'wrap', gap: 6, minHeight: 38, alignItems: 'center' }}>
        {selected.map(p => (
          <span key={p} className="sr-chip active" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            {p} <button onClick={() => onToggle(p)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--sec-02)', fontSize: 12 }}>×</button>
          </span>
        ))}
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder={selected.length ? '' : 'Search PED (optional)'} style={{ border: 'none', outline: 'none', flex: 1, minWidth: 100, fontSize: 12.5 }} />
      </div>
      {matches.length > 0 && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', border: '1px solid var(--neu-06)', borderTop: 'none', borderRadius: '0 0 8px 8px', maxHeight: 180, overflowY: 'auto', zIndex: 5, boxShadow: 'var(--sh-md)' }}>
          {matches.map(p => <div key={p} onClick={() => { onToggle(p); setSearch(''); }} style={{ padding: '7px 12px', fontSize: 12.5, cursor: 'pointer' }}>{p}</div>)}
        </div>
      )}
    </div>
  );
}

function isoDaysFromNow(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}
const TODAY_ISO = isoDaysFromNow(0);
const SIX_MONTHS_AGO_ISO = isoDaysFromNow(-183);
const SIX_MONTHS_AHEAD_ISO = isoDaysFromNow(183);

export function CreateHealthRequest() {
  const { state, onChrFormField, onChrMemberField, onChrMemberPedToggle, onChrReset, onChrSubmit, onNavTo } = useAppStore();
  const f = state.chrForm;
  const [resetKey, setResetKey] = useState(0);

  const dealer = CHR_DEALER_LOOKUP[f.dealerCode.toUpperCase()];
  const pin = CHR_PINCODE_LOOKUP[f.pincode];
  const plans = f.insurerName ? CHR_PLANS_BY_INSURER[f.insurerName] || [] : [];
  const planType = f.planName ? CHR_PLAN_TYPE_LOOKUP[f.planName] || '' : '';
  const coverageMembers = f.adults ? `${f.adults} Adult${Number(f.adults) !== 1 ? 's' : ''}${f.children && Number(f.children) > 0 ? `, ${f.children} Child${Number(f.children) !== 1 ? 'ren' : ''}` : ''}` : '';
  const coverageType = f.adults ? (Number(f.adults) + Number(f.children || '0') > 1 ? 'Family Floater' : 'Individual') : '';

  const totalPremium = Number(f.totalPremium) || 0;
  const premiumTax = Math.round(totalPremium * 0.18);
  const grossPremium = totalPremium + premiumTax;

  const isRenewal = f.caseType === 'Renewal';
  const isPort = f.caseType === 'Port Fresh' || f.caseType === 'Port Renewal';
  const effectiveMembers = chrEffectiveMembers(f);
  const canSubmit = chrIsValid(f);

  function handleReset() {
    onChrReset();
    setResetKey(k => k + 1);
  }

  return (
    <div className="sr-root">
      <div className="sr-breadcrumb">
        <a href="#" onClick={e => { e.preventDefault(); onNavTo('home'); }}>Home</a>
        <span>/</span>
        <span>Health Requests</span>
        <span>/</span>
        <span className="current">Create Health Request</span>
      </div>

      <div style={{ maxWidth: 900 }}>
        <div className="sr-radio-group" style={{ marginBottom: 18 }}>
          <label className="sr-radio-item"><input type="radio" checked={f.policyMode === 'retail'} onChange={() => onChrFormField('policyMode', 'retail')} /> Retail Health Policy</label>
          <label className="sr-radio-item"><input type="radio" checked={f.policyMode === 'group'} onChange={() => onChrFormField('policyMode', 'group')} /> Group Health Policy</label>
        </div>

        <Collapsible title="Basic Details">
          <Row label="Broker Name" required>
            <div className="sr-sel-wrap">
              <select className="sr-sel" value={f.brokerName} onChange={e => onChrFormField('brokerName', e.target.value)}>
                <option value="">Select Broker Name</option>
                {SR_BROKERS.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              <span className="sr-sel-chevron">▾</span>
            </div>
          </Row>
          <Row label="Case Type" required>
            <div className="sr-sel-wrap">
              <select className="sr-sel" value={f.caseType} onChange={e => onChrFormField('caseType', e.target.value as typeof f.caseType)}>
                <option value="">Select Case Type</option>
                {CHR_CASE_TYPES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <span className="sr-sel-chevron">▾</span>
            </div>
          </Row>

          {isRenewal && (
            <Row label="Previous Policy Number" required hint={f.previousPolicyNumber && f.previousPolicyNumber.trim().length < 6 ? 'Policy number looks too short — please double-check.' : undefined}>
              <input className="sr-input" value={f.previousPolicyNumber} onChange={e => onChrFormField('previousPolicyNumber', e.target.value)} placeholder="Enter Previous Policy Number" />
            </Row>
          )}
          {isPort && (
            <>
              <Row label="Previous Policy Number" required hint={f.previousPolicyNumber && f.previousPolicyNumber.trim().length < 6 ? 'Policy number looks too short — please double-check.' : undefined}>
                <input className="sr-input" value={f.previousPolicyNumber} onChange={e => onChrFormField('previousPolicyNumber', e.target.value)} placeholder="Enter Previous Policy Number" />
              </Row>
              <Row label="First Inception Date" required>
                <input className="sr-input" type="date" min="2000-01-01" max={TODAY_ISO} value={f.firstInceptionDate} onChange={e => onChrFormField('firstInceptionDate', e.target.value)} />
              </Row>
              <Row label="GIBPL Previous Policy" required>
                <RadioGroup options={['Yes', 'No']} value={f.gibplPreviousPolicy} onChange={v => onChrFormField('gibplPreviousPolicy', v as 'Yes' | 'No')} />
              </Row>
              <Row label="Medical Required" required>
                <RadioGroup options={['Yes', 'No']} value={f.medicalRequired} onChange={v => onChrFormField('medicalRequired', v as 'Yes' | 'No')} />
              </Row>
            </>
          )}

          <Row label="Retail Type" required>
            <RadioGroup options={['RMC', 'RPA']} value={f.retailType} onChange={v => onChrFormField('retailType', v as 'RMC' | 'RPA')} />
          </Row>
          <Row label="Policy Type" required>
            <RadioGroup options={['NSTP', 'STP']} value={f.policyType} onChange={v => onChrFormField('policyType', v as 'NSTP' | 'STP')} />
          </Row>
          <Row label="Policy Doc Available" required>
            <RadioGroup options={['Yes', 'No']} value={f.policyDocAvailable} onChange={v => onChrFormField('policyDocAvailable', v as 'Yes' | 'No')} />
          </Row>
          {f.policyDocAvailable === 'Yes' && (
            <Row label="Upload Policy Document" required>
              <FileField fileName={f.policyDocFileName} onPick={name => onChrFormField('policyDocFileName', name)} accept=".pdf,.jpg,.jpeg,.png" resetKey={resetKey} />
            </Row>
          )}
          <Row label="Insurer Name" required>
            <div className="sr-sel-wrap">
              <select className="sr-sel" value={f.insurerName} onChange={e => { onChrFormField('insurerName', e.target.value); onChrFormField('planName', ''); }}>
                <option value="">Select Insurer</option>
                {SR_INSURERS.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
              <span className="sr-sel-chevron">▾</span>
            </div>
          </Row>
          <Row label="Select Members" required>
            <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div className="sr-field-row-label" style={{ textAlign: 'left', width: 'auto', fontSize: 11, marginBottom: 6 }}>Adults (0 to 5)</div>
                <div className="sr-sel-wrap">
                  <select className="sr-sel" value={f.adults} onChange={e => onChrFormField('adults', e.target.value)}>
                    <option value="">Select Adult</option>
                    {CHR_COUNT_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <span className="sr-sel-chevron">▾</span>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div className="sr-field-row-label" style={{ textAlign: 'left', width: 'auto', fontSize: 11, marginBottom: 6 }}>Child (0 to 5)</div>
                <div className="sr-sel-wrap">
                  <select className="sr-sel" value={f.children} onChange={e => onChrFormField('children', e.target.value)}>
                    <option value="">Select Child</option>
                    {CHR_COUNT_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <span className="sr-sel-chevron">▾</span>
                </div>
              </div>
            </div>
          </Row>
          <Row label="Coverage Members" required>
            <input className="sr-input sr-derived" value={coverageMembers} disabled placeholder="Coverage Members" />
            <div className="sr-derived-hint">Derived automatically from the adults / child counts above</div>
          </Row>
          <Row label="Coverage Type" required>
            <input className="sr-input sr-derived" value={coverageType} disabled placeholder="Coverage Type" />
          </Row>
        </Collapsible>

        <Collapsible title="Dealer Details">
          <Row label="Dealership Name" required>
            <input
              className="sr-input" list="chr-dealer-codes" value={f.dealerCode}
              onChange={e => onChrFormField('dealerCode', e.target.value)}
              placeholder="Enter GcdCode"
            />
            <datalist id="chr-dealer-codes">
              {Object.entries(CHR_DEALER_LOOKUP).map(([code, d]) => <option key={code} value={code}>{d.name} · {d.city}</option>)}
            </datalist>
          </Row>
          <Row label="Dealership City" required>
            <input className="sr-input sr-derived" value={dealer ? dealer.city : ''} disabled placeholder="Dealer City" />
            <div className="sr-derived-hint">Resolved from the GCD code — try GID342750, GID182263, GID277502 or GID221738</div>
          </Row>
          <Row label="Fusion Lead" required>
            <RadioGroup options={['Yes', 'No']} value={f.fusionLead} onChange={v => onChrFormField('fusionLead', v as 'Yes' | 'No')} />
          </Row>
          <Row label="Local Issuance" required>
            <RadioGroup options={['Yes', 'No']} value={f.localIssuance} onChange={v => onChrFormField('localIssuance', v as 'Yes' | 'No')} />
          </Row>
          <Row label="Cross Sell" required>
            <RadioGroup options={['Yes', 'No']} value={f.crossSell} onChange={v => onChrFormField('crossSell', v as 'Yes' | 'No')} />
          </Row>
        </Collapsible>

        <Collapsible title="Proposer and Insured Details">
          <div className="sr-subheading">Proposer Details</div>
          <Row label="Proposer First Name" required>
            <input className="sr-input" value={f.proposerFirstName} onChange={e => onChrFormField('proposerFirstName', e.target.value)} placeholder="First Name" />
          </Row>
          <Row label="Proposer Last Name">
            <input className="sr-input" value={f.proposerLastName} onChange={e => onChrFormField('proposerLastName', e.target.value)} placeholder="Last Name" />
          </Row>
          <Row label="Proposer DOB" required>
            <input className="sr-input" type="date" max={TODAY_ISO} value={f.proposerDob} onChange={e => onChrFormField('proposerDob', e.target.value)} />
          </Row>
          <Row label="Gender" required>
            <div className="sr-sel-wrap">
              <select className="sr-sel" value={f.gender} onChange={e => onChrFormField('gender', e.target.value)}>
                <option value="">Select Gender</option>
                {CHR_GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
              <span className="sr-sel-chevron">▾</span>
            </div>
          </Row>
          <Row label="Email" required>
            <input className="sr-input" type="email" value={f.email} onChange={e => onChrFormField('email', e.target.value)} placeholder="Email" />
          </Row>
          <Row label="Mobile" required>
            <input className="sr-input" value={f.mobile} onChange={e => onChrFormField('mobile', e.target.value)} placeholder="Mobile" />
          </Row>
          <Row label="Address" required>
            <input className="sr-input" value={f.address} onChange={e => onChrFormField('address', e.target.value)} placeholder="Address" />
          </Row>
          <Row label="Pincode" required hint="Try 110001, 400001, 380001, 560001 or 500001 to auto-fill City / State / Area">
            <input className="sr-input" value={f.pincode} onChange={e => onChrFormField('pincode', e.target.value)} placeholder="Pincode" />
          </Row>
          <Row label="City" required>
            <input className="sr-input sr-derived" value={pin ? pin.city : ''} disabled placeholder="City" />
          </Row>
          <Row label="State" required>
            <input className="sr-input sr-derived" value={pin ? pin.state : ''} disabled placeholder="State" />
          </Row>
          <Row label="Area" required>
            <div className="sr-sel-wrap">
              <select className="sr-sel" value={f.area} onChange={e => onChrFormField('area', e.target.value)} disabled={!pin}>
                <option value="">Select Area</option>
                {(pin ? pin.areas : []).map(a => <option key={a} value={a}>{a}</option>)}
              </select>
              <span className="sr-sel-chevron">▾</span>
            </div>
          </Row>
          <div className="sr-checkbox-row">
            <input type="checkbox" checked={f.proposerSameAsInsurer} onChange={e => onChrFormField('proposerSameAsInsurer', e.target.checked)} /> Proposer same as Insured
          </div>

          <hr className="sr-divider" />
          <div className="sr-subheading">Insured Details</div>
          {effectiveMembers.length === 0 ? (
            <div className="sr-empty-state">Select the number of Adults / Children in Basic Details to capture their insured details here.</div>
          ) : (
            effectiveMembers.map((m, i) => {
              const isSyncedProposer = i === 0 && f.proposerSameAsInsurer;
              return (
                <div className="sr-member-card" key={i}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, marginBottom: 10, color: 'var(--neu-02)' }}>
                    {m.memberType} {f.insuredMembers.slice(0, i + 1).filter(x => x.memberType === m.memberType).length}
                    {isSyncedProposer && <span style={{ marginLeft: 8, fontWeight: 400, color: 'var(--sec-02)' }}>· Same as Proposer</span>}
                  </div>
                  <div className="sr-field-grid-2" style={{ display: 'grid', marginBottom: 10 }}>
                    <input className={`sr-input${isSyncedProposer ? ' sr-derived' : ''}`} disabled={isSyncedProposer} value={m.firstName} onChange={e => onChrMemberField(i, 'firstName', e.target.value)} placeholder="First Name *" />
                    <input className={`sr-input${isSyncedProposer ? ' sr-derived' : ''}`} disabled={isSyncedProposer} value={m.lastName} onChange={e => onChrMemberField(i, 'lastName', e.target.value)} placeholder="Last Name" />
                  </div>
                  <div className="sr-field-grid-3" style={{ display: 'grid', marginBottom: 10 }}>
                    <input className={`sr-input${isSyncedProposer ? ' sr-derived' : ''}`} disabled={isSyncedProposer} type="date" max={TODAY_ISO} value={m.dob} onChange={e => onChrMemberField(i, 'dob', e.target.value)} />
                    <div className="sr-sel-wrap">
                      <select className={`sr-sel${isSyncedProposer ? ' sr-derived' : ''}`} disabled={isSyncedProposer} value={m.gender} onChange={e => onChrMemberField(i, 'gender', e.target.value)}>
                        <option value="">Select Gender *</option>
                        {CHR_GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                      <span className="sr-sel-chevron">▾</span>
                    </div>
                    <div className="sr-sel-wrap">
                      <select className={`sr-sel${isSyncedProposer ? ' sr-derived' : ''}`} disabled={isSyncedProposer} value={m.relationship} onChange={e => onChrMemberField(i, 'relationship', e.target.value)}>
                        <option value="">Select Relationship *</option>
                        {CHR_RELATIONSHIPS.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                      <span className="sr-sel-chevron">▾</span>
                    </div>
                  </div>
                  <div className="sr-field-row-label" style={{ textAlign: 'left', width: 'auto', fontSize: 11, marginBottom: 6 }}>PED Details</div>
                  <PedPicker selected={m.pedDetails} onToggle={ped => onChrMemberPedToggle(i, ped)} />
                </div>
              );
            })
          )}
        </Collapsible>

        <Collapsible title="Policy Details">
          <Row label="Plan Name" required hint={!f.insurerName ? 'Select an insurer above to see its plans' : undefined}>
            <div className="sr-sel-wrap">
              <select className="sr-sel" value={f.planName} onChange={e => onChrFormField('planName', e.target.value)} disabled={!f.insurerName}>
                <option value="">Select Plan</option>
                {plans.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <span className="sr-sel-chevron">▾</span>
            </div>
          </Row>
          <Row label="Plan Type" required>
            <input className="sr-input sr-derived" value={planType} disabled placeholder="Plan Type" />
          </Row>
          <Row label="Policy Tenure" required>
            <div className="sr-sel-wrap">
              <select className="sr-sel" value={f.policyTenure} onChange={e => onChrFormField('policyTenure', e.target.value)}>
                <option value="">Select Tenure</option>
                {CHR_TENURES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <span className="sr-sel-chevron">▾</span>
            </div>
          </Row>
          <Row label="Sum Insured" required>
            <div className="sr-sel-wrap">
              <select className="sr-sel" value={f.sumInsured} onChange={e => onChrFormField('sumInsured', e.target.value)}>
                <option value="">Select Amount</option>
                {CHR_SUM_INSURED.map(s => <option key={s} value={s}>₹{Number(s).toLocaleString('en-IN')}</option>)}
              </select>
              <span className="sr-sel-chevron">▾</span>
            </div>
          </Row>
          <Row label="Payment Mode" required>
            <div className="sr-sel-wrap">
              <select className="sr-sel" value={f.paymentMode} onChange={e => onChrFormField('paymentMode', e.target.value as typeof f.paymentMode)}>
                <option value="">Select Payment Mode</option>
                {CHR_PAYMENT_MODES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <span className="sr-sel-chevron">▾</span>
            </div>
          </Row>

          {f.paymentMode === 'Cheque' && (
            <>
              <Row label="Cheque Number" required>
                <input className="sr-input" value={f.chequeNumber} onChange={e => onChrFormField('chequeNumber', e.target.value.replace(/[^0-9A-Za-z]/g, ''))} placeholder="Enter Cheque Number" />
              </Row>
              <Row label="Issuing Bank" required>
                <div className="sr-sel-wrap">
                  <select className="sr-sel" value={f.chequeBank} onChange={e => onChrFormField('chequeBank', e.target.value)}>
                    <option value="">Select Bank</option>
                    {CHR_ISSUING_BANKS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                  <span className="sr-sel-chevron">▾</span>
                </div>
              </Row>
              <Row label="Upload Cheque Copy" required>
                <FileField fileName={f.chequeCopyFileName} onPick={name => onChrFormField('chequeCopyFileName', name)} accept=".pdf,.jpg,.jpeg,.png" resetKey={resetKey} />
              </Row>
              <Row label="Upload Acknowledgement Receipt">
                <FileField fileName={f.chequeAckFileName} onPick={name => onChrFormField('chequeAckFileName', name)} accept=".pdf,.jpg,.jpeg,.png" resetKey={resetKey} />
              </Row>
              <Row label="Cheque Amount" required>
                <input className="sr-input" value={f.chequeAmount} onChange={e => onChrFormField('chequeAmount', e.target.value.replace(/[^0-9]/g, ''))} placeholder="Whole rupees only" />
              </Row>
              <Row label="Cheque Date" hint="Must be within 6 months of today">
                <input className="sr-input" type="date" min={SIX_MONTHS_AGO_ISO} max={SIX_MONTHS_AHEAD_ISO} value={f.chequeDate} onChange={e => onChrFormField('chequeDate', e.target.value)} />
              </Row>
            </>
          )}

          <Row label="Policy Payment Date">
            <input className="sr-input" type="date" value={f.paymentDate} onChange={e => onChrFormField('paymentDate', e.target.value)} />
          </Row>
          <Row label="Proposal Number" required>
            <input className="sr-input" value={f.proposalNumber} onChange={e => onChrFormField('proposalNumber', e.target.value)} placeholder="Proposal Number" />
          </Row>
          <Row label="EMI" required>
            <RadioGroup options={['Yes', 'No']} value={f.emiYesNo} onChange={v => onChrFormField('emiYesNo', v as 'Yes' | 'No')} />
          </Row>
          {f.emiYesNo === 'Yes' && (
            <>
              <Row label="Payment Frequency" required>
                <div className="sr-sel-wrap">
                  <select className="sr-sel" value={f.paymentFrequency} onChange={e => onChrFormField('paymentFrequency', e.target.value)}>
                    <option value="">Select Frequency</option>
                    {CHR_PAYMENT_FREQUENCY.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                  <span className="sr-sel-chevron">▾</span>
                </div>
              </Row>
              <Row label="ECS Type" required>
                <RadioGroup options={['Yes', 'No']} value={f.ecsType} onChange={v => onChrFormField('ecsType', v as 'Yes' | 'No')} />
              </Row>
            </>
          )}
          <Row label="Total Premium" required>
            <input className="sr-input" value={f.totalPremium} onChange={e => onChrFormField('totalPremium', e.target.value.replace(/[^0-9]/g, ''))} placeholder="Enter Total Premium" />
          </Row>
          <Row label="Premium Tax (GST)" required>
            <input className="sr-input sr-derived" value={f.totalPremium ? `₹${premiumTax.toLocaleString('en-IN')} (18% GST)` : ''} disabled placeholder="Premium Tax" />
          </Row>
          <Row label="Gross Premium" required>
            <input className="sr-input sr-derived" value={f.totalPremium ? `₹${grossPremium.toLocaleString('en-IN')}` : ''} disabled placeholder="Gross Premium" />
          </Row>
        </Collapsible>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 4, marginBottom: 40 }}>
          <button className="sr-btn sr-btn-ghost" onClick={handleReset}>Reset</button>
          <button className="sr-btn sr-btn-primary" disabled={!canSubmit} onClick={onChrSubmit}>Create Offline Request</button>
        </div>
      </div>
    </div>
  );
}
