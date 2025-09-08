'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { PostCard } from './post-card';
import { UserProfileCard } from './user-profile-card';
import { useSearch } from './search-provider';
import { Hash } from 'lucide-react';

export function SearchResults() {
  const { searchResults, searchQuery, isSearching } = useSearch();

  if (!searchQuery && !isSearching) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">
          Start typing to search for posts, users, and hashtags
        </p>
      </div>
    );
  }

  if (isSearching) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Searching...</p>
      </div>
    );
  }

  const totalResults =
    searchResults.posts.length +
    searchResults.users.length +
    searchResults.hashtags.length;

  if (totalResults === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">
          No results found for "{searchQuery}"
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Try searching for something else
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="p-4 border-b border-border">
        <p className="text-sm text-muted-foreground">
          {totalResults} result{totalResults !== 1 ? 's' : ''} for "
          {searchQuery}"
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({totalResults})</TabsTrigger>
          <TabsTrigger value="posts">
            Posts ({searchResults.posts.length})
          </TabsTrigger>
          <TabsTrigger value="users">
            Users ({searchResults.users.length})
          </TabsTrigger>
          <TabsTrigger value="hashtags">
            Hashtags ({searchResults.hashtags.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {searchResults.users.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 px-4">Users</h3>
              <div className="space-y-3 px-4">
                {searchResults.users.slice(0, 3).map(user => (
                  <UserProfileCard key={user.id} user={user} />
                ))}
              </div>
            </div>
          )}

          {searchResults.hashtags.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 px-4">Hashtags</h3>
              <div className="grid grid-cols-2 gap-3 px-4">
                {searchResults.hashtags.slice(0, 4).map(hashtag => (
                  <div
                    key={hashtag.id}
                    className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <Hash className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-semibold">#{hashtag.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {hashtag.postCount} posts
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {searchResults.posts.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 px-4">Posts</h3>
              <div className="space-y-0">
                {searchResults.posts.slice(0, 5).map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="posts">
          {searchResults.posts.length > 0 ? (
            <div className="space-y-0">
              {searchResults.posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No posts found</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="users">
          {searchResults.users.length > 0 ? (
            <div className="space-y-4 p-4">
              {searchResults.users.map(user => (
                <UserProfileCard key={user.id} user={user} />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No users found</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="hashtags">
          {searchResults.hashtags.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              {searchResults.hashtags.map(hashtag => (
                <div
                  key={hashtag.id}
                  className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <Hash className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold text-lg">#{hashtag.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {hashtag.postCount} posts
                    </p>
                  </div>
                  <Badge variant="secondary" className="ml-auto">
                    Trending
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No hashtags found</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
