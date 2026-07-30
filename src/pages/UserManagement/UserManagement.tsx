import { useAppStore } from '../../store/AppStore';
import { UserList } from './UserList';
import { UserForm } from './UserForm';
import { UserModals } from './UserModals';

export function UserManagement() {
  const { state } = useAppStore();
  return (
    <div style={{ animation: 'pageIn .4s ease forwards' }}>
      {state.umSubView === 'list' ? <UserList /> : <UserForm />}
      <UserModals />
    </div>
  );
}
