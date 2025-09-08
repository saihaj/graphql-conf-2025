'use client';

import type React from 'react';

import { useAuth } from './auth-provider';
import { LoginForm } from './login-form';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { user } = useAuth();

  if (!user) {
    return fallback || <LoginForm />;
  }

  return <>{children}</>;
}
