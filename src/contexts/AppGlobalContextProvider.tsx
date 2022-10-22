import React, { memo, PropsWithChildren } from "react";
import userApiRepo from "@/app/api/repositories/user.api-repo";
import { PublicUser } from "@/app/models/User.model";
import { useQuery } from "@tanstack/react-query";

interface AppContextProps {
  currentUserId?: string;
  currentUser?: PublicUser;
  currentUserLoading?: boolean;
  currentUserFetched?: boolean;

  currentUserRefetch?: () => void;
}

export const AppContext = React.createContext<AppContextProps>(null);

const AppContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    data: user__data,
    isLoading: currentUserLoading,
    isFetched: currentUserFetched,
    refetch: currentUserRefetch,
  } = useQuery(["auth:user"], () => userApiRepo.currentUser());

  return (
    <AppContext.Provider
      value={{
        currentUserId: user__data?.data?.data?._id,
        currentUser: user__data?.data?.data,
        currentUserLoading,
        currentUserFetched,
        currentUserRefetch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
