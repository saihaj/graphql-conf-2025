'use server';
import loadSerializableQuery from '@/relay/load-serializeable-query';
import enhancedPostFeedQueryNode, {
  enhancedPostFeedQuery,
} from '@/components/__generated__/enhancedPostFeedQuery.graphql';
import { HomePageLayout } from './client-page';

export default async function HomePage() {
  const preloadedQuery = await loadSerializableQuery<
    typeof enhancedPostFeedQueryNode,
    enhancedPostFeedQuery
  >(enhancedPostFeedQueryNode.params, {
    first: 10,
  });

  return <HomePageLayout preloadedQuery={preloadedQuery} />;
}
