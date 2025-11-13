import { useState, useCallback, useMemo } from 'react';

const AUTH_KEY = 'spendsense_user';
const USERS_KEY = 'spendsense_users';

interface UserDetails {
    username: string;
    email: string;
    mobile: string;
}

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(() => {
    try {
      return window.sessionStorage.getItem(AUTH_KEY);
    } catch (error) {
      console.error('Error reading auth state from sessionStorage', error);
      return null;
    }
  });

  const isAuthenticated = useMemo(() => !!currentUser, [currentUser]);

  const login = useCallback((userDetails: { username: string; email: string; mobile: string; }) => {
    try {
        const storedUsersRaw = window.localStorage.getItem(USERS_KEY);
        const users: UserDetails[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
        
        const existingUser = users.find(u => u.username.toLowerCase() === userDetails.username.toLowerCase());
  
        if (!existingUser) {
          // Sign up the new user - we don't store the password
          const newUser = { 
            username: userDetails.username,
            email: userDetails.email,
            mobile: userDetails.mobile
          };
          const newUsers = [...users, newUser];
          window.localStorage.setItem(USERS_KEY, JSON.stringify(newUsers));
        }
        
        // Log in (for both existing and new users)
        setCurrentUser(userDetails.username);
        window.sessionStorage.setItem(AUTH_KEY, userDetails.username);
  
      } catch (error) {
        console.error('Error during login/signup process', error);
      }
  }, []);

  const logout = useCallback(() => {
    try {
      setCurrentUser(null);
      window.sessionStorage.removeItem(AUTH_KEY);
    } catch (error) {
      console.error('Error removing auth state from sessionStorage', error);
    }
  }, []);

  return { isAuthenticated, currentUser, login, logout };
};