import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'flag-icons/css/flag-icons.min.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Global Cities API',
    description: 'Search for any city in the world.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
