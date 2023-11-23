import './globals.css';
import Providers from './components/Providers';

export const metadata = {
  title: 'Ernoca',
  description: 'Your trusted Zimbabwean car and motor spares dealership. Let us trade, today.',
}


export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}




