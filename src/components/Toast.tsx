import { useAppStore } from '../store/AppStore';

export function Toast() {
  const { state } = useAppStore();
  const { toast } = state;
  if (!toast) return null;

  const borderColor = toast.type === 'error' ? '#e8192c' : '#00b896';
  const icon = toast.type === 'error' ? '✕' : '✓';

  return (
    <div style={{ position: 'fixed', top: 18, right: 20, zIndex: 9999, display: 'flex', alignItems: 'center', gap: 10, padding: '12px 18px', borderRadius: 11, fontSize: 13, fontWeight: 500, boxShadow: '0 8px 30px rgba(0,0,0,.18)', background: '#fff', borderLeft: `4px solid ${borderColor}`, color: '#0f1115', maxWidth: 320 }}>
      <div style={{ width: 20, height: 20, borderRadius: '50%', background: borderColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, flexShrink: 0 }}>{icon}</div>
      <span>{toast.msg}</span>
    </div>
  );
}
