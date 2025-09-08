// Mock data for development without database
import type { User, Post, Hashtag } from './types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'johndoe',
    email: 'john@example.com',
    displayName: 'John Doe',
    bio: 'Software developer passionate about web technologies',
    avatarUrl: '/professional-male-avatar.png',
    verified: false,
    privateAccount: false,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    followersCount: 1250,
    followingCount: 340,
    postsCount: 89,
  },
  {
    id: '2',
    username: 'janedoe',
    email: 'jane@example.com',
    displayName: 'Jane Doe',
    bio: 'Designer and creative thinker ✨',
    avatarUrl: '/professional-female-avatar.png',
    verified: true,
    privateAccount: false,
    createdAt: '2024-01-10T08:30:00Z',
    updatedAt: '2024-01-10T08:30:00Z',
    followersCount: 2840,
    followingCount: 180,
    postsCount: 156,
  },
  {
    id: '3',
    username: 'techguru',
    email: 'tech@example.com',
    displayName: 'Tech Guru',
    bio: 'Sharing the latest in technology and innovation 🚀',
    avatarUrl: '/tech-expert-avatar.png',
    verified: true,
    privateAccount: false,
    createdAt: '2024-01-05T12:00:00Z',
    updatedAt: '2024-01-05T12:00:00Z',
    followersCount: 15600,
    followingCount: 420,
    postsCount: 892,
  },
];

export const mockPosts: Post[] = [
  {
    id: '1',
    userId: '1',
    content:
      'Just shipped a new feature using React 18 and the new concurrent features. The performance improvements are incredible! #react #webdev',
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    isRepost: false,
    likesCount: 24,
    repostsCount: 8,
    repliesCount: 5,
    hashtags: ['react', 'webdev'],
  },
  {
    id: '2',
    userId: '2',
    content:
      'Working on a new design system for our product. Color theory and typography choices can make or break user experience. What are your favorite design resources?',
    createdAt: '2024-01-20T12:15:00Z',
    updatedAt: '2024-01-20T12:15:00Z',
    isRepost: false,
    likesCount: 67,
    repostsCount: 12,
    repliesCount: 18,
  },
  {
    id: '3',
    userId: '3',
    content:
      'The future of web development is here! AI-powered coding assistants are changing how we build applications. What tools are you using? #ai #programming',
    createdAt: '2024-01-20T10:45:00Z',
    updatedAt: '2024-01-20T10:45:00Z',
    isRepost: false,
    likesCount: 156,
    repostsCount: 43,
    repliesCount: 29,
    hashtags: ['ai', 'programming'],
  },
  {
    id: '4',
    userId: '1',
    content:
      'Quick tip: Use CSS Grid for complex layouts and Flexbox for component-level alignment. They work beautifully together! 💡',
    createdAt: '2024-01-19T16:20:00Z',
    updatedAt: '2024-01-19T16:20:00Z',
    isRepost: false,
    likesCount: 89,
    repostsCount: 21,
    repliesCount: 12,
  },
];

export const mockHashtags: Hashtag[] = [
  {
    id: '1',
    name: 'react',
    postCount: 1250,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'webdev',
    postCount: 2340,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'javascript',
    postCount: 3450,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    name: 'design',
    postCount: 1890,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '5',
    name: 'programming',
    postCount: 2100,
    createdAt: '2024-01-01T00:00:00Z',
  },
  { id: '6', name: 'ai', postCount: 980, createdAt: '2024-01-01T00:00:00Z' },
  {
    id: '7',
    name: 'technology',
    postCount: 1560,
    createdAt: '2024-01-01T00:00:00Z',
  },
];

// Current user for demo purposes
export const currentUser: User = mockUsers[0];
