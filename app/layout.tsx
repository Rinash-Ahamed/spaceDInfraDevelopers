import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "@/app/globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Space-D Infra Developers',
  description: 'Innovate. Design. Shape. Premium Residential & Commercial Builders',
  icons: {
    icon: '/justlogo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
