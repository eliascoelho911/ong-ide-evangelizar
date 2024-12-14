import { User } from '@/lib/types/user';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut } from 'lucide-react';
import { SidebarInset, SidebarTrigger } from '../ui/sidebar';
import { Separator } from '@radix-ui/react-separator';
import { signOut } from '@/app/actions/sign-out';
import { getFullName } from '@/utils/user';
import UserAvatar from '../user-avatar';

function UserAvatarWithDropdown({ user }: { user: User }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar avatar={user.avatar} fallback={user.firstName.charAt(0)} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{getFullName(user)}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}><LogOut /> Sair</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export function Header({ user, children }: { user?: User, children: React.ReactNode }) {
    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                {children}
            </div>
            {user && <UserAvatarWithDropdown user={user} />}
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
        <SidebarInset>
            <Header user={user}>
                {headerChildren}
            </Header>
            <main className="flex-1 p-4">
                {children}
            </main>
        </SidebarInset>
    )
}