import { Avatar } from '@/components/ui/avatar';
import React from 'react';
import USER_AVATAR from '@/assets/avatars/avatar.webp';
import Image from 'next/image';
type FeedbackCardProps = {
  content: string;
  userName?: string;
  email?: string;
};

const FeedbackCard = ({ content, userName, email }: FeedbackCardProps) => {
  return (
    <div className="h-48 w-full space-y-6 overflow-hidden text-ellipsis rounded-md border border-primary/10 bg-background p-6 text-sm text-muted-foreground hover:border-primary/20">
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <Image className="relative" src={USER_AVATAR} alt="avatar"></Image>
        </Avatar>
        <div className="">
          <p className="text-primary">{userName ?? 'Annonymus'}</p>
          <p className="text-xs">{email ?? 'annonymus@wshiper.com'}</p>
        </div>
      </div>
      <p className="line-clamp-4 truncate text-wrap">{content}</p>
    </div>
  );
};

export default FeedbackCard;
