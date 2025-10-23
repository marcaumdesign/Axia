import type React from "react"
import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Axia Capital",
  description: "Investment strategies that outperform the market",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon-black.png" id="favicon" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function updateFavicon() {
                const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const favicon = document.getElementById('favicon');
                if (favicon) {
                  favicon.href = isDark ? '/favicon-white.png' : '/favicon-black.png';
                }
              }
              
              // Update immediately on load
              updateFavicon();
              
              // Listen for theme changes in real-time
              window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon);
              
              // Also listen for visibility changes to update when tab becomes active
              document.addEventListener('visibilitychange', updateFavicon);
            `,
          }}
        />
      </head>
      <body className={`${geistMono.variable} antialiased`} suppressHydrationWarning>
        <Header />
        {children}
      </body>
    </html>
  )
}
