import './rome.css';
import { useState, type ReactNode } from 'react';
import { useAppStore } from '../../store/AppStore';
import {
  QC_CASES, QC_STATUS_TREE, QC_BOOKED_TREE, qcTatBucket, AB_ROSTER, SR_INSURERS,
  AR_CASE_TYPE_OPTIONS, AR_SOURCE_OPTIONS, AB_PRODUCT_TYPES, QC_ALL_PEOPLE,
} from '../../data/mockData';
import type { QcCase } from '../../types';

type TatKey = 'breached' | 'b0_3' | 'b4_5' | 'b6_10';
interface TreeNode { key: string; label: string; children?: TreeNode[]; }
interface Agg { breached: number; b0_3: number; b4_5: number; b6_10: number; total: number; }

function periodBounds(period: string, customStart: string, customEnd: string): [Date, Date] {
  const now = new Date();
  if (period === 'today') return [new Date(now.getTime() - 1 * 86400000), now];
  if (period === 'week') return [new Date(now.getTime() - 7 * 86400000), now];
  if (period === 'month') return [new Date(now.getTime() - 30 * 86400000), now];
  const start = customStart ? new Date(customStart + 'T00:00:00') : new Date(now.getTime() - 30 * 86400000);
  const end = customEnd ? new Date(customEnd + 'T23:59:59') : now;
  return [start, end];
}
function parseDT(s: string) { return new Date(s.replace(' ', 'T')); }

function collectLeafKeys(node: TreeNode): string[] {
  if (!node.children) return [node.key];
  return node.children.flatMap(collectLeafKeys);
}
function findNode(trees: TreeNode[], key: string): TreeNode | null {
  for (const n of trees) {
    if (n.key === key) return n;
    if (n.children) { const f = findNode(n.children, key); if (f) return f; }
  }
  return null;
}

function aggregateNode(node: TreeNode, cases: QcCase[], valueFn: (c: QcCase) => number): Agg {
  if (!node.children) {
    const matching = cases.filter(c => c.statusKey === node.key);
    const agg: Agg = { breached: 0, b0_3: 0, b4_5: 0, b6_10: 0, total: 0 };
    matching.forEach(c => { const b = qcTatBucket(c.tatDays) as TatKey; agg[b] += valueFn(c); agg.total += valueFn(c); });
    return agg;
  }
  const sums: Agg = { breached: 0, b0_3: 0, b4_5: 0, b6_10: 0, total: 0 };
  node.children.forEach(ch => {
    const cc = aggregateNode(ch, cases, valueFn);
    sums.breached += cc.breached; sums.b0_3 += cc.b0_3; sums.b4_5 += cc.b4_5; sums.b6_10 += cc.b6_10; sums.total += cc.total;
  });
  return sums;
}

function fmtNum(n: number) { return n.toLocaleString('en-IN'); }

export function QcDashboard() {
  const {
    state, setQcPersona, setQcExecViewer, setQcTlViewer, setQcTab, setQcPeriod, setQcCustomRange,
    onQcFilterField, onQcResetFilters, toggleQcRow, onQcOpenDrilldown, onQcCloseDrilldown,
    onQcSelectHierTl, onQcAddTeamLead, onQcRemoveTeamLead, onQcAddExecutive, onQcRemoveExecutive,
  } = useAppStore();

  const [newTlPick, setNewTlPick] = useState('');
  const [newExecPick, setNewExecPick] = useState('');

  const f = state.qcFilters;
  const scoped = state.qcPersona === 'executive'
    ? QC_CASES.filter(c => c.executive === state.qcExecViewer)
    : state.qcPersona === 'tl'
      ? QC_CASES.filter(c => (state.qcHierarchy[state.qcTlViewer] || []).includes(c.executive))
      : QC_CASES.slice();

  const [start, end] = periodBounds(state.qcPeriod, state.qcCustomStart, state.qcCustomEnd);
  const filtered = scoped.filter(c => {
    const dt = parseDT(c.requestDT);
    if (dt < start || dt > end) return false;
    if (f.caseType && c.caseType !== f.caseType) return false;
    if (f.productType && c.productType !== f.productType) return false;
    if (f.source && c.source !== f.source) return false;
    if (f.insurer && c.insurer !== f.insurer) return false;
    if (f.executive && c.executive !== f.executive) return false;
    return true;
  });

  const valueFn = f.premiumOrNop === 'premium' ? (c: QcCase) => c.premium : () => 1;
  const fmtVal = (n: number) => f.premiumOrNop === 'premium' ? `₹${fmtNum(n)}` : fmtNum(n);

  const totalNode: TreeNode = { key: 'total', label: 'Total', children: QC_STATUS_TREE };
  const bookedCount = filtered.filter(c => c.statusKey.startsWith('booked_')).length;
  const cancelledCount = filtered.filter(c => c.statusKey === 'cancelled_na').length;
  const avgTat = filtered.length ? filtered.reduce((a, c) => a + c.tatDays, 0) / filtered.length : 0;
  const onTrackPct = filtered.length ? (filtered.filter(c => c.tatDays <= 3).length / filtered.length) * 100 : 0;
  const completionPct = filtered.length ? ((bookedCount + cancelledCount) / filtered.length) * 100 : 0;

  const tiles = [
    { label: 'Total Cases', value: fmtVal(filtered.reduce((a, c) => a + valueFn(c), 0)) },
    { label: 'Pending (Pipeline)', value: fmtVal(filtered.filter(c => findNode(QC_STATUS_TREE, c.statusKey)).reduce((a, c) => a + valueFn(c), 0)) },
    { label: 'Booked', value: fmtVal(filtered.filter(c => c.statusKey.startsWith('booked_')).reduce((a, c) => a + valueFn(c), 0)) },
    { label: 'Policy Cancelled', value: fmtVal(filtered.filter(c => c.statusKey === 'cancelled_na').reduce((a, c) => a + valueFn(c), 0)) },
    { label: 'Avg. TAT', value: `${avgTat.toFixed(1)} days` },
    { label: 'On-track (0–3d)', value: `${onTrackPct.toFixed(1)}%` },
    { label: 'Completion Rate', value: `${completionPct.toFixed(1)}%` },
  ];

  function Cell({ value, statusKey, statusLabel, bucket }: { value: number; statusKey: string; statusLabel: string; bucket: TatKey | 'total' }) {
    if (value === 0) return <td style={{ textAlign: 'right', color: 'var(--neu-05)', fontWeight: 600 }}>0</td>;
    return (
      <td style={{ textAlign: 'right' }}>
        <button className="sr-row-link" style={{ fontFamily: 'var(--font)', fontWeight: 700 }} onClick={() => onQcOpenDrilldown(statusKey, statusLabel, bucket)}>{fmtVal(value)}</button>
      </td>
    );
  }

  function renderRows(nodes: TreeNode[], depth: number): ReactNode[] {
    return nodes.flatMap(node => {
      const agg = aggregateNode(node, filtered, valueFn);
      const collapsed = state.qcCollapsedRows.includes(node.key);
      const row = (
        <tr key={node.key}>
          <td style={{ paddingLeft: 14 + depth * 20, fontWeight: node.children ? 700 : 500 }}>
            {node.children && (
              <button onClick={() => toggleQcRow(node.key)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--sec-00)', marginRight: 6, fontSize: 11 }}>
                {collapsed ? '▸' : '▾'}
              </button>
            )}
            {node.label}
          </td>
          <Cell value={agg.breached} statusKey={node.key} statusLabel={node.label} bucket="breached" />
          <Cell value={agg.b0_3} statusKey={node.key} statusLabel={node.label} bucket="b0_3" />
          <Cell value={agg.b4_5} statusKey={node.key} statusLabel={node.label} bucket="b4_5" />
          <Cell value={agg.b6_10} statusKey={node.key} statusLabel={node.label} bucket="b6_10" />
          <Cell value={agg.total} statusKey={node.key} statusLabel={node.label} bucket="total" />
        </tr>
      );
      if (!node.children || collapsed) return [row];
      return [row, ...renderRows(node.children, depth + 1)];
    });
  }

  const drill = state.qcDrilldown;
  let drillCases: QcCase[] = [];
  if (drill) {
    const node = findNode([totalNode, ...QC_BOOKED_TREE], drill.statusKey);
    const leafKeys = node ? collectLeafKeys(node) : [drill.statusKey];
    drillCases = filtered.filter(c => leafKeys.includes(c.statusKey) && (drill.tatBucket === 'total' || qcTatBucket(c.tatDays) === drill.tatBucket));
  }

  const tlPool = Object.keys(state.qcHierarchy);
  const mappedAll = Object.values(state.qcHierarchy).flat();
  const newTlOptions = QC_ALL_PEOPLE.filter(p => !tlPool.includes(p) && !mappedAll.includes(p));
  const newExecOptions = QC_ALL_PEOPLE.filter(p => !tlPool.includes(p) && !mappedAll.includes(p));

  return (
    <div className="sr-root">
      <div className="sr-breadcrumb">
        <a href="#" onClick={e => e.preventDefault()}>Home</a>
        <span>/</span>
        <span>Health Requests</span>
        <span>/</span>
        <span className="current">QC Dashboard</span>
      </div>

      <div className="sr-tabs-line" style={{ marginBottom: 18 }}>
        <button className={`sr-tab-item${state.qcTab === 'dashboard' ? ' active' : ''}`} onClick={() => setQcTab('dashboard')}>Dashboard</button>
        <button className={`sr-tab-item${state.qcTab === 'hierarchy' ? ' active' : ''}`} onClick={() => setQcTab('hierarchy')}>Hierarchy</button>
      </div>

      {state.qcTab === 'dashboard' && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--neu-03)', textTransform: 'uppercase' }}>Viewing as</span>
              <div className="sr-chip-row">
                {(['executive', 'tl', 'manager'] as const).map(p => (
                  <button key={p} className={`sr-chip${state.qcPersona === p ? ' active' : ''}`} onClick={() => setQcPersona(p)}>
                    {p === 'executive' ? 'Executive' : p === 'tl' ? 'Team Lead' : 'Manager'}
                  </button>
                ))}
              </div>
              {state.qcPersona === 'executive' && (
                <div className="sr-sel-wrap" style={{ width: 180 }}>
                  <select className="sr-sel" value={state.qcExecViewer} onChange={e => setQcExecViewer(e.target.value)}>
                    {AB_ROSTER.map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                  <span className="sr-sel-chevron">▾</span>
                </div>
              )}
              {state.qcPersona === 'tl' && (
                <div className="sr-sel-wrap" style={{ width: 180 }}>
                  <select className="sr-sel" value={state.qcTlViewer} onChange={e => setQcTlViewer(e.target.value)}>
                    {tlPool.map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                  <span className="sr-sel-chevron">▾</span>
                </div>
              )}
            </div>
            {(state.qcPersona === 'tl' || state.qcPersona === 'manager') && (
              <button className="sr-btn sr-btn-outline" onClick={() => setQcTab('hierarchy')}>👥 Manage Team Hierarchy</button>
            )}
          </div>

          <div className="sr-card">
            <div className="sr-card-header">
              <span className="sr-card-title">Summary</span>
              <div className="sr-chip-row">
                {([['today', 'Today'], ['week', 'This Week'], ['month', 'This Month'], ['custom', 'Custom']] as const).map(([k, l]) => (
                  <button key={k} className={`sr-chip${state.qcPeriod === k ? ' active' : ''}`} onClick={() => setQcPeriod(k)}>{l}</button>
                ))}
                {state.qcPeriod === 'custom' && (
                  <>
                    <input className="sr-input" type="date" style={{ height: 32, width: 130 }} value={state.qcCustomStart} onChange={e => setQcCustomRange(e.target.value, state.qcCustomEnd)} />
                    <input className="sr-input" type="date" style={{ height: 32, width: 130 }} value={state.qcCustomEnd} onChange={e => setQcCustomRange(state.qcCustomStart, e.target.value)} />
                  </>
                )}
              </div>
            </div>
            <div className="sr-card-body">
              <div className="sr-quote-strip" style={{ margin: 0, gridTemplateColumns: 'repeat(7,1fr)', background: 'transparent', padding: 0 }}>
                {tiles.map(t => (
                  <div key={t.label} style={{ border: '1px solid var(--neu-08)', borderRadius: 'var(--r-md)', padding: '12px 14px' }}>
                    <div className="sr-field-label" style={{ color: 'var(--sec-02)', textTransform: 'uppercase', fontSize: 10 }}>{t.label}</div>
                    <div style={{ fontSize: 18, fontWeight: 700, marginTop: 5 }}>{t.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="sr-filter-card">
            <div className="sr-filter-grid">
              <div>
                <label className="sr-field-row-label">Case Type</label>
                <div className="sr-sel-wrap">
                  <select className="sr-sel" value={f.caseType} onChange={e => onQcFilterField('caseType', e.target.value)}>
                    <option value="">All</option>
                    {AR_CASE_TYPE_OPTIONS.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <span className="sr-sel-chevron">▾</span>
                </div>
              </div>
              <div>
                <label className="sr-field-row-label">Select Premium/NOP</label>
                <div className="sr-sel-wrap">
                  <select className="sr-sel" value={f.premiumOrNop} onChange={e => onQcFilterField('premiumOrNop', e.target.value)}>
                    <option value="nop">NOP</option>
                    <option value="premium">Premium</option>
                  </select>
                  <span className="sr-sel-chevron">▾</span>
                </div>
              </div>
              <div>
                <label className="sr-field-row-label">Product Type</label>
                <div className="sr-sel-wrap">
                  <select className="sr-sel" value={f.productType} onChange={e => onQcFilterField('productType', e.target.value)}>
                    <option value="">Select Product Type</option>
                    {AB_PRODUCT_TYPES.filter(p => p !== 'All').map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                  <span className="sr-sel-chevron">▾</span>
                </div>
              </div>
              <div>
                <label className="sr-field-row-label">Source</label>
                <div className="sr-sel-wrap">
                  <select className="sr-sel" value={f.source} onChange={e => onQcFilterField('source', e.target.value)}>
                    <option value="">Select</option>
                    {AR_SOURCE_OPTIONS.filter(s => s !== 'All').map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <span className="sr-sel-chevron">▾</span>
                </div>
              </div>
              <div>
                <label className="sr-field-row-label">Executive</label>
                <div className="sr-sel-wrap">
                  <select className="sr-sel" value={f.executive} onChange={e => onQcFilterField('executive', e.target.value)}>
                    <option value="">Select</option>
                    {AB_ROSTER.map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                  <span className="sr-sel-chevron">▾</span>
                </div>
              </div>
            </div>
            <div className="sr-filter-grid" style={{ marginTop: 10, gridTemplateColumns: '1fr' }}>
              <div style={{ maxWidth: 240 }}>
                <label className="sr-field-row-label">Insurer</label>
                <div className="sr-sel-wrap">
                  <select className="sr-sel" value={f.insurer} onChange={e => onQcFilterField('insurer', e.target.value)}>
                    <option value="">Select</option>
                    {SR_INSURERS.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                  <span className="sr-sel-chevron">▾</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
              <button className="sr-btn sr-btn-ghost" onClick={onQcResetFilters}>Reset</button>
            </div>
          </div>

          <div className="sr-card" style={{ marginBottom: 0 }}>
            <div className="sr-card-header"><span className="sr-card-title">Status &amp; TAT Breach Matrix</span></div>
            <div className="sr-table-wrap">
              <table className="sr-table" style={{ minWidth: 720 }}>
                <thead>
                  <tr>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>TAT Breached (10+ Days)</th>
                    <th style={{ textAlign: 'right' }}>0-3 Days</th>
                    <th style={{ textAlign: 'right' }}>4-5 Days</th>
                    <th style={{ textAlign: 'right' }}>6-10 Days</th>
                    <th style={{ textAlign: 'right' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {renderRows(QC_STATUS_TREE, 0)}
                  <tr style={{ borderTop: '2px solid var(--neu-06)' }}>
                    <td style={{ paddingLeft: 14, fontWeight: 700 }}>Total</td>
                    {(() => { const agg = aggregateNode(totalNode, filtered, valueFn); return (
                      <>
                        <Cell value={agg.breached} statusKey="total" statusLabel="Total" bucket="breached" />
                        <Cell value={agg.b0_3} statusKey="total" statusLabel="Total" bucket="b0_3" />
                        <Cell value={agg.b4_5} statusKey="total" statusLabel="Total" bucket="b4_5" />
                        <Cell value={agg.b6_10} statusKey="total" statusLabel="Total" bucket="b6_10" />
                        <Cell value={agg.total} statusKey="total" statusLabel="Total" bucket="total" />
                      </>
                    ); })()}
                  </tr>
                  {renderRows(QC_BOOKED_TREE, 0)}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {state.qcTab === 'hierarchy' && (
        <div className="sr-card">
          <div className="sr-card-header">
            <span className="sr-card-title">Team Lead ↔ Executive Mapping</span>
          </div>
          <div className="sr-card-body">
            <p style={{ fontSize: 12.5, color: 'var(--neu-04)', marginBottom: 16 }}>Maps executives to Team Leads. This mapping is the source of truth for how Team Lead and Manager views are scoped.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div>
                <div className="sr-field-label" style={{ marginBottom: 10 }}>TEAM LEADS</div>
                {tlPool.length === 0 && <div className="sr-empty-state">No Team Leads yet — add one below.</div>}
                {tlPool.map(tl => (
                  <div key={tl} onClick={() => onQcSelectHierTl(tl)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 12px', border: `1.5px solid ${tl === state.qcHierSelectedTl ? 'var(--sec-00)' : 'var(--neu-07)'}`, background: tl === state.qcHierSelectedTl ? 'var(--sec-09)' : '#fff', borderRadius: 'var(--r-md)', marginBottom: 6, cursor: 'pointer', fontSize: 13, fontWeight: tl === state.qcHierSelectedTl ? 700 : 500 }}>
                    {tl}
                    <button onClick={e => { e.stopPropagation(); onQcRemoveTeamLead(tl); }} style={{ border: 'none', background: 'none', color: 'var(--error)', cursor: 'pointer', fontSize: 14 }} title="Remove Team Lead">✕</button>
                  </div>
                ))}
                <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                  <div className="sr-sel-wrap" style={{ flex: 1 }}>
                    <select className="sr-sel" value={newTlPick} onChange={e => setNewTlPick(e.target.value)}>
                      <option value="">{newTlOptions.length ? 'Select person' : 'No eligible people'}</option>
                      {newTlOptions.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <span className="sr-sel-chevron">▾</span>
                  </div>
                  <button className="sr-btn sr-btn-primary" disabled={!newTlPick} onClick={() => { onQcAddTeamLead(newTlPick); setNewTlPick(''); }}>+ Add Team Lead</button>
                </div>
              </div>
              <div>
                <div className="sr-field-label" style={{ marginBottom: 10 }}>{state.qcHierSelectedTl ? `EXECUTIVES MAPPED TO ${state.qcHierSelectedTl.toUpperCase()}` : 'SELECT A TEAM LEAD'}</div>
                {(state.qcHierarchy[state.qcHierSelectedTl] || []).length === 0 && <div className="sr-empty-state">No executives mapped yet.</div>}
                {(state.qcHierarchy[state.qcHierSelectedTl] || []).map(ex => (
                  <div key={ex} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 12px', border: '1.5px solid var(--neu-07)', borderRadius: 'var(--r-md)', marginBottom: 6, fontSize: 13 }}>
                    {ex}
                    <button onClick={() => onQcRemoveExecutive(state.qcHierSelectedTl, ex)} style={{ border: 'none', background: 'none', color: 'var(--error)', cursor: 'pointer', fontSize: 14 }} title="Unmap executive">✕</button>
                  </div>
                ))}
                <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                  <div className="sr-sel-wrap" style={{ flex: 1 }}>
                    <select className="sr-sel" disabled={!state.qcHierSelectedTl} value={newExecPick} onChange={e => setNewExecPick(e.target.value)}>
                      <option value="">{newExecOptions.length ? 'Select person' : 'No eligible people'}</option>
                      {newExecOptions.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <span className="sr-sel-chevron">▾</span>
                  </div>
                  <button className="sr-btn sr-btn-primary" disabled={!newExecPick || !state.qcHierSelectedTl} onClick={() => { onQcAddExecutive(newExecPick); setNewExecPick(''); }}>+ Add Executive</button>
                </div>
              </div>
            </div>
            <div className="sr-derived-hint" style={{ marginTop: 16 }}>Selectable names are drawn only from the pool of people working in Health Operations. Removing a Team Lead un-maps their executives (shown as Unassigned) rather than deleting them.</div>
          </div>
        </div>
      )}

      {drill && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,17,21,.5)', zIndex: 400, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '40px 20px', overflowY: 'auto' }}>
          <div style={{ background: '#fff', borderRadius: 'var(--r-lg)', width: 900, maxWidth: '96vw', fontFamily: 'var(--font)' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--neu-08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{drill.statusLabel}</h3>
                <div style={{ fontSize: 12, color: 'var(--neu-04)', marginTop: 3 }}>
                  {drill.tatBucket === 'total' ? 'All TAT buckets' : drill.tatBucket === 'breached' ? 'TAT Breached (10+ Days)' : drill.tatBucket === 'b0_3' ? '0-3 Days' : drill.tatBucket === 'b4_5' ? '4-5 Days' : '6-10 Days'} · {drillCases.length} case{drillCases.length !== 1 ? 's' : ''}
                </div>
              </div>
              <button onClick={onQcCloseDrilldown} style={{ border: 'none', background: 'none', fontSize: 20, cursor: 'pointer', color: 'var(--neu-03)' }}>×</button>
            </div>
            <div className="sr-table-wrap" style={{ maxHeight: '60vh' }}>
              <table className="sr-table">
                <thead>
                  <tr><th>Lead Id</th><th>Request Id</th><th>Request Date</th><th>Customer Name</th><th>Executive</th><th>Insurer</th><th>Case Type</th><th>Source</th><th>TAT</th></tr>
                </thead>
                <tbody>
                  {drillCases.length === 0 && <tr><td colSpan={9}><div className="sr-empty-state">No cases match.</div></td></tr>}
                  {drillCases.map(c => (
                    <tr key={c.id}>
                      <td style={{ fontFamily: 'var(--mono)' }}>{c.leadId}</td>
                      <td style={{ fontFamily: 'var(--mono)' }}>{c.requestId}</td>
                      <td>{c.requestDT}</td>
                      <td>{c.customerName}</td>
                      <td>{c.executive}</td>
                      <td>{c.insurer}</td>
                      <td>{c.caseType}</td>
                      <td>{c.source}</td>
                      <td>{c.tatDays} day{c.tatDays !== 1 ? 's' : ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
