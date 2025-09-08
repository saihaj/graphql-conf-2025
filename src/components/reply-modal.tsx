'use client';

import type React from 'react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { Post } from '@/lib/types';
import { useAuth } from './auth-provider';
import { usePosts } from './post-provider';

interface ReplyModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
}

export function ReplyModal({ post, isOpen, onClose }: ReplyModalProps) {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();
  const { createPost, isLoading } = usePosts();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!content.trim()) {
      setError('Reply content cannot be empty');
      return;
    }

    if (content.length > 280) {
      setError('Reply content cannot exceed 280 characters');
      return;
    }

    const result = await createPost({
      content: content.trim(),
      replyToId: post.id,
    });

    if (result.success) {
      setContent('');
      onClose();
    } else {
      setError(result.error || 'Failed to post reply');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      ' at ' +
      date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Reply to {post.user?.displayName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Original post */}
          <div className="flex space-x-3 p-3 bg-muted/50 rounded-lg">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.user?.avatarUrl || '/placeholder.svg'} />
              <AvatarFallback>
                {post.user?.displayName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-semibold text-sm">
                  {post.user?.displayName}
                </span>
                <span className="text-muted-foreground text-xs">
                  @{post.user?.username}
                </span>
                <span className="text-muted-foreground text-xs">·</span>
                <span className="text-muted-foreground text-xs">
                  {formatDate(post.createdAt)}
                </span>
              </div>
              <p className="text-sm">{post.content}</p>
            </div>
          </div>

          {/* Reply form */}
          <form onSubmit={handleSubmit}>
            <div className="flex space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.avatarUrl || '/placeholder.svg'} />
                <AvatarFallback>{user?.displayName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <Textarea
                  placeholder={`Reply to @${post.user?.username}...`}
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  className="min-h-[100px] resize-none"
                  maxLength={300}
                />

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {content.length}/280
                  </span>
                  <div className="space-x-2">
                    <Button type="button" variant="outline" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={
                        !content.trim() || content.length > 280 || isLoading
                      }
                    >
                      {isLoading ? 'Replying...' : 'Reply'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
