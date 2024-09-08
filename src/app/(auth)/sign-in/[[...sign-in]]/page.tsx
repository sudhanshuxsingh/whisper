'use client'
import Image from "next/image";
import WHISPER_LOGO_BLACK from '@/assets/logo/whisper_black.svg';
import WHISPER_LOGO_WHITE from '@/assets/logo/whisper_white.svg';
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OAuthStrategy, SignInResource } from '@clerk/types'
import { useSignIn } from '@clerk/nextjs'
import { useState } from "react";
import GrainyAuroraBox from "@/components/ui/grainy-aurora-box";
import Link from "next/link";
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import GoogleLogo from '@/assets/logo/google.png'
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
export default function Page() {
  const { signIn, isLoaded}=useSignIn()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('_r')
  const [identifier,setIdentifier]=useState<string>("")
  const [password,setPassword]=useState<string>("")
  const router = useRouter();
  const signInWithOAuth = (strategy: OAuthStrategy) => {
    return signIn?.authenticateWithRedirect({
      strategy,
      redirectUrl:`/sso?${new URLSearchParams({_r:redirect??'/'})}`,
      redirectUrlComplete: redirect ?? '/',
      continueSignUp:true
    })
  }
  const handleSignIn=async()=>{
    try {
      const res:SignInResource|undefined =await signIn?.create({
        password,
        strategy:'password',
        identifier
      })
      if(res?.status==="complete"){
        router.push(redirect ?? '/')
      }
    } catch (error) {
      console.log({error})
    }
  }
  return (
    <Container className="h-screen w-screen grid md:grid-cols-2 lg:grid-cols-3 max-w-8xl fixed inset-0 z-[999] bg-background">
      <GrainyAuroraBox/>
      <div className="grid place-items-center h-full">
        <div className="w-full px-6 md:px-12 max-w-md">
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
            <Button variant={"outline"} disabled={!isLoaded} onClick={()=>signInWithOAuth("oauth_github")} className="gap-2 flex items-center">
              <GitHubLogoIcon/>
              <p>Github</p>
            </Button>
            <Button variant={"outline"} disabled={!isLoaded} className="gap-2 flex items-center" onClick={()=>signInWithOAuth("oauth_google")}>
              <Image alt="Google" src={GoogleLogo} className="h-3 w-3"/>
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
          <div className="flex flex-col gap-2 mt-4">
            <Label htmlFor="password">Password</Label>
            <Input type="password" placeholder="Password" id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <Button disabled={!isLoaded} className="w-full mt-6" onClick={handleSignIn}>Continue</Button>
          <p className="text-muted-foreground text-sm mt-4">Don&apos;t have account? <Link href="/sign-up" className="hover:underline">Sign up</Link></p>
        </div>
      </div>
    </Container>  
  )
}
