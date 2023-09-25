'use client'
//@ts-nocheck
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import './globals.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Head from 'next/head';
import LayoutProvider from './components/LayoutProvider';


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
            <LayoutProvider>
            {children}
            </LayoutProvider>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}




