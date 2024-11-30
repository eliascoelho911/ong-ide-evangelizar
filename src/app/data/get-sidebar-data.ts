'use client';

import { NavMainProps } from "@/components/nav-dropdown";
import { NavUserProps } from "@/components/nav-user";
import { getLoggedUserData } from "@/services/user-service";
import { User } from "@/types/user";
import { GraduationCap } from "lucide-react";
import { usePathname } from "next/navigation";

const data = (currentUrl: string): NavMainProps => {
    function isActiveUrl(currentUrl: string, url: string) {
        return currentUrl === url;
    }

    function isOpen(currentUrl: string, url: string) {
        return currentUrl.startsWith(url);
    }

    function createItem(title: string, url: string) {
        return {
            title: title,
            url: url,
            isActive: isActiveUrl(currentUrl, url)
        }
    }

    return {
        navMain: [
            {
                title: "Sistema",
                content: [
                    {
                        title: "Alunos",
                        url: "/alunos",
                        icon: GraduationCap,
                        isOpen: isOpen(currentUrl, "/alunos"),
                        items: [
                            createItem("Listar alunos", "/alunos"),
                            createItem("Matricular", "/alunos/adicionar"),
                        ],
                    }
                ]
            } 
        ]
    }
}

const userData = (user: User): NavUserProps | null => {
    return user && user.name ? {
        user: {
            name: user.name,
            email: user.email,
            avatar: user.avatarUrl || undefined
        }
    } : null;
}

export async function getSidebarData() {
    const pathname = usePathname();
    return {
        navMain: data(pathname),
        user: userData(await getLoggedUserData())
    }
}
