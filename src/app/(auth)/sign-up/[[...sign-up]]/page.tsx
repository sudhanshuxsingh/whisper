'use client'
import Image from "next/image";
import WHISPER_LOGO_BLACK from '@/assets/logo/whisper_black.svg';
import WHISPER_LOGO_WHITE from '@/assets/logo/whisper_white.svg';
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GrainyAuroraBox from "@/components/ui/grainy-aurora-box";
import Link from "next/link";
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import GoogleLogo from '@/assets/logo/google.png'
import { OAuthStrategy } from "@clerk/types";
import { useSignUp } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
export default function Page() {
  const {signUp,isLoaded}=useSignUp()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('_r')
  const signUpWithOAuth=(strategy:OAuthStrategy)=>{
    return signUp?.authenticateWithRedirect({
      strategy,
      redirectUrl:`/sso?${new URLSearchParams({_r:redirect??'/'})}`,
      redirectUrlComplete: redirect ?? '/',
      continueSignUp:true
    })
  }
  return (
    <Container className='h-screen w-screen grid md:grid-cols-2 lg:grid-cols-3 max-w-8xl fixed inset-0 z-[999] bg-background'>
      <GrainyAuroraBox/>
      <div className="grid place-items-center h-full">
        <div className="w-full px-6 md:px-12 max-w-md">
          <div className="flex gap-6 flex-col items-center mb-8">
            <div className="">
              <Image alt="Whisper" src={WHISPER_LOGO_WHITE} className="dark:block hidden"/>
              <Image alt="Whisper" src={WHISPER_LOGO_BLACK} className="dark:hidden"/>
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-medium">Sign Up to Whisper</h1>
              <p className="text-sm text-muted-foreground mt-2">Welcome back! Please sign up to continue</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Button variant={"outline"} className="gap-2 flex items-center" onClick={()=>signUpWithOAuth('oauth_github')} disabled={!isLoaded}>
              <GitHubLogoIcon/>
              <p>Github</p>
            </Button>
            <Button variant={"outline"} className="gap-2 flex items-center" disabled={!isLoaded}>
              <Image alt="Google" src={GoogleLogo} className="h-3 w-3" onClick={()=>signUpWithOAuth('oauth_google')} />
              Google
            </Button>
          </div>
          <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground">
            <Separator className="w-auto flex-grow flex-shrink"/>
            <p>Or</p>
            <Separator className="w-auto flex-grow flex-shrink"/>
          </div>
          <div className="mt-8 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input type="text" placeholder="First Name" id="first_name" name="first_name" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input type="text" placeholder="First Name" id="last_name" name="last_name" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="username">Username</Label>
              <Input type="text" placeholder="Username" id="username" name="username" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email address</Label>
              <Input type="text" placeholder="Email address" id="email" name="email" />
            </div>
            <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input type="password" placeholder="Password" id="password" name="password" />
          </div>
          </div>
          <Button className="w-full mt-6">Continue</Button>
          <p className="text-muted-foreground text-sm mt-4">Already have account? <Link href="/sign-in" className="hover:underline">Sign in</Link></p>
        </div>
      </div>
    </Container>
  )
}