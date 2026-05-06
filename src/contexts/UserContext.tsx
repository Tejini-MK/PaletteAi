import React, { createContext, useContext, useEffect, useState } from 'react';

interface UserContextType {
  userName: string;
  setUserName: (name: string) => void;
  userInitials: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('palette-ai-user-name') || 'Tejini D.';
  });

  useEffect(() => {
    localStorage.setItem('palette-ai-user-name', userName);
  }, [userName]);

  const userInitials = userName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <UserContext.Provider value={{ userName, setUserName, userInitials }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
