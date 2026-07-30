import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh' }}>
      <Sidebar />
      <Header />
      <main style={{ marginLeft: 232, paddingTop: 56, minHeight: '100vh', flex: 1 }}>
        <div style={{ padding: '28px 30px' }}>{children}</div>
      </main>
    </div>
  );
}
