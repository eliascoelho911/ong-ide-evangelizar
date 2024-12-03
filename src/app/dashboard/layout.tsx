import { AppSidebar } from "@/app/components/app-sidebar"
import { SearchForm } from "@/components/ui/search-form"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <SearchForm />
                </header>
                <main>
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
