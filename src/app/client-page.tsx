'use client';
import { EnhancedPostFeed } from '@/components/enhanced-post-feed';
import { SuggestedUsers } from '@/components/suggested-users';
import { TrendingSidebar } from '@/components/trending-sidebar';

export function HomePageLayout() {
  return (
    <>
      <div className="flex-1 border-r border-border">
        <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border">
          <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Home</h1>
          </div>
        </div>

        <EnhancedPostFeed />
      </div>

      <div className="w-80 p-4 space-y-4">
        <SuggestedUsers />
        <TrendingSidebar />
      </div>
    </>
  );
}
