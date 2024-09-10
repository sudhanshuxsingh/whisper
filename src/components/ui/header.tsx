// 'use client'
import React from 'react'
import WHISPER_LOGO_BLACK from '@/assets/logo/whisper_black.svg';
import WHISPER_LOGO_WHITE from '@/assets/logo/whisper_white.svg';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Container from './container'
import Link from 'next/link'
import Image from 'next/image'
import { Button, buttonVariants } from './button';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { auth } from '@clerk/nextjs/server';
import UserProfileButton from './user-profile-button';
import {ArrowRightIcon} from '@radix-ui/react-icons'
import { MENU_ITEM_LIST } from '../data/header-data';
import SignOutUser from './sign-out-user-button';
const Header = () => {
    const {userId}=auth()
    return (
        <header className='sticky left-0 top-0 z-[100] flex w-full flex-col border-b border-border dark:border-dark-border bg-background'>
            <div className="flex h-[--header-height] bg-background">
                <Container className='w-full px-6 flex items-center justify-between'>
                    <Logo/>
                    <nav className='relative z-[1] flex-col justify-center hidden lg:flex'>
                        <ul className='flex flex-1 gap-0.5 px-4'>
                            {
                                MENU_ITEM_LIST.map(({content,href})=>(
                                    <li key={content}>
                                        <MenuItem content={content} href={href}/>
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                    <div className="hidden items-center gap-2 justify-self-end lg:flex">
                        {!userId && <Link className={cn(buttonVariants({variant:'rounded'}),'h-8 text-sm font-medium border border-secondary-foreground/10 px-3.5')} href="/sign-in">
                            Sign In
                        </Link>}
                        <Link className={cn(buttonVariants({variant:!userId ? 'rounded' :'link'}),!userId?'h-8 font-medium text-sm px-3.5 text-white bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-600':'gap-1')} href="/dashboard">
                            {
                                !userId ? 'Get Started Today' :
                                <>
                                    <span>
                                        Get Started 
                                    </span>
                                    <ArrowRightIcon/>
                                </>
                            }
                        </Link>
                        <UserProfileButton/>
                    </div>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                            variant="ghost"
                            size="icon"
                            className="shrink-0 lg:hidden"
                            >
                            <HamburgerMenuIcon className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <nav className="flex flex-col gap-4 font-medium h-full">
                            <Logo/>
                            {
                                MENU_ITEM_LIST.map(({content,href})=>(
                                    <Link
                                        href={href}
                                        key={content}
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                       {content}
                                    </Link>
                                ))
                            }
                            <SignOutUser className='mt-auto'/>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </Container>
            </div>
        </header>
    )
}

type MenuItemPropsType={
    content:string,
    href:string,
    className?:string
}

const MenuItem=({
    content,
    href,
    className
}:MenuItemPropsType)=>{
    return(
        <Link href={href} className={cn('gap-1 shrink-0 rounded-full ring-control font-medium focus-visible:ring-2 tracking-tight outline-none outline-0 inline-flex h-6 items-center justify-center px-3 pb-px hover:bg-secondary lg:h-7',className)}>
            {content}
        </Link>
    )
}

const Logo=()=>(
    <Link href="/" about='home' className='flex items-center'>
        <Image alt="Whisper" src={WHISPER_LOGO_WHITE} className="dark:block hidden h-8"/>
        <Image alt="Whisper" src={WHISPER_LOGO_BLACK} className="dark:hidden"/>
        <p className='font-bold text-2xl'>Whisper</p>
    </Link>
)

export default Header