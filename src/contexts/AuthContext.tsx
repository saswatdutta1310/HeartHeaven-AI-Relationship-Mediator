import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type User = { email: string; name?: string } | null;

type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);

  const signIn = useCallback(async (email: string, password: string) => {
    // Demo: accept any email/password and set user
    setUser({ email, name: email.split("@")[0] });
  }, []);

  const signUp = useCallback(async (email: string, password: string, name?: string) => {
    setUser({ email, name: name || email.split("@")[0] });
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setUser({ email: "demo@heartsync.app", name: "Demo User" });
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
