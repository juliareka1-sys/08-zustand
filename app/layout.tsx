import type { Metadata } from 'next';
import 'modern-normalize/modern-normalize.css';
import './globals.css';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { ReactNode } from 'react';
import { Roboto } from 'next/font/google';

export const metadata: Metadata = {
  title: 'NoteHubApp',
  description:
    'NoteHub is a simple and efficient application designed for managing personal notes.',
  openGraph: {
    title: 'NoteHubApp',
    description:
      'NoteHub is a simple and efficient application designed for managing personal notes.',
    url: 'https://notehub.com/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub - personal note manager',
      },
    ],
  },
};

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

interface RootLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />

          {children}
          {modal}

          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
