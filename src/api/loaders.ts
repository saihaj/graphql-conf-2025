import DataLoader from 'dataloader';
import { db, schema } from '@/db/client';
import { and, inArray, sql } from 'drizzle-orm';

export type Loaders = ReturnType<typeof createLoaders>;

export function createLoaders(viewerId: number | null) {
  const userById = new DataLoader<
    number,
    typeof schema.users.$inferSelect | null
  >(async ids => {
    const rows = await db
      .select()
      .from(schema.users)
      .where(inArray(schema.users.id, ids as number[]));
    const map = new Map(rows.map(r => [r.id!, r]));
    return ids.map(id => map.get(id) ?? null);
  });

  const postById = new DataLoader<
    number,
    typeof schema.posts.$inferSelect | null
  >(async ids => {
    const rows = await db
      .select()
      .from(schema.posts)
      .where(inArray(schema.posts.id, ids as number[]));
    const map = new Map(rows.map(r => [r.id!, r]));
    return ids.map(id => map.get(id) ?? null);
  });

  const likeCountByPostId = new DataLoader<number, number>(async postIds => {
    const rows = await db
      .select({ postId: schema.likes.postId, c: sql<number>`count(*)`.as('c') })
      .from(schema.likes)
      .where(inArray(schema.likes.postId, postIds as number[]))
      .groupBy(schema.likes.postId);

    const map = new Map(rows.map(r => [r.postId!, r.c ?? 0]));
    return postIds.map(id => map.get(id) ?? 0);
  });

  const replyCountBypostId = new DataLoader<number, number>(async postIds => {
    const rows = await db
      .select({
        replyToId: schema.posts.replyToId,
        c: sql<number>`count(*)`.as('c'),
      })
      .from(schema.posts)
      .where(inArray(schema.posts.replyToId, postIds as number[]))
      .groupBy(schema.posts.replyToId);
    const map = new Map(rows.map(r => [r.replyToId!, r.c ?? 0]));
    return postIds.map(id => map.get(id) ?? 0);
  });

  const likedByViewerPostId = new DataLoader<number, boolean>(async postIds => {
    if (!viewerId) return postIds.map(() => false);
    const rows = await db
      .select({ postId: schema.likes.postId })
      .from(schema.likes)
      .where(inArray(schema.likes.postId, postIds as number[]));

    const set = new Set(rows.map(r => r.postId!));
    return postIds.map(id => set.has(id));
  });

  const followingByUserId = new DataLoader<number, boolean>(async userIds => {
    if (!viewerId) return userIds.map(() => false);
    const rows = await db
      .select({ followingId: schema.follows.followingId })
      .from(schema.follows)
      .where(and(schema.follows.followerId.eq(viewerId as any)))
      .where(inArray(schema.follows.followingId, userIds as number[]));
    const set = new Set(rows.map(r => r.followingId!));
    return userIds.map(id => set.has(id));
  });

  return {
    userById,
    postById,
    likeCountByPostId,
    replyCountBypostId,
    likedByViewerPostId,
    followingByUserId,
  };
}
