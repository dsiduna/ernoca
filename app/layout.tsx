'use client'
//@ts-nocheck
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import './globals.css';
import { Provider } from 'react-redux';
import Head from 'next/head';
import LayoutProvider from './components/LayoutProvider';
import configurestore from './redux/store/configurestore';
import { PersistGate } from 'redux-persist/integration/react';

const { store, persistor } = configurestore();

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




