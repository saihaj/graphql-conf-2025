'use client';
import enhancedPostFeedQueryNode, {
  enhancedPostFeedQuery,
} from '@/components/__generated__/enhancedPostFeedQuery.graphql';
import { EnhancedPostFeed } from '@/components/enhanced-post-feed';
import { SuggestedUsers } from '@/components/suggested-users';
import { TrendingSidebar } from '@/components/trending-sidebar';
import { SerializablePreloadedQuery } from '@/relay/load-serializeable-query';
import useSerializablePreloadedQuery from '@/relay/use-serializable-preloaded-query';
import { useRelayEnvironment } from 'react-relay';

export function HomePageLayout({
  preloadedQuery,
}: {
  preloadedQuery: SerializablePreloadedQuery<
    typeof enhancedPostFeedQueryNode,
    enhancedPostFeedQuery
  >;
}) {
  const environment = useRelayEnvironment();
  const queryRef = useSerializablePreloadedQuery(environment, preloadedQuery);

  return (
    <>
      <div className="flex-1 border-r border-border">
        <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border">
          <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Home</h1>
          </div>
        </div>

        <EnhancedPostFeed queryRef={queryRef} />
      </div>

      <div className="w-80 p-4 space-y-4">
        <SuggestedUsers />
        <TrendingSidebar />
      </div>
    </>
  );
}
