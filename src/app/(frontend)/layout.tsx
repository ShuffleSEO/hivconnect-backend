import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Content management system for HIV Connect Central NJ',
  title: 'HIV Connect Central NJ - Content Management',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
