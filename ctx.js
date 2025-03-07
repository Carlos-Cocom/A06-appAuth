import { useContext, createContext } from "react";
import { useStorageState } from "./useStorageState";

const AuthContext = createContext({
  signIn: (inputEmail) => null,
  signOut: () => null,
  userSession: null,
  isLoading: false,
});

export function useSession() {
  return useContext(AuthContext);
}

export function SessionProvider({ children }) {
  const [[isLoading, userSession], setUserSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: (inputEmail) => {
          if (userSession) return;
          setUserSession({ inputEmail: inputEmail });
        },
        signOut: () => {
          if (!userSession) return;
          setUserSession(null);
        },
        userSession,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
