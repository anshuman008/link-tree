'use client'

import { SessionProvider } from "next-auth/react"


export const Provideres = ({children}:{children:React.ReactNode}) => {
  return <SessionProvider>
    {children}
  </SessionProvider>
}