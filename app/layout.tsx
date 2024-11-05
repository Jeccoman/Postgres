import Layout from './Components/layout'
import { Inter } from 'next/font/google'
import './globals.css'
import ChatPopup from './Components/chatPopup'

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
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
        <ChatPopup/>
      </body>
    </html>
  )
} 