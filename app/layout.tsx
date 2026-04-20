import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const robotoMono = Roboto_Mono({
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className={`${inter.variable} ${robotoMono.variable}`}>{children}</body>
    </html>
  );
}
