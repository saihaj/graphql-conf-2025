'use client';

import type React from 'react';
import { createContext, useContext, useState } from 'react';
import type { Post, User, Hashtag } from '@/lib/types';
import { mockPosts, mockUsers, mockHashtags } from '@/lib/mock-data';

interface SearchResults {
  posts: Post[];
  users: User[];
  hashtags: Hashtag[];
}

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: SearchResults;
  isSearching: boolean;
  performSearch: (query: string) => Promise<void>;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults>({
    posts: [],
    users: [],
    hashtags: [],
  });
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults({ posts: [], users: [], hashtags: [] });
      return;
    }

    setIsSearching(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const lowerQuery = query.toLowerCase();

    // Search posts by content
    const postsWithUsers = mockPosts.map(post => ({
      ...post,
      user: mockUsers.find(u => u.id === post.userId),
    }));

    const matchingPosts = postsWithUsers.filter(post =>
      post.content.toLowerCase().includes(lowerQuery),
    );

    // Search users by username, display name, or bio
    const matchingUsers = mockUsers.filter(
      user =>
        user.username.toLowerCase().includes(lowerQuery) ||
        user.displayName.toLowerCase().includes(lowerQuery) ||
        (user.bio && user.bio.toLowerCase().includes(lowerQuery)),
    );

    // Search hashtags by name
    const matchingHashtags = mockHashtags.filter(hashtag =>
      hashtag.name.toLowerCase().includes(lowerQuery),
    );

    setSearchResults({
      posts: matchingPosts,
      users: matchingUsers,
      hashtags: matchingHashtags,
    });

    setIsSearching(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults({ posts: [], users: [], hashtags: [] });
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        isSearching,
        performSearch,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
