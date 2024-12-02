import type { Metadata } from "next";
import "@/app/ui/global.css";
import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";
import Header from "@/components/header";

// Force next.js to treat this route as server-side rendered
// Without this line, during the build process, next.js will treat this route as static and build a static HTML file for it
export const dynamic = "force-dynamic"; 

export const metadata: Metadata = {
  title: "ONG Ide Evangelizar",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { currentUser } = await getAuthenticatedAppForUser();

  return (
    <html lang="pt-br">
      <body>
        <Header initialUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
