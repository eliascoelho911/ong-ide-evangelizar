import type { Metadata } from "next";
import "@/app/ui/global.css";

export const metadata: Metadata = {
  title: "ONG Ide Evangelizar",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
