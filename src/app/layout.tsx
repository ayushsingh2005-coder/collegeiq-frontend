import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CompareProvider } from '@/context/CompareContext';
import Navbar from '@/components/Navbar';
import CompareBar from '@/components/CompareBar';

const inter = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CollegeIQ — Find Your Dream College',
  description: 'Discover and compare top colleges in India',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0a0a0a] min-h-screen`}>
        <AuthProvider>
          <CompareProvider>
            <Navbar />
            <main className="pb-24">{children}</main>
            <CompareBar />
          </CompareProvider>
        </AuthProvider>
      </body>
    </html>
  );
}