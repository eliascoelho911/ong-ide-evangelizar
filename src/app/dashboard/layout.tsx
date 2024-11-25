'use client'

import { AppSidebar } from "@/app/dashboard/app-sidebar"
import { SearchForm } from "@/components/ui/search-form"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { usePathname } from 'next/navigation'

const routeTitles: Record<string, string> = {
    '/dashboard/alunos': 'Alunos',
    '/dashboard/professores': 'Professores',
    '/dashboard/turmas': 'Turmas',
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    const currentPath = usePathname();
    const dynamicTitle = routeTitles[currentPath] || 'Dashboard';

    return (
        <SidebarProvider>
            <AppSidebar currentPath={currentPath} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <SearchForm />
                </header>
                <main>
                    <h1 className="m-4 text-2xl font-bold">{dynamicTitle}</h1>
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
