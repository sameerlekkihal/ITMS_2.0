import { useAppStore } from '../../store/AppStore';
import { RequestList } from './RequestList';
import { RequestForm } from './RequestForm';
import { RequestReview } from './RequestReview';
import { CreateUserModals } from './CreateUserModals';

export function CreateUser() {
  const { state } = useAppStore();
  return (
    <div style={{ animation: 'pageIn .4s ease forwards' }}>
      {state.cuSubView === 'form' ? <RequestForm /> : state.cuSubView === 'review' ? <RequestReview /> : <RequestList />}
      <CreateUserModals />
    </div>
  );
}
