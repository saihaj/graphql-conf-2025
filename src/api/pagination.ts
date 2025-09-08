import { and, desc, asc, sql } from 'drizzle-orm';
import { posts } from '../db/schema';
import type { DB } from '@/db/client';
import { toGlobalId } from './ids';

export type Cursor = { createdAt: number; id: number };

export function encodeCursor(c: Cursor): string {
  return Buffer.from(`${c.createdAt}:${c.id}`).toString('base64');
}

export function decodeCursor(s: string): Cursor {
  const [createdAtStr, idStr] = Buffer.from(s, 'base64')
    .toString('utf8')
    .split(':');
  const createdAt = Number(createdAtStr);
  const id = Number(idStr);
  if (!Number.isFinite(createdAt) || !Number.isFinite(id))
    throw new Error('Invalid cursor');
  return { createdAt, id };
}

/**
 * Generic connection pagination for the posts table with stable ordering
 * ORDER BY createdAt DESC, id DESC for forward pagination; inverse for backward
 */
export async function paginatePosts(
  db: DB,
  where: any | undefined,
  args: {
    first?: number | null;
    after?: string | null;
    last?: number | null;
    before?: string | null;
  },
) {
  const PAGE_MAX = 50;
  const { first, after, last, before } = args;

  if ((first != null && last != null) || (after && before)) {
    throw new Error('Use either (first, after) or (last, before), not both');
  }

  if (first == null && last == null) {
    throw new Error('Provide first or last');
  }

  if (first != null && first <= 0) throw new Error('first must be > 0');
  if (last != null && last <= 0) throw new Error('last must be > 0');

  const limit = Math.min(first ?? last ?? 20, PAGE_MAX) + 1; // lookahead

  if (first != null) {
    // forward: ORDER BY createdAt DESC, id DESC
    const cursor = after ? decodeCursor(after) : null;
    const whereCond = and(
      where,
      cursor
        ? sql`(${posts.createdAt} < ${cursor.createdAt} OR (${posts.createdAt} = ${cursor.createdAt} AND ${posts.id} < ${cursor.id}))`
        : undefined,
    );

    const rows = await db
      .select()
      .from(posts)
      .where(whereCond as any)
      .orderBy(desc(posts.createdAt), desc(posts.id))
      .limit(limit);

    const hasNextPage = rows.length > (first ?? 0);
    const slice = hasNextPage ? rows.slice(0, first) : rows;

    const edges = slice.map(r => ({
      cursor: encodeCursor({ createdAt: r.createdAt!, id: r.id! }),
      node: {
        ...r,
        id: toGlobalId('Post', r.id),
      },
    }));

    const startCursor = edges[0]?.cursor ?? null;
    const endCursor = edges.at(-1)?.cursor ?? null;

    let hasPreviousPage = Boolean(after);
    if (!hasPreviousPage && edges.length) {
      // if no `after`, check if there are newer rows than the first edge
      const newest = slice[0];
      const prev = await db
        .select({ c: sql<number>`count(*)`.as('c') })
        .from(posts)
        .where(
          and(
            where,
            sql`(${posts.createdAt} > ${newest.createdAt} OR (${posts.createdAt} = ${newest.createdAt} AND ${posts.id} > ${newest.id}))`,
          ) as any,
        );
      hasPreviousPage = (prev[0]?.c ?? 0) > 0;
    }

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
    };
  } else {
    // backward: ORDER BY createdAt ASC, id ASC then reverse
    const cursor = before ? decodeCursor(before) : null;
    const whereCond = and(
      where,
      cursor
        ? sql`(${posts.createdAt} > ${cursor.createdAt} OR (${posts.createdAt} = ${cursor.createdAt} AND ${posts.id} > ${cursor.id}))`
        : undefined,
    );

    const rowsAsc = await db
      .select()
      .from(posts)
      .where(whereCond as any)
      .orderBy(asc(posts.createdAt), asc(posts.id))
      .limit(limit);

    const hasPreviousPage = rowsAsc.length > (last ?? 0);
    const sliceAsc = hasPreviousPage ? rowsAsc.slice(0, last) : rowsAsc;
    const slice = sliceAsc.reverse();

    const edges = slice.map(r => ({
      cursor: encodeCursor({ createdAt: r.createdAt!, id: r.id! }),
      node: r,
    }));

    const startCursor = edges[0]?.cursor ?? null;
    const endCursor = edges.at(-1)?.cursor ?? null;

    let hasNextPage = Boolean(before);
    if (!hasNextPage && edges.length) {
      // if no `before`, check if there are older rows than the last edge
      const oldest = slice.at(-1)!;
      const nxt = await db
        .select({ c: sql<number>`count(*)`.as('c') })
        .from(posts)
        .where(
          and(
            where,
            sql`(${posts.createdAt} < ${oldest.createdAt} OR (${posts.createdAt} = ${oldest.createdAt} AND ${posts.id} < ${oldest.id}))`,
          ) as any,
        );
      hasNextPage = (nxt[0]?.c ?? 0) > 0;
    }

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
      },
    };
  }
}
