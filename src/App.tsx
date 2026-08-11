import { AppStoreProvider, useAppStore } from './store/AppStore';
import { Toast } from './components/Toast';
import { Login } from './pages/Login';
import { AppShell } from './components/AppShell';
import { Home } from './pages/Home';
import { UserManagement } from './pages/UserManagement/UserManagement';
import { RoleManagement } from './pages/RoleManagement/RoleManagement';
import { CreateUser } from './pages/CreateUser/CreateUser';
import { Workflow } from './pages/Workflow/Workflow';
import { InsurerPortal } from './pages/InsurerPortal/InsurerPortal';
import { ServiceRequests } from './pages/ServiceRequests/ServiceRequests';
import { CreateHealthRequest } from './pages/ServiceRequests/CreateHealthRequest';
import { AllocationBuckets } from './pages/ServiceRequests/AllocationBuckets';
import { AllocationRules } from './pages/ServiceRequests/AllocationRules';
import { QcDashboard } from './pages/ServiceRequests/QcDashboard';

function PageRouter() {
  const { state } = useAppStore();
  switch (state.page) {
    case 'home': return <Home />;
    case 'users': return <UserManagement />;
    case 'roles': return <RoleManagement />;
    case 'createuser': return <CreateUser />;
    case 'workflow': return <Workflow />;
    case 'insurer': return <InsurerPortal />;
    case 'servicerequests': return <ServiceRequests />;
    case 'createhealthrequest': return <CreateHealthRequest />;
    case 'allocationbuckets': return <AllocationBuckets />;
    case 'allocationrules': return <AllocationRules />;
    case 'qcdashboard': return <QcDashboard />;
    default: return <Home />;
  }
}

function Shell() {
  const { state } = useAppStore();
  return (
    <div style={{ minHeight: '100vh', position: 'relative', color: '#0f1115' }}>
      <Toast />
      {state.view === 'login' ? (
        <Login />
      ) : (
        <AppShell>
          <PageRouter />
        </AppShell>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppStoreProvider>
      <Shell />
    </AppStoreProvider>
  );
}
