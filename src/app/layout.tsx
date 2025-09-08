'use client';

import type React from 'react';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { AuthProvider } from '@/components/auth-provider';
import { SocialProvider } from '@/components/social-provider';
import { SearchProvider } from '@/components/search-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { Suspense } from 'react';
import { getCurrentEnvironment } from '@/relay/environment';
import { RelayEnvironmentProvider } from 'react-relay';
import { MainLayout } from '@/components/main-layout';
import { AuthGuard } from '@/components/auth-guard';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const environment = getCurrentEnvironment();

  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RelayEnvironmentProvider environment={environment}>
            <AuthProvider>
              <SocialProvider>
                <SearchProvider>
                  <Suspense fallback={<div>Loading...</div>}>
                    <AuthGuard>
                      <MainLayout>{children}</MainLayout>
                    </AuthGuard>
                  </Suspense>
                </SearchProvider>
              </SocialProvider>
            </AuthProvider>
          </RelayEnvironmentProvider>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
