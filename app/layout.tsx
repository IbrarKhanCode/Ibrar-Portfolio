import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muhammad Ibrar | Flutter Developer",
  description:
    "Flutter developer with 1.5+ years of experience building scalable, real-time mobile apps with Firebase and REST APIs. Based in Islamabad, Pakistan.",
  keywords: [
    "Muhammad Ibrar",
    "Flutter Developer",
    "Mobile App Developer",
    "Dart",
    "Firebase",
    "REST API",
    "Islamabad",
    "Pakistan",
    "iOS Developer",
    "Android Developer",
  ],
  authors: [{ name: "Muhammad Ibrar" }],
  creator: "Muhammad Ibrar",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Muhammad Ibrar | Flutter Developer",
    description:
      "Flutter developer with 1.5+ years of experience building scalable, real-time mobile apps with Firebase and REST APIs.",
    siteName: "Muhammad Ibrar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Ibrar | Flutter Developer",
    description:
      "Flutter developer with 1.5+ years of experience building scalable, real-time mobile apps with Firebase and REST APIs.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/ibrar.png", type: "image/png" }],
    shortcut: [{ url: "/ibrar.png", type: "image/png" }],
    apple: [{ url: "/ibrar.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="js">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" href="/ibrar.png" type="image/png" />
        <link rel="shortcut icon" href="/ibrar.png" type="image/png" />
        <link rel="apple-touch-icon" href="/ibrar.png" />
      </head>
      <body className={`${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>{children}</body>
    </html>
  );
}
