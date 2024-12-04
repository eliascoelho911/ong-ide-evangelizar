import { getFullName, User } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut } from 'lucide-react';
import { AppSidebar } from '@/app/components/app-sidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '../ui/sidebar';
import { Separator } from '@radix-ui/react-separator';

function UserAvatar({ user }: { user: User }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    {user?.avatar && <AvatarImage src={user.avatar} />}
                    <AvatarFallback>{user.firstName.charAt(0)}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{getFullName(user)}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><LogOut /> Sair</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export function Header({ user, children }: { user?: User, children: React.ReactNode }) {
    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
            <div className="flex items-center gap-2">
                {children}
            </div>
            {user && <UserAvatar user={user} />}
        </header>
    )
}

export function ContentWithHeader(
    {
        user,
        headerChildren,
        children
    }: {
        user?: User,
        headerChildren: React.ReactNode,
        children: React.ReactNode
    }
) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Header user={user}>
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    {headerChildren}
                </Header>
                <main className="flex-1 p-4">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}