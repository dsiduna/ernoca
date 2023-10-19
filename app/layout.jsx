'use client'
import { ReactNode } from 'react';
import './globals.css';
import { Provider } from 'react-redux';
import Head from 'next/head';
import LayoutProvider from './components/LayoutProvider';
import configurestore from './redux/store/configurestore';
import { PersistGate } from 'redux-persist/integration/react';
import { AuthContextProvider } from './components/context/AuthContext';

const { store, persistor } = configurestore();

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <Head>
        <title>Ernoca</title>
        <meta property="og:title" content="E-commerce application" key="title" />
      </Head>
      <body>
        <Provider store={store}>
          <AuthContextProvider>
            <LayoutProvider>
              {children}
            </LayoutProvider>
          </AuthContextProvider>
        </Provider>
      </body>
    </html>
  );
}




