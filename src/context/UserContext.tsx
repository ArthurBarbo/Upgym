import React, { createContext, useContext, useMemo, useState } from "react";

type User = {
  name: string;
  email: string;
};

type UserContextValue = {
  user: User | null;
  setUser: (u: User) => void;
  updateUser: (patch: Partial<User>) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>({
    name: "Arthur",
    email: "aluno@upgym.com",
  });

  function setUser(u: User) {
    setUserState(u);
  }

  function logout() {
    setUserState(null);
  }

  function updateUser(patch: Partial<User>) {
    setUserState((prev) => {
      if (!prev) return prev;
      return { ...prev, ...patch };
    });
  }

  const value = useMemo(() => ({ user, setUser, updateUser, logout }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
