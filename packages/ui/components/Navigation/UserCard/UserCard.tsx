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

import { PLACEHOLDER } from "config";
import { useEffect } from "react";
import "./UserCard.css";

interface UserCardProps {
  user: User;
  isOpen?: boolean;
  className?: string;
}

const USER = PLACEHOLDER.user;

export function UserCard({
  user,
  isOpen,
  className,
}: UserCardProps): JSX.Element {
  return (
    <div
      className={[
        "flex h-full w-full flex-col items-center justify-center py-5",
        "shadow-[0_-20px_0_-16px] shadow-emerald-700 transition-all",
        className,
      ].join(" ")}
    >
      <div className="user-card-avatar transition-all hover:shadow-2xl active:shadow-sm">
        <img
          src={user.avatarSrc || USER.avatarSrc}
          className="h-full w-full rounded-full object-cover"
        />
      </div>
      {isOpen && (
        <div className="flex flex-col items-center justify-center p-8 align-middle transition-all">
          <h3 className="font-semibold">{user.name || USER.name}</h3>
        </div>
      )}
    </div>
  );
}
