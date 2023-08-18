import './globals.css'
import { Nunito } from 'next/font/google'

const font = Nunito({ subsets: ['latin'] })

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
      <body className={`${font.className} bg-[url("https://127.0.0.1:5500/public/images/background.svg")]`}>{children}</body>
    </html>
  )
}
