'use client'
import { SessionProvider } from 'next-auth/react'
import Footer from './components/Footer'
import NavBar from './components/NavBar'
import './globals.css'
import { Inter } from 'next/font/google'
import { Provider } from 'react-redux'
import { store } from './store/store';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ernoca',
  description: 'E-commerce app',
};


export default function RootLayout({
  children, session, ...pageProps }: { children: React.ReactNode, session: any }) {
  
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <Provider store={store}>
          <NavBar />
          {children}
          <Footer />
        </Provider>
      </SessionProvider>
    </html>
  )
}
