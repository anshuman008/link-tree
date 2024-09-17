import './globals.css';
import NavBar from '@/components/NavBar';
import { Provideres } from './Providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
        <body >
          <Provideres>
          <NavBar/>
          {children} 
          </Provideres>   
        </body>
      </html>
  )
}