import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mis Festarit?',
  description: 'Löydä kaikki Suomen festarit!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fi">
      <body className={`${inter.className} bg-white`}>{children}</body>
    </html>
  )
}
