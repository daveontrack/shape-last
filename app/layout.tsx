import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/toaster'
import { Chatbot } from '@/components/chatbot'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: 'SHAPEthiopia - Empowering Communities, Transforming Lives',
    template: '%s | SHAPEthiopia',
  },
  description: 'SHAPEthiopia is a nonprofit organization dedicated to humanitarian impact and community development in Ethiopia. Join us in empowering children, women, and communities.',
  keywords: ['nonprofit', 'Ethiopia', 'humanitarian', 'community development', 'charity', 'volunteer', 'donate', 'children', 'women empowerment'],
  authors: [{ name: 'SHAPEthiopia' }],
  creator: 'SHAPEthiopia',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'http://localhost:3000',
    siteName: 'SHAPEthiopia',
    title: 'SHAPEthiopia - Empowering Communities, Transforming Lives',
    description: 'Join SHAPEthiopia in making a lasting impact through humanitarian work and community development in Ethiopia.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SHAPEthiopia - Empowering Communities, Transforming Lives',
    description: 'Join SHAPEthiopia in making a lasting impact through humanitarian work and community development in Ethiopia.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#a0522d',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} data-scroll-behavior="smooth">
      <body className="font-sans antialiased">
        {children}
        <Chatbot />
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
