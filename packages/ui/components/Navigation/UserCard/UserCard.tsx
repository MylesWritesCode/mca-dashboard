import { PLACEHOLDER } from "config";
import "./UserCard.css";
/**
 * Still unsure of what the user will look like or where the entity will live,
 * so I'm going to just leave the typedef in this file.
 *
 * Eventually, when I build the backend, I'll probably move the typedef into its
 * own file in some models folder.
 */
type User = {
  name: string;
  avatarSrc: string;
};

interface UserCardProps {
  user: User;
  className?: string;
}

const USER = PLACEHOLDER.user;

export function UserCard({ user, className }: UserCardProps): JSX.Element {
  return (
    <div className={["user-card-container", className].join(" ")}>
      <div className="user-card-avatar">
        <img src={user.avatarSrc || USER.avatarSrc} />
      </div>
      <div className="user-card-info">
        <h3 className="user-card-name">{user.name || USER.name}</h3>
      </div>
    </div>
  );
}
