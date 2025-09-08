'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { notionistsNeutral } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import type React from 'react';
import { useState } from 'react';
import { useAuth } from './auth-provider';

export function CreatePost() {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();

  const avatar = createAvatar(notionistsNeutral, {
    seed: user?.id,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!content.trim()) {
      setError('Post content cannot be empty');
      return;
    }

    if (content.length > 280) {
      setError('Post content cannot exceed 280 characters');
      return;
    }
  };

  const characterCount = content.length;
  const isOverLimit = characterCount > 280;

  return (
    <Card className="border-b border-border rounded-none">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-3">
            <div
              className="h-10 w-10 rounded-full overflow-hidden"
              dangerouslySetInnerHTML={{
                __html: avatar.toString(),
              }}
            />
            <div className="flex-1 space-y-3">
              <Textarea
                placeholder="What's happening?"
                value={content}
                onChange={e => setContent(e.target.value)}
                className="min-h-[100px] resize-none border-none p-4 text-lg placeholder:text-muted-foreground focus-visible:ring-0"
                maxLength={300}
              />

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex items-center justify-end">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-sm ${isOverLimit ? 'text-destructive' : 'text-muted-foreground'}`}
                    >
                      {characterCount}/280
                    </span>
                    <div className="relative w-6 h-6">
                      <svg
                        className="w-6 h-6 transform -rotate-90"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          className="text-muted-foreground/20"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray={`${(characterCount / 280) * 62.83} 62.83`}
                          className={
                            isOverLimit ? 'text-destructive' : 'text-primary'
                          }
                        />
                      </svg>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={!content.trim() || isOverLimit}
                    className="rounded-full px-6"
                  >
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
