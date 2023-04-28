import { Outlet } from 'react-router-dom';
import { useRestrictAuthenticated } from 'hooks/auth';

function RestrictionAuthorised() {
  useRestrictAuthenticated();
  return <Outlet />;
}

export default RestrictionAuthorised;
