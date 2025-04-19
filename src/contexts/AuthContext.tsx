import React, { createContext, useContext, useState, useEffect } from 'react';
import { AUTH_STORAGE_KEY, USERS_STORAGE_KEY } from '../firebase/config';

interface User {
  uid: string;
  email: string;
  displayName: string;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  userProfile: UserProfile | null;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  booksRead: number;
  booksReading: number;
  bio: string;
  favoriteGenres: string[];
  joined: Date;
  profilePicture?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Generate a unique ID (simple implementation)
  const generateUid = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  // Get users from local storage
  const getUsers = (): any[] => {
    const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  };

  // Save users to local storage
  const saveUsers = (users: any[]) => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  };

  async function signup(email: string, password: string, displayName: string) {
    const users = getUsers();
    
    // Check if user already exists
    if (users.some(user => user.email === email)) {
      throw new Error('Email already in use');
    }
    
    const uid = generateUid();
    
    // Create new user
    const newUser = {
      uid,
      email,
      password, // In a real app, this should be hashed
      displayName
    };
    
    // Create user profile
    const newProfile: UserProfile = {
      uid,
      displayName,
      email,
      booksRead: 0,
      booksReading: 0,
      bio: '',
      favoriteGenres: [],
      joined: new Date(),
    };
    
    // Save user and profile
    users.push({...newUser, profile: newProfile});
    saveUsers(users);
    
    // Set current user and profile
    const userForContext: User = {
      uid,
      email,
      displayName
    };
    
    setCurrentUser(userForContext);
    setUserProfile(newProfile);
    
    // Save auth state
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userForContext));
  }

  async function login(email: string, password: string) {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    const userForContext: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    };
    
    setCurrentUser(userForContext);
    setUserProfile(user.profile);
    
    // Save auth state
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userForContext));
  }

  function logout() {
    setCurrentUser(null);
    setUserProfile(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return Promise.resolve();
  }

  async function fetchUserProfile(user: User) {
    try {
      const users = getUsers();
      const foundUser = users.find(u => u.uid === user.uid);
      
      if (foundUser && foundUser.profile) {
        setUserProfile(foundUser.profile);
      } else {
        console.log('No user profile found');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }

  useEffect(() => {
    // Check if user is logged in from local storage
    const authJson = localStorage.getItem(AUTH_STORAGE_KEY);
    
    if (authJson) {
      try {
        const user = JSON.parse(authJson);
        setCurrentUser(user);
        fetchUserProfile(user);
      } catch (error) {
        console.error('Error parsing auth data:', error);
      }
    }
    
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    userProfile,
    loading,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}