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
      <nav className="flex items-center gap-4">
        <Link href="/">
          <a className="text-2xl font-semibold text-slate-800">Rental App</a>
        </Link>

        {currentUserId && (
          <Link href="/bookings">
            <a className="text-base uppercase text-slate-800">My Bookings</a>
          </Link>
        )}
      </nav>

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
    return (
      <svg
        className="w-5 h-5 text-slate-800 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth={4}
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );
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
