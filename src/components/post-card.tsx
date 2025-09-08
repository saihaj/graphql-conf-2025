'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from './auth-provider';
import { graphql, useFragment, useMutation } from 'react-relay';
import { postCard$key } from './__generated__/postCard.graphql';
import { notionistsNeutral } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { postCardLikeMutation } from './__generated__/postCardLikeMutation.graphql';
import { postCardUnlikeMutation } from './__generated__/postCardUnlikeMutation.graphql';

export function PostCard({ post }: { post: postCard$key }) {
  const data = useFragment(
    graphql`
      fragment postCard on Post {
        id
        likeCount
        text
        likedByMe
        createdAt
        author {
          id
          username
        }
      }
    `,
    post,
  );

  const { user } = useAuth();
  const avatar = createAvatar(notionistsNeutral, {
    seed: user?.id,
  });

  const handleLike = () => {
    // console.log('post', data);
    // if (data.likedByMe) {
    //   commitUnlike({
    //     variables: {
    //       id: data.id,
    //     },
    //     onCompleted: response => {
    //       toast(
    //         !response.unlikePost.post.likedByMe
    //           ? 'Post unliked!'
    //           : 'Post liked!',
    //       );
    //     },
    //     optimisticResponse: {
    //       unlikePost: {
    //         post: {
    //           id: data.__id,
    //           likeCount: data.likeCount - 1,
    //           likedByMe: true,
    //         },
    //       },
    //     },
    //     onError: err => {
    //       toast.error('Failed to unlike', {
    //         description: err.message,
    //       });
    //     },
    //   });
    //   return;
    // }
    // commitLike({
    //   variables: {
    //     id: data.id,
    //   },
    //   onCompleted: response => {
    //     toast(response.likePost.post.id ? 'Post liked!' : 'Post unliked');
    //   },
    //   optimisticResponse: {
    //     likePost: {
    //       post: {
    //         id: data.id,
    //         likeCount: data.likeCount + 1,
    //         likedByMe: true,
    //       },
    //     },
    //   },
    //   onError: err => {
    //     toast.error('Failed to like', {
    //       description: err.message,
    //     });
    //   },
    // });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60),
      );
      return `${diffInMinutes}m`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const renderContent = (content: string) => {
    // Simple hashtag and mention highlighting
    return content.split(/(\s+)/).map((word, index) => {
      if (word.startsWith('#')) {
        return (
          <span
            key={index}
            className="text-primary hover:underline cursor-pointer"
          >
            {word}
          </span>
        );
      } else if (word.startsWith('@')) {
        return (
          <span
            key={index}
            className="text-primary hover:underline cursor-pointer"
          >
            {word}
          </span>
        );
      }
      return word;
    });
  };

  return (
    <>
      <Card className="border-b border-border rounded-none hover:bg-muted/50 transition-colors">
        <CardContent className="p-4">
          <div className="flex space-x-3">
            <div
              className="h-10 w-10 rounded-full overflow-hidden"
              dangerouslySetInnerHTML={{
                __html: avatar.toString(),
              }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-muted-foreground text-sm">
                  @{data.author.username}
                </span>
                <span className="text-muted-foreground text-sm">·</span>
                <span className="text-muted-foreground text-sm">
                  {formatDate(data.createdAt)}
                </span>
              </div>

              <div className="text-sm mb-3 whitespace-pre-wrap">
                {renderContent(data.text)}
              </div>

              <div className="flex items-center -ml-2 gap-2 max-w-md">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={`text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors ${
                    data.likedByMe ? 'text-red-500' : ''
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 mr-1 transition-all ${data.likedByMe ? 'fill-current scale-110' : ''}`}
                  />
                  <span className="text-xs">{data.likeCount}</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
