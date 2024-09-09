'use client'
import Image from "next/image";
import WHISPER_LOGO_BLACK from '@/assets/logo/whisper_black.svg';
import WHISPER_LOGO_WHITE from '@/assets/logo/whisper_white.svg';
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { OAuthStrategy, SignInResource } from '@clerk/types'
import { isClerkAPIResponseError } from '@clerk/nextjs/errors'
import { useSignIn } from '@clerk/nextjs'
import GrainyAuroraBox from "@/components/ui/grainy-aurora-box";
import Link from "next/link";
import { GitHubLogoIcon, ReloadIcon } from '@radix-ui/react-icons'
import GoogleLogo from '@/assets/logo/google.png'
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { signInSchema } from "@/schema/signInSchema";
import { useState } from "react";
export default function Page() {
  const { signIn, isLoaded, setActive}=useSignIn()
  const [isProcessingSignInRequest,setIsProcessingSignInRequest]=useState<boolean>(false)
  const searchParams = useSearchParams()
  const redirect = searchParams.get('_r')
  const router = useRouter();

  const signInForm=useForm<z.infer<typeof signInSchema>>({
    resolver:zodResolver(signInSchema),
  })
  const signInWithOAuth = (strategy: OAuthStrategy) => {
    return signIn?.authenticateWithRedirect({
      strategy,
      redirectUrl:`/sso?${new URLSearchParams({_r:redirect??'/'})}`,
      redirectUrlComplete: redirect ?? '/',
      continueSignUp:true
    })
  }
  const handleSignIn=async({password,identifier}:z.infer<typeof signInSchema>)=>{
    if(!isLoaded) return;
    setIsProcessingSignInRequest(true)
    try {
      const res:SignInResource|undefined =await signIn?.create({
        password,
        strategy:'password',
        identifier
      })
      if (res?.status !== 'complete') {
        console.log({res})
      }
      if(res?.status==="complete"){
        await setActive?.({ session: res.createdSessionId })
        router.push(redirect ?? '/')
      }
    } catch (error) {
      if(isClerkAPIResponseError(error)){
        const {errors}=error;
        const [clerkError]=errors;
        console.log({clerkError})
        if(clerkError.code==="form_identifier_not_found"){
          signInForm.setError("identifier",{message:"Username or Email not found"})
        }
        if(clerkError.code==="form_password_incorrect"){
          signInForm.setError("password",{message:"Password is incorrect"})
        }
        if(clerkError.code==="user_locked"){
          signInForm.setError("root",{message:clerkError.longMessage})
        }      
      }
      console.log({error})
    }finally{
      setIsProcessingSignInRequest(false)
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
          <Form {...signInForm}>
            <form onSubmit={signInForm.handleSubmit(handleSignIn)}>
              <FormField
                control={signInForm.control}
                name="identifier"
                render={({field})=>(
                  <FormItem>
                    <FormLabel htmlFor="identifier">Email address or username</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Email or Username" id="identifier" {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={signInForm.control}
                name="password"
                render={({field})=>(
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="Password" id="password" {...field}/>
                        </FormControl>
                      <FormMessage/>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={!isLoaded || isProcessingSignInRequest} className="w-full mt-6">
                {isProcessingSignInRequest && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                Continue
              </Button>
            </form>
          </Form>
          <p className="text-muted-foreground text-sm mt-4">Don&apos;t have account? <Link href="/sign-up" className="hover:underline">Sign up</Link></p>
        </div>
      </div>
    </Container>  
  )
}
