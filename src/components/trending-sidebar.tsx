'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';
import { mockHashtags } from '@/lib/mock-data';

export function TrendingSidebar() {
  // Sort hashtags by post count for trending
  const trendingHashtags = mockHashtags
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, 5);

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Trending
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trendingHashtags.map((hashtag, index) => (
            <div
              key={hashtag.id}
              className="flex items-center justify-between hover:bg-muted/50 p-2 rounded-lg cursor-pointer transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-muted-foreground">
                  #{index + 1}
                </span>
                <div>
                  <p className="font-semibold">#{hashtag.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatCount(hashtag.postCount)} posts
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="text-xs">
                Trending
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">What's happening</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="hover:bg-muted/50 p-2 rounded-lg cursor-pointer transition-colors">
            <p className="text-sm text-muted-foreground">
              Technology · Trending
            </p>
            <p className="font-semibold">React 19 Released</p>
            <p className="text-sm text-muted-foreground">15.2K posts</p>
          </div>
          <div className="hover:bg-muted/50 p-2 rounded-lg cursor-pointer transition-colors">
            <p className="text-sm text-muted-foreground">
              Web Development · Trending
            </p>
            <p className="font-semibold">Next.js 15</p>
            <p className="text-sm text-muted-foreground">8.7K posts</p>
          </div>
          <div className="hover:bg-muted/50 p-2 rounded-lg cursor-pointer transition-colors">
            <p className="text-sm text-muted-foreground">Design · Trending</p>
            <p className="font-semibold">UI/UX Trends 2024</p>
            <p className="text-sm text-muted-foreground">4.1K posts</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
