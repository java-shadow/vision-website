import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vision',
  description: 'Octavision Internal Portal',
  icons: {
    icon: '/logo2.svg?v=3',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
