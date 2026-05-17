import { createContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { auth } from '../firebase-config';

const adminEmails = (import.meta.env.VITE_ADMIN_EMAILS || 'admin@tickethub.com')
  .split(',')
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export const AuthContext = createContext({
  user: null,
  isAdmin: false,
  authLoading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {}
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAdmin(
        Boolean(currentUser?.email) && adminEmails.includes(currentUser.email.toLowerCase())
      );
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const register = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, isAdmin, authLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
