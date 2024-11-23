'use client';
import Image from 'next/image';
import WHISPER_LOGO_BLACK from '@/assets/logo/whisper_black.svg';
import WHISPER_LOGO_WHITE from '@/assets/logo/whisper_white.svg';
import Container from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { OAuthStrategy, SignInResource } from '@clerk/types';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { useSignIn } from '@clerk/nextjs';
import Link from 'next/link';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import GoogleLogo from '@/assets/logo/google.png';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { signInSchema } from '@/schema/signInSchema';
import { useState } from 'react';
import { Loader } from 'lucide-react';
export default function Page() {
  const { signIn, isLoaded, setActive } = useSignIn();
  const [isProcessingSignInRequest, setIsProcessingSignInRequest] =
    useState<boolean>(false);
  const searchParams = useSearchParams();
  const redirect = searchParams.get('_r');
  const router = useRouter();

  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const signInWithOAuth = (strategy: OAuthStrategy) => {
    return signIn?.authenticateWithRedirect({
      strategy,
      redirectUrl: `/sso?${new URLSearchParams({ _r: redirect ?? '/' })}`,
      redirectUrlComplete: redirect ?? '/',
      continueSignUp: true,
    });
  };

  const handleSignIn = async ({
    password,
    identifier,
  }: z.infer<typeof signInSchema>) => {
    if (!isLoaded) return;
    setIsProcessingSignInRequest(true);
    try {
      const res: SignInResource | undefined = await signIn?.create({
        password,
        strategy: 'password',
        identifier,
      });
      if (res?.status !== 'complete') {
        console.log({ res });
      }
      if (res?.status === 'complete') {
        await setActive?.({ session: res.createdSessionId });
        router.push(redirect ?? '/');
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        const { errors } = error;
        if (errors.some((err) => err.code === 'form_identifier_not_found')) {
          signInForm.setError('identifier', {
            message: 'Invalid Username or Email Address',
          });
        }
        if (errors.some((err) => err.code === 'form_password_incorrect')) {
          signInForm.setError('password', {
            message: 'Password is incorrect',
          });
        }
        if (errors.some((err) => err.code === 'user_locked')) {
          signInForm.setError('root', {
            message:
              'User Account has been locked. Please connect Admin or try again after sometime.',
          });
        }
        if (errors.some((err) => err.code === 'session_exists')) {
          signInForm.setError('identifier', {
            message:
              "You're currently in single session mode. You can only be signed into one account at a time.",
          });
        }
        if (errors.some((err) => err.code === 'identifier_already_signed_in')) {
          signInForm.setError('identifier', {
            message: "You're already signed in",
          });
        }
      }
      console.log({ error });
    } finally {
      setIsProcessingSignInRequest(false);
    }
  };

  return (
    <Container className="absolute inset-0 z-[999] grid h-screen w-screen max-w-8xl place-items-center overflow-y-auto bg-background">
      <div className="w-full max-w-md px-6 md:px-12">
        <div className="mb-8 flex flex-col items-center gap-6">
          <div className="">
            <Image
              alt="Whisper"
              src={WHISPER_LOGO_WHITE}
              className="hidden dark:block"
            />
            <Image
              alt="Whisper"
              src={WHISPER_LOGO_BLACK}
              className="dark:hidden"
            />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-medium">Sign in to Whisper</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Welcome back! Please sign in to continue
            </p>
          </div>
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <Button
            variant={'outline'}
            disabled={!isLoaded}
            onClick={() => signInWithOAuth('oauth_github')}
            className="flex items-center gap-2"
          >
            <GitHubLogoIcon />
            <p>Github</p>
          </Button>
          <Button
            variant={'outline'}
            disabled={!isLoaded}
            className="flex items-center gap-2"
            onClick={() => signInWithOAuth('oauth_google')}
          >
            <Image alt="Google" src={GoogleLogo} className="h-3 w-3" />
            Google
          </Button>
        </div>
        <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground">
          <Separator className="w-auto flex-shrink flex-grow" />
          <p>Or</p>
          <Separator className="w-auto flex-shrink flex-grow" />
        </div>
        <Form {...signInForm}>
          <form onSubmit={signInForm.handleSubmit(handleSignIn)}>
            <FormField
              control={signInForm.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="identifier">
                    Email address or username
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Email or Username"
                      id="identifier"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signInForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      id="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={!isLoaded || isProcessingSignInRequest}
              className="mt-6 w-full"
              variant="primarySquare"
            >
              {isProcessingSignInRequest && (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              )}
              Continue
            </Button>
          </form>
        </Form>
        <p className="mt-4 text-sm text-muted-foreground">
          Don&apos;t have account?{' '}
          <Link href="/sign-up" className="hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </Container>
  );
}
