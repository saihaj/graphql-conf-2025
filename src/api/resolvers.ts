import { GraphQLError } from 'graphql';
import { and, desc, eq, ilike, inArray, sql } from 'drizzle-orm';
import { db, schema } from '@/db/client';
import type { Context } from './context';
import { toGlobalId, fromGlobalId } from './ids';
import { paginatePosts } from './pagination';
import { signJwt } from './auth';
import { ZodError, z } from 'zod';
import bcrypt from 'bcryptjs';
import { checkRateLimit } from './ratelimit';
import { fromUnixTime, getUnixTime } from 'date-fns';

// Zod schemas
const signUpSchema = z.object({
  email: z.string().email(),
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[A-Za-z0-9_]+$/),
  password: z.string().min(8).max(100),
});
const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
const createPostSchema = z.object({
  text: z.string().min(1).max(280),
  replyToId: z.string().optional().nullable(),
});

function mapUserRow(u: typeof schema.users.$inferSelect) {
  return {
    id: toGlobalId('User', u.id!),
    username: u.username!,
    name: u.name ?? null,
    bio: u.bio ?? null,
  };
}

function mapPostRow(t: typeof schema.posts.$inferSelect) {
  return {
    id: toGlobalId('Post', t.id),
    text: t.text,
    createdAt: t.createdAt,
    authorId: t.authorId,
    replyToId: t.replyToId,
  };
}

export const resolvers = {
  Node: {
    __resolveType(obj: any) {
      if (obj.username != null) return 'User';
      if (obj.text != null) return 'Post';
      if (obj.follower != null && obj.following != null) return 'Follow';
      if (obj.user != null && obj.Post != null) return 'Like';
      return null;
    },
  },

  User: {
    followingMe: async (user: any, _args: any, ctx: Context) => {
      if (!ctx.viewerId) return false;
      return ctx.loaders.followingByUserId.load(
        user.id ? Number(fromGlobalId(user.id).dbId) : 0,
      );
    },
    posts: async (user: any, args: any) => {
      const userId = Number(fromGlobalId(user.id).dbId);
      return paginatePosts(db, eq(schema.posts.authorId, userId), args);
    },
    followers: async (user: any, args: any) => {
      // Implement minimal user connection via follows table: followers of user
      const userId = Number(fromGlobalId(user.id).dbId);
      const rows = await db
        .select()
        .from(schema.follows)
        .where(eq(schema.follows.followingId, userId))
        .orderBy(desc(schema.follows.createdAt))
        .limit((args.first ?? 20) + 1);
      const hasNext = rows.length > (args.first ?? 20);
      const slice = hasNext ? rows.slice(0, args.first ?? 20) : rows;
      const edges = await Promise.all(
        slice.map(async r => {
          const u = await db
            .select()
            .from(schema.users)
            .where(eq(schema.users.id, r.followerId!))
            .limit(1);
          const node = mapUserRow(u[0]!);
          return {
            cursor: Buffer.from(`${r.createdAt}:${r.followerId}`).toString(
              'base64',
            ),
            node,
          };
        }),
      );
      return {
        edges,
        pageInfo: {
          hasNextPage: hasNext,
          hasPreviousPage: Boolean(args.after),
          startCursor: edges[0]?.cursor,
          endCursor: edges.at(-1)?.cursor,
        },
      };
    },
    following: async (user: any, args: any) => {
      const userId = Number(fromGlobalId(user.id).dbId);
      const rows = await db
        .select()
        .from(schema.follows)
        .where(eq(schema.follows.followerId, userId))
        .orderBy(desc(schema.follows.createdAt))
        .limit((args.first ?? 20) + 1);
      const hasNext = rows.length > (args.first ?? 20);
      const slice = hasNext ? rows.slice(0, args.first ?? 20) : rows;
      const edges = await Promise.all(
        slice.map(async r => {
          const u = await db
            .select()
            .from(schema.users)
            .where(eq(schema.users.id, r.followingId!))
            .limit(1);
          const node = mapUserRow(u[0]!);
          return {
            cursor: Buffer.from(`${r.createdAt}:${r.followingId}`).toString(
              'base64',
            ),
            node,
          };
        }),
      );
      return {
        edges,
        pageInfo: {
          hasNextPage: hasNext,
          hasPreviousPage: Boolean(args.after),
          startCursor: edges[0]?.cursor,
          endCursor: edges.at(-1)?.cursor,
        },
      };
    },
  },

  Post: {
    author: (Post: any, _args: any, ctx: Context) => {
      const id = Post.id;
      return ctx.loaders.postById
        .load(id)
        .then(t => ctx.loaders.userById.load(Post.authorId))
        .then(u => mapUserRow(u));
    },
    replyTo: async (Post: any, _args: any, ctx: Context) => {
      const id = Number(fromGlobalId(Post.id).dbId);
      const t = await ctx.loaders.postById.load(id);
      if (!t?.replyToId) return null;
      const parent = await ctx.loaders.postById.load(t.replyToId);
      return mapPostRow(parent!);
    },
    likeCount: (Post: any, _args: any, ctx: Context) => {
      const id =
        typeof Post.id === 'number'
          ? Post.id
          : Number(fromGlobalId(Post.id).dbId);

      return ctx.loaders.likeCountByPostId.load(id);
    },
    likedByMe: async (Post: any, _args: any, ctx: Context) => {
      const id =
        typeof Post.id === 'number'
          ? Post.id
          : Number(fromGlobalId(Post.id).dbId);

      return ctx.loaders.likedByViewerPostId.load(id);
    },
    createdAt: (Post: any) => fromUnixTime(Post.createdAt).toISOString(),
    replies: async (Post: any, args: any) => {
      const id =
        typeof Post.id === 'number'
          ? Post.id
          : Number(fromGlobalId(Post.id).dbId);

      return paginatePosts(db, eq(schema.posts.replyToId, id), args);
    },
  },

  Like: {
    id: (like: any) => toGlobalId('Like', `${like.userId}:${like.PostId}`),
    user: async (like: any) =>
      mapUserRow(
        (
          await db
            .select()
            .from(schema.users)
            .where(eq(schema.users.id, like.userId))
            .limit(1)
        )[0]!,
      ),
    post: async (like: any) =>
      mapPostRow(
        (
          await db
            .select()
            .from(schema.posts)
            .where(eq(schema.posts.id, like.PostId))
            .limit(1)
        )[0]!,
      ),
    createdAt: (like: any) => fromUnixTime(t.createdAt).toISOString(),
  },

  Follow: {
    id: (f: any) => toGlobalId('Follow', `${f.followerId}:${f.followingId}`),
    follower: async (f: any) =>
      mapUserRow(
        (
          await db
            .select()
            .from(schema.users)
            .where(eq(schema.users.id, f.followerId))
            .limit(1)
        )[0]!,
      ),
    following: async (f: any) =>
      mapUserRow(
        (
          await db
            .select()
            .from(schema.users)
            .where(eq(schema.users.id, f.followingId))
            .limit(1)
        )[0]!,
      ),
    createdAt: (f: any) => fromUnixTime(t.createdAt).toISOString(),
  },

  Query: {
    node: async (_: any, { id }: { id: string }, ctx: Context) => {
      const { typename, dbId } = fromGlobalId(id);
      const nid = Number(dbId);
      switch (typename) {
        case 'User': {
          const u = await ctx.loaders.userById.load(nid);
          return u && mapUserRow(u);
        }
        case 'Post': {
          const t = await ctx.loaders.postById.load(nid);
          return t && mapPostRow(t);
        }
        default:
          return null;
      }
    },
    me: async (_: any, __: any, ctx: Context) => {
      if (!ctx.viewerId) return null;
      const u = await ctx.loaders.userById.load(ctx.viewerId);
      return u && mapUserRow(u);
    },
    user: async (_: any, { username }: { username: string }) => {
      const rows = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.username, username))
        .limit(1);
      return rows[0] ? mapUserRow(rows[0]) : null;
    },
    Post: async (_: any, { id }: { id: string }) => {
      const nid = Number(fromGlobalId(id).dbId);
      const rows = await db
        .select()
        .from(schema.posts)
        .where(eq(schema.posts.id, nid))
        .limit(1);
      return rows[0] ? mapPostRow(rows[0]) : null;
    },
    timeline: async (_: any, args: any, ctx: Context) => {
      if (!ctx.viewerId) return new GraphQLError('Unauthorized');
      // Set of user IDs: self + following
      const followingRows = await db
        .select({ uid: schema.follows.followingId })
        .from(schema.follows)
        .where(eq(schema.follows.followerId, ctx.viewerId));
      const userIds = new Set<number>([
        ctx.viewerId,
        ...followingRows.map(r => r.uid!),
      ]);
      return paginatePosts(
        db,
        inArray(schema.posts.authorId, [...userIds]),
        args,
      );
    },
    userPosts: async (_: any, { userId, ...args }: any) => {
      const nid = Number(fromGlobalId(userId).dbId);
      return paginatePosts(db, eq(schema.posts.authorId, nid), args);
    },
    searchPosts: async (_: any, { query, first, after }: any) => {
      // naive LIKE search; for real use FTS5
      const where = ilike(schema.posts.text, `%${query}%`);
      return paginatePosts(db, where, { first: first ?? 20, after });
    },
  },

  Mutation: {
    signUp: async (_: any, input: any, ctx: Context) => {
      try {
        const { email, username, password } = signUpSchema.parse(input);
        const existing = await db
          .select({ id: schema.users.id })
          .from(schema.users)
          .where(
            sql`${schema.users.email} = ${email} OR ${schema.users.username} = ${username}`,
          )
          .limit(1);
        if (existing.length)
          return new GraphQLError('Email or username already in use');

        const hash = await bcrypt.hash(password, 10);
        const res = await db
          .insert(schema.users)
          .values({
            email,
            username,
            passwordHash: hash,
            createdAt: getUnixTime(new Date()),
            updatedAt: getUnixTime(new Date()),
          })
          .returning({ id: schema.users.id });
        const id = res[0]!.id!;
        const token = signJwt({ sub: String(id) });
        const user = mapUserRow(
          (
            await db
              .select()
              .from(schema.users)
              .where(eq(schema.users.id, id))
              .limit(1)
          )[0]!,
        );

        await ctx.request.cookieStore?.set('auth-token', token);
        return { token, user };
      } catch (e) {
        if (e instanceof ZodError)
          return new GraphQLError(e.issues.map(i => i.message).join('; '));
        throw e;
      }
    },
    signIn: async (_: any, input: any, ctx: Context) => {
      try {
        const { email, password } = signInSchema.parse(input);
        const rows = await db
          .select()
          .from(schema.users)
          .where(eq(schema.users.email, email))
          .limit(1);
        const u = rows[0];
        if (!u) return new GraphQLError('Invalid credentials');
        const ok = await bcrypt.compare(password, u.passwordHash!);
        if (!ok) {
          return new GraphQLError('Invalid credentials');
        }
        const token = signJwt({ sub: String(u.id) });
        await ctx.request.cookieStore?.set('auth-token', token);
        return { token, user: mapUserRow(u) };
      } catch (e) {
        if (e instanceof ZodError)
          return new GraphQLError(e.issues.map(i => i.message).join('; '));
        throw e;
      }
    },
    createPost: async (_: any, input: any, ctx: Context) => {
      if (!ctx.viewerId) return new GraphQLError('Unauthorized');

      const rateKey = `user:${ctx.viewerId}`;
      const rl = checkRateLimit(rateKey);
      if (!rl.ok)
        return new GraphQLError(
          `Rate limit exceeded. Try again after ${new Date(rl.resetAt).toISOString()}`,
        );

      try {
        const parsed = createPostSchema.parse(input.input);

        const replyToId = parsed.replyToId
          ? Number(fromGlobalId(parsed.replyToId).dbId)
          : null;
        if (replyToId) {
          const parent = await db
            .select()
            .from(schema.posts)
            .where(eq(schema.posts.id, replyToId))
            .limit(1);
          if (!parent.length) return new GraphQLError('Parent Post not found');
        }
        const res = await db
          .insert(schema.posts)
          .values({
            authorId: ctx.viewerId,
            text: parsed.text,
            replyToId,
            createdAt: getUnixTime(new Date()),
            updatedAt: getUnixTime(new Date()),
          })
          .returning({ id: schema.posts.id });
        const id = res[0]!.id!;
        const t = (
          await db
            .select()
            .from(schema.posts)
            .where(eq(schema.posts.id, id))
            .limit(1)
        )[0]!;
        const post = mapPostRow(t);

        return {
          post: post,
          postEdge: {
            cursor: Buffer.from(`${t.createdAt}:${t.id}`).toString('base64'),
            node: post,
          },
          clientMutationId: input.clientMutationId,
        };
      } catch (e) {
        if (e instanceof ZodError)
          return new GraphQLError(e.issues.map(i => i.message).join('; '));
        throw e;
      }
    },
    likePost: async (
      _: any,
      {
        input: { id, clientMutationId },
      }: { input: { id: string; clientMutationId?: string } },
      ctx: Context,
    ) => {
      if (!ctx.viewerId) return new GraphQLError('Unauthorized');
      const nid = Number(fromGlobalId(id).dbId);
      await db
        .insert(schema.likes)
        .values({
          userId: ctx.viewerId,
          postId: nid,
          createdAt: getUnixTime(new Date()),
        })
        .onConflictDoNothing();
      const t = (
        await db
          .select()
          .from(schema.posts)
          .where(eq(schema.posts.id, nid))
          .limit(1)
      )[0]!;
      const post = mapPostRow(t);

      return {
        post: post,
        postEdge: {
          cursor: Buffer.from(`${t.createdAt}:${t.id}`).toString('base64'),
          node: post,
        },
        clientMutationId: clientMutationId,
      };
    },
    unlikePost: async (
      _: any,
      {
        input: { id, clientMutationId },
      }: { input: { id: string; clientMutationId?: string } },
      ctx: Context,
    ) => {
      if (!ctx.viewerId) return new GraphQLError('Unauthorized');
      const nid = Number(fromGlobalId(id).dbId);
      await db
        .delete(schema.likes)
        .where(
          and(
            eq(schema.likes.userId, ctx.viewerId),
            eq(schema.likes.postId, nid),
          ),
        );
      const t = (
        await db
          .select()
          .from(schema.posts)
          .where(eq(schema.posts.id, nid))
          .limit(1)
      )[0]!;
      const post = mapPostRow(t);

      return {
        post: post,
        postEdge: {
          cursor: Buffer.from(`${t.createdAt}:${t.id}`).toString('base64'),
          node: post,
        },
        clientMutationId: clientMutationId,
      };
    },
  },
};
