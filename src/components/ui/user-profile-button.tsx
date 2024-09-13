import * as HoverCard from '@radix-ui/react-hover-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserCircle2Icon } from 'lucide-react';
import { currentUser, User } from '@clerk/nextjs/server';
import { Separator } from './separator';
import SignOutUser from './sign-out-user-button';
import { cn } from '@/lib/utils';
const UserProfileButton = async ({ className }: { className?: string }) => {
  const user: User | null = await currentUser();
  if (!user) {
    return;
  }
  const { imageUrl } = user;
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <Avatar className={cn('size-8 cursor-pointer', className)}>
          <AvatarImage src={imageUrl} />
          <AvatarFallback>
            <UserCircle2Icon />
          </AvatarFallback>
        </Avatar>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade border-1 z-[101] w-[300px] rounded-xl border bg-secondary shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
          sideOffset={5}
        >
          <div className="flex flex-col">
            <UserProfileCard className="border" />
            <Separator />
            <div className="p-1">
              <SignOutUser />
            </div>
          </div>
          <HoverCard.Arrow className="fill-secondary" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};

export const UserProfileCard = async ({
  className,
}: {
  className?: string;
}) => {
  const user: User | null = await currentUser();
  if (!user) {
    return;
  }
  const { fullName, imageUrl, primaryEmailAddress } = user;
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-xl bg-background/90 p-4',
        className
      )}
    >
      <Avatar className="cursor-pointer">
        <AvatarImage src={imageUrl} />
        <AvatarFallback>
          <UserCircle2Icon />
        </AvatarFallback>
      </Avatar>
      <div className="">
        <p className="text-sm">{fullName}</p>
        <p className="text-xs text-muted-foreground">
          {primaryEmailAddress?.emailAddress}
        </p>
      </div>
    </div>
  );
};
export const UserProfileInline = async ({
  className,
}: {
  className?: string;
}) => {
  const user: User | null = await currentUser();
  if (!user) {
    return;
  }
  const { firstName, imageUrl, primaryEmailAddress, username } = user;
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Avatar className="h-[1.2rem] w-[1.2rem] cursor-pointer">
        <AvatarImage src={imageUrl} />
        <AvatarFallback>
          <UserCircle2Icon />
        </AvatarFallback>
      </Avatar>
      <p className="font-medium">
        {firstName ?? username ?? primaryEmailAddress?.emailAddress}&apos;s{' '}
        space
      </p>
    </div>
  );
};

export default UserProfileButton;
