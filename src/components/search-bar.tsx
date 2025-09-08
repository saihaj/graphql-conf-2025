'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { useSearch } from './search-provider';

interface SearchBarProps {
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function SearchBar({
  placeholder = 'Search posts, users, and hashtags...',
  onFocus,
  onBlur,
}: SearchBarProps) {
  const {
    searchQuery,
    setSearchQuery,
    performSearch,
    clearSearch,
    isSearching,
  } = useSearch();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (localQuery !== searchQuery) {
        setSearchQuery(localQuery);
        performSearch(localQuery);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [localQuery, searchQuery, setSearchQuery, performSearch]);

  const handleClear = () => {
    setLocalQuery('');
    clearSearch();
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={localQuery}
          onChange={e => setLocalQuery(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          className="pl-10 pr-10"
        />
        {(localQuery || isSearching) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            {isSearching ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            ) : (
              <X className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
