'use client'
//@ts-nocheck
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import './globals.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Head from 'next/head';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <title>Ernoca</title>
        <meta property="og:title" content="E-commerce application" key="title" />
      </Head>
      <body>
        <SessionProvider>
          <Provider store={store}>
            <NavBar />
            {children}
            <Footer />
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}


