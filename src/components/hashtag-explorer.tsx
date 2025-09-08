'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Hash, TrendingUp, Clock, Zap } from 'lucide-react';
import { mockHashtags } from '@/lib/mock-data';

export function HashtagExplorer() {
  const trendingHashtags = mockHashtags
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, 8);
  const recentHashtags = [...mockHashtags].reverse().slice(0, 6);

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Trending Hashtags
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {trendingHashtags.map((hashtag, index) => (
              <div
                key={hashtag.id}
                className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                    <span className="text-sm font-bold text-primary">
                      #{index + 1}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <Hash className="h-4 w-4 text-primary" />
                      <span className="font-semibold">{hashtag.name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatCount(hashtag.postCount)} posts
                    </p>
                  </div>
                </div>
                <Badge variant="secondary">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Hot
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Recently Active
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {recentHashtags.map(hashtag => (
              <Button
                key={hashtag.id}
                variant="outline"
                className="h-auto p-3 flex flex-col items-start space-y-1 bg-transparent"
              >
                <div className="flex items-center space-x-1">
                  <Hash className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-sm">{hashtag.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatCount(hashtag.postCount)} posts
                </span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'Technology', count: '12.5K', color: 'bg-blue-500' },
              { name: 'Design', count: '8.2K', color: 'bg-purple-500' },
              { name: 'Programming', count: '15.1K', color: 'bg-green-500' },
              { name: 'Art', count: '6.8K', color: 'bg-pink-500' },
              { name: 'Photography', count: '9.3K', color: 'bg-orange-500' },
              { name: 'Music', count: '4.7K', color: 'bg-red-500' },
              { name: 'Sports', count: '11.2K', color: 'bg-yellow-500' },
              { name: 'Food', count: '7.9K', color: 'bg-indigo-500' },
            ].map(category => (
              <div
                key={category.name}
                className="p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors text-center"
              >
                <div
                  className={`w-8 h-8 ${category.color} rounded-full mx-auto mb-2`}
                ></div>
                <p className="font-semibold text-sm">{category.name}</p>
                <p className="text-xs text-muted-foreground">
                  {category.count} posts
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
