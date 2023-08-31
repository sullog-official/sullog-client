import React, { useState } from 'react';

import { AuthContext, AuthState } from '@/shared/stores/AuthContext';

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const login = (newAccessToken: string) => {
    setAccessToken(newAccessToken);
  };

  const logout = () => {
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
