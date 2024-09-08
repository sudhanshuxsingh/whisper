'use client'
import Image from "next/image";
import WHISPER_LOGO_BLACK from '@/assets/logo/whisper_black.svg';
import WHISPER_LOGO_WHITE from '@/assets/logo/whisper_white.svg';
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OAuthStrategy } from '@clerk/types'
import { useSignIn, useSignUp } from '@clerk/nextjs'
import { useState } from "react";
import GrainyAuroraBox from "@/components/ui/grainy-aurora-box";
import Link from "next/link";
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import GoogleLogo from '@/assets/logo/google.png'
// import { useRouter } from "next/navigation";


// const isLoaded=true
export default function Page() {
  const {signIn,isLoaded}=useSignIn()
  const { signUp, setActive } = useSignUp()
  const [identifier,setIdentifier]=useState<string>("")
  // const [pendingVerification,setPendingVerification]=useState()
  // const router=useRouter()
  if(!signIn && !signUp) return null
  const signInWithOAuth = (strategy: OAuthStrategy) => {
    return signIn?.authenticateWithRedirect({
      strategy,
      redirectUrl: '/sign-up/sso-callback',
      redirectUrlComplete: '/',
    })
  }
  async function handleOAuthSignIn(strategy: OAuthStrategy) {
    if (!signIn || !signUp) return null
    // If the user has an account, but does not yet
    // have an OAuth account connected to it, you transfer the OAuth
    // account to the existing user account.
    const userExistsButNeedsToSignIn =
      signUp.verifications.externalAccount.status === 'transferable' &&
      signUp.verifications.externalAccount.error?.code === 'external_account_exists'
    if (userExistsButNeedsToSignIn) {
      const res = await signIn.create({ transfer: true })
      if (res.status === 'complete') {
        setActive({
          session: res.createdSessionId,
        })
      }
    }
    // If the user has an OAuth account but does not yet
    // have an account in app, create an account
    // for them using the OAuth information.
    const userNeedsToBeCreated = signIn.firstFactorVerification.status === 'transferable'
    if (userNeedsToBeCreated) {
      const res = await signUp.create({
        transfer: true,
      })

      if (res.status === 'complete') {
        setActive({
          session: res.createdSessionId,
        })
      }
    } else {
      // If the user has an account
      // and has an OAuth account connected to it,sign them in.
      signInWithOAuth(strategy)
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
            <Button variant={"outline"} disabled={!isLoaded} onClick={()=>handleOAuthSignIn('oauth_github')} className="gap-2 flex items-center">
              <GitHubLogoIcon/>
              <p>Github</p>
            </Button>
            <Button variant={"outline"} disabled={!isLoaded} className="gap-2 flex items-center" onClick={()=>handleOAuthSignIn('oauth_google')}>
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
          <Button disabled={!isLoaded} className="w-full mt-4">Continue</Button>
          <p className="text-muted-foreground text-sm mt-4">Don&apos;t have account? <Link href="/sign-up">Sign up</Link></p>
        </div>
      </div>
    </Container>  
  )
}
