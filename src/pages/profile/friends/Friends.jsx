import { Outlet } from 'react-router-dom';
import { Container, FriendsPageNavigation } from '../../../components/FriendsPage';

function Friends() {
  return (
    <Container>
      <FriendsPageNavigation />
      <Outlet />
    </Container>
  );
}

export default Friends;
