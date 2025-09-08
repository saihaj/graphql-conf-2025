'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserProfileCard } from './user-profile-card';
import { mockUsers } from '@/lib/mock-data';
import { useAuth } from './auth-provider';
import { useSocial } from './social-provider';

export function SuggestedUsers() {
  const { user } = useAuth();
  const { isFollowing } = useSocial();

  // Filter out current user and already followed users
  const suggestedUsers = mockUsers
    .filter(u => u.id !== user?.id && !isFollowing(u.id))
    .slice(0, 3);

  if (suggestedUsers.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Who to follow</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestedUsers.map(suggestedUser => (
          <UserProfileCard
            key={suggestedUser.id}
            user={suggestedUser}
            showFollowButton={true}
          />
        ))}
      </CardContent>
    </Card>
  );
}
