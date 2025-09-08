import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kwadwo Ampadu-Yeboah | Full-Stack Developer',
  description: 'Portfolio of Kwadwo Ampadu-Yeboah - Full-Stack Developer and Digital Innovator from Ghana. Showcasing cutting-edge projects built with Next.js, React, and modern web technologies.',
  keywords: [
    'Kwadwo Ampadu-Yeboah',
    'Full-Stack Developer',
    'Ghana Developer',
    'Next.js',
    'React',
    'TypeScript',
    'Web Development',
    'Portfolio',
    'Digital Innovation'
  ],
  authors: [{ name: 'Kwadwo Ampadu-Yeboah' }],
  creator: 'Kwadwo Ampadu-Yeboah',
  publisher: 'Kwadwo Ampadu-Yeboah',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kwadwo-portfolio.vercel.app',
    title: 'Kwadwo Ampadu-Yeboah | Full-Stack Developer',
    description: 'Portfolio of Kwadwo Ampadu-Yeboah - Full-Stack Developer and Digital Innovator from Ghana.',
    siteName: 'Kwadwo Ampadu-Yeboah Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kwadwo Ampadu-Yeboah Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kwadwo Ampadu-Yeboah | Full-Stack Developer',
    description: 'Portfolio of Kwadwo Ampadu-Yeboah - Full-Stack Developer and Digital Innovator from Ghana.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}