import React, { useState } from "react";
import AppRouter from "./navigation/AppRouter";

export type UserDetails = {
  userId?: string;
  email?: string;
};

export const UserDetailsContext = React.createContext<UserDetails>({});

export default function DonorApp() {
  const [userDetails, setUserDetails] = useState<UserDetails>({});
  return (
    <div>
      <UserDetailsContext.Provider value={userDetails}>
        HEADER GOES HERE
        <AppRouter setUserDetails={setUserDetails} />
      </UserDetailsContext.Provider>
    </div>
  );
}
