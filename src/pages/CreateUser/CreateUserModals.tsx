import { useAppStore } from '../../store/AppStore';
import { ModalOverlay, SidePanel, LogList } from '../../components/ModalShell';
import { CU_REJECT_REASONS, LOG_ICONS, LOG_DOT_BG } from '../../data/mockData';

const btnGhost: React.CSSProperties = { padding: '10px 18px', background: '#fff', color: '#0f1115', border: '1.5px solid #e5e7eb', borderRadius: 9, fontSize: 13, fontWeight: 500, cursor: 'pointer' };
const btnPrimary: React.CSSProperties = { padding: '10px 18px', background: '#e8192c', color: '#fff', border: 'none', borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: 'pointer' };

export function CreateUserModals() {
  const { state, onCuCloseReject, onCuConfirmReject, onCuCloseLog, onCuCloseEmail, update } = useAppStore();

  const logReq = state.cuLogId ? state.cuRequests.find(r => r.id === state.cuLogId) : null;
  const logItems = logReq ? logReq.logs.map(l => ({ ...l, icon: LOG_ICONS[l.type] || '•', bg: LOG_DOT_BG[l.type] || '#f3f4f6' })) : [];
  const mailReq = state.cuEmailId ? state.cuRequests.find(r => r.id === state.cuEmailId) : null;

  return (
    <>
      {state.cuRejectOpen && (
        <ModalOverlay>
          <div style={{ background: '#fff', borderRadius: 14, width: 460, maxWidth: '95vw', animation: 'modalIn .3s cubic-bezier(.34,1.4,.64,1)' }}>
            <div style={{ padding: '20px 22px 16px', borderBottom: '1px solid #f3f4f6' }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>Reject request</div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{state.cuActiveId} — the requester is notified by email</div>
            </div>
            <div style={{ padding: '18px 22px' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#9ca3af', letterSpacing: .3, textTransform: 'uppercase', marginBottom: 8 }}>Reason <span style={{ color: '#e8192c' }}>*</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {CU_REJECT_REASONS.map(reason => {
                  const on = state.cuRejectReason === reason;
                  return (
                    <label key={reason} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '10px 12px', borderRadius: 9, border: `1.5px solid ${on ? '#e8192c' : '#e5e7eb'}`, background: on ? '#fff0f1' : '#fff', fontSize: 13, cursor: 'pointer' }}>
                      <input type="radio" checked={on} onChange={() => update({ cuRejectReason: reason })} style={{ accentColor: '#e8192c' }} /> {reason}
                    </label>
                  );
                })}
              </div>
            </div>
            <div style={{ padding: '14px 22px', borderTop: '1px solid #f3f4f6', background: '#f3f4f6', display: 'flex', justifyContent: 'flex-end', gap: 10, borderRadius: '0 0 14px 14px' }}>
              <button onClick={onCuCloseReject} style={btnGhost}>Cancel</button>
              <button onClick={onCuConfirmReject} style={btnPrimary}>Reject &amp; notify</button>
            </div>
          </div>
        </ModalOverlay>
      )}

      {state.cuEmailOpen && mailReq && (
        <ModalOverlay>
          <div style={{ background: '#fff', borderRadius: 14, width: 560, maxWidth: '95vw', animation: 'modalIn .3s cubic-bezier(.34,1.4,.64,1)' }}>
            <div style={{ padding: '20px 22px 16px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>✉️</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>User created — email triggered</div>
                <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{mailReq.id} · {mailReq.empCode}</div>
              </div>
            </div>
            <div style={{ padding: '18px 22px' }}>
              <div style={{ border: '1.5px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
                {[['To', `${mailReq.email}`], ['Cc', mailReq.raisedBy], ['Subject', `ITMS access created — ${mailReq.config ? mailReq.config.role : ''}`]].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', gap: 12, padding: '10px 14px', borderBottom: '1px solid #f3f4f6', fontSize: 12.5 }}>
                    <span style={{ width: 56, color: '#9ca3af', flexShrink: 0 }}>{k}</span>
                    <span style={{ fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
                <div style={{ padding: '14px', fontSize: 12.5, lineHeight: 1.7, color: '#4b5563', background: '#f9fafb' }}>
                  ITMS access has been created for employee code <strong>{mailReq.empCode}</strong>.<br />
                  Role: <strong>{mailReq.config ? mailReq.config.role : '—'}</strong> · User type: <strong>{mailReq.config ? mailReq.config.userType : '—'}</strong>{mailReq.config && mailReq.config.region ? <> · Region: <strong>{mailReq.config.region}</strong></> : null}<br />
                  Sign in at itms.insurancedekho.com using your company Google or Zoho account.
                </div>
              </div>
              <div style={{ fontSize: 11.5, color: '#9ca3af', marginTop: 12 }}>Logged against {mailReq.id} and against the new user's activity log.</div>
            </div>
            <div style={{ padding: '14px 22px', borderTop: '1px solid #f3f4f6', background: '#f3f4f6', display: 'flex', justifyContent: 'flex-end', gap: 10, borderRadius: '0 0 14px 14px' }}>
              <button onClick={onCuCloseEmail} style={btnPrimary}>Done</button>
            </div>
          </div>
        </ModalOverlay>
      )}

      {state.cuLogOpen && (
        <SidePanel title="Request Log" subtitle={logReq ? `${logReq.id} · ${logReq.empCode}` : '—'} onClose={onCuCloseLog}>
          <LogList items={logItems} />
        </SidePanel>
      )}
    </>
  );
}
