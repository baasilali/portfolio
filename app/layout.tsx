import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { TransitionProvider } from "./_transitions/provider";
import "./globals.css";

const microgramma = localFont({
  src: "./fonts/microgramma-normal.ttf",
  variable: "--font-microgramma",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "baasil",
  description: "portfolio",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={microgramma.variable}>
      <head>
        <meta name="color-scheme" content="dark" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4GJGPRTLQP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-4GJGPRTLQP');`}
        </Script>
      </head>
      <body>
        <TransitionProvider>{children}</TransitionProvider>
        <Analytics />
      </body>
    </html>
  );
}
