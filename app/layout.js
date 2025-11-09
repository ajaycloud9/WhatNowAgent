import './styles/globals.css'

export const metadata = {
  title: 'WhatNow Agent',
  description: 'AI-driven task manager dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
