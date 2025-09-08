'use client';

import type React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import type { User, Follow } from '@/lib/types';
import { mockUsers } from '@/lib/mock-data';
import { useAuth } from './auth-provider';

interface SocialContextType {
  followUser: (userId: string) => Promise<{ success: boolean; error?: string }>;
  unfollowUser: (
    userId: string,
  ) => Promise<{ success: boolean; error?: string }>;
  isFollowing: (userId: string) => boolean;
  getFollowers: (userId: string) => User[];
  getFollowing: (userId: string) => User[];
  follows: Follow[];
  isLoading: boolean;
}

const SocialContext = createContext<SocialContextType | undefined>(undefined);

export function SocialProvider({ children }: { children: React.ReactNode }) {
  const [follows, setFollows] = useState<Follow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Initialize with some mock follows
    const mockFollows: Follow[] = [
      {
        id: '1',
        followerId: '1',
        followingId: '2',
        createdAt: '2024-01-15T10:00:00Z',
      },
      {
        id: '2',
        followerId: '1',
        followingId: '3',
        createdAt: '2024-01-15T10:00:00Z',
      },
    ];
    setFollows(mockFollows);
  }, []);

  const followUser = async (userId: string) => {
    if (!user) {
      return { success: false, error: 'Must be logged in to follow users' };
    }

    if (userId === user.id) {
      return { success: false, error: 'Cannot follow yourself' };
    }

    if (isFollowing(userId)) {
      return { success: false, error: 'Already following this user' };
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));

    const newFollow: Follow = {
      id: Date.now().toString(),
      followerId: user.id,
      followingId: userId,
      createdAt: new Date().toISOString(),
    };

    setFollows(prev => [...prev, newFollow]);
    setIsLoading(false);
    return { success: true };
  };

  const unfollowUser = async (userId: string) => {
    if (!user) {
      return { success: false, error: 'Must be logged in to unfollow users' };
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));

    setFollows(prev =>
      prev.filter(f => !(f.followerId === user.id && f.followingId === userId)),
    );
    setIsLoading(false);
    return { success: true };
  };

  const isFollowing = (userId: string) => {
    if (!user) return false;
    return follows.some(
      f => f.followerId === user.id && f.followingId === userId,
    );
  };

  const getFollowers = (userId: string) => {
    const followerIds = follows
      .filter(f => f.followingId === userId)
      .map(f => f.followerId);
    return mockUsers.filter(u => followerIds.includes(u.id));
  };

  const getFollowing = (userId: string) => {
    const followingIds = follows
      .filter(f => f.followerId === userId)
      .map(f => f.followingId);
    return mockUsers.filter(u => followingIds.includes(u.id));
  };

  return (
    <SocialContext.Provider
      value={{
        followUser,
        unfollowUser,
        isFollowing,
        getFollowers,
        getFollowing,
        follows,
        isLoading,
      }}
    >
      {children}
    </SocialContext.Provider>
  );
}

export function useSocial() {
  const context = useContext(SocialContext);
  if (context === undefined) {
    throw new Error('useSocial must be used within a SocialProvider');
  }
  return context;
}
