'use client';

import { AuthGuard } from '@/components/auth-guard';
import { SearchBar } from '@/components/search-bar';
import { SearchResults } from '@/components/search-results';
import { TrendingSidebar } from '@/components/trending-sidebar';

export default function ExplorePage() {
  return (
    <AuthGuard>
      <div className="flex-1 border-r border-border">
        <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border p-4">
          <h1 className="text-xl font-bold mb-4">Explore</h1>
          <SearchBar />
        </div>

        <SearchResults />
      </div>

      <div className="w-80 p-4">
        <TrendingSidebar />
      </div>
    </AuthGuard>
  );
}
