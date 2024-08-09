import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import './globals.css';
import NavBar from '@/components/NavBar';
import PublicPage from '@/components/PublicPage';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
      <NavBar/>
          <main>
                  {children}       
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}