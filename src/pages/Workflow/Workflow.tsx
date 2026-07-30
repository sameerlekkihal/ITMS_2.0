import { useAppStore } from '../../store/AppStore';
import { WF } from '../../data/mockData';

const chip = (active: boolean): React.CSSProperties => ({
  padding: '7px 16px', borderRadius: 7, fontSize: 13, fontWeight: 500, cursor: 'pointer',
  border: `1.5px solid ${active ? '#00b896' : '#e5e7eb'}`, background: active ? '#00b896' : '#fff', color: active ? '#fff' : '#4b5563',
});

export function Workflow() {
  const {
    state, onWfResetVertical, onWfResetProduct, onWfPickV, onWfPickP, onWfPickSub, onWfToggleSt,
    onWfToggleAll, onWfSetActiveTab, onWfToggleTransition, onWfCheckAll, onWfClearAll, onWfSave, wfOvrFor,
  } = useAppStore();

  const { wfV, wfP, wfSub, wfSel, wfActiveTab } = state;
  const pData = wfV && wfP ? WF[wfV][wfP] : null;

  const wfLabel = wfV || '—';
  const wfPLabel = wfSub ? `${wfP} › ${wfSub}` : (wfP || '—');
  const wfSLabel = wfSel.length === 0 ? '—' : (wfSel.length === 1 ? wfSel[0] : `${wfSel.length} statuses`);

  const showVertical = !wfV;
  const showProduct = !!wfV;
  const showSub = !!(pData && pData.sub);
  const showStatus = !!(wfV && wfP && (!pData!.sub || wfSub));
  const showEditor = wfSel.length > 0 && !!wfActiveTab;

  const others = pData && wfActiveTab ? pData.statuses.filter(x => x !== wfActiveTab) : [];
  const checked = pData && wfActiveTab ? wfOvrFor(wfV!, wfP!, wfActiveTab) : [];
  const editorPath = [wfV, wfP, wfSub].filter(Boolean).join(' › ');

  return (
    <div style={{ animation: 'pageIn .4s ease forwards' }}>
      <div style={{ marginBottom: 24 }}><h2 style={{ fontSize: 20, fontWeight: 700 }}>Workflow Process</h2><p style={{ fontSize: 13, color: '#9ca3af', marginTop: 3 }}>Define allowed status transitions per vertical and product</p></div>

      <div style={{ display: 'flex', background: '#fff', borderRadius: 12, border: '1.5px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,.07)', marginBottom: 16, overflow: 'hidden' }}>
        <div onClick={onWfResetVertical} style={{ flex: 1, padding: '14px 20px', borderRight: '1px solid #e5e7eb', cursor: 'pointer', background: !wfV ? '#0f1115' : 'transparent' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: .8, textTransform: 'uppercase', color: !wfV ? 'rgba(255,255,255,.4)' : '#9ca3af', marginBottom: 5 }}>Vertical</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: !wfV ? '#fff' : '#0f1115' }}>{wfLabel}</div>
        </div>
        <div onClick={onWfResetProduct} style={{ flex: 1, padding: '14px 20px', cursor: 'pointer', background: wfV && !wfP ? '#0f1115' : 'transparent' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: .8, textTransform: 'uppercase', color: wfV && !wfP ? 'rgba(255,255,255,.4)' : '#9ca3af', marginBottom: 5 }}>Product</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: wfV && !wfP ? '#fff' : '#0f1115' }}>{wfPLabel}</div>
        </div>
        <div style={{ flex: 1, padding: '14px 20px', background: wfSel.length ? '#0f1115' : 'transparent' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: .8, textTransform: 'uppercase', color: wfSel.length ? 'rgba(255,255,255,.4)' : '#9ca3af', marginBottom: 5 }}>Status</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: wfSel.length ? '#fff' : '#0f1115' }}>{wfSLabel}</div>
        </div>
      </div>

      {showVertical && (
        <div style={{ background: '#fff', borderRadius: 12, border: '1.5px solid #e5e7eb', boxShadow: '0 4px 16px rgba(0,0,0,.10)', marginBottom: 16, overflow: 'hidden' }}>
          <div style={{ padding: '11px 18px', borderBottom: '1px solid #e5e7eb', fontSize: 11, fontWeight: 700, letterSpacing: .5, textTransform: 'uppercase', color: '#9ca3af' }}>Select Vertical</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '14px 18px' }}>
            {Object.keys(WF).map(v => <div key={v} onClick={() => onWfPickV(v)} style={chip(v === wfV)}>{v}</div>)}
          </div>
        </div>
      )}

      {showProduct && (
        <>
          <div style={{ background: '#fff', borderRadius: 12, border: '1.5px solid #e5e7eb', boxShadow: '0 4px 16px rgba(0,0,0,.10)', marginBottom: 16, overflow: 'hidden' }}>
            <div style={{ padding: '11px 18px', borderBottom: '1px solid #e5e7eb', fontSize: 11, fontWeight: 700, letterSpacing: .5, textTransform: 'uppercase', color: '#9ca3af' }}>{wfV} — Select Product</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '14px 18px' }}>
              {Object.keys(WF[wfV!]).map(pk => (
                <div key={pk} onClick={() => onWfPickP(pk)} style={chip(pk === wfP)}>
                  {pk}
                  {!!WF[wfV!][pk].sub && <sup style={{ fontSize: 9, background: '#e6faf6', color: '#00b896', padding: '1px 5px', borderRadius: 8, marginLeft: 5, fontWeight: 700 }}>sub</sup>}
                </div>
              ))}
            </div>
          </div>
          {showSub && (
            <div style={{ background: '#fff', borderRadius: 12, border: '1.5px solid #e5e7eb', boxShadow: '0 4px 16px rgba(0,0,0,.10)', marginBottom: 16, overflow: 'hidden' }}>
              <div style={{ padding: '11px 18px', borderBottom: '1px solid #e5e7eb', fontSize: 11, fontWeight: 700, letterSpacing: .5, textTransform: 'uppercase', color: '#9ca3af' }}>Select Sub-Product</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '14px 18px' }}>
                {pData!.sub!.map(sp => <div key={sp} onClick={() => onWfPickSub(sp)} style={chip(sp === wfSub)}>{sp}</div>)}
              </div>
            </div>
          )}
        </>
      )}

      {showStatus && pData && (
        <div style={{ background: '#fff', borderRadius: 12, border: '1.5px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,.07)', marginBottom: 16, overflow: 'hidden' }}>
          <div style={{ padding: '12px 20px', background: '#0f1115', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div><div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Select Status to Configure</div><div style={{ fontSize: 11, color: 'rgba(255,255,255,.35)', marginTop: 2 }}>You can select multiple statuses and configure each</div></div>
            <button onClick={onWfToggleAll} style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,.5)', background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.15)', borderRadius: 6, padding: '5px 12px', cursor: 'pointer' }}>{wfSel.length === pData.statuses.length ? 'Deselect All' : 'Select All'}</button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '16px 20px' }}>
            {pData.statuses.map(st => {
              const cnt = wfOvrFor(wfV!, wfP!, st).length;
              const on = wfSel.includes(st);
              return (
                <div key={st} onClick={() => onWfToggleSt(st)} style={{ padding: '8px 16px', borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, border: `1.5px solid ${on ? '#0f1115' : '#e5e7eb'}`, background: on ? '#0f1115' : '#fff', color: on ? '#fff' : '#4b5563' }}>
                  {st}<span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 20, background: on ? 'rgba(255,255,255,.15)' : '#e5e7eb', color: on ? 'rgba(255,255,255,.6)' : '#9ca3af', fontWeight: 700 }}>{cnt}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {showEditor && pData && wfActiveTab && (
        <div style={{ background: '#fff', borderRadius: 12, border: '1.5px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,.07)', overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', background: '#0f1115', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div><div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Configure Transitions</div><div style={{ fontSize: 11, color: 'rgba(255,255,255,.35)', marginTop: 3 }}>{editorPath}</div></div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={onWfCheckAll} style={{ fontSize: 12, padding: '7px 14px', color: 'rgba(255,255,255,.7)', border: '1.5px solid rgba(255,255,255,.2)', background: 'transparent', borderRadius: 9, cursor: 'pointer' }}>Select All</button>
              <button onClick={onWfClearAll} style={{ fontSize: 12, padding: '7px 14px', color: 'rgba(255,255,255,.7)', border: '1.5px solid rgba(255,255,255,.2)', background: 'transparent', borderRadius: 9, cursor: 'pointer' }}>Clear All</button>
              <button onClick={onWfSave} style={{ padding: '7px 14px', background: '#e8192c', color: '#fff', border: 'none', borderRadius: 9, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Save Changes</button>
            </div>
          </div>
          <div style={{ display: 'flex', overflowX: 'auto', borderBottom: '2px solid #e5e7eb', background: '#f3f4f6' }}>
            {wfSel.map(st => {
              const active = st === wfActiveTab;
              return (
                <div key={st} onClick={() => onWfSetActiveTab(st)} style={{ padding: '10px 20px', whiteSpace: 'nowrap', flexShrink: 0, fontSize: 12, fontWeight: active ? 600 : 500, color: active ? '#00b896' : '#9ca3af', borderBottom: `2px solid ${active ? '#00b896' : 'transparent'}`, marginBottom: -2, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, background: active ? '#fff' : 'transparent' }}>
                  {st}<span style={{ fontSize: 10, fontWeight: 700, padding: '1px 7px', borderRadius: 20, background: active ? '#e6faf6' : '#e5e7eb', color: active ? '#00b896' : '#9ca3af' }}>{wfOvrFor(wfV!, wfP!, st).length}</span>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div style={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid #e5e7eb' }}>
              <div style={{ padding: '9px 16px', fontSize: 11, fontWeight: 700, letterSpacing: .5, textTransform: 'uppercase', color: '#fff', background: '#00b896' }}>Available Statuses</div>
              <div style={{ flex: 1, overflowY: 'auto', maxHeight: 280, padding: 6 }}>
                {others.map(o => {
                  const on = checked.includes(o);
                  return (
                    <div key={o} onClick={() => onWfToggleTransition(o)} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 11px', borderRadius: 7, marginBottom: 2, fontSize: 13, cursor: 'pointer', border: `1.5px solid ${on ? '#00b896' : 'transparent'}`, background: on ? '#e6faf6' : 'transparent', color: on ? '#00b896' : '#4b5563' }}>
                      <div style={{ width: 16, height: 16, borderRadius: 4, border: `1.5px solid ${on ? '#00b896' : '#d1d5db'}`, background: on ? '#00b896' : 'transparent', color: on ? '#fff' : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800 }}>{on ? '✓' : ''}</div>
                      <span style={{ flex: 1 }}>{o}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '9px 16px', fontSize: 11, fontWeight: 700, letterSpacing: .5, textTransform: 'uppercase', color: '#fff', background: '#1a3a5c' }}>Allowed Transitions</div>
              <div style={{ flex: 1, overflowY: 'auto', maxHeight: 280, padding: 6 }}>
                {checked.length === 0 && <div style={{ padding: '32px 20px', textAlign: 'center', fontSize: 13, color: '#9ca3af', lineHeight: 1.7 }}>No transitions configured yet.<br />Check statuses on the left.</div>}
                {checked.map(o => (
                  <div key={o} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 11px', borderRadius: 7, marginBottom: 2, fontSize: 13, border: '1.5px solid #00b896', background: '#e6faf6', color: '#00b896' }}>
                    <div style={{ width: 16, height: 16, borderRadius: 4, background: '#00b896', color: '#fff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800 }}>✓</div>
                    <span style={{ flex: 1 }}>{o}</span>
                    <span onClick={() => onWfToggleTransition(o)} style={{ fontSize: 12, color: '#d1d5db', padding: '2px 6px', borderRadius: 5, cursor: 'pointer' }}>✕</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ padding: '11px 18px', background: '#f3f4f6', borderTop: '1px solid #e5e7eb', fontSize: 12, color: '#9ca3af' }}>
            Editing: {wfActiveTab} · {checked.length} transition{checked.length !== 1 ? 's' : ''} configured
          </div>
        </div>
      )}
    </div>
  );
}
