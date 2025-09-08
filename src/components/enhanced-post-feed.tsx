'use client';

import { PostCard } from './post-card';
import { CreatePost } from './create-post';
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { enhancedPostFeedQuery } from './__generated__/enhancedPostFeedQuery.graphql';

export function EnhancedPostFeed({
  queryRef,
}: {
  queryRef: PreloadedQuery<enhancedPostFeedQuery>;
}) {
  const response = usePreloadedQuery<enhancedPostFeedQuery>(
    graphql`
      query enhancedPostFeedQuery($first: Int!) {
        timeline(first: $first) @connection(key: "postCardFragment_timeline") {
          __id
          edges {
            node {
              id
              ...postCard
            }
          }
        }
      }
    `,
    queryRef,
  );

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
