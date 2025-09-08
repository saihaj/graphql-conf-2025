'use client';

import { PostCard } from './post-card';
import { CreatePost } from './create-post';

export function EnhancedPostFeed() {
  const response = {
    timeline: {
      edges: [],
    },
  };

  if (response.timeline.edges.length === 0) {
    return (
      <div>
        <CreatePost connectionId={response.timeline.__id} />
        <div className="p-8 text-center space-y-4">
          <p className="text-muted-foreground">
            No posts yet. Be the first to share something!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <CreatePost connectionId={response.timeline.__id} />
      <div className="space-y-0">
        {response.timeline.edges.map(post => (
          <PostCard key={post.node.id} post={post.node} />
        ))}
      </div>
    </div>
  );
}
