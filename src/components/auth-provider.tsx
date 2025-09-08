'use client';

import type React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { graphql, useMutation } from 'react-relay';
import { authProviderLoginMutation } from './__generated__/authProviderLoginMutation.graphql';
import { authProviderSignupMutation } from './__generated__/authProviderSignupMutation.graphql';
import { toast } from 'sonner';

type User = {
  id: string;
  username: string;
};

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  signup: (userData: SignupData) => void;
  logout: () => void;
}

interface SignupData {
  username: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [commitLogin] = useMutation<authProviderLoginMutation>(graphql`
    mutation authProviderLoginMutation($email: String!, $password: String!) {
      signIn(email: $email, password: $password) {
        user {
          id
          username
        }
      }
    }
  `);

  const [commitSignup] = useMutation<authProviderSignupMutation>(graphql`
    mutation authProviderSignupMutation(
      $email: String!
      $password: String!
      $username: String!
    ) {
      signUp(email: $email, password: $password, username: $username) {
        user {
          id
          username
        }
        token
      }
    }
  `);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    commitLogin({
      variables: {
        email,
        password,
      },
      onError: err => {
        toast.error(err.message);
      },
      onCompleted: response => {
        if (response.signIn?.user) {
          localStorage.setItem(
            'currentUser',
            JSON.stringify(response.signIn.user),
          );
          // very tricky with how nextjs router workers. so simplest way is reload the page
          // to reflect the logged in state
          // just comment this out, and do setUser here.
          // Logout and reload the page to see what it does then you will understand
          window.location.reload();
        }
      },
    });
  };

  const signup = async (userData: SignupData) => {
    commitSignup({
      variables: {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      },
      onError: err => {
        toast.error(err.message);
      },
      onCompleted: response => {
        if (response.signUp) {
          localStorage.setItem(
            'currentUser',
            JSON.stringify(response.signUp.user),
          );
          window.location.reload();
        }
      },
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    cookieStore.delete('auth-token');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
