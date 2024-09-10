import * as HoverCard from '@radix-ui/react-hover-card';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {UserCircle2Icon} from 'lucide-react'
import { currentUser, User } from '@clerk/nextjs/server'
import { Separator } from "./separator";
import SignOutUser from './sign-out-user-button';
const UserProfileButton = async () => {
  const user:User|null=await currentUser()
  if(!user){ 
    return;
  }

  const {fullName,imageUrl,primaryEmailAddress}=user;

  return (
    <HoverCard.Root>
    <HoverCard.Trigger asChild>
      <Avatar className="cursor-pointer">
        <AvatarImage src={imageUrl} />
        <AvatarFallback>
          <UserCircle2Icon/>
        </AvatarFallback>
      </Avatar>
    </HoverCard.Trigger>
    <HoverCard.Portal>
      <HoverCard.Content
        className="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-[300px] bg-secondary shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] rounded-xl data-[state=open]:transition-all z-[101] border border-1"
        sideOffset={5}
      >
        <div className="flex flex-col">
          <div className="flex gap-2 bg-background/90 p-4 rounded-xl items-center border">
            <Avatar className="cursor-pointer">
              <AvatarImage src={imageUrl} />
              <AvatarFallback>
                <UserCircle2Icon/>
              </AvatarFallback>
            </Avatar>
            <div className="">
              <p className="text-sm">{fullName}</p>
              <p className="text-muted-foreground text-xs">{primaryEmailAddress?.emailAddress}</p>
            </div>
          </div>
          <Separator/>
          <div className="p-1">
            <SignOutUser/>
          </div>
        </div>
        <HoverCard.Arrow className="fill-secondary" />
      </HoverCard.Content>
    </HoverCard.Portal>
  </HoverCard.Root>
  )
}

export default UserProfileButton