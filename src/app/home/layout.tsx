import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <AppSidebar />
            {children}
        </SidebarProvider>
    );
}