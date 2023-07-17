'use client'
import { SessionProvider } from 'next-auth/react'
import Footer from './components/Footer'
import NavBar from './components/NavBar'
import './globals.css'
import { Provider } from 'react-redux'
import { store } from './store/store';
import Head from 'next/head'

export default function RootLayout({
  children, session, ...pageProps }: { children: React.ReactNode, session: any }) {
  
  return (
    <html lang="en">
      <Head>
        <title>Ernoca</title>
        <meta property="og:title" content="E-commerce application" key="title" />
      </Head>
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
