'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle, MapPin, LinkIcon, Calendar } from 'lucide-react';
import type { User } from '@/lib/types';
import { useAuth } from './auth-provider';
import { useSocial } from './social-provider';

interface UserProfileCardProps {
  user: User;
  showFollowButton?: boolean;
}

export function UserProfileCard({
  user,
  showFollowButton = true,
}: UserProfileCardProps) {
  const { user: currentUser } = useAuth();
  const { followUser, unfollowUser, isFollowing, isLoading } = useSocial();

  const handleFollowToggle = async () => {
    if (isFollowing(user.id)) {
      await unfollowUser(user.id);
    } else {
      await followUser(user.id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const isCurrentUser = currentUser?.id === user.id;
  const following = isFollowing(user.id);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatarUrl || '/placeholder.svg'} />
            <AvatarFallback className="text-lg">
              {user.displayName?.charAt(0) || user.username?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          {showFollowButton && !isCurrentUser && (
            <Button
              variant={following ? 'outline' : 'default'}
              size="sm"
              onClick={handleFollowToggle}
              disabled={isLoading}
              className={
                following
                  ? 'hover:bg-destructive hover:text-destructive-foreground'
                  : ''
              }
            >
              {isLoading ? '...' : following ? 'Following' : 'Follow'}
            </Button>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-lg">{user.displayName}</h3>
            {user.verified && <CheckCircle className="h-5 w-5 text-primary" />}
          </div>
          <p className="text-muted-foreground">@{user.username}</p>

          {user.bio && <p className="text-sm">{user.bio}</p>}

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {user.location && (
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{user.location}</span>
              </div>
            )}
            {user.website && (
              <div className="flex items-center space-x-1">
                <LinkIcon className="h-4 w-4" />
                <a
                  href={user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {user.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Joined {formatDate(user.createdAt)}</span>
            </div>
          </div>

          <div className="flex space-x-4 text-sm">
            <div>
              <span className="font-semibold">{user.followingCount || 0}</span>
              <span className="text-muted-foreground ml-1">Following</span>
            </div>
            <div>
              <span className="font-semibold">{user.followersCount || 0}</span>
              <span className="text-muted-foreground ml-1">Followers</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
