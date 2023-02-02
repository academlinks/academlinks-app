import { Outlet } from 'react-router-dom';
import { useRestrictAuthenticated } from '../../hooks';

function RestrictionAuthorised() {
  useRestrictAuthenticated();
  return <Outlet />;
}

export default RestrictionAuthorised;
