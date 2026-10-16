import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import 'modern-normalize/modern-normalize.css';
import './globals.css';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { ReactNode } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description:
    'NoteHub is a simple and efficient application designed for managing personal notes.',
};

interface RootLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
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
