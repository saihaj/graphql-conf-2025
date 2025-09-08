import {
  sqliteTable,
  text,
  integer,
  primaryKey,
  index,
  AnySQLiteColumn,
} from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  username: text('username').notNull().unique(),
  name: text('name'),
  bio: text('bio'),
  passwordHash: text('password_hash').notNull(),
  createdAt: integer('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: integer('updated_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});

export const posts = sqliteTable(
  'posts',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    authorId: integer('author_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    text: text('text').notNull(),
    replyToId: integer('reply_to_id').references(
      (): AnySQLiteColumn => posts.id,
      {
        onDelete: 'cascade',
      },
    ),
    createdAt: integer('created_at')
      .notNull()
      .default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: integer('updated_at')
      .notNull()
      .default(sql`(CURRENT_TIMESTAMP)`),
  },
  t => ({
    byCreated: index('idx_post_created_desc').on(t.createdAt, t.id),
    byAuthorCreated: index('idx_post_author_created_desc').on(
      t.authorId,
      t.createdAt,
      t.id,
    ),
  }),
);

export const likes = sqliteTable(
  'likes',
  {
    userId: integer('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    postId: integer('tweet_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
    createdAt: integer('created_at')
      .notNull()
      .default(sql`(CURRENT_TIMESTAMP)`),
  },
  t => ({
    pk: primaryKey({ columns: [t.userId, t.postId] }),
    byTweet: index('idx_likes_tweet').on(t.postId),
    byUser: index('idx_likes_user').on(t.userId),
  }),
);

export const follows = sqliteTable(
  'follows',
  {
    followerId: integer('follower_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    followingId: integer('following_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    createdAt: integer('created_at')
      .notNull()
      .default(sql`(CURRENT_TIMESTAMP)`),
  },
  t => ({
    pk: primaryKey({ columns: [t.followerId, t.followingId] }),
    byFollower: index('idx_follows_follower').on(t.followerId),
    byFollowing: index('idx_follows_following').on(t.followingId),
  }),
);
