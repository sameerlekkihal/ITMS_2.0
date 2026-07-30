import { Fragment } from 'react';
import { useAppStore } from '../../store/AppStore';
import { IP_REJECT_REASONS } from '../../data/mockData';

const btnGhost: React.CSSProperties = { padding: '9px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', background: '#fff', border: '1.5px solid #e5e7eb', color: '#0f1115' };

export function InsurerModals() {
  const {
    state, onIpCloseDetail, onIpOpenRej, onIpApprove, onIpCloseRej, onIpConfirmReject, onIpCloseUpload, onIpConfirmUpload,
    update,
  } = useAppStore();

  const detailUser = state.ipDetailId ? state.ipUsers.find(u => u.id === state.ipDetailId) : null;
  const detailFields = detailUser ? [
    ['Insurer Name', detailUser.insurer], ['Business Vertical', 'Motor'],
    ['Channel Name', detailUser.opBy], ['Channel City', 'New Delhi'],
    ['Zonal Head', 'Jijo John'], ['Access Date', detailUser.date],
    ['GCD/GID Code', detailUser.gcd], ['Requested By', "RM's name"],
  ] : [];
  const detailLogs = detailUser ? [
    { icon: '✅', bg: '#dcfce7', text: `New request raised on ${detailUser.date} by ${detailUser.opBy}` },
    { icon: '🔄', bg: '#ede9fe', text: `Status changed to "${detailUser.status}" by Admin` },
  ] : [];
  const detailPending = detailUser ? detailUser.status.includes('Pending') : false;

  return (
    <>
      {!!detailUser && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,17,21,.55)', zIndex: 400, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '40px 20px', overflowY: 'auto' }}>
          <div style={{ background: '#fff', borderRadius: 14, width: 900, maxWidth: '96vw', margin: 'auto', animation: 'modalIn .3s cubic-bezier(.34,1.4,.64,1)' }}>
            <div style={{ padding: '18px 22px 14px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', background: '#0f1115', borderRadius: '14px 14px 0 0' }}>
              <div><div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Portal Request Details — #{detailUser.id}</div><div style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', marginTop: 3 }}>{detailUser.insurer} · {detailUser.gcd} · Status: {detailUser.status}</div></div>
              <button onClick={onIpCloseDetail} style={{ width: 30, height: 30, borderRadius: 7, border: '1.5px solid rgba(255,255,255,.2)', background: 'transparent', color: '#fff', cursor: 'pointer', fontSize: 18 }}>×</button>
            </div>
            <div style={{ padding: 22, display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: '1px solid #e5e7eb', borderRadius: 9, overflow: 'hidden', alignContent: 'start' }}>
                {detailFields.map(([label, value]) => (
                  <Fragment key={label}>
                    <div style={{ padding: '10px 14px', background: '#f3f4f6', fontSize: 12, fontWeight: 600, color: '#9ca3af', borderBottom: '1px solid #e5e7eb' }}>{label}</div>
                    <div style={{ padding: '10px 14px', fontSize: 13, color: '#0f1115', borderBottom: '1px solid #e5e7eb', borderLeft: '1px solid #e5e7eb' }}>{value}</div>
                  </Fragment>
                ))}
              </div>
              <div>
                <div style={{ border: '1px solid #e5e7eb', borderRadius: 9, overflow: 'hidden' }}>
                  <div style={{ padding: '10px 14px', background: '#f3f4f6', borderBottom: '1px solid #e5e7eb', fontSize: 11, fontWeight: 700, color: '#9ca3af', letterSpacing: .5, textTransform: 'uppercase' }}>Activity Log</div>
                  <div style={{ padding: 12, maxHeight: 360, overflowY: 'auto' }}>
                    {detailLogs.map((l, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, paddingBottom: 14 }}>
                        <div style={{ width: 27, height: 27, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, background: l.bg }}>{l.icon}</div>
                        <div style={{ fontSize: 12, color: '#4b5563', lineHeight: 1.5 }}>{l.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ padding: '14px 22px', borderTop: '1px solid #f3f4f6', background: '#f3f4f6', borderRadius: '0 0 14px 14px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10 }}>
              <button onClick={onIpCloseDetail} style={btnGhost}>Close</button>
              {detailPending && (
                <>
                  <button onClick={onIpOpenRej} style={{ padding: '9px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none', background: '#ef4444', color: '#fff' }}>Reject</button>
                  <button onClick={onIpApprove} style={{ padding: '9px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none', background: '#00b896', color: '#fff' }}>Approve</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {state.ipRejOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,17,21,.6)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 12, width: 440, maxWidth: '95vw', padding: 24, animation: 'modalIn .25s cubic-bezier(.34,1.4,.64,1)' }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Rejection Reason</div>
            <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 18 }}>Please provide a mandatory reason for rejection</div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', letterSpacing: .3, textTransform: 'uppercase', marginBottom: 5 }}>Reason for Rejection <span style={{ color: '#e8192c' }}>*</span></div>
              <select value={state.ipRejReason} onChange={e => update({ ipRejReason: e.target.value })} style={{ width: '100%', padding: '8px 11px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 13, color: '#0f1115', outline: 'none', background: '#fff' }}>
                <option value="">Select reason…</option>{IP_REJECT_REASONS.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button onClick={onIpCloseRej} style={btnGhost}>Cancel</button>
              <button onClick={onIpConfirmReject} style={{ padding: '9px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none', background: '#e8192c', color: '#fff' }}>Save &amp; Reject</button>
            </div>
          </div>
        </div>
      )}

      {state.ipUploadOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,17,21,.55)', zIndex: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 12, width: 420, maxWidth: '95vw', padding: 28, animation: 'modalIn .25s cubic-bezier(.34,1.4,.64,1)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Upload Portal Credentials</h3>
            <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 20 }}>Upload a CSV file with login credential data</p>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', letterSpacing: .3, textTransform: 'uppercase', marginBottom: 5 }}>Select File</div>
              <input type="file" accept=".csv,.xlsx" style={{ fontSize: 13 }} />
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button onClick={onIpCloseUpload} style={btnGhost}>Cancel</button>
              <button onClick={onIpConfirmUpload} style={{ padding: '9px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none', background: '#00b896', color: '#fff' }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
