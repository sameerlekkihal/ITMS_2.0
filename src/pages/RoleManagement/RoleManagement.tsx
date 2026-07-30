import { useAppStore } from '../../store/AppStore';
import { RoleList } from './RoleList';
import { RoleForm } from './RoleForm';
import { RoleModals } from './RoleModals';

export function RoleManagement() {
  const { state } = useAppStore();
  return (
    <div style={{ animation: 'pageIn .4s ease forwards' }}>
      {state.rmSubView === 'list' ? <RoleList /> : <RoleForm />}
      <RoleModals />
    </div>
  );
}
