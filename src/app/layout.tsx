import type { Metadata } from "next";
import { inter } from '@/app/ui/fonts';

import "@/app/ui/global.css";

export const metadata: Metadata = {
  title: "ONG Ide Evangelizar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
