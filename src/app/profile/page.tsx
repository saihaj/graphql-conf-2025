'use client';
import { AuthGuard } from '@/components/auth-guard';
import { UserProfileCard } from '@/components/user-profile-card';
import { useAuth } from '@/components/auth-provider';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <AuthGuard>
      <div className="flex-1 border-r border-border">
        <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border p-4">
          <h1 className="text-xl font-bold">Profile</h1>
        </div>

        <div className="p-4">
          <UserProfileCard user={user} showFollowButton={false} />
        </div>
      </div>

      <div className="w-80 p-4">
        <div className="text-center text-muted-foreground">
          <p className="text-sm">Your personal space on the platform</p>
        </div>
      </div>
    </AuthGuard>
  );
}
