import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const jetbrainsMono = localFont({
  src: "./fonts/JetBrainsMono-Regular.woff2",
  variable: "--font-jetbrains-mono",
  weight: "400",
});

export const metadata: Metadata = {
  title: "baasilali",
  description: "personalportfolio",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="dark" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4GJGPRTLQP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4GJGPRTLQP');
          `}
        </Script>
      </head>
      <body
        className={`${jetbrainsMono.variable} antialiased bg-black text-green-400 min-h-screen`}
        style={{ backgroundColor: '#000000', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
