import type { ReactNode } from 'react';

export function ModalOverlay({ children, align = 'center' }: { children: ReactNode; align?: 'center' | 'top' }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,17,21,.55)', zIndex: 400, display: 'flex', alignItems: align === 'center' ? 'center' : 'flex-start', justifyContent: 'center', padding: align === 'top' ? '24px' : undefined, overflowY: align === 'top' ? 'auto' : undefined }}>
      {children}
    </div>
  );
}

export function SidePanel({ title, subtitle, onClose, children }: { title: string; subtitle: string; onClose: () => void; children: ReactNode }) {
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.25)', zIndex: 350 }} />
      <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 360, background: '#fff', boxShadow: '-4px 0 24px rgba(0,0,0,.1)', zIndex: 360, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '18px 20px 14px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div><div style={{ fontSize: 15, fontWeight: 700 }}>{title}</div><div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{subtitle}</div></div>
          <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: 7, border: '1.5px solid #e5e7eb', background: '#fff', cursor: 'pointer', fontSize: 18, color: '#9ca3af' }}>×</button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '18px 20px' }}>{children}</div>
      </div>
    </>
  );
}

export interface LogItem {
  icon: string;
  bg: string;
  action: string;
  by: string;
  time: string;
}

export function LogList({ items }: { items: LogItem[] }) {
  return (
    <>
      {items.map((l, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, paddingBottom: 16 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, background: l.bg }}>{l.icon}</div>
          <div><div style={{ fontSize: 13, fontWeight: 500 }}>{l.action}</div><div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>By: {l.by}</div><div style={{ fontSize: 10, color: '#9ca3af', marginTop: 3 }}>{l.time}</div></div>
        </div>
      ))}
    </>
  );
}
