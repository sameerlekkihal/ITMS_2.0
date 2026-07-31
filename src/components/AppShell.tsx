import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useAppStore } from '../store/AppStore';

export function AppShell({ children }: { children: ReactNode }) {
  const { state } = useAppStore();
  return (
    <div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh' }}>
      <Sidebar />
      <Header />
      <main style={{ marginLeft: state.sidebarCollapsed ? 68 : 232, paddingTop: 56, minHeight: '100vh', flex: 1, transition: 'margin-left .2s ease' }}>
        <div style={{ padding: '28px 30px' }}>{children}</div>
      </main>
    </div>
  );
}
