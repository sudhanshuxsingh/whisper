'use client'
import Image from "next/image";
import WHISPER_LOGO_BLACK from '@/assets/logo/whisper_black.svg';
import WHISPER_LOGO_WHITE from '@/assets/logo/whisper_white.svg';
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";



export default function Page() {
  const {signIn,isLoaded,setActive}=useSignIn()
  const [identifier,setIdentifier]=useState<string>("")
  const [pendingVerification,setPendingVerification]=useState()
  const router=useRouter()
  return (
    <Container className="h-screen w-screen grid md:grid-cols-2 lg:grid-cols-3">
      <div className="hidden rounded-2xl md:block h-[90vh] my-auto bg-red-400 lg:col-span-2">
      </div>
      <div className="grid place-items-center h-full">
        <div className="w-full px-6 md:px-12">
          <div className="flex gap-6 flex-col items-center mb-8">
            <div className="">
              <Image alt="Whisper" src={WHISPER_LOGO_WHITE} className="dark:block hidden"/>
              <Image alt="Whisper" src={WHISPER_LOGO_BLACK} className="dark:hidden"/>
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-medium">Sign in to Whisper</h1>
              <p className="text-sm text-muted-foreground mt-2">Welcome back! Please sign in to continue</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Button variant={"outline"} disabled={!isLoaded}>
              Github
            </Button>
            <Button variant={"outline"} disabled={!isLoaded}>
              Google
            </Button>
          </div>
          <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground">
            <Separator className="w-auto flex-grow flex-shrink"/>
            <p>Or</p>
            <Separator className="w-auto flex-grow flex-shrink"/>
          </div>
          <div className="flex flex-col gap-2 mt-8">
            <Label htmlFor="identifier">Email address or username</Label>
            <Input type="email" placeholder="Email" id="identifier" name="identifier" value={identifier} onChange={(e)=>setIdentifier(e.target.value)}/>
          </div>
          <Button disabled={!isLoaded} className="w-full mt-4">Continue</Button>
          <p className="text-muted-foreground text-sm mt-4">Don&apos;t have account? <span>Sign up</span></p>
        </div>
      </div>
    </Container>
  )
}