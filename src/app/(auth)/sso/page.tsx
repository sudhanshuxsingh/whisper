/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useSignIn, useSignUp } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { useSearchParams } from "next/navigation";
function SSOCallback() {
  const { signIn } = useSignIn();
  const { signUp,setActive } = useSignUp();
  const searchParams = useSearchParams()
  const router = useRouter();
  const redirectPath = searchParams.get('_r')
  useEffect(() => {
    const handleOAuthCallback = async () => {
        if(!signIn || !signUp) return;
        try {
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
            const userNeedsToBeCreated = signIn.firstFactorVerification.status === 'transferable'
            if (userNeedsToBeCreated) {
                console.log({signUp})
                const res = await signUp.create({
                    transfer: true,
                })
                if (res.status === 'complete') {
                    setActive({
                        session: res.createdSessionId,
                    })
                }
            }
            console.log('user created successfully.. Redirecting to :: ',redirectPath)
            router.push(redirectPath ?? '/')
        } catch (error) {
            console.log(error)
            router.push('/sign-up')
        }
    }
    handleOAuthCallback()
  }, [signIn,signUp]);

  return <div>Processing authentication...</div>;
}
export default SSOCallback;