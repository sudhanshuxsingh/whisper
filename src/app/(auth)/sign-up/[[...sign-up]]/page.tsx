'use client';
import Image from 'next/image';
import WHISPER_LOGO_BLACK from '@/assets/logo/whisper_black.svg';
import WHISPER_LOGO_WHITE from '@/assets/logo/whisper_white.svg';
import Container from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import GrainyAuroraBox from '@/components/ui/grainy-aurora-box';
import Link from 'next/link';
import { GitHubLogoIcon, ReloadIcon } from '@radix-ui/react-icons';
import GoogleLogo from '@/assets/logo/google.png';
import { OAuthStrategy } from '@clerk/types';
import { useSignUp } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { signUpSchema } from '@/schema/signUpSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { otpVerificationSchema } from '@/schema/otpVerificationSchema';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
export default function Page() {
  const { signUp, isLoaded, setActive } = useSignUp();
  const searchParams = useSearchParams();
  const [isProcessingSignUpRequest, setIsProcessingSignUpRequest] =
    useState<boolean>(false);
  const [verifying, setVerifying] = useState(false);
  const router = useRouter();
  const redirect = searchParams.get('_r');

  const otpForm = useForm<z.infer<typeof otpVerificationSchema>>({
    resolver: zodResolver(otpVerificationSchema),
    defaultValues: {
      code: '',
    },
  });

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  const signUpWithOAuth = (strategy: OAuthStrategy) => {
    return signUp?.authenticateWithRedirect({
      strategy,
      redirectUrl: `/sso?${new URLSearchParams({ _r: redirect ?? '/' })}`,
      redirectUrlComplete: redirect ?? '/',
      continueSignUp: true,
    });
  };

  const handleSignUp = async ({
    firstName,
    email,
    lastName,
    userName,
    password,
  }: z.infer<typeof signUpSchema>) => {
    if (!isLoaded) return;
    setIsProcessingSignUpRequest(true);
    try {
      await signUp?.create({
        firstName,
        lastName,
        username: userName,
        emailAddress: email,
        password,
      });

      const emailVerify = await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });
      console.log({ emailVerify });
      setVerifying(true);
      setIsProcessingSignUpRequest(false);
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        const { errors } = error;
        if (
          errors.some(
            (err) =>
              err.code === 'form_identifier_exists' &&
              err.meta?.paramName === 'email'
          )
        ) {
          signUpForm.setError('email', {
            message: 'That email address is taken. Please try another.',
          });
        }
        if (
          errors.some(
            (err) =>
              err.code === 'form_identifier_exists' &&
              err.meta?.paramName === 'username'
          )
        ) {
          signUpForm.setError('userName', {
            message: 'That username is taken. Please try another.',
          });
        }
        if (errors.some((err) => err.code === 'form_password_pwned')) {
          signUpForm.setError('password', {
            message:
              'Password has been found in an online data breach. For account safety, please use a different password.',
          });
        }
      }
      console.log({ error });
    } finally {
      setIsProcessingSignUpRequest(false);
    }
  };

  const handleVerify = async ({
    code,
  }: z.infer<typeof otpVerificationSchema>) => {
    if (!isLoaded) return;
    setIsProcessingSignUpRequest(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status === 'complete') {
        await setActive?.({ session: completeSignUp.createdSessionId });
        router.push(redirect ?? '/');
      } else {
        console.error({ completeSignUp, msg: 'User Not created' });
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        const { errors } = error;
        if (errors.some((err) => err.code === 'form_code_incorrect')) {
          otpForm.setError('code', { message: 'Incorrect code' });
        }
        if (errors.some((err) => err.code === 'verification_expired')) {
          otpForm.setError('code', {
            message: 'Verification OTP Expired',
          });
        }
      }
      console.error({ error });
    } finally {
      setIsProcessingSignUpRequest(false);
    }
  };

  return (
    <Container className="absolute inset-0 z-[999] grid h-screen w-screen max-w-8xl overflow-y-auto bg-background py-4 md:grid-cols-2 lg:grid-cols-3">
      <GrainyAuroraBox />
      <div className="grid h-full place-items-center">
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
              <h1 className="text-2xl font-medium">Sign Up to Whisper</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Welcome back! Please sign up to continue
              </p>
            </div>
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <Button
              variant={'outline'}
              className="flex items-center gap-2"
              onClick={() => signUpWithOAuth('oauth_github')}
              disabled={!isLoaded}
            >
              <GitHubLogoIcon />
              <p>Github</p>
            </Button>
            <Button
              variant={'outline'}
              className="flex items-center gap-2"
              disabled={!isLoaded}
            >
              <Image
                alt="Google"
                src={GoogleLogo}
                className="h-3 w-3"
                onClick={() => signUpWithOAuth('oauth_google')}
              />
              Google
            </Button>
          </div>
          <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground">
            <Separator className="w-auto flex-shrink flex-grow" />
            <p>Or</p>
            <Separator className="w-auto flex-shrink flex-grow" />
          </div>
          {verifying ? (
            <Form {...otpForm}>
              <form
                onSubmit={otpForm.handleSubmit(handleVerify)}
                className="space-y-6"
              >
                <FormField
                  control={otpForm.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP
                          maxLength={6}
                          {...field}
                          className="w-full justify-between"
                        >
                          <InputOTPGroup className="w-full">
                            <InputOTPSlot index={0} className="w-full" />
                            <InputOTPSlot index={1} className="w-full" />
                            <InputOTPSlot index={2} className="w-full" />
                            <InputOTPSlot index={3} className="w-full" />
                            <InputOTPSlot index={4} className="w-full" />
                            <InputOTPSlot index={5} className="w-full" />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        Please enter the one-time password sent to your email.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={!isLoaded || isProcessingSignUpRequest}
                  className="mt-6 w-full"
                >
                  {isProcessingSignUpRequest && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Submit
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...signUpForm}>
              <form
                onSubmit={signUpForm.handleSubmit(handleSignUp)}
                className="mt-8 flex flex-col gap-2"
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={signUpForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="firstName">First Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="First Name"
                            id="firstName"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signUpForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="lastName">Last Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Last Name"
                            id="lastName"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={signUpForm.control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="userName">Username</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Username"
                          id="userName"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signUpForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email address</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Email address"
                          id="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signUpForm.control}
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
                <FormField
                  control={signUpForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="confirmPassword">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="confirmPassword"
                          id="confirmPassword"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={!isLoaded || isProcessingSignUpRequest}
                  className="mt-6 w-full"
                >
                  {isProcessingSignUpRequest && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Continue
                </Button>
              </form>
            </Form>
          )}
          <p className="mt-4 text-sm text-muted-foreground">
            Already have account?{' '}
            <Link href="/sign-in" className="hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
}
