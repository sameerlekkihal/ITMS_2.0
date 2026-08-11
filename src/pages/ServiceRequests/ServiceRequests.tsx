import './rome.css';
import { useAppStore } from '../../store/AppStore';
import { RequestList } from './RequestList';
import { CaseDetails } from './CaseDetails';

export function ServiceRequests() {
  const { state } = useAppStore();
  return state.srSubView === 'details' ? <CaseDetails /> : <RequestList />;
}
