import type { Metadata } from "next";
import { Rethink_Sans } from 'next/font/google'
import "./globals.css";
 
// If loading a variable font, you don't need to specify the font weight
const inter = Rethink_Sans({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Hospital Management",
  description: "Application de gestion d'hopital"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
       className={inter.className}
      >
        {children}
      </body>
    </html>
  );
}
