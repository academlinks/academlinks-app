import { FriendIcon, PublicIcon, LockIcon, GroupIcon } from "../Icons/icons";

const audienceBlock = {
  public: <PublicIcon />,
  friends: <FriendIcon />,
  private: <LockIcon />,
  users: <GroupIcon />,
};

function Audience({ audience }) {
  return <>{audienceBlock[audience]}</>;
}

export default Audience;
