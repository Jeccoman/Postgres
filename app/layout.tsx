import { Inter } from 'next/font/google'
import Layout from './Components/layout'
import ChatPopup from './Components/chatPopup'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AfyaLink',
  description: 'Find your next healthcare job with AfyaLink',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-full`}>
        <Layout>
          <main className="flex-grow">
            {children}
          </main>
        </Layout>
        <ChatPopup />
      </body>
    </html>
  )
}