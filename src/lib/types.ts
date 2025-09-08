// TypeScript types for the social media platform

export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  location?: string;
  website?: string;
  verified: boolean;
  privateAccount: boolean;
  createdAt: string;
  updatedAt: string;
  // Computed fields
  followersCount?: number;
  followingCount?: number;
  postsCount?: number;
  isFollowing?: boolean;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  mediaUrls?: string[];
  replyToId?: string;
  quotePostId?: string;
  isRepost: boolean;
  originalPostId?: string;
  createdAt: string;
  updatedAt: string;
  // Computed fields and relations
  user?: User;
  likesCount?: number;
  repostsCount?: number;
  repliesCount?: number;
  isLiked?: boolean;
  isReposted?: boolean;
  isBookmarked?: boolean;
  replyTo?: Post;
  quotePost?: Post;
  hashtags?: string[];
}

export interface Like {
  id: string;
  userId: string;
  postId: string;
  createdAt: string;
}

export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: string;
}

export interface Bookmark {
  id: string;
  userId: string;
  postId: string;
  createdAt: string;
}

export interface Hashtag {
  id: string;
  name: string;
  postCount: number;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'repost' | 'reply' | 'follow' | 'mention';
  actorId?: string;
  postId?: string;
  read: boolean;
  createdAt: string;
  // Relations
  actor?: User;
  post?: Post;
}

export interface CreatePostData {
  content: string;
  mediaUrls?: string[];
  replyToId?: string;
  quotePostId?: string;
}

export interface UpdateUserData {
  displayName?: string;
  bio?: string;
  location?: string;
  website?: string;
  avatarUrl?: string;
  bannerUrl?: string;
}
