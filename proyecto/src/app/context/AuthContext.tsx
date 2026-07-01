import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  username: string | null;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  username: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string | null>(null);

  const login = (name: string) => setUsername(name);
  const logout = () => setUsername(null);

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
