import { ClerkProvider, useAuth } from '@clerk/clerk-react'
import React, { useEffect } from 'react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// intentionally setting state outside of react useState 
// so that this can be used in data-store code
let getClerkTokenPromise: Promise<string | null> = new Promise(() => null)
export const getClerkToken = (): Promise<string | null> => getClerkTokenPromise

export const ClerkTokenProvider = ({ children }: {
    children: React.ReactNode
}) => {
    const { getToken } = useAuth()

    useEffect(() => {
        getClerkTokenPromise = getToken()
    }, [getToken])

    return (
        <>
            {children}
        </>
    )
}

export const CorsClerkProvider = ({ children }: {
    children: React.ReactNode
}) => (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <ClerkTokenProvider>
            {children}
        </ClerkTokenProvider>
    </ClerkProvider>
)
