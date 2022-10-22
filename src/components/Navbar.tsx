import authApiRepo from "@/app/api/repositories/auth.api-repo";
import { PublicUser } from "@/app/models/User.model";
import { AppContext } from "@/contexts/AppGlobalContextProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { useContext } from "react";

const Navbar = () => {
  const qc = useQueryClient();
  const { currentUser, currentUserId, currentUserLoading, currentUserRefetch } =
    useContext(AppContext);

  const { mutate: mutate__logout, isLoading: logout__loading } = useMutation(
    authApiRepo.logout,
    {
      onSuccess: () => {
        // qc.invalidateQueries(["auth:user"]);
        window.location.reload();
      },
      onError: () => {
        currentUserRefetch();
      },
    }
  );

  return (
    <header className="flex items-center justify-between">
      <Link href="/">
        <a className="text-xl font-semibold">Rental App</a>
      </Link>

      <UserInfo
        user={currentUser}
        isLoggedin={Boolean(currentUserId)}
        loading={currentUserLoading || logout__loading}
        onLogout={mutate__logout}
      />
    </header>
  );
};

interface Props {
  loading?: boolean;
  user: PublicUser;
  isLoggedin: boolean;
  onLogout?: () => void;
}
export const UserInfo: React.FC<Props> = ({
  loading,
  user,
  isLoggedin,
  onLogout,
}) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedin) {
    return (
      <Link href="/login">
        <a className="px-4 py-2 border">Login</a>
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <img
        src={user?.avatar}
        alt={user?.name}
        className="w-8 h-8 rounded-full"
      />
      <button
        onClick={() => confirm("Sure to logout?") && onLogout()}
        className="px-2 py-1 border"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
